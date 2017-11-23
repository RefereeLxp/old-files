/**
 * Created by hongxu.lin on 2/14/2017.
 */
PlaceNode = function ( parentExplorer , resizeRatio, dragObjects, font) {
    var scope = this;
    scope.visual3d = null;
    scope.label = null;
    scope.rawData = null;
    scope.visualRoot = new THREE.Group();
    scope.deviceData = null;
    scope.modelType = "";
    var sizeReal = null;
    var deviceVisual ;
    parentExplorer.visualRoot.add(scope.visualRoot);
    var highLightBox = null;


    scope.showHighLightt = function (color) {
        if (highLightBox) {
            scope.visualRoot.remove(highLightBox);
            highLightBox = null;
        }
        highLightBox = new THREE.BoxHelper(deviceVisual, color);
        scope.visualRoot.add(highLightBox);
    };

    scope.hideHighLightt = function () {
        if (highLightBox) {
            scope.visualRoot.remove(highLightBox);
            highLightBox = null;
        }
    };

    scope.updatePosition = function (location) {
        if (deviceVisual) {
            if (location && location.rotate)
                deviceVisual.rotation.set(location.rotate.x, location.rotate.y, location.rotate.z);
            
            if (location && location.position)
                deviceVisual.position.set(location.position.x, location.position.y, location.position.z);

            if(highLightBox)
                highLightBox.update(deviceVisual);
        }
    };

    function doLoadModel(deviceInfo,modelid,modelStorage,location) {
        if( CACHEDATA["Model:"+ modelid])
        {
            var object = CACHEDATA["Model:"+ modelid].clone();
            object.rotation.set(0,0,0);
            loadModel(object,deviceInfo,location);
        }
        else
        {
            var predefine = getPredefinedModel(deviceInfo,modelStorage);
            if(predefine)
            {
                CACHEDATA["Model:"+modelid] = predefine;
                loadModel(predefine,deviceInfo,location);
            }
            else
            {
                var mtlLoader = new THREE.MTLLoader();
                var objLoader = new THREE.OBJLoader();
                var model = JSON.parse(modelStorage);
                var mtl = getMtlPathName(model);
                var obj = getObjPath(model);
                if (mtl.length > 0) {
                    mtlLoader.setBaseUrl(mtl[0]);
                    mtlLoader.setPath(mtl[0]);
                    mtlLoader.load(mtl[1], function (materials) {
                        objLoader.setMaterials(materials);
                        objLoader.load(obj, function (object) {
                            CACHEDATA["Model:"+modelid] = object.clone();
                            loadModel(object,deviceInfo,location);
                        });
                    });
                }
            }
        }
    }

    scope.loadModel = function (device_id, location,pnodeInfo) {
        if(pnodeInfo)
        {
            scope.deviceData = pnodeInfo;
            doLoadModel(pnodeInfo,pnodeInfo.model_id,pnodeInfo.model_storage,location);
        }
        else 
        {
            loadData(SERVICE.GetDeviceDetails, {id: device_id}, function (result) {
                var data = result;
                scope.deviceData = data.device;
                doLoadModel(data.device,data.model.id,data.model.storage,location)
            });
        }
    };

    function loadModel(object,data,location) {
        sizeReal = {
            x: data.width * V3DSettings.RESIZE_RATIO,
            y: data.height * V3DSettings.RESIZE_RATIO,
            z: data.depth * V3DSettings.RESIZE_RATIO
        };
        scope.visual3d = object;
        dragObjects.push(object);
        var size = getSize(object);
        object.scale.set(
            sizeReal.x / size.x,
            sizeReal.y / size.y,
            sizeReal.z / size.z
        );
        object.data = data;
        casetShadow(object);
        object.name = "device-" + data.device_id;
        object.data.dragable = true;
        if (location && location.position)
            object.position.set(location.position.x, location.position.y, location.position.z);
        if (location && location.rotate)
            object.rotation.set(location.rotate.x, location.rotate.y, location.rotate.z, location.rotate.order);
        deviceVisual = object;
        scope.visualRoot.add(deviceVisual);
    }

    function casetShadow(object) {
        object.castShadow = true;
        $.each(object.children,function (idx,item) {
            item.castShadow = true;
        })
    }

    function getPredefinedModel(alldata,modelStorage) {
        var data = alldata;
        var model = JSON.parse(modelStorage);
        var mesh = null;
        if(model.type)
        {
            if(model.type == "door")
            {
                scope.modelType = "door";
                sizeReal = {
                    x: data.width * V3DSettings.RESIZE_RATIO,
                    y: data.height * V3DSettings.RESIZE_RATIO,
                    z: data.depth * V3DSettings.RESIZE_RATIO
                };
                var geometry = new THREE.BoxGeometry(sizeReal.x, sizeReal.y, sizeReal.z);
                var material = new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("images/rightdoor.jpg")});
                var door =  new THREE.Mesh(geometry, material);
                door.position.set(-sizeReal.x/2,sizeReal.y/2,0);
                mesh = new THREE.Group();
                mesh.add(door);
            }
            else if(model.type == "window")
            {
                scope.modelType = "window";
                sizeReal = {
                    x: data.width * V3DSettings.RESIZE_RATIO,
                    y: data.height * V3DSettings.RESIZE_RATIO,
                    z: data.depth * V3DSettings.RESIZE_RATIO
                };

                mesh = new THREE.Group();

                var geo = new THREE.BoxGeometry(sizeReal.x/2, sizeReal.y, sizeReal.z);
                var leftGeo = geo.clone();
                leftGeo.translate ( sizeReal.x/4,sizeReal.y/2, 0 );
                var leftpart =  new THREE.Mesh(
                    leftGeo,
                    new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("images/window-left.jpg"),transparent: true, opacity: 0.6})
                );
                leftpart.position.set(-sizeReal.x/2,0,0);
                mesh.add(leftpart);

                var rightGeo = geo.clone();
                rightGeo.translate ( -sizeReal.x/4, sizeReal.y/2, 0 );
                var righttpart =  new THREE.Mesh(
                    rightGeo,
                new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("images/window-right.jpg"),transparent: true, opacity: 0.6})
                );
                righttpart.position.set(sizeReal.x/2,0,0);
                mesh.add(righttpart);
            }


        }
        return mesh;
    }
    var status = "closed";
     scope.openDoor=function() {
         if(status =="closed")
        tweenRotate= new TWEEN.Tween( deviceVisual.rotation )
            .to( {x:deviceVisual.rotation.x,y:deviceVisual.rotation.y + Math.PI/1.5,z:deviceVisual.rotation.z} , 1000)
            .onComplete(function () {
                status = "opened"
            })
            .start();
    };

     scope.closeDoor=function() {
         if(status =="opened")
        tweenRotate= new TWEEN.Tween( deviceVisual.rotation )
            .to( {x:deviceVisual.rotation.x,y:deviceVisual.rotation.y - Math.PI/1.5,z:deviceVisual.rotation.z} , 1000)
            .onComplete(function () {
                status = "closed"
            })
            .start();
    };

    scope.openWindow=function() {
        if(status =="closed")
        {
            var left = deviceVisual.children[0];
            var right = deviceVisual.children[1];
            tweenleft= new TWEEN.Tween( left.rotation )
                .to( {x:0,y:- Math.PI/1.5,z:0} , 1000)
                .start();
            tweenright= new TWEEN.Tween( right.rotation )
                .to( {x:0,y:Math.PI/1.5,z:0} , 1000)
                .start();
            status = "opened"
        }

    };

    scope.closeWindow=function() {
        if(status =="opened")
            var left = deviceVisual.children[0];
        var right = deviceVisual.children[1];
        tweenleft= new TWEEN.Tween( left.rotation )
            .to( {x:0,y:  0,z:0} , 1000)
            .start();
        tweenright= new TWEEN.Tween( right.rotation )
            .to( {x:0,y: 0,z:0} , 1000)
            .start();
        status = "closed"
    };


    function getObjPath(data) {
        var r = null;
        $.each(data.files, function (idx, item) {
            var index1 = item.lastIndexOf(".");
            var index2 = item.length;
            var suffix = item.substring(index1 + 1, index2);
            if (suffix.toLowerCase() == "obj") {
                r = item;
            }
        });
        return r;
    }

    function getMtlPathName(data) {
        var r = [];
        $.each(data.files, function (idx, item) {
            var index1 = item.lastIndexOf(".");
            var index2 = item.length;
            var suffix = item.substring(index1 + 1, index2);
            if (suffix.toLowerCase() == "mtl") {
                var path = item.substr(0, item.lastIndexOf("/") + 1);
                var name = item.substr(item.lastIndexOf("/") + 1);
                r.push(path, name);
            }
        });
        return r;
    }


    function getSize(object3D) {
        var box = new THREE.Box3().setFromObject(object3D);
        return {x: (box.max.x - box.min.x), y: box.max.y - box.min.y, z: box.max.z - box.min.z};
    }

    scope.showText = function (text,color) {
        scope.hideText();
        createLabel(text,color) ;
        scope.label.visible = true;
    }

    scope.showAssetLabel = function ()  {
        scope.showText(scope.deviceData.device_name,'#2891FF');
    };

    scope.hideText = function () {
        if (scope.label)
            scope.label.visible = false;
        scope.visualRoot.remove(scope.label);
    };



    scope.showRackCapacity = function (totalSubU) {
        deviceVisual.children[0].material.transparent = true;
        deviceVisual.children[0].material.opacity = 0.1;
        var full = totalSubU / (parseInt(scope.deviceData.u_size) * 3) ;

        var color = 'green';
        if (full > 0.7 || full == 0.7)
            color = 'red';
        else if (full > 0.2 && full < 0.7)
        {
            color = 'yellow'
        }

        var height = sizeReal.y;

        var cubeGeometry = new THREE.BoxGeometry(sizeReal.x * 1.05 , 1, sizeReal.z *1);
        var cubeMesh = new THREE.Mesh(cubeGeometry, new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 }));
        cubeMesh.position.set(deviceVisual.position.x, deviceVisual.position.y ,deviceVisual.position.z);
        cubeMesh.name = "capacity-Mesh-"+scope.deviceData.device_id;
        scope.visualRoot.add(cubeMesh);

        var tweenScale = new TWEEN.Tween(cubeMesh.scale)
            .to({ x: 1, y: height * full, z: 1 }, 1500)
            .easing(TWEEN.Easing.Back.Out)
            .start();

        var tweenPosition = new TWEEN.Tween(cubeMesh.position)
            .to({ x: cubeMesh.position.x, y: deviceVisual.position.y + height * full / 2, z: cubeMesh.position.z }, 1500)
            .easing(TWEEN.Easing.Back.Out)
            .start();
    };


    scope.hideRackCapacity = function () {
        var mesh =scope.visualRoot.getObjectByName("capacity-Mesh-"+scope.deviceData.device_id);
        if(mesh)
        {
            scope.visualRoot.remove(mesh);
            deviceVisual.children[0].material.transparent = false;
            deviceVisual.children[0].material.opacity = 1;
        }

    };

    scope.save = function () {
        var saveData = {
            action: "update",
            PlaceNode: {
                id :scope.rawData.id,
                device_id: scope.rawData.device_id,
                floor_id: scope.rawData.floorId,
                position: JSON.stringify({
                    position:deviceVisual.position,
                    rotate: {
                        x: deviceVisual.rotation.x,
                        y: deviceVisual.rotation.y,
                        z: deviceVisual.rotation.z
                    }
                })
            }
        };
        loadData(SERVICE.SavePlaceNode, saveData, function (newnode) {
            scope.rawData = newnode;
        })
    };





    function createLabel(text,color) {
        var offsetHeight = 0.2;
        var textGeo = new THREE.TextGeometry(text, {
            font: font,
            size: 2,
            height: 0.3
        });
        textGeo.computeBoundingBox();
        var bound = textGeo.boundingBox.getSize();
        var mesh = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial({color: color,}));
        var scale = sizeReal.x * 0.8 / bound.x;
        var x = deviceVisual.position.x - sizeReal.x * 0.8 / 2,
            y = deviceVisual.position.y + sizeReal.y + offsetHeight,
            z = deviceVisual.position.z;
        mesh.scale.set(scale, scale, 1);
        mesh.position.set(x, y, z);
        scope.label = mesh;
        scope.visualRoot.add(mesh);
    }



};