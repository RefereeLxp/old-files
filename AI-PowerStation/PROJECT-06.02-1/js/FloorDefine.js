/**
 * Created by hongxu.lin on 2/13/2017.
 */
FloorDefine = function (containerId) {
    var scope = this;
    var container = document.getElementById(containerId);
    scope.canvas = document.createElement("canvas");
    scope.canvas.style.width = "100%";
    scope.canvas.style.height = "100%";
    scope.shape = null;
    var mode = "shape";//wall || shape
    var shapePath;
    var floorId;
    $("#floorDefineModeBtn").click(function () {
        mode = mode == "wall" ?"shape":"wall";
    });

    scope.onSave = function () {
        var saveData = getSaveData();
        var parm = { id:floorId,shape:JSON.stringify(saveData)};
        loadData(SERVICE.SaveFloorShape,parm,function (result) {
                scope.dispatchEvent( { type:V3DEventType.FLOOR_DEFINED_SAVED,object:saveData} );
        });
    };

    function getSaveData() {
        var points = [];
        var wall_segments = [];
        //area shape
        var shape = paper.project.getItem({
            data: {type: "shape"}
        });
        $.each(shape.segments, function (i, value) {
            points.push({x: value.point.x / 100, y: value.point.y / 100});
        });
        //walls
        var walls = paper.project.getItems({data: {type: "wall"}});
        $.each(walls, function (i, wall) {
            var w = [];
            if(filterBadWall(wall))
            {
                $.each(wall.segments, function (i, value) {
                    w.push({x: value.point.x / 100, y: value.point.y / 100});
                });
                wall_segments.push(w);
            }

        });

        var result = {shape: points, wall_segments: wall_segments};
        return result;
    }


    function filterBadWall(wall) {
        var result = true;
        if(wall.segments.length==2)
        {

            var v1 = new THREE.Vector2(wall.segments[0].point.x,wall.segments[0].point.y);
            var v2 = new THREE.Vector2(wall.segments[1].point.x,wall.segments[1].point.y);
            var v = v2.sub(v1);
            if(v.length() < 10)
                result = false;
        }
        return result;
    }

    scope.setStatus = function () {
        scope.canvas.style.display = "none";
        $("#floorDefineToolbar").hide();
    };

    container.addEventListener('mousewheel', onMouseWheel, false);

    function onMouseWheel(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.deltaY > 0)
            scope.zoomIn();
        else
            scope.zoomOut();
    }

    function selectOne(item) {
        var items = paper.project.getItems({
            selected: true
        });

        $.each(items,function (idx,value) {
            value.selected =false;
        }) ;
        item.selected = true;
    }


    scope.zoomIn = function () {
        var factor = 1.05;
        factor = 1 / factor;
        paper.view.zoom *= factor;
    };

    scope.zoomOut = function () {
        var factor = 1.05;
        paper.view.zoom *= factor;
    };

    scope.init = function (id) {
        floorId = id;
        container.appendChild(scope.canvas);
        // Create an empty project and a view for the canvas:
        paper.setup(scope.canvas);

        var tool = new paper.Tool();
        tool.onMouseMove = function (event) {

        };

        var hitPoint;
        tool.onMouseDown = function (event) {
            hitPoint = null;
            var mainStage = paper.project.getItem({name: 'stage'});
            var mx = mainStage.matrix.clone();
            var p = mx.invert().transform(event.point);
            var hitResult = paper.project.hitTest(event.point);
            if (event.modifiers.shift) {
                if (!hitResult)
                    return;

                if (hitResult.type == 'stroke' &&  hitResult.item.data &&  hitResult.item.data.type == "wall") {
                    hitResult.item.remove();
                }
                else if(hitResult.type == 'segment')
                    if( hitResult.item.data && hitResult.item.data.type == "shape" && hitResult.item.segments.length<4) return;

                    if(hitResult.item.segments.length<3 && hitResult.item.data &&  hitResult.item.data.type == "wall")
                        hitResult.item.remove();
                    else
                        hitResult.segment.remove();
                return;
            }



            if (mode == "wall") {
                var path = new paper.Path(
                    {
                        strokeColor: 'black',
                        strokeWidth: 10,
                        data: {
                            type: "wall"
                        }
                    }
                );
                path.add(p);
                mainStage.addChild(path);
                hitPoint = path.insert(0, p.clone());
            }
            else {

                if (hitResult) {
                    var item = hitResult.item;
                    if (hitResult.type == 'segment') {
                        hitPoint = hitResult.segment;
                    } else if (hitResult.type == 'stroke') {
                        if(item.selected)
                        {
                            var location = hitResult.location;
                            hitPoint = item.insert(location.index + 1, p);
                        }
                        else
                            selectOne(item);
                    }
                }
            }
        };


        tool.onMouseDrag = function (event) {
            if (hitPoint) {
                hitPoint.point = hitPoint.point.add(event.delta);
            }
        };


    };

    scope.initView = function (data,id) {
        paper.project.activeLayer.removeChildren();
        if (!data)
            data = {shape: [{x: -2, y: -2}, {x: -2, y: 2}, {x: 2, y: 2}, {x: 2, y: -2}],wall_segments:[]};
        floorId = id;
        var stage = new paper.Group();
        stage.applyMatrix = false;
        stage.name = "stage";

        var hLine = new paper.Path.Line({
            from: [-10000, 0],
            to: [10000, 0],
            strokeWidth: 1,
            strokeColor: '#009600'
        });
        stage.addChild(hLine);

        var vLine = new paper.Path.Line({
            from: [0, -10000],
            to: [0, 10000],
            strokeWidth: 1,
            strokeColor: '#009600'
        });
        stage.addChild(vLine);

        var center = paper.Path.Circle(
            {
                center: [0, 0],
                radius: 5,
                fillColor: '#009600'
            });

        stage.addChild(center);


        for (var i = -50; i < 50; i++) {
            if (i == 0) continue;
            var l1 = new paper.Path.Line({
                from: [-10000, i * 100],
                to: [100000, i * 100],
                strokeWidth: 1,
                strokeColor: '#56c1f7'
            });
            stage.addChild(l1);

            var l2 = new paper.Path.Line({
                from: [i * 100, -10000],
                to: [i * 100, 10000],
                strokeWidth: 1,
                strokeColor: '#56c1f7'
            });
            stage.addChild(l2);
        }


        shapePath = new paper.Path({
            strokeColor: 'black',
            strokeWidth: 10,
            strokeCap: 'round',
            selected: true,
            closed: true,
            data: {type: "shape"}
        });

        for (var i = 0; i < data.shape.length; i++) {
            shapePath.add([data.shape[i].x * 100, data.shape[i].y * 100]);
        }
        stage.addChild(shapePath);

        for (var i = 0; i < data.wall_segments.length; i++) {
            var seg = data.wall_segments[i];

            var path = new paper.Path(
                {
                    strokeColor: 'black',
                    strokeWidth: 10,
                    data: {
                        type: "wall"
                    }
                }
            );
            for (var j = 0; j < seg.length; j++) {
                path.add([seg[j].x * 100,seg[j].y * 100]);
            }
            stage.addChild(path);

        }


        stage.translate(container.offsetWidth / 2, container.offsetHeight / 2);
        paper.view.draw();

        scope.canvas.style.display = "";
        $("#floorDefineToolbar").show();
    }

};
FloorDefine.prototype = Object.create( THREE.EventDispatcher.prototype );
FloorDefine.prototype.constructor = FloorDefine;