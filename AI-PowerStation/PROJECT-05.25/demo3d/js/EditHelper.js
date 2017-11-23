/**
 * Created by hongxu.lin on 2/15/2017.
 */
EditHelper = function (camera,scene,domElement) {
    var scope = this;
    scope.object = null;

    var dragObjects = [];
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var boxHelper = new THREE.BoxHelper(camera, 0xff0000);
    boxHelper.visible = false;
    scene.add(boxHelper);

    var arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 3, 0x00a900, 0.6 ,0.3);
    arrowHelper.data = { dragable: true, type: 'arrowHelper' };
    arrowHelper.visible = false;
    scene.add(arrowHelper);

    var rotateControl = new THREE.RotateControls(camera, domElement);
    rotateControl.addEventListener('mouseDown', function (event) {
        dragControls.enabled = false;
    });
    rotateControl.addEventListener('mouseUp', function (event) {
        updateBox(event.target.object);
        dragControls.enabled = true;
        scope.dispatchEvent( { type: 'dragend', object: scope.object } );
    });
    scene.add(rotateControl);

    var dragControls = new THREE.DragControls(dragObjects, camera, domElement);
    dragControls.addEventListener('dragstart', function (event) { scope.dispatchEvent( { type: 'dragstart', object:event.object } );   });
    dragControls.addEventListener('dragend', function (event) {
        var obj = event.object;
        if (isData(event.object, "type", "arrowHelper").result)
        {
            //if drag arraw
            obj = event.object.data.attach;
        }
        scope.dispatchEvent( { type: 'dragend', object: obj } );
    });


    dragControls.addEventListener('drag', function (event) {
        if (isData(event.object, "type", "arrowHelper").result)
        {
            //if drag arraw
            arrowHelper.data.attach.position.y += event.offsetHeight;
            boxHelper.update(arrowHelper.data.attach);
        }
        else
        {
            updateBox(event.object)
        }
        rotateControl.update();
    });

    function updateBox(object)
    {
        boxHelper.update(object);
        boxHelper.visible = true;
        setArrowPosition(object);
    }

    function setArrowPosition(object)
    {
        var box = new THREE.Box3().setFromObject(object);
        arrowHelper.position.copy(object.position);
        arrowHelper.position.y = box.max.y;
    }

    function intersectObjects( pointer,objects  ) {
        var v = calculateMouse(pointer, domElement);
        raycaster.setFromCamera(v,  camera);
        var intersections = raycaster.intersectObjects( objects, true );
        return intersections[ 0 ] ? intersections[ 0 ] : false;
    }

    // domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    // function onDocumentMouseDown(event) {
    //     var interset = intersectObjects(event,dragObjects);
    //     if(interset)
    //     {
    //         var obj = interset.object;
    //         if (!isData(obj, "type", "arrowHelper").result)
    //         {
    //             var check = isData(obj, "dragable", true);
    //             if (check.result)
    //                 obj = check.root;
    //             boxHelper.update(obj);
    //             boxHelper.visible = true;
    //             setArrowPosition(obj);
    //             arrowHelper.data.attach = obj;
    //             rotateControl.attach(obj);
    //         }
    //
    //     }
    //
    // }

    scope.attach = function(object,floor)
    {
        scope.object = object;
        dragObjects.splice(0,dragObjects.length);
        dragObjects.push(arrowHelper);
        dragObjects.push(object);

        dragControls.enabled =true;
        dragControls.activate();
        dragControls.surface = floor;
        arrowHelper.visible = true;

        boxHelper.update(object);
        boxHelper.visible = true;
        setArrowPosition(object);
        arrowHelper.data.attach = object;
        rotateControl.attach(object);


    };

    scope.detach = function () {
        scope.object = undefined;
        dragObjects.splice(0,dragObjects.length);

        dragControls.enabled =false;
        dragControls.deactivate();
        dragControls.surface = null;
        arrowHelper.visible = false;
        boxHelper.visible = false;
        rotateControl.detach();

    }

};

EditHelper.prototype = Object.create( THREE.EventDispatcher.prototype );
EditHelper.prototype.constructor = EditHelper;