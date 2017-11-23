/**
 * Created by hongxu.lin on 2/17/2017.
 */
V3D.FloorView = function (camera, scene, renderer, controls) {
    var scope = this;
    var visualRoot = new THREE.Group();
    var raycaster = new THREE.Raycaster();
    var floor;
    var floorGroup = new THREE.Object3D();
    var floorShapedata;
    var dragObjects = [];
    var placeNodes = [];
    var wallDepthReal = 0.12;
    var wallHeightReal = 1.5;
    var walls = [];
    var delteDevice;
    var floorMontData = null;

    var selectedDevices = [];


    scope.floorId = null;
    scope.visualRoot = visualRoot;
    var editor = new EditHelper(camera, visualRoot, renderer.domElement);
    var defaultCameraPosition = null;
    var targetDeviceBox = new THREE.BoxHelper(camera, 0x00ff00);
    targetDeviceBox.visible = false;
    scene.add(targetDeviceBox);

    var loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = function () {
        scope.loadFloorShape(scope.floorShapedata, scope.floorId);
        $("#loadingContainer").hide();
    };

    loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
        var percentComplete = itemsLoaded / itemsTotal * 100;
        $("#loadingContainer").show();
        $("#percentage").text(" 场景资源" + Math.round(percentComplete, 2) + '%');
        console.log('Loading floor asset: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };


    var modelLoading = new THREE.LoadingManager();
    modelLoading.onLoad = function () {
        loadDevices(floorMontData.pnodes);
    };

    modelLoading.onProgress = function (url, itemsLoaded, itemsTotal) {
        var percentComplete = itemsLoaded / itemsTotal * 100;
        $("#loadingContainer").show();
        $("#percentage").text(" 模型资源" + Math.round(percentComplete, 2) + '%');
        console.log('Loading model asset: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };


    var pa = new PathEditor();
    var font;
    scope.highlight = function (devices) {
        $.each(devices, function (idx, device) {
            var pnode = getPnodeByDeviceId(device.id);
            if (pnode)
                pnode.showHighLightt(device.color);
        })
    };

    scope.deHighlight = function (devices) {
        $.each(devices, function (idx, device) {
            var pnode = getPnodeByDeviceId(device.id);
            if (pnode)
                pnode.hideHighLightt();
        })
    };


    scope.showText = function (devices) {
        $.each(devices, function (idx, device) {
            var pnode = getPnodeByDeviceId(device.id);
            if (pnode)
                pnode.showText(device.text, device.color);
        })
    };

    scope.hideText = function (devices) {
        $.each(devices, function (idx, device) {
            var pnode = getPnodeByDeviceId(device.id);
            if (pnode)
                pnode.hideText();
        })
    };


    scope.canEdit = false;

    scope.setEditable = function (flag) {
        scope.canEdit = flag;
        if (flag) {
            targetDeviceBox.visible = false;
        }
        else {
            editor.detach();
            clearEditSelection();
        }

    };

    function clearEditSelection() {
        $.each(selectedDevices, function (idx, item) {
            var pnode = getPnodeByDeviceId(item);
            pnode.hideHighLightt();
        });
        selectedDevices.splice(0, selectedDevices.length);
        selectedDevices = [];

    }


    scope.active = function () {
        scene.add(scope.visualRoot);
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        editor.addEventListener('dragstart', onEditorStart);
        editor.addEventListener('dragend', onEditorEnd);
        targetDeviceBox.visible = true;
    };

    scope.deactive = function () {
        renderer.domElement.removeEventListener('mousedown', onDocumentMouseDown, false);
        editor.removeEventListener('dragstart', onEditorStart, false);
        editor.removeEventListener('dragend', onEditorEnd, false);
        editor.detach();
        scene.remove(scope.visualRoot);
        targetDeviceBox.visible = false;
    };

    scope.dispose = function () {
        scope.deactive();
    };

    scope.active();

    var selected = null;

    function onEditorStart(event) {
        controls.enabled = false;
    }

    function onEditorEnd(event) {
        controls.enabled = true;
        var location = {
            position: event.object.position,
            rotate: {x: event.object.rotation.x, y: event.object.rotation.y, z: event.object.rotation.z}
        };
        scope.mountPlaceNode(event.object.data.device_id, location);
    }

    scope.align = function (direction) {
        if (selectedDevices.length == 0) return;

        var firstkey = selectedDevices[0];
        var firstPnode = getPnodeByDeviceId(firstkey);
        var firstPosition = firstPnode.visual3d.position;
        var lastOffset = 0;
        var vs = {
            "right": new THREE.Vector3(firstPnode.rawData.width / 2 * V3DSettings.RESIZE_RATIO, 0, 0),
            "left": new THREE.Vector3(-firstPnode.rawData.width / 2 * V3DSettings.RESIZE_RATIO, 0, 0),
            "front": new THREE.Vector3(0, 0, firstPnode.rawData.depth / 2 * V3DSettings.RESIZE_RATIO),
            "rear": new THREE.Vector3(0, 0, -firstPnode.rawData.depth / 2 * V3DSettings.RESIZE_RATIO)
        };

        var firstPnodeOffset = {
            "right": firstPnode.rawData.width / 2 * V3DSettings.RESIZE_RATIO,
            "left": firstPnode.rawData.width / 2 * V3DSettings.RESIZE_RATIO,
            "front": firstPnode.rawData.depth / 2 * V3DSettings.RESIZE_RATIO,
            "rear": firstPnode.rawData.depth / 2 * V3DSettings.RESIZE_RATIO
        };

        var v = vs[direction];
        v.applyEuler(firstPnode.visual3d.rotation).normalize();

        $.each(selectedDevices, function (idx, item) {
            if (idx == 0) {
                lastOffset = firstPnodeOffset[direction];
            }
            else {
                var pnode = getPnodeByDeviceId(item);
                var length = (lastOffset + pnode.rawData.width / 2 * V3DSettings.RESIZE_RATIO)
                var vOffset = v.clone().multiplyScalar(length);
                var to = new THREE.Vector3().addVectors(firstPosition, vOffset);
                var loaction = {
                    position: to,
                    rotate: firstPnode.visual3d.rotation
                };
                pnode.updatePosition(loaction);
                lastOffset = lastOffset + pnode.rawData.width * V3DSettings.RESIZE_RATIO;
                pnode.save();
            }
        });

    };

    function onDocumentMouseDown(event) {

        var interset = intersectObjects(event, dragObjects);
        if (interset) {
            var target = interset.object;
            var check = isData(target, "dragable", true);
            if (check)
                target = check.root;

            if (scope.canEdit) {
                if (event.ctrlKey) {
                    editor.detach(); 
                    var idx = selectedDevices.indexOf(target.data.device_id);
                    if (idx > 0) {
                        //already exist deselect
                        scope.deHighlight([{id: target.data.device_id}]);
                        selectedDevices.splice(idx, 1);
                    }
                    else {
                        //select
                        scope.highlight([{id: target.data.device_id, color: "green"}]);
                        var pnode = getPnodeByDeviceId(target.data.device_id);
                        selectedDevices.push(target.data.device_id);
                    }


                }
                else if (event.shiftKey) {
                    //shift to delete
                    delteDevice = target;
                    showConfirm("确定要机房移除此设备？", confirmDelete);
                }
                else if (editor.object != target) {
                    clearEditSelection();
                    editor.attach(target, floor);
                }
            }
            else {
                targetDeviceBox.update(target);
                targetDeviceBox.visible = true;
                if (selected == target) {
                    editor.detach();
                    controls.enabled = true;
                    scope.dispatchEvent({type: V3DEventType.DEVICE_DOUBLE_CLICKED, object: target});
                }
                scope.dispatchEvent({type: V3DEventType.DEVICE_SELECTED, object: target});
                selected = target;
                setTimeout(function () {
                    selected = null;
                }, 400);
            }
        }
        else {
            //editor.detach();
            //targetDeviceBox.visible = false;
        }
    }


    function confirmDelete() {
        layer.closeAll();
        editor.detach();
        var pnode = getPnodeByDeviceId(delteDevice.data.device_id);
        placeNodes.splice(placeNodes.indexOf(pnode), 1);
        dragObjects.splice(dragObjects.indexOf(pnode.visual3d), 1);
        removePNode(pnode);
        delteDevice = null;
        targetDeviceBox.visible = false;
    }

    function removePNode(pnode) {
        var saveData = {
            action: "delete",
            "place_node_id": pnode.rawData.id
        };
        //save after mont
        loadData(SERVICE.SavePlaceNode, saveData);
        scope.visualRoot.remove(pnode.visualRoot);
    }

    function initLoadingResource(floorId) {
        var allCached = true;
        var fontloader = new THREE.FontLoader(loadingManager);
        if (!CACHEDATA["Font"]) {
            fontloader.load('fonts/FZLanTingHeiS-L-GB_Regular.json', function (response) {
                CACHEDATA["Font"] = response;
                font = response;
            });
            allCached = false;
        }

        var textureLoader = new THREE.TextureLoader(loadingManager);
        if (!CACHEDATA["Material:Floor:" + floorId]) {
            textureLoader.load("images/floor.jpg",
                function (result) {
                    CACHEDATA["Material:Floor:" + floorId] = result;
                    result.wrapS = THREE.RepeatWrapping;
                    result.wrapT = THREE.RepeatWrapping;
                    result.repeat.set(0.2, 0.2);
                }
            );
            allCached = false;
        }

        if (!CACHEDATA["Material:wall"]) {
            textureLoader.load("images/wall.jpg",
                function (result) {
                    CACHEDATA["Material:wall"] = result;
                    result.wrapS = THREE.RepeatWrapping;
                    result.wrapT = THREE.RepeatWrapping;
                    result.repeat.set(0.5, 0.5);
                }
            );
            allCached = false;
        }
        if (allCached) {
            scope.loadFloorShape(scope.floorShapedata, scope.floorId);
        }
    }

    function loadsingleModel(data) {
        // var predefined = getPredefinedModel(data.storage);
        // if(predefined)
        // {
        //     CACHEDATA["Model:"+data.id] = predefined.clone();
        // }
        // else
        // {
        var mtlLoader = new THREE.MTLLoader(modelLoading);
        var objLoader = new THREE.OBJLoader(modelLoading);
        var model = JSON.parse(data.storage);
        var mtl = getMtlPathName(model);
        if (mtl.length > 0) {
            mtlLoader.setBaseUrl(mtl[0]);
            mtlLoader.setPath(mtl[0]);
            mtlLoader.load(mtl[1], function (materials) {
                var obj = getObjPath(model);
                objLoader.setMaterials(materials);
                objLoader.load(obj, function (object) {
                    CACHEDATA["Model:" + data.id] = object.clone();
                });
            });
        }
        // }


    }

    function initLoadingModels(models) {
        var allCached = true;
        $.each(models, function (idx, data) {
            if (!CACHEDATA["Model:" + data.id]) {
                // var predefine = getPredefinedModel(data);
                // if(predefine)
                // {
                //     CACHEDATA["Model:"+data.id] = predefine;
                // }
                // else
                loadsingleModel(data);
                allCached = false;
            }
        });

        if (allCached)
            loadDevices(floorMontData.pnodes);
    }


    function fitCameraToFloorSize(mesh) {
        var b = new THREE.Box3().setFromObject(mesh);
        var camera_z = Math.max(b.max.z, b.max.x) / 0.9;
        var camera_y = Math.tan(Math.PI / 5) * Math.abs(camera_z);
        if (camera_z < 100)
            camera_z = 100;
        if (camera_y < 50)
            camera_y = 50;
        camera.position.set(b.max.x * 0.2, camera_y, camera_z);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        defaultCameraPosition = new THREE.Vector3(b.max.x * 0.2, camera_y, camera_z);
    }

    function getFloorSize2D() {
        var box = new THREE.Box3().setFromObject(floor);
        var min = new THREE.Vector2(box.min.x, box.min.z);
        var max = new THREE.Vector2(box.max.x, box.max.z);
        var width = box.max.x - box.min.x;
        var height = box.max.z - box.min.z;
        return {min: min, max: max, width: width, height: height};
    }

    function getFloorDevice2D() {
        var points = [];
        var floorsize = getFloorSize2D();
        $.each(placeNodes, function (idx, value) {
            var p3d = value.visual3d.position;
            var p2d = new THREE.Vector2(p3d.x, p3d.z);
            var p = new THREE.Vector2().subVectors(p2d, floorsize.min).multiplyScalar(20);
            var dataPoint = {
                x: Math.floor(p.x),
                y: Math.floor(p.y),
                value: Math.floor(Math.random() * 100)
            };
            points.push(dataPoint);
        });
        return points;
    }

    var heatmap = null;
    scope.showHeatMap = function (isShow) {
        if (isShow) {
            var areaPts = [];
            var shape = scope.floorShapedata.shape;
            for (var idx = 0; idx < shape.length; idx++) {
                var from = shape[idx];
                var v = new THREE.Vector2(from.x * V3DSettings.RESIZE_RATIO, from.y * V3DSettings.RESIZE_RATIO);
                areaPts.push(v);
            }
            var areaShape = new THREE.Shape(areaPts);
            var geomotry = new THREE.ShapeGeometry(areaShape);
            if (!heatmap)
                heatmap = new V3D.HeatMap();
            if (heatmap.visual3D) {
                visualRoot.remove(heatmap.visual3D);
                heatmap.visual3D = null;
            }
            var mesh = heatmap.getMesh(geomotry, getFloorSize2D(), getFloorDevice2D());
            mesh.position.y = 0.5 * V3DSettings.RESIZE_RATIO;
            visualRoot.add(mesh);
        }
        else {
            //hide
            if (heatmap && heatmap.visual3D) {
                visualRoot.remove(heatmap.visual3D);
                heatmap.visual3D = null;
            }
        }

    };

    function showShape(shape) {
        //remove last floor shape
        if (floorGroup) {
            visualRoot.remove(floorGroup);
            floorGroup = new THREE.Object3D();
        }


        var areaPts = [];
        for (var idx = 0; idx < shape.length; idx++) {
            var from = shape[idx],
                to = idx == shape.length - 1 ? shape[0] : shape[idx + 1];

            var v = new THREE.Vector2(from.x * V3DSettings.RESIZE_RATIO, from.y * V3DSettings.RESIZE_RATIO);
            areaPts.push(v);
            showWallsegment(from, to, true);
        }
        var areaShape = new THREE.Shape(areaPts);
        var floorShpeGeomotry = new THREE.ShapeGeometry(areaShape);

        var material = new THREE.MeshLambertMaterial({
            map: CACHEDATA["Material:Floor:" + scope.floorId],
            side: THREE.DoubleSide
        });
        floor = new THREE.Mesh(floorShpeGeomotry, material);
        floor.rotateX(Math.PI / 2);
        floor.receiveShadow = true;
        fitCameraToFloorSize(floor);
        floorGroup.add(floor);
        visualRoot.add(floorGroup);
    }

    function makeHole(pnode) {
        var object = pnode.visual3d;
        var wall = null;
        var boxObj = new THREE.Box3().setFromObject(object);
        $.each(walls, function (idx, item) {
            var boxwall = new THREE.Box3().setFromObject(item);
            if (boxwall.intersectsBox(boxObj))
                wall = item;
        });
        if (wall) {
            var box = {
                width: pnode.deviceData.width,
                height: pnode.deviceData.height,
                depth: pnode.deviceData.depth,
            };
            var wallFrom = wall.data.from;
            var wallTo = wall.data.to;
            var wall_bsp = new ThreeBSP(wall);


            var plane = new THREE.Plane();
            plane.setFromCoplanarPoints(
                new THREE.Vector3(wallFrom.x * V3DSettings.RESIZE_RATIO, wallHeightReal * V3DSettings.RESIZE_RATIO, wallFrom.y * V3DSettings.RESIZE_RATIO),
                wall.position,
                new THREE.Vector3(wallTo.x * V3DSettings.RESIZE_RATIO, wallHeightReal * V3DSettings.RESIZE_RATIO, wallTo.y * V3DSettings.RESIZE_RATIO)
            );
            var projectPosition = plane.projectPoint(object.position);
            var holegeometry = new THREE.BoxGeometry(box.width * V3DSettings.RESIZE_RATIO, box.height * V3DSettings.RESIZE_RATIO, wallDepthReal * 1.2 * V3DSettings.RESIZE_RATIO);
            holegeometry.translate(0, box.height * V3DSettings.RESIZE_RATIO / 2, 0);
            var hole = new THREE.Mesh(holegeometry);
            hole.position.set(projectPosition.x, projectPosition.y, projectPosition.z);
            hole.rotateY(-wall.rotation.y);
            var hole_bsp = new ThreeBSP(hole);


            var subtract_bsp = wall_bsp.subtract(hole_bsp);
            var result = subtract_bsp.toMesh(new THREE.MeshLambertMaterial({
                shading: THREE.SmoothShading,
                map: CACHEDATA["Material:wall"]
            }));
            result.geometry.computeVertexNormals();
            result.data = {
                from: wallFrom,
                to: wallTo
            };

            floorGroup.remove(wall);
            walls.splice(walls.indexOf(wall), 1);

            floorGroup.add(result);
            walls.push(result);
        }
    }


    function showWallsegment(from, to, isFromAreaShape) {


        var a = new THREE.Vector2(from.x, from.y);
        var b = new THREE.Vector2(to.x, to.y);
        var v = b.sub(a);

        var wall_width = v.length() * V3DSettings.RESIZE_RATIO, wall_height = wallHeightReal * V3DSettings.RESIZE_RATIO, wall_depth = wallDepthReal * V3DSettings.RESIZE_RATIO;

        //var material = new THREE.MeshPhongMaterial({color:0xffffff});
        var material = new THREE.MeshLambertMaterial({map: CACHEDATA["Material:wall"]});

        var wallgeometry = new THREE.BoxGeometry(wall_width, wall_height, wall_depth);

        var wall = new THREE.Mesh(wallgeometry, material);
        //wall.scale.set(wall_width, wall_height, wall_depth);
        wall.position.set((from.x + to.x) / 2 * V3DSettings.RESIZE_RATIO, wall_height / 2, (from.y + to.y) / 2 * V3DSettings.RESIZE_RATIO);
        var angle = Math.atan2(v.y, v.x);
        wall.rotateY(-angle);
        wall.castShadow = true;
        wall.data = {
            from: from,
            to: to
        };
        walls.push(wall);
        floorGroup.add(wall);
        if (isFromAreaShape) {
            var jointgeometry = new THREE.BoxGeometry(wall_depth * 1.2, wall_height, wall_depth * 1.2);
            var joint = new THREE.Mesh(jointgeometry, material);
            //joint.scale.set(wall_depth * 1.2, wall_height, wall_depth *1.2);
            joint.position.set(to.x * V3DSettings.RESIZE_RATIO, wall_height / 2, to.y * V3DSettings.RESIZE_RATIO);
            floorGroup.add(joint);
        }
    }


    function showWall(wall_segments) {
        if (wall_segments)
            for (var idx = 0; idx < wall_segments.length; idx++) {
                var seg = wall_segments[idx];
                for (var i = 0; i < seg.length - 1; i++) {
                    var from = seg[i],
                        to = seg[i + 1];
                    showWallsegment(from, to);
                }
            }
    }


    function intersectObjects(pointer, objects) {
        var v = calculateMouse(pointer, renderer.domElement);
        raycaster.setFromCamera(v, camera);
        var intersections = raycaster.intersectObjects(objects, true);
        return intersections[0] ? intersections[0] : false;
    }

    function loadFloorData(floorId) {
        //first get floor shape
        loadData(SERVICE.GetFloorShape, {id: floorId},
            function (result) {
                if (result) {
                    scope.floorId = floorId;
                    scope.floorShapedata = JSON.parse(result);

                    initLoadingResource(floorId);

                    //2 get floor device
                    loadData(SERVICE.GetFloorMount, {id: floorId},
                        function (result) {
                            if (result) {
                                floorMontData = result;
                                initLoadingModels(result.models);
                                //initLoadingModels(result.models)

                            }
                        }
                    );
                }
                else {
                    //no floor define to show msg
                    //alert();
                    scope.floorShapedata = null;
                    showAlert(AlertType.Warning, "您还没有定义机房，请先定义机房形状");
                    scope.dispatchEvent({type: V3DEventType.FLOOR_NOT_DEFINED});
                }
            }
        );
    }


    scope.loadFloor = function (floorId) {
        scope.floorId = floorId;
        //clear floor
        clearFloor();
        loadFloorData(floorId);
    };

    scope.loadFloorShape = function (data, floorId) {
        scope.floorShapedata = data;
        showShape(data.shape);
        showWall(data.wall_segments);
    };


    scope.showAssetLabel = function () {
        $.each(placeNodes, function (idx, node) {
            node.showAssetLabel();
        })
    };


    scope.hideAssetLabel = function () {
        $.each(placeNodes, function (idx, node) {
            node.hideText();
        })
    };

    scope.showRackCapacity = function () {
        loadData(SERVICE.GetFloorRackCapacity, {id: scope.floorId}, function (data) {
            $.each(data, function (idx, node) {
                var pnode = getPnodeByDeviceId(node.rack_id);
                pnode.showRackCapacity(node.total_subU);
            })
        });
    };


    scope.hideRackCapacity = function () {
        $.each(placeNodes, function (idx, node) {
            node.hideRackCapacity();
        })
    };

    scope.defineAutoWalk = function () {
        controls.enabled = false;

        var box = new THREE.Box3().setFromObject(floor);
        var size = box.getSize();
        var max = size.x > size.z ? size.x : size.z;
        var offset = 0.8;
        var camera_y = (max / 2 / offset) * 2;
        camera.position.set(0, camera_y, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        pa.active(camera, renderer.domElement, floor);
    };

    scope.saveAutoWalk = function () {
        pa.deactive();

    };


    var aw = new AutoWalkHelper(camera, controls);
    scope.startAutoWalk = function () {
        pa.deactive();
        aw.startWalk(pa.getData());
    };


    scope.stopAutoWalk = function () {
        controls.enabled = true;
        aw.stopWalk();
    };

    scope.openDoor = function (deviceId) {
        var pnode = getPnodeByDeviceId(deviceId);
        if (pnode)
            pnode.openDoor();

    };


    scope.closeDoor = function (deviceId) {
        var pnode = getPnodeByDeviceId(deviceId);
        if (pnode)
            pnode.closeDoor();

    };


    scope.openWindow = function (deviceId) {
        var pnode = getPnodeByDeviceId(deviceId);
        if (pnode)
            pnode.openWindow();
    };


    scope.closeWindow = function (deviceId) {
        var pnode = getPnodeByDeviceId(deviceId);
        if (pnode)
            pnode.closeWindow();
    };


    scope.checkDropPosition = function (event) {
        if (scope.canEdit)
            return intersectObjects(event, [floor]);
        else
            return false;
    };

    scope.addDevice = function (data, event) {
        var intersect = intersectObjects(event, [floor]);
        if (intersect) {
            var location = {position: {x: intersect.point.x, y: 0, z: intersect.point.z}};
            scope.mountPlaceNode(data.device_id, location);

        }
    };


    function loadDevices(pnodes) {
        $("#loadingContainer").hide();
        $.each(pnodes, function (idx, item) {
            scope.mountPlaceNode(item.device_id, JSON.parse(item.position), item);
        });
    }


    scope.flyToTargetDevice = function (device_id) {
        var target = scope.visualRoot.getObjectByName("device-" + device_id);
        if (target) {
            targetDeviceBox.update(target);
            targetDeviceBox.visible = true;
            var rect = getBound3D(target);
            var v = new THREE.Vector3().subVectors(defaultCameraPosition, rect.center);
            v.multiplyScalar(0.3);
            var to = new THREE.Vector3().addVectors(v, rect.center);

            var tweenPosition = new TWEEN.Tween(camera.position)
                .to(to, 1500)
                .easing(TWEEN.Easing.Cubic.Out)
                .onUpdate(function () {
                    camera.lookAt(target.position.x, target.position.y, target.position.z);
                    controls.target.set(target.position.x, target.position.y, target.position.z);
                    controls.update();
                })
                .start();
        }
    };

    scope.mountPlaceNode = function (device_id, location3d, rawData) {
        var pnode = getPnodeByDeviceId(device_id);
        var saveData = {
            action: "add",
            PlaceNode: {
                device_id: device_id,
                floor_id: scope.floorId,
                position: JSON.stringify(location3d)
            }
        };
        if (pnode) {
            pnode.updatePosition(location3d);
            saveData.action = "update";
            saveData.PlaceNode.id = pnode.rawData.id;
        }
        else {
            pnode = new PlaceNode(scope, V3DSettings.RESIZE_RATIO, dragObjects, font);
            pnode.loadModel(device_id, location3d, rawData);
            placeNodes.push(pnode);

        }

        if (!rawData) {
            //save after mont
            loadData(SERVICE.SavePlaceNode, saveData, function (newnode) {
                pnode.rawData = newnode;
            })
        }
        else
            pnode.rawData = rawData;

        if (pnode.deviceData && pnode.deviceData.category == 15) {
            makeHole(pnode);
        }

    };

    function clearFloor() {
        targetDeviceBox.visible = false;
        editor.detach();
        $.each(placeNodes, function (idx, item) {
            scope.visualRoot.remove(item.visualRoot);
        });
        scope.showHeatMap(false);
        placeNodes.splice(0, placeNodes.length);
        dragObjects.splice(0, dragObjects.length);
    };

    function getPnodeByDeviceId(device_id) {
        var result = null;
        $.each(placeNodes, function (idx, pnode) {
            if (pnode.rawData != null && pnode.rawData.device_id == device_id)
                result = pnode;
        });
        return result;
    }


};


V3D.FloorView.prototype = Object.create(THREE.EventDispatcher.prototype);
V3D.FloorView.prototype.constructor = V3D.FloorView;