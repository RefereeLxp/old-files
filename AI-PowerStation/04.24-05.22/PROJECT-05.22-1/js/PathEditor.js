/**
 * Created by hongxu.lin on 3/1/2017.
 */
PathEditor = function () {
    var camera,domElement,floor;
    var inTransation =false;
    var currentPath = null;
    var pStart = new THREE.Vector3(0,0,0);
    var pEnd= new THREE.Vector3(0,0,0);
    var raycaster = new THREE.Raycaster();
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0xFC9A00});
    var line = new THREE.Mesh(geometry, material);
    line.visible = false;
    line.name="drawing";
    var group = new THREE.Group();
    group.add(line);

    var paths = [];

    this.getData = function () {
        return paths;
    };

    this.clearData = function ()
    {
        paths = [];
        for(var i=group.children.length;i>0;i--)
        {
            var item = group.children[i-1];
            if(item.name !="drawing")
                group.remove(item);
        }
    }


    this.active = function (cam,dom,floorVisual) {
        camera = cam;
        domElement = dom;
        floor = floorVisual;
        floor.parent.add(group);
        domElement.addEventListener( 'mousemove', onPathEditorMouseMove, false );
        domElement.addEventListener( 'mousedown', onPathEditorMouseDown, false );
        domElement.addEventListener( 'mouseup', onPathEditorMouseUp, false );
    };

    this.deactive = function () {
        domElement.removeEventListener( 'mousemove', onPathEditorMouseMove, false );
        domElement.removeEventListener( 'mousedown', onPathEditorMouseDown, false );
        domElement.removeEventListener( 'mouseup', onPathEditorMouseUp, false );
    };

    function onPathEditorMouseMove(event) {

        event.preventDefault();

        if(inTransation)
        {
            var target = intersectObjects(event,[floor]);
            if(target)
            {
                line.visible = true;
                pEnd = target.point;
                var a = new THREE.Vector2(pStart.x, pStart.z);
                var b = new THREE.Vector2(pEnd.x, pEnd.z);
                var v = b.sub(a);
                var wall_width = v.length()  , wall_height = 0.1 , wall_depth = 0.5 ;

                line.scale.set(wall_width, wall_height, wall_depth);
                line.position.set((pStart.x + pEnd.x) / 2  , wall_height / 2, (pStart.z + pEnd.z) / 2 );

                var angle = -Math.atan2(v.y, v.x);
                if(angle> Math.PI /2 && angle<Math.PI )
                {
                    angle =  angle - Math.PI;
                }

                if(angle> -Math.PI && angle < -Math.PI/2  )
                {
                    angle = Math.PI + angle;
                }

                line.rotateY( angle - line.rotation.y );
            }
            else
            {
                pEnd = null;
            }
        }

    }

    function onPathEditorMouseDown(event) {
        event.preventDefault();
        inTransation = true;
        domElement.style.cursor = 'pointer';
        var target = intersectObjects(event,[floor]);
        if(target)
            pStart = target.point;

    }

    function onPathEditorMouseUp(event) {
        event.preventDefault();
        if(pEnd)
        {
            paths.push(
                {
                    from:{x:pStart.x,y:1.5*V3DSettings.RESIZE_RATIO,z:pStart.z},
                    to:{x:pEnd.x,y:1.5*V3DSettings.RESIZE_RATIO,z:pEnd.z}
                }
            );
            inTransation = false;
            domElement.style.cursor = 'auto';
            var item = line.clone();
            item.name = "line"+paths.length;
            group.add(item);
            line.visible = false;
            pStart = null;
            pEnd = null;

        }



    }


    function intersectObjects(pointer, objects) {
        var v = calculateMouse(pointer, domElement);
        raycaster.setFromCamera(v, camera);
        var intersections = raycaster.intersectObjects(objects, true);
        return intersections[0] ? intersections[0] : false;
    }


};