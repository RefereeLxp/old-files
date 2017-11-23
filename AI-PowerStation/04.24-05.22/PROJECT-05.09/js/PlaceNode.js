/**
 * Created by hongxu.lin on 2/14/2017.
 */
PlaceNode = function (parentExplorer, resizeRatio, dragObjects, font) {
    var scope = this;
    scope.visual3d = null;
    scope.label = null;
    scope.rawData = null;
    scope.visualRoot = new THREE.Group();
    scope.deviceData = null;
    scope.modelType = "";
    var sizeReal = null;
    var deviceVisual;
    parentExplorer.visualRoot.add(scope.visualRoot);
    var highLightBox = null;


    scope.updatePosition = function (location) {
        if (deviceVisual) {
            if (location && location.rotate)
                deviceVisual.rotation.set(location.rotate.x, location.rotate.y, location.rotate.z);

            if (location && location.position)
                deviceVisual.position.set(location.position.x, location.position.y, location.position.z);

            if (highLightBox)
                highLightBox.update(deviceVisual);
        }
    };

    function doLoadModel(deviceInfo, modelid, modelStorage, location) {
        var isPredefined = isPredefinedModel(modelStorage);
        if (CACHEDATA["Model:" + modelid] && isPredefined != "cable") {
            var object = CACHEDATA["Model:" + modelid].clone();
            object.rotation.set(0, 0, 0);
            loadModel(object, deviceInfo, location, modelStorage);
        }
        else {
            var predefine = getPredefinedModel(deviceInfo, modelStorage);
            if (predefine) {
                if(isPredefined != "cable")
                {
                    CACHEDATA["Model:" + modelid] = predefine;
                }
                loadModel(predefine, deviceInfo, location, modelStorage);
            }
            else {
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
                            CACHEDATA["Model:" + modelid] = object.clone();
                            loadModel(object, deviceInfo, location, modelStorage);
                        });
                    });
                }
            }
        }
    }

    scope.loadModel = function (device_id, location, pnodeInfo) {
        if (pnodeInfo) {
            scope.deviceData = pnodeInfo;
            doLoadModel(pnodeInfo, pnodeInfo.model_id, pnodeInfo.model_storage, location);
        }
        else {
            loadData(SERVICE.GetDeviceDetails, {id: device_id}, function (result) {
                var data = result;
                scope.deviceData = data.device;
                doLoadModel(data.device, data.model.id, data.model.storage, location)
            });
        }
    };

    function loadModel(object, data, location, model_storage) {

        var data = data;
        var model = JSON.parse(model_storage);
        if (model.type) {
            scope.modelType = model.type;
        }


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
        $.each(object.children, function (idx, item) {
            item.castShadow = true;
        })
    }

    function getPredefinedModel(alldata, modelStorage) {
        var data = alldata;
        var model = JSON.parse(modelStorage);
        var mesh = null;
        if (model.type) {
            scope.modelType = model.type;
            if (model.type == "door") {
                sizeReal = {
                    x: data.width * V3DSettings.RESIZE_RATIO,
                    y: data.height * V3DSettings.RESIZE_RATIO,
                    z: data.depth * V3DSettings.RESIZE_RATIO
                };
                var geometry = new THREE.BoxGeometry(sizeReal.x, sizeReal.y, sizeReal.z);
                var material = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load("images/rightdoor.jpg")});
                var door = new THREE.Mesh(geometry, material);
                door.position.set(-sizeReal.x / 2, sizeReal.y / 2, 0);
                mesh = new THREE.Group();
                mesh.add(door);
            }
            else if (model.type == "window") {
                sizeReal = {
                    x: data.width * V3DSettings.RESIZE_RATIO,
                    y: data.height * V3DSettings.RESIZE_RATIO,
                    z: data.depth * V3DSettings.RESIZE_RATIO
                };

                mesh = new THREE.Group();

                var geo = new THREE.BoxGeometry(sizeReal.x / 2, sizeReal.y, sizeReal.z);
                var leftGeo = geo.clone();
                leftGeo.translate(sizeReal.x / 4, sizeReal.y / 2, 0);
                var leftpart = new THREE.Mesh(
                    leftGeo,
                    new THREE.MeshLambertMaterial({
                        map: new THREE.TextureLoader().load("images/window-left.jpg"),
                        transparent: true,
                        opacity: 0.6
                    })
                );
                leftpart.position.set(-sizeReal.x / 2, 0, 0);
                mesh.add(leftpart);

                var rightGeo = geo.clone();
                rightGeo.translate(-sizeReal.x / 4, sizeReal.y / 2, 0);
                var righttpart = new THREE.Mesh(
                    rightGeo,
                    new THREE.MeshLambertMaterial({
                        map: new THREE.TextureLoader().load("images/window-right.jpg"),
                        transparent: true,
                        opacity: 0.6
                    })
                );
                righttpart.position.set(sizeReal.x / 2, 0, 0);
                mesh.add(righttpart);
            }
            else if(model.type == "cable")
            {
                sizeReal = {
                    x: data.width * V3DSettings.RESIZE_RATIO,
                    y: data.height * V3DSettings.RESIZE_RATIO,
                    z: data.depth * V3DSettings.RESIZE_RATIO
                };

                var geometry = new THREE.CylinderGeometry(sizeReal.y ,  sizeReal.z ,sizeReal.x, 32,1,true );
                geometry.rotateX ( Math.PI / 2 );
                geometry.rotateY ( Math.PI / 2 );

                var texture = new THREE.TextureLoader().load("images/cable_green.jpg");
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(sizeReal.x/10, sizeReal.x/10);
                var material = new THREE.MeshPhongMaterial( {map:texture ,side:THREE.DoubleSide} );
                mesh = new THREE.Mesh(geometry, material);

            }


        }
        return mesh;
    }



    scope.showWaterLeak = function (flag) {
        if(flag)
        {
            var texture = new THREE.TextureLoader().load("images/cable_red.jpg");
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(sizeReal.x/10, sizeReal.x/10);
                var material = new THREE.MeshPhongMaterial( {map:texture ,side:THREE.DoubleSide} );
                deviceVisual.material = material;

            var mtlLoader = new THREE.MTLLoader();
            var objLoader = new THREE.OBJLoader();

                mtlLoader.setBaseUrl("models/water/");
                mtlLoader.setPath("models/water/");
                mtlLoader.load("s.mtl", function (materials) {
                    objLoader.setMaterials(materials);
                    objLoader.load("models/water/s.obj", function (object) {
                        object.position.set(deviceVisual.position.x, deviceVisual.position.y /2, deviceVisual.position.z);
                        object.scale.set(5, 1, 5);
                        object.name = "water"+ scope.deviceData.device_id;
                        scope.visualRoot.add(object);
                    });
                });


        }
        else
        {
            var texture = new THREE.TextureLoader().load("images/cable_green.jpg");
            texture.repeat.set(sizeReal.x/10, sizeReal.x/10);
            var material = new THREE.MeshPhongMaterial( {map:texture ,side:THREE.DoubleSide} );
            deviceVisual.material = material;


            var mesh = scope.visualRoot.getObjectByName("water" + scope.deviceData.device_id);
            if (mesh) {
                scope.visualRoot.remove(mesh);
            }
        }

    };



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


    scope.showInfrared = function () {

        var height = deviceVisual.position.y;
        var geometry = new THREE.CylinderGeometry(1, 10, height, 64);
        var material = new THREE.MeshBasicMaterial({color: 'red', transparent: true, opacity: 0.4});
        var cylinder = new THREE.Mesh(geometry, material);
        cylinder.name = "Infrared" + scope.deviceData.device_id;
        cylinder.position.set(deviceVisual.position.x, deviceVisual.position.y / 2, deviceVisual.position.z);
        scope.visualRoot.add(cylinder);
    };


    scope.hideInfrared = function () {
        var mesh = scope.visualRoot.getObjectByName("Infrared" + scope.deviceData.device_id);
        if (mesh) {
            scope.visualRoot.remove(mesh);
        }
    };


    function addPerson(object) {
        var size = getSize(object);
        object.scale.set(
            0.6 * V3DSettings.RESIZE_RATIO / size.x,
            1 * V3DSettings.RESIZE_RATIO / size.y,
            0.2 * V3DSettings.RESIZE_RATIO / size.z
        );
        object.name = "person-" + +scope.deviceData.device_id;
        object.position.set(deviceVisual.position.x, 0, deviceVisual.position.z);
        scope.visualRoot.add(object);
    }

    scope.showLight = function () {


        var height = deviceVisual.position.y;
        var geometry = new THREE.CylinderGeometry(1, 30, height, 64);
        var material = new THREE.MeshBasicMaterial({color: '#FDFFED', transparent: true, opacity: 0.4});
        var cylinder = new THREE.Mesh(geometry, material);
        cylinder.name = "light-" + scope.deviceData.device_id;
        cylinder.position.set(deviceVisual.position.x, deviceVisual.position.y / 2 + 0.5, deviceVisual.position.z);
        scope.visualRoot.add(cylinder);


        // var light = new THREE.PointLight( 0xffffff,4 ,80 ,2 );
        // var size = getSize(deviceVisual);
        // light.position.set(deviceVisual.position.x,deviceVisual.position.y -size.y/2,deviceVisual.position.z);
        // light.name = "light-"+scope.deviceData.device_id;
        // scene.add(light);

        deviceVisual.children[0].material = new THREE.MeshBasicMaterial({
            color: '#fce72a',
            transparent: true,
            opacity: 0.9
        });

        // var lightPointHelper = new THREE.PointLightHelper(light);
        // scene.add(lightPointHelper);
    };

    scope.hideLight = function () {
        var light = scope.visualRoot.getObjectByName("light-" + scope.deviceData.device_id);
        if (light) {
            scope.visualRoot.remove(light);
        }
        deviceVisual.children[0].material = new THREE.MeshPhongMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.8
        });
    };


    scope.showDetectedPerson = function () {

        var person = null;
        if (CACHEDATA["Model:person"]) {
            var object = CACHEDATA["Model:person"].clone();
            object.rotation.set(0, 0, 0);
            addPerson(object);
        }
        else {
            var mtlLoader = new THREE.MTLLoader();
            var objLoader = new THREE.OBJLoader();
            mtlLoader.setBaseUrl("models/person/");
            mtlLoader.setPath("models/person/");
            mtlLoader.load("person.mtl", function (materials) {
                objLoader.setMaterials(materials);
                objLoader.load("models/person/person.obj", function (object) {
                    CACHEDATA["Model:person"] = object.clone();
                    addPerson(object);
                });
            });
        }
    };


    scope.hideDetectedPerson = function () {
        var mesh = scope.visualRoot.getObjectByName("person-" + scope.deviceData.device_id);
        if (mesh) {
            scope.visualRoot.remove(mesh);
        }
    };


    var status = "closed";
    scope.openDoor = function () {
        if (status == "closed")
            tweenRotate = new TWEEN.Tween(deviceVisual.rotation)
                .to({
                    x: deviceVisual.rotation.x,
                    y: deviceVisual.rotation.y + Math.PI / 1.5,
                    z: deviceVisual.rotation.z
                }, 1000)
                .onComplete(function () {
                    status = "opened"
                })
                .start();
    };

    scope.closeDoor = function () {
        if (status == "opened")
            tweenRotate = new TWEEN.Tween(deviceVisual.rotation)
                .to({
                    x: deviceVisual.rotation.x,
                    y: deviceVisual.rotation.y - Math.PI / 1.5,
                    z: deviceVisual.rotation.z
                }, 1000)
                .onComplete(function () {
                    status = "closed"
                })
                .start();
    };

    scope.openWindow = function () {
        if (status == "closed") {
            var left = deviceVisual.children[0];
            var right = deviceVisual.children[1];
            tweenleft = new TWEEN.Tween(left.rotation)
                .to({x: 0, y: -Math.PI / 1.5, z: 0}, 1000)
                .start();
            tweenright = new TWEEN.Tween(right.rotation)
                .to({x: 0, y: Math.PI / 1.5, z: 0}, 1000)
                .start();
            status = "opened"
        }

    };

    scope.closeWindow = function () {
        if (status == "opened") {
            var left = deviceVisual.children[0];
            var right = deviceVisual.children[1];
            tweenleft = new TWEEN.Tween(left.rotation)
                .to({x: 0, y: 0, z: 0}, 1000)
                .start();
            tweenright = new TWEEN.Tween(right.rotation)
                .to({x: 0, y: 0, z: 0}, 1000)
                .start();
        }
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

    scope.showText = function (data) {
        scope.hideText();
        createLabel(data);
        scope.label.visible = true;
    }

    scope.showAssetLabel = function (flag) {
        var sprite = HUDLayer.getObjectByName("assetLable" + scope.deviceData.device_id);
        if (flag && !sprite) {
            var offsetHeight = 0.2;
            var img = getCanvas([scope.deviceData.device_name], '#ffffff');
            var spriteMap = new THREE.CanvasTexture(img);
            var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff});
            var sprite = new THREE.Sprite(spriteMaterial);
            scope.label = sprite;
            var sx = getStringLength(scope.deviceData.device_name) / 2;
            sprite.scale.set(sx, 3, 1);
            var x = deviceVisual.position.x,
                y = deviceVisual.position.y + sizeReal.y + offsetHeight * V3DSettings.RESIZE_RATIO,
                z = deviceVisual.position.z;
            sprite.position.set(x, y, z);
            sprite.renderOrder = 1000;
            sprite.name = "assetLable" + scope.deviceData.device_id;
            HUDLayer.add(sprite);

        }
        else if (sprite) {
            HUDLayer.remove(sprite);
        }

    };


    scope.hideText = function () {
        if (scope.label)
            scope.label.visible = false;
        HUDLayer.remove(scope.label);
    };


    scope.showRackCapacity = function (totalSubU) {
        deviceVisual.children[0].material.transparent = true;
        deviceVisual.children[0].material.opacity = 0.1;
        var full = totalSubU / (parseInt(scope.deviceData.u_size) * 3);

        var color = 'green';
        if (full > 0.7 || full == 0.7)
            color = 'red';
        else if (full > 0.2 && full < 0.7) {
            color = 'yellow'
        }

        var height = sizeReal.y;

        var cubeGeometry = new THREE.BoxGeometry(sizeReal.x * 1.05, 1, sizeReal.z * 1);
        var cubeMesh = new THREE.Mesh(cubeGeometry, new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8
        }));
        cubeMesh.position.set(deviceVisual.position.x, deviceVisual.position.y, deviceVisual.position.z);
        cubeMesh.name = "capacity-Mesh-" + scope.deviceData.device_id;
        scope.visualRoot.add(cubeMesh);

        var tweenScale = new TWEEN.Tween(cubeMesh.scale)
            .to({x: 1, y: height * full, z: 1}, 1500)
            .easing(TWEEN.Easing.Back.Out)
            .start();

        var tweenPosition = new TWEEN.Tween(cubeMesh.position)
            .to({x: cubeMesh.position.x, y: deviceVisual.position.y + height * full / 2, z: cubeMesh.position.z}, 1500)
            .easing(TWEEN.Easing.Back.Out)
            .start();
    };


    scope.hideRackCapacity = function () {
        var mesh = scope.visualRoot.getObjectByName("capacity-Mesh-" + scope.deviceData.device_id);
        if (mesh) {
            scope.visualRoot.remove(mesh);
            deviceVisual.children[0].material.transparent = false;
            deviceVisual.children[0].material.opacity = 1;
        }

    };

    scope.save = function () {
        var saveData = {
            action: "update",
            PlaceNode: {
                id: scope.rawData.id,
                device_id: scope.rawData.device_id,
                floor_id: scope.rawData.floorId,
                position: JSON.stringify({
                    position: deviceVisual.position,
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


    function createLabel(data) {
        var offsetHeight = 0.2;
        var img = getLabelCanvas(data);
        var spriteMap = new THREE.CanvasTexture(img);
        var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff});
        var sprite = new THREE.Sprite(spriteMaterial);
        scope.label = sprite;
        var size = getLabelSize(data);
        var sx = size.w /20;
        var sy = size.h /20;
        sprite.scale.set(sx, sy, 1);
        var x = deviceVisual.position.x,
            y = deviceVisual.position.y + sizeReal.y + offsetHeight * V3DSettings.RESIZE_RATIO,
            z = deviceVisual.position.z;
        sprite.position.set(x, y, z);
        sprite.renderOrder = 1000;
        HUDLayer.add(sprite);

    }

    function getStringLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;  //先把中文替换成两个字节的英文，在计算长度
    };


    function getMaxLength(stringArray) {
        var max = 0;
        for (var i = 0; i < stringArray.length; i++) {
            var l = getStringLength(stringArray[i]);
            if (l > max)
                max = l;
        }
        return max;
    }


    function getCanvas(texts, color) {
        var fontsize = 52;
        var maxWidth = getMaxLength(texts);
        var width = (maxWidth / 2 + 1 ) * (fontsize),
            height = (texts.length) * (fontsize * 1.3) + fontsize * 1.2;
        var round = width / 10;
        var arrowWidth = 50;
        var arrowHeight = 80;
        var arrowOffset = height / 10;

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height + arrowHeight + arrowOffset;

        var ctx = canvas.getContext('2d');

        ctx.fillStyle = ctx.fillStyle = 'rgba(0, 191, 255, 0.6)'; //    '#FFBC00';
        ctx.roundRect(0, 0, width, height, round);
        ctx.fill();


        ctx.moveTo((width - arrowWidth ) / 2, height + arrowOffset);
        ctx.lineTo((width) / 2, height + arrowOffset + arrowHeight);
        ctx.lineTo((width + arrowWidth) / 2, height + arrowOffset);
        ctx.lineTo((width ) / 2, height + arrowOffset + arrowHeight / 4);

        ctx.closePath();
        ctx.fillStyle = '#2891FF';
        ctx.fill();


        ctx.font = fontsize + "px bold Arial";
        //text
        ctx.fillStyle = color;//'#ffffff';
        ctx.textBaseline = 'middle';
        var leftOffset = 20;
        for (var i = 0; i < texts.length; i++) {
            ctx.fillText(texts[i], leftOffset, (i + 1) * fontsize * 1.2);
        }
        return canvas;
    }

    var labelPadding = 10;

    function getLabelSize(data) {
        var width = 0, height = 0;
        for (var i = 0; i < data.rows.length; i++) {
            var row = data.rows[i];
            var rowSize = getRowSize(row);
            if (rowSize.w > width)
                width = rowSize.w;
            height += rowSize.h * 1.5
        }
        return {w: width + 2 * labelPadding, h: height + labelPadding * data.rows.length}

    }


    function getRowSize(row) {

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        var rowWidth = 0, rowHeight = 0;
        for (var j = 0; j < row.length; j++) {
            var t = row[j];
            ctx.font = t.size + "px bold Arial";
            if (t.size > rowHeight)
                rowHeight = t.size;
            rowWidth += ctx.measureText(t.text).width;

        }

        return {w: rowWidth, h: rowHeight};
    }


    function getLabelCanvas(data) {
        var size = getLabelSize(data);
        var width = size.w,
            height = size.h;
        var arrowWidth = width / 10;
        var arrowHeight = height / 10;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext('2d');

        ctx.fillStyle = data.bg;// 'rgba(0, 191, 255, 0.6)'; //    '#FFBC00';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height - arrowHeight);
        ctx.lineTo((width - arrowWidth ) / 2, height - arrowHeight);
        ctx.lineTo((width) / 2, height);
        ctx.lineTo((width + arrowWidth ) / 2, height - arrowHeight);
        ctx.lineTo(width, height - arrowHeight);
        ctx.lineTo(width, 0);
        ctx.closePath();
        ctx.fill();

        var lastW = 0,
            lastH = 0;
        for (var i = 0; i < data.rows.length; i++) {
            var row = data.rows[i];
            var rowSize = getRowSize(row);
            lastW = 10;
            lastH += rowSize.h + labelPadding;

            for (var j = 0; j < row.length; j++) {
                var t = row[j];
                ctx.font = t.size + "px bold Arial";
                ctx.fillStyle = t.color;//'#ffffff';
                ctx.fillText(t.text, lastW, lastH);
                lastW += ctx.measureText(t.text).width;
            }
        }

        return canvas;
    }


};