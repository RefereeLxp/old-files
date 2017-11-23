/**
 * Created by hongxu.lin on 2/24/2017.
 */
/**
 * Created by hongxu.lin on 2/16/2017.
 */
V3D.RackDetail = function (rackData, camera, domElement) {
    var scope = this;
    var montspaces = [];
    var raycaster = new THREE.Raycaster();
    var rack_width = 0.6 * V3DSettings.RESIZE_RATIO;
    var rack_depth = 0.8 * V3DSettings.RESIZE_RATIO;
    var rackUNumber = 42;
    var uHeight = 0.0445 * V3DSettings.RESIZE_RATIO;
    var subUHeight = uHeight / 3;
    var rack_height = rackUNumber * uHeight;
    var rackSlotWidth = 0.07 * V3DSettings.RESIZE_RATIO;
    var rackSlotDepth = 0.02 * V3DSettings.RESIZE_RATIO;
    var subUFront = [];
    var rack = new THREE.Group();
    var devices = [];
    var boxHelper = new THREE.BoxHelper(camera, 0xff0000);
    var _selected;
    var _hovered = null;
    var delteDevice = null;
    var rackId = null;


    scope.visualRoot = rack;

    var darkmaterial = new THREE.MeshPhongMaterial({
        color: 0x707070,
        side: THREE.DoubleSide,
    });
    var lightmaterial = new THREE.MeshPhongMaterial({
        color: 0xB6B6B6,
        side: THREE.DoubleSide,
    });

    var highlight = new THREE.MeshPhongMaterial({
        color: 0xFFB000,
        side: THREE.DoubleSide,
    });


    scope.dispose = scope.deactiveDrag;

    scope.active = function () {
        domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        domElement.addEventListener('mouseup', onDocumentMouseUp, false);
        domElement.addEventListener('mouseout', onDocumentMouseUp, false);
    };

    scope.deactive = function () {
        domElement.removeEventListener('mousemove', onDocumentMouseMove, false);
        domElement.removeEventListener('mousedown', onDocumentMouseDown, false);
        domElement.removeEventListener('mouseup', onDocumentMouseUp, false);
        domElement.removeEventListener('mouseout', onDocumentMouseUp, false);
    };

    scope.active();


    function onDocumentMouseMove(event) {

        event.preventDefault();
        if (_selected) {
            var usize = _selected.data.sub_usize / 3 + (_selected.data.sub_usize % 3) * 0.1;
            scope.checkDropPosition(event, {uSize: usize});
        }
        else {
            var intersect = intersectObjects(event, rack.children);
            if (intersect && intersect.object.data && intersect.object.data.type == "device") {
                if (_hovered !== intersect.object) {
                    _hovered = intersect.object;
                    scope.dispatchEvent({type: 'hoveron', object: intersect.object});
                    domElement.style.cursor = 'pointer';
                }
            } else {
                if (_hovered !== null) {
                    _hovered = null;
                }
                scope.dispatchEvent({type: 'hoveroff', object: _hovered});
                domElement.style.cursor = 'auto';

            }
        }

    }


    function toSubUidx(usize) {
        return (parseInt(usize) - 1) * 3 + (usize - parseInt(usize)).toFixed(1) * 10

    }

    function onDocumentMouseDown(event) {

        event.preventDefault();
        var interset = intersectObjects(event, devices)
        if (interset) {
            _selected = interset.object;
            var check = isData(_selected, "dragable", true)
            if (check.result) {
                _selected = check.root;
            }

            var subUidx = toSubUidx(_selected.data.mount_at);
            var usize = _selected.data.sub_usize / 3 + (_selected.data.sub_usize % 3) * 0.1;
            removeMount(subUidx, usize);

            if (event.shiftKey) {
                //shift to delete
                delteDevice = _selected;
                _selected = null;
                hideBox();
                showConfirm("确定要从机柜上下架此设备？", confirmDelete);
            }
            else {
                updateBox(_selected);
                domElement.style.cursor = 'move';
                scope.dispatchEvent({type: 'dragstart', object: _selected});
            }

        }
    }

    function confirmDelete() {
        layer.closeAll();
        deleteRackMountDevice(delteDevice);
        scope.dispatchEvent({type: 'dragend', object: delteDevice});
        rack.remove(delteDevice);
        delteDevice = null;
    }

    function onDocumentMouseUp(event) {

        event.preventDefault();
        if (_selected) {
            clearDragObject();
            var usize = _selected.data.sub_usize / 3 + (_selected.data.sub_usize % 3) * 0.1;
            scope.mount(event, {uSize: usize, device_id: _selected.data.device_id}, true);
            updateBox(_selected);
            scope.dispatchEvent({type: 'dragend', object: _selected});
            _selected = null;
        }
        domElement.style.cursor = 'auto';

    }

    function updateBox(object) {
        boxHelper.update(object);
        boxHelper.visible = false;
    }

    function hideBox() {
        boxHelper.visible = false;
    }

    initRack(rackData);

    function initRack(data) {

        rack.add(boxHelper);

        if (data && data.u_size != null)
            rackUNumber = data.u_size;

        getRackSlotParts(rack);
        getRackCovers(rack)

        var frontMontSpace = getMontSpace();
        frontMontSpace.position.z = rack_depth / 2;
        rack.add(frontMontSpace);


        var backMontSpace = getMontSpace();
        backMontSpace.position.z = -rack_depth / 2;
        rack.add(backMontSpace);

        montspaces.splice(0, montspaces.length);
        montspaces.push(frontMontSpace);
        montspaces.push(backMontSpace);

        rack.castShadow = true;

        loadRackMountDetails();

        return rack;
    }

    function getRackCovers(rackGroup) {

        var geometry = new THREE.Geometry();
        var parms = [
            {
                x: rack_width,
                y: rack_depth,
                rotate: {x: -Math.PI / 2, y: 0, z: 0},
                translate: {x: 0, y: rack_height - 0.01, z: 0}
            },
            {x: rack_width, y: rack_depth, rotate: {x: -Math.PI / 2, y: 0, z: 0}, translate: {x: 0, y: 0.01, z: 0}},
            {
                x: rack_depth,
                y: rack_height,
                rotate: {x: 0, y: -Math.PI / 2, z: 0},
                translate: {x: -rack_width / 2 + 0.01, y: rack_height / 2, z: 0}
            },
            {
                x: rack_depth,
                y: rack_height,
                rotate: {x: 0, y: -Math.PI / 2, z: 0},
                translate: {x: rack_width / 2 - 0.01, y: rack_height / 2, z: 0}
            }
        ];

        for (var i = 0; i < parms.length; i++) {
            var parm = parms[i];
            var geo = new THREE.PlaneGeometry(parm.x,parm.y);
            geo.rotateX(parm.rotate.x);
            geo.rotateY(parm.rotate.y);
            geo.rotateZ(parm.rotate.z);
            geo.translate(parm.translate.x, parm.translate.y, parm.translate.z);
            geometry.merge(geo);
        }

        var m = new THREE.MeshPhongMaterial({
            color: 0x3D3D3D,
            side: THREE.DoubleSide,
            emissive: 0x000000,
            specular: 0x111111,
            shininess: 100
        });
        var toparea = new THREE.Mesh(geometry, m);
        toparea.castShadow = true;

        rack.add(toparea);
    }

    function getRackSlotParts(rackGroup) {
        var parts = [
            {x: -1, z: 1, totateX: 0, totateZ: 0, roateLabel: 0},
            {x: 1, z: 1, totateX: 0, totateZ: -Math.PI, roateLabel: 0},
            {x: -1, z: -1, totateX: Math.PI, totateZ: 0, roateLabel: -Math.PI},
            {x: 1, z: -1, totateX: Math.PI, totateZ: -Math.PI, roateLabel: -Math.PI}
        ];
        var part = getRackPart();
        var uidxLabels = getUsizeTextGroup();

        var labelOffset = 0.15;
        for (var i = 0; i < parts.length; i++) {
            var parm = parts[i];
            var labels = uidxLabels.clone();
            labels.position.x = parm.x * rack_width / 2 - parm.x * (rackSlotWidth / 2 - rackSlotDepth / 2);
            labels.position.z = parm.z * rack_depth / 2 + parm.z * labelOffset;
            labels.rotateY(parm.roateLabel);
            rackGroup.add(labels);

            var p = part.clone();
            p.position.x = parm.x * rack_width / 2;
            p.position.z = parm.z * rack_depth / 2;
            p.rotateX(parm.totateX);
            p.rotateZ(parm.totateZ);
            rackGroup.add(p);
        }
    }


    function getRackPart() {
        var g1 = new THREE.BoxGeometry(rackSlotWidth, rack_height, rackSlotDepth);

        var g2 = g1.clone();
        g2.rotateY(-Math.PI / 2);
        g2.translate(0, 0, -rackSlotWidth / 2)

        g1.translate(rackSlotWidth / 2 - rackSlotDepth / 2, 0, 0)
        g1.merge(g2);

        var material = new THREE.MeshPhongMaterial({color: 0x3D3D3D});
        var mesh = new THREE.Mesh(g1, material);
        mesh.position.y = rack_height / 2;
        return mesh;
    }


    function getUsizeTextGroup() {
        var group = new THREE.Group();
        var w = 0.07 * V3DSettings.RESIZE_RATIO;
        for (var i = 1; i < parseInt(rackUNumber) + 1; i++) {
            var texture = new THREE.CanvasTexture(getTextCanvas(i));
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            var geometry = new THREE.PlaneGeometry(w, uHeight, 0.01);
            var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
            var plane = new THREE.Mesh(geometry, material);

            var y = (i - 1) * uHeight + uHeight / 2;
            plane.position.set(0, y, 0);
            group.add(plane);
        }
        return group;
    }


    function getTextCanvas(text) {
        var width = 64, height = 64;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext('2d');

        ctx.font = 48 + 'px " bold';
        ctx.fillStyle = '#eee';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
        return canvas;
    }


    function getMontSpace() {
        var group = new THREE.Group();
        var geo = new THREE.PlaneGeometry(rack_width, subUHeight);
        for (var i = 0; i < rackUNumber; i++) {
            var m = i % 2 == 0 ? darkmaterial : lightmaterial;
            for (var j = 0; j < 3; j++) {
                var subU = new THREE.Mesh(geo, m);
                subU.position.y = i * uHeight + j * subUHeight + subUHeight / 2;
                subU.name = (i + 1) + "." + j + "U";
                subU.data = {uposition: (i + 1) + "." + j, material: i % 2 == 0 ? "dark" : "light"};
                group.add(subU);
            }
        }
        return group;
    }

    function loadRackMountDetails() {
        loadData(SERVICE.GetRackMount, {id: rackData.device_id}, function (result) {
            $.each(result, function (idx, item) {
                initMountDevice(item);
            })
        });
    }

    function intersectObjects(pointer, objects) {
        var v = calculateMouse(pointer, domElement);
        raycaster.setFromCamera(v, camera);
        var intersections = raycaster.intersectObjects(objects, true);
        // if (intersections[0])
        //     console.log(intersections[0].object.name);
        return intersections[0] ? intersections[0] : false;
    }

    function drawDragObject(totalSubUsize, object) {
        clearDragObject();
        var idx = montspaces[0].children.indexOf(object);
        for (var i = 0; i < totalSubUsize; i++) {
            montspaces[0].children[idx + i].material = highlight;
        }
    }

    function clearDragObject() {
        for (var i = 0; i < montspaces[0].children.length; i++) {
            var current = montspaces[0].children[i];
            var c = current.data.material;
            if (c == "dark")
                current.material = darkmaterial;
            else
                current.material = lightmaterial;
        }
    }

    scope.clearMountDraw = clearDragObject;

    scope.checkDropPosition = function (event, data) {
        var result = intersectObjects(event, montspaces);
        if (result) {
            var usize = data.uSize;
            var total = parseInt(usize) * 3 + (usize - parseInt(usize)) * 10;
            var idx = montspaces[0].children.indexOf(result.object);
            var checkMount = TestMount(result.object, usize);
            if (checkMount)
                drawDragObject(total, result.object);
            else
                result = false;
        }
        else {
            clearDragObject();
        }
        return result;
    };


    scope.mount = function (event, data, isMove) {
        var usize = data.uSize;
        var result = intersectObjects(event, montspaces);
        if (result && TestMount(result.object, usize)) {
            var total = parseInt(usize) * 3 + (usize - parseInt(usize)) * 10;
            var targetMount = result.object;
            var saveData = {
                RackMount: {
                    rack_id: rackData.device_id,
                    device_id: data.device_id,
                    mount_at: targetMount.data.uposition,
                    sub_usize: total
                },
                action: isMove ? "update" : 'add'
            };
            save(saveData);

            initMountDevice(saveData.RackMount, isMove);

        }
    };


    function deleteRackMountDevice(object) {
        var saveData = {
            action: 'delete',
            device_id: object.data.device_id,
        };
        save(saveData);
    }


    function save(data) {
        loadData(SERVICE.SaveRackMount, data)
    }

    function initMountDevice(data, isMove) {
        var usize = data.sub_usize / 3 + (data.sub_usize % 3) * 0.1;
        var subUidx = toSubUidx(data.mount_at);
        var targetMount = montspaces[0].children[subUidx];

        var target = getDeviceById(data.device_id);
        if (target) {
            //drag from list to rack bug already on rack
            removeItemMount(target)
            target.position.y = targetMount.position.y - subUHeight / 2;
            target.data.mount_at = data.mount_at;
        }
        else {
            if (isMove) {
                _selected.position.y = targetMount.position.y - subUHeight / 2;
                _selected.data.mount_at = data.mount_at;
            }
            else {

                loadData(SERVICE.GetDeviceDetails, {id: data.device_id}, function (result) {
                    var sizeData = result.device;
                    var mtlLoader = new THREE.MTLLoader();
                    var objLoader = new THREE.OBJLoader();
                    var sizeReal = {
                        x: sizeData.width * V3DSettings.RESIZE_RATIO,
                        y: sizeData.height * V3DSettings.RESIZE_RATIO,
                        z: sizeData.depth * V3DSettings.RESIZE_RATIO
                    };

                    var model = JSON.parse(result.model.storage);
                    var mtl = getMtlPathName(model);
                    var obj = getObjPath(model);
                    if (mtl.length > 0) {
                        mtlLoader.setBaseUrl(mtl[0]);
                        mtlLoader.setPath(mtl[0]);
                        mtlLoader.load(mtl[1], function (materials) {
                            objLoader.setMaterials(materials);
                            objLoader.load(obj, function (object) {
                                var size = getBound3D(object);
                                object.scale.set(
                                    sizeReal.x / size.width,
                                    sizeReal.y / size.height,
                                    sizeReal.z / size.depth
                                );
                                object.position.y = targetMount.position.y - subUHeight / 2;
                                object.position.z = 0.1;
                                object.data = data;
                                object.data.dragable = true;
                                object.data.type = "device";
                                object.name = "device:" + data.device_id;
                                rack.add(object);
                                devices.push(object);
                            });
                        });
                    }
                });
            }
        }
        setMounted(subUidx, usize);
    }

    function getDeviceById(deviceId) {
        var result = null;
        $.each(devices, function (idx, item) {
            if (item.data.device_id == deviceId)
                result = item;
        });
        return result;
    }

    function TestMount(item, usize) {
        var result = true;
        var start = montspaces[0].children.indexOf(item);
        var total = parseInt(usize) * 3 + (usize - parseInt(usize)) * 10;
        if ((start + total) > (montspaces[0].children.length)) result = false;
        else
            for (var i = 0; i < total; i++) {
                var data = montspaces[0].children[start + i].data;
                if (data && data.occupied) {
                    result = false;
                    break;
                }
            }
        return result;
    }


    function setMounted(idx, usize) {
        var total = parseInt(usize) * 3 + (usize - parseInt(usize)) * 10;
        for (var i = 0; i < total; i++) {
            setMountItemOccupied(montspaces[0].children[idx + i], true);
        }
    }

    function removeMount(idx, usize) {
        var total = parseInt(usize) * 3 + (usize - parseInt(usize)) * 10;
        for (var i = 0; i < total; i++) {
            setMountItemOccupied(montspaces[0].children[idx + i], false);
        }
    }

    function removeItemMount(item) {
        var subUidx = toSubUidx(item.data.mount_at);
        var usize = item.data.sub_usize / 3 + (item.data.sub_usize % 3) * 0.1;
        removeMount(subUidx, usize);
    }

    function setMountItemOccupied(item, flag) {
        if (!item.data) item.data = {};
        item.data.occupied = flag;
    }


};

V3D.RackDetail.prototype = Object.create(THREE.EventDispatcher.prototype);
V3D.RackDetail.prototype.constructor = V3D.RackDetail;