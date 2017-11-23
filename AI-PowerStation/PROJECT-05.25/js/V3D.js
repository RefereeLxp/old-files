/**
 * Created by leo on 2017/2/12.
 */
V3D = function (containerId) {
    var scope = this;
    scope.enable3d = true;
    //container
    var container = document.getElementById(containerId);
    //scene
    var scene = new THREE.Scene();
    //camera
    var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000000);
    camera.position.set(0, 50, 50);
    //render
    var renderer = new THREE.WebGLRenderer({antialias: true,alpha :true});
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);
    //lights
    var directLightOffset = 200;
    var params = [
        [0, directLightOffset * V3DSettings.RESIZE_RATIO, 0],//top
        [0, -directLightOffset * V3DSettings.RESIZE_RATIO, 0],//bottom
        [-directLightOffset * V3DSettings.RESIZE_RATIO, directLightOffset * V3DSettings.RESIZE_RATIO / 5, 0],//left
        [directLightOffset * V3DSettings.RESIZE_RATIO, directLightOffset * V3DSettings.RESIZE_RATIO /5, 0],//right
        [0, 0, directLightOffset * V3DSettings.RESIZE_RATIO],//front
        [0, 0, -directLightOffset * V3DSettings.RESIZE_RATIO]//rear
    ];

    var lightParms = [
        ["#ffffff", 0.1],//top
        ["#ffffff", 0],//bottom
        ["#F9F9F9", 0.1],//left
        ["#F9F9F9", 0.1],//right
        ["#F9F9F9", 0.1],//front
        ["#ffffff", 0.1],//rear
        ["#ffffff",0.7]//env
    ] ;

    for (var i = 0; i < params.length; i++) {
        var parm = params[i];
        var lightDir = new THREE.DirectionalLight(lightParms[i][0], lightParms[i][1]);
        lightDir.position.set(parm[0], parm[1], parm[2]);
        lightDir.name = "sceneLight:"+i;
        scene.add(lightDir);
        //scene.add(new THREE.DirectionalLightHelper(lightDir));
    }
    var lightAm = new THREE.AmbientLight(lightParms[6][0], lightParms[6][1]);
    lightAm.name = "sceneLightAmbient";
    scene.add(lightAm);

    var spotLight = new THREE.SpotLight(0xffffff, 0.1);
    spotLight.position.set(100,600, -100);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 4;
    spotLight.distance = 1200;
    spotLight.shadow.bias =0.0001;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 1000;
    spotLight.name = "sceneSpotLight";
    scene.add(spotLight);
    //scene.add(new THREE.SpotLightHelper(spotLight));


    // var light = new THREE.DirectionalLight(0xffffff, 0.2);
    // light.position.set(0, 200 * V3DSettings.RESIZE_RATIO, 0);
    // scene.add(light);
    // var light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    // light2.position.set(200 * V3DSettings.RESIZE_RATIO, 200 * V3DSettings.RESIZE_RATIO, -200 * V3DSettings.RESIZE_RATIO);
    // scene.add(light2);

    //default controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    //main loop
    var render = function () {
        if (scope.enable3d) {
            requestAnimationFrame(render);
            TWEEN.update();
            renderer.render(scene, camera);
            renderer.clearDepth();
            renderer.setClearColor(0x898989, 1);
            renderer.render( HUDLayer, camera );

        }
    };
    render();

    $(window).resize(function () {
        onContainerResize();
    });
    function onContainerResize() {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }

    var cameraSnapshot = {};

    function takeCameranapshot() {
        cameraSnapshot.position = camera.position.clone();
        cameraSnapshot.rotation = camera.rotation.clone();
        cameraSnapshot.controlCenter = controls.target.clone();
    }

    function resotreCamera() {
        if (cameraSnapshot.position) {
            camera.position.set(cameraSnapshot.position.x, cameraSnapshot.position.y, cameraSnapshot.position.z);
            camera.rotation.set(cameraSnapshot.rotation.x, cameraSnapshot.rotation.y, cameraSnapshot.rotation.z);
            controls.target.set(cameraSnapshot.controlCenter.x, cameraSnapshot.controlCenter.y, cameraSnapshot.controlCenter.z);
            controls.update();
        }
    }

    function flyCamera(object3d) {
        var rect = getBound3D(object3d);
        var v = new THREE.Vector3().subVectors(camera.position,rect.center );
        v.multiplyScalar(0.15);
        var to =  new THREE.Vector3().addVectors(v , rect.center );

        var tweenPosition = new TWEEN.Tween(camera.position)
            .to(to, 1200)
            .easing(TWEEN.Easing.Cubic.Out)
            .onComplete(function () {
                scope.goToMode(V3DMode.DEVICE);
            }).start();
    }


    scope.floorExplorer = new V3D.FloorView(camera, scene, renderer, controls);
    scope.floorExplorer.addEventListener(V3DEventType.DEVICE_DOUBLE_CLICKED, function (event) {
        scope.target = event.object;
        takeCameranapshot();
        flyCamera(scope.target)
        //scope.goToMode(V3DMode.DEVICE);
    });
    scope.floorExplorer.addEventListener(V3DEventType.FLOOR_NOT_DEFINED, function (event) {
        scope.dispatchEvent({type: V3DEventType.FLOOR_NOT_DEFINED});
    });

    scope.deviceExplorer = new V3D.DeviceExplorer(camera, scene, renderer, controls);
    scope.mode = V3DMode.FLOOR;
    scope.target = null;
    scope.set3dStatus = function (flag) {
        scope.enable3d = flag;
        renderer.domElement.style.display = flag ? "" : "none";
        if (flag)
            render();

    };

    scope.goToMode = function (modeType) {
        scope.mode = modeType;
        if (scope.mode == V3DMode.DEVICE) {
            switchToolBar(ToolBarType.DEVICE);
            $("#container").css("width", "500px");
            $("#formContainer").show();
            $("#deviceName").text(scope.target.data.device_name);
            scope.floorExplorer.deactive();
            scope.deviceExplorer.init(scope.target);
            scope.deviceExplorer.active();
        }
        else {
            switchToolBar(ToolBarType.FLOOR3D);
            $("#container").css("width", "");
            $("#formContainer").hide();
            scope.floorExplorer.active();
            controls.enabled = true;
            scope.deviceExplorer.deactive();
            resotreCamera();
        }
        onContainerResize();
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

};


V3D.prototype = Object.create(THREE.EventDispatcher.prototype);
V3D.prototype.constructor = V3D;