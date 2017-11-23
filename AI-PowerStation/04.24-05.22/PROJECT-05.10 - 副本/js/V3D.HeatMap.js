/**
 * Created by hongxu.lin on 2/16/2017.
 */
V3D.HeatMap = function () {
    var scope = this;
    var resize = 20;

    scope.visual3D = null;
    scope.getMesh = function(floorShpeGeomotry,size,data)
    {

        var container = document.createElement("div");
        var heatmap = h337.create({
            container: container,
            opacity:1,
            radius:300,
            width:size.width * resize  ,
            height:size.height * resize
        });

        heatmap.setData({
            max: 100,
            min:0,
            data: data
        });

        assignUVs(floorShpeGeomotry);
        floorShpeGeomotry.computeBoundingBox();

        var texture = new THREE.CanvasTexture(generateImage(heatmap.getDataURL(),size ));
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.y = -1;
        var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
        var floor = new THREE.Mesh(floorShpeGeomotry,material);
        floor.rotateX(Math.PI / 2);
        scope.visual3D = floor;
        return floor;
    };

    function assignUVs(geometry) {

        geometry.computeBoundingBox();

        var max = geometry.boundingBox.max,
            min = geometry.boundingBox.min;
        var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
        var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
        var faces = geometry.faces;

        geometry.faceVertexUvs[0] = [];

        for (var i = 0; i < faces.length; i++) {

            var v1 = geometry.vertices[faces[i].a],
                v2 = geometry.vertices[faces[i].b],
                v3 = geometry.vertices[faces[i].c];

            geometry.faceVertexUvs[0].push([
                new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
                new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
                new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
            ]);
        }
        geometry.uvsNeedUpdate = true;
    }

    function generateImage( dataurl,size) {
        var width = size.width * resize, height =size.height * resize;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0000ff';
        ctx.fillRect(0, 0, width, height);

        var img = new Image();
        img.src = dataurl;
        ctx.drawImage(img, 0, 0);
        return canvas;
    }





};