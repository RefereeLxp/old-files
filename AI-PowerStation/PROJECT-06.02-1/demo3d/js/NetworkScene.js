/**
 * Created by leo on 2017/2/27.
 */
NetworkScene = function (dir, name, lights) {
    var container = document.getElementById("container");
    //scene
    var scene = new THREE.Scene();
    //camera
    var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000000);
    camera.position.set(0, 0, 10);
    //render
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x575757, 1);
    container.appendChild(renderer.domElement);

    var lightParms = lights;
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    var raycaster = new THREE.Raycaster();

    window.addEventListener('resize', onWindowResize, false);

    renderer.domElement.addEventListener('mousedown', onEditorMouseDown, false);

    var hitTestObjects = [];
    var labels = [];
    var labelGroup = new THREE.Group();
    scene.add(labelGroup);

    loadInitData();

    function onEditorMouseDown(event) {
        event.preventDefault();

        if(event.shiftKey)
        {
            var deleteTarget = intersectObjects(event, labels);
            var data = {
                action:"delete",
                id: deleteTarget.object.data.id
            };
            loadData(SERVICE.SaveNetworkLabel,data);
            var s = labelGroup.getObjectByName( "label"+deleteTarget.object.data.id );
            labels.splice(labels.indexOf(s),1);
            labelGroup.remove(s)
        }
        else
        {
            var target = intersectObjects(event, hitTestObjects);
            if (target) {
                layer.open({
                    type: 1,
                    shade: false,
                    title: '选择数据源', //不显示标题
                    area: ['300px', '200px'],
                    btn: ['确定' ],
                    content: $('#dataSourceContainer'),
                    yes: function(index){
                        var data = {
                            action:"add",
                            NetworkLabel:{
                                data_source:$("#networks").find("option:selected").val(),
                                labels:JSON.stringify(["名称："+ $("#networks").find("option:selected").text(), "流向：上行", "网速：500M"])  ,
                                position:JSON.stringify(target.point)
                            }
                        };

                        loadData(SERVICE.SaveNetworkLabel,data,function (data) {
                            addLabel(data);
                            layer.closeAll();
                        });

                    },
                    cancel: function(){

                    }
                });
            }
        }


    }


    function intersectObjects(pointer, objects) {
        var v = calculateMouse(pointer, renderer.domElement);
        raycaster.setFromCamera(v, camera);
        var intersections = raycaster.intersectObjects(objects, true);
        return intersections[0] ? intersections[0] : false;
    }


    function getCanvas(texts) {

        var width = 512, height = 256;
        var arrowWidth = width / 10;
        var arrowHeight = height / 10;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#FFBC00';
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


        var fontsize = 52;
        ctx.font = fontsize + "px bold Arial";
        //text
        ctx.fillStyle = '#2891FF';
        ctx.textBaseline = 'middle';
        var leftOffset = 20;
        for (var i = 0; i < texts.length; i++) {
            ctx.fillText(texts[i], leftOffset, (i + 1) * fontsize * 1.2);
        }

        return canvas;

    }


    function addLabel(data) {
        var text = JSON.parse(data.labels);
        var position = JSON.parse(data.position);
        var scaleSize = 3;
        var canvas = getCanvas(text);
        var spriteMap = new THREE.CanvasTexture(canvas);
        var width = spriteMap.image.width;
        var height = spriteMap.image.height;
        var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff});
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(position.x, position.y + height * scaleSize, position.z);
        sprite.scale.set(width * scaleSize, height * scaleSize, 1);
        sprite.data = data;
        sprite.name = "label"+data.id;
        labels.push(sprite);
        labelGroup.add(sprite);
    }


    function onWindowResize() {

        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.offsetWidth, container.offsetHeight);

    }

    loadModel(dir, name, {x: 0, y: 0, z: 0});
    render();

    function render() {
        requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    }

    function loadInitData() {
        loadData(SERVICE.GetNetworkList,null,function (data) {
            $.each(data,function (idx,item) {
                $("#networks").append("<option value='"+item.id+"'>"+item.name+"</option>");
            })
        });

        loadData(SERVICE.GetNetworkLabels,null,function (data) {
            $.each(data,function (idx,item) {
                addLabel(item);
            })
        })
    }



    function loadModel(folder, name, position) {
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                $("#percentage").text(Math.round(percentComplete, 2) + '%');

                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        var objLoader = new THREE.OBJLoader(manager);
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setBaseUrl(folder);
        mtlLoader.setPath(folder);
        mtlLoader.load(name + ".mtl", function (materials) {
            objLoader.setMaterials(materials);
            objLoader.load(folder + name + ".obj", function (object) {
                object.position.set(position.x, position.y, position.z);
                hitTestObjects.push(object);
                scene.add(object);
                fitCameraLight(object);

                setTimeout(function () {
                    $("#loadingContainer").hide();
                }, 800);
            }, onProgress);

        });


    }


    function fitCameraLight(object3d) {
        var b = new THREE.Box3().setFromObject(object3d);
        var size = b.getSize();
        var max = size.x > size.y ? size.x : size.y;

        var camera_z = (max / 2);
        camera.position.set(0, camera_z, camera_z);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        var lightOffset = 2;
        var params = [
            [0, size.y * lightOffset, 0],//top
            [0, -size.y * lightOffset, 0],//bottom
            [-size.x * lightOffset, 0, 0],//left
            [size.x * lightOffset, 0, 0],//right
            [0, 0, size.z * lightOffset],//front
            [0, 0, -size.z * lightOffset]//rear
        ];

        for (var i = 0; i < params.length; i++) {
            var parm = params[i];
            var light = new THREE.DirectionalLight(lightParms[i][0], lightParms[i][1]);
            light.position.set(parm[0], parm[1], parm[2]);
            scene.add(light);
            // var lightDirectHelper = new THREE.DirectionalLightHelper(light);
            // scene.add(lightDirectHelper);
        }

        //lights
        var lightAm = new THREE.AmbientLight(lightParms[6][0], lightParms[6][1]);
        scene.add(lightAm);

        controls.minDistance = size.z * 0.1;
        controls.maxDistance = 20 * size.z;

    }

};