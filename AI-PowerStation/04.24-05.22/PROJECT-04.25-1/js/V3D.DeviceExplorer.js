/**
 * Created by hongxu.lin on 2/16/2017.
 */
V3D.DeviceExplorer = function (camera, scene, renderer,controls) {
    var scope = this;
    var targetView = null;
    scope.visualRoot = new THREE.Group();

    function fitCamera(object3d,isRack) {

        var bound = getBound3D(object3d);
        if(isRack)
        {
            camera.position.copy(bound.center);
            camera.position.z += 1.8 * V3DSettings.RESIZE_RATIO;
            camera.lookAt(bound.center);
            controls.target.set(0, bound.height / 2, 0);
        }
        else
        {
            camera.position.copy(bound.center);
            camera.position.z = bound.depth  * 2.5;
            camera.position.y = camera.position.z *0.8;
            camera.lookAt(bound.center);
            controls.target.set(0, bound.height / 2, 0);
        }
        controls.update();
    }

    scope.init = function (targetObject3d) {
        if(targetView)
        {
            scope.visualRoot.remove(targetView.visualRoot);
            targetView = null;
        }
        loadData(SERVICE.GetDeviceDetails,{id: targetObject3d.data.device_id},function (result) {
            if(result.device.category ==12)
            {
                //rack
                targetView = new V3D.RackDetail(result.device,camera,renderer.domElement);
                scope.visualRoot.add(targetView.visualRoot);
                controls.enabled = false;
                fitCamera(targetView.visualRoot,true);
            }else
            {
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
                                sizeReal.x /size.width,
                                sizeReal.y / size.height,
                                sizeReal.z / size.depth
                            );
                            scope.visualRoot.add(object);
                            fitCamera(object);
                        });
                    });
                }
            }

        });

    };

    scope.onDragDropEnd =function () {
        if(targetView && (targetView instanceof V3D.RackDetail))
        {
            targetView.clearMountDraw();
        }

    };

    scope.checkDropPosition = function (event, data) {
        if(targetView instanceof  V3D.RackDetail)
        {
            return targetView.checkDropPosition(event,data);
        }
        else
            return false;
    };


    scope.mount = function (event, data) {
        if(targetView instanceof  V3D.RackDetail)
        {
            targetView.mount(event,data);
        }
    };

    scope.active =function () {
        scene.add(scope.visualRoot);
    };

    scope.deactive = function () {
        clearGroup(scope.visualRoot);
        if(targetView)
        {
            targetView.deactive();
            targetView = null;
        }
        scene.remove(scope.visualRoot);
    };

};

V3D.DeviceExplorer.prototype = Object.create( THREE.EventDispatcher.prototype );
V3D.DeviceExplorer.prototype.constructor = V3D.DeviceExplorer;