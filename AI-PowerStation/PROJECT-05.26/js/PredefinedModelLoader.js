/**
 * Created by leo on 2017/4/14.
 */
PredefinedModelLoader = function () {
    var scope = this;
    this.animationOn = [];
    this.animationOff = [];

    this.load = function (url,functionCallBack) {
        var loader = new THREE.FileLoader();
        loader.load(
            // resource URL
            url,
            // Function when resource is loaded
            function ( data ) {
                // output the text to the console
                var object = scope.parse(JSON.parse(data));
                functionCallBack(object,scope.animationOn,scope.animationOff);
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

            // Function called when download errors
            function ( xhr ) {
                console.error( 'An error happened' );
            }
        );
    };

    this.parse = function (json) {
        return loadPredefineModel(json);
    };


    function getMultiMaterial(data) {
        var array = [];
        for (var i = 0; i < data.materials.length; i++) {
            array.push(createMaterial(data.materials[i]));
        }
        var mtl = new THREE.MultiMaterial(array);
        return mtl;
    }

    function createMaterial(data) {
        var material = null;
        switch (data.type) {
            case "phong":

                if (data.map) {
                    material = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load(data.map)});
                }
                else if (data.color) {
                    material = new THREE.MeshPhongMaterial({color: data.color});
                }
                break;
            case "multiMaterial":
                material = getMultiMaterial(data);
                break;
        }

        if (data.opacity && data.opacity != 1) {
            material.transparent  =true;
            material.opacity = data.opacity;
        }

        return material;
    }

    function loadPredefineModel(json) {
        var obj = null;
        if (json.type == "group") {
            obj = new THREE.Group();
        }
        else if (json.type == "mesh") {
            var geometry, material;
            if (json.geometry) {
                var g = json.geometry;
                switch (g.type) {
                    case "box":
                        geometry = new THREE.BoxGeometry(g.size.x, g.size.y, g.size.z);
                        if (g.translate)
                            geometry.translate(g.translate.x, g.translate.y, g.translate.z)
                        break;
                }
            }

            if (json.material) {
                var m = json.material;
                material = createMaterial(m);
            }
            obj = new THREE.Mesh(geometry, material);
        }

        if (json.position) {
            obj.position.set(json.position.x, json.position.y, json.position.z);
        }

        if (json.name) {
            obj.name = json.name;
        }

        //process children
        if (obj && json.children && json.children.length > 0) {
            $.each(json.children, function (idx, child) {
                var m = loadPredefineModel(child);
                obj.add(m);
            })
        }

        if (json.animation) {
            scope.animationOn = [];
            scope.animationOff = [];
            $.each(json.animation, function (idx, a) {
                var target = obj.getObjectByName(a.object);
                if (target) {
                    var tween = new TWEEN.Tween(target[a.attribute])
                        .to(a.to, a.time);
                    if (a.type == "on")
                        scope.animationOn.push(tween);
                    else
                        scope.animationOff.push(tween);
                }

            });

        }
        return obj;
    }


};