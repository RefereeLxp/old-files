/**
 * Created by hongxu.lin on 2/15/2017.
 */

var V3DEventType = {
    FLOOR_NOT_DEFINED: "FLOOR_NOT_DEFINED",
    FLOOR_DEFINED_SAVED: "FLOOR_DEFINED_SAVED",
    DEVICE_SELECTED:"DEVICE_SELECTED",
    DEVICE_DOUBLE_CLICKED:"DEVICE_DOUBLE_CLICKED"
};

var V3DMode = {
    FLOOR: "floor",
    DEVICE: "rack"
};

var V3DSettings = {
    RESIZE_RATIO: 10
};

var ToolBarType ={
    FLOOR3D:1,
    RACK:2,
    FLOOR2D:3
};


var AlertType =
{
    "Success":"success",
    "Error":"error",
    "Warning": "warning",
    "Txt": "txt"
}

var CACHEDATA = {

};

function showAlert(alertType,msg) {

    var options = {};

    if (alertType == "success") {
        layer.open({
            icon: 1,
            content: msg,
            btn: ["确定"],
            title: "成功"
        });
    }
    if (alertType == "error") {
        layer.open({
            icon: 2,
            content: msg,
            btn: ["确定"],
            title:"错误"
        });
    }
    if (alertType == "warning") {
        layer.open({
            icon: 0,
            content: msg,
            btn: ["确定"],
            title: "提示"
        });
    }



    if (alertType == "txt") {
        layer.open({
            content: msg,
            btn: ["确定"],
            title:  "消息"
        });
    }

}

function showConfirm(msg,success,cancle)
{
    var wordbreak = '<p style="word-break:normal">' + msg + '</p>'
    layer.confirm(wordbreak, {
        title:  "消息" ,
        btn:["确定","取消"],
    }, success, cancle);
}

function showMsg(msg) {
    layer.msg(msg, {
        offset: 10,
        time: 1800 //2秒关闭（如果不配置，默认是3秒）
    }, function () {
        //do something
    });
}


function showLoading() {
    layer.load(1, {
        shade: [0.3, '#000'] //0.1透明度的白色背景
    });
}

function hideLoading() {
    layer.closeAll('loading');
}






function isData(object, key, value) {
    if (object.data != null && object.data[key] == value)
        return {root: object, result: true};
    else if (object.parent != null && object.parent.type != "Scene")
        return isData(object.parent, key, value);
    else
        return {root: object, result: false};
}


function calculateMouse(event, domElement) {
    var rect = domElement.getBoundingClientRect();
    var x = (event.clientX - rect.left) / rect.width;
    var y = (event.clientY - rect.top) / rect.height;
    return new THREE.Vector2(x * 2 - 1, -y * 2 + 1);
}

function getBound3D(object3d) {
    var box = new THREE.Box3().setFromObject(object3d);
    var center = new THREE.Vector3(
        (box.max.x + box.min.x) / 2,
        (box.max.y + box.min.y) / 2,
        (box.max.z + box.min.z) / 2
    );
    var width = box.max.x - box.min.x;
    var depth = box.max.z - box.min.z;
    var height = box.max.y - box.min.y;
    return {
        width: width, depth: depth, height: height, center: center
    };
}

function switchToolBar(toolBarType) {
    if(toolBarType == ToolBarType.FLOOR2D)
    {
        $("#view3dToolbar").hide();
        $("#rackViewToolbar").hide();
        $("#floorDefineToolbar").show();
    }
    else if(toolBarType == ToolBarType.FLOOR3D)
    {
        $("#view3dToolbar").show();
        $("#rackViewToolbar").hide();
        $("#floorDefineToolbar").hide();
    }
    else if(toolBarType == ToolBarType.DEVICE)
    {
        $("#view3dToolbar").hide();
        $("#rackViewToolbar").show();
        $("#floorDefineToolbar").hide();
    }
}


function clearGroup(group) {
    for (var i = group.children.length - 1; i >= 0; i--) {
        var item =group.children[i];
        group.remove(group.children[i]);
        item = null;
    }
}


function getObjPath(data) {
    var r = null;
    if(data.files)
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
    if(data.files)
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



function getPredefinedModel(storage) {
    var model = JSON.parse(storage);
    var mesh = null;
    if(model.type)
    {
        if(model.type == "door")
        {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("images/rightdoor.jpg")});
            var door =  new THREE.Mesh(geometry, material);
            door.position.set(-sizeReal.x/2,sizeReal.y/2,0);
            mesh = new THREE.Group();
            mesh.add(door);
        }
        else if(model.type == "window")
        { 
            sizeReal = {
                x: 1,
                y: 1,
                z: 1
            };

            mesh = new THREE.Group();

            var geo = new THREE.BoxGeometry(sizeReal.x/2, sizeReal.y, sizeReal.z);
            var leftGeo = geo.clone();
            leftGeo.translate ( sizeReal.x/4,sizeReal.y/2, 0 );
            var leftpart =  new THREE.Mesh(
                leftGeo,
                new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("images/window-left.jpg")})
            );
            leftpart.position.set(-sizeReal.x/2,0,0);
            mesh.add(leftpart);

            var rightGeo = geo.clone();
            rightGeo.translate ( -sizeReal.x/4, sizeReal.y/2, 0 );
            var righttpart =  new THREE.Mesh(
                rightGeo,
                new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load("images/window-right.jpg")})
            );
            righttpart.position.set(sizeReal.x/2,0,0);
            mesh.add(righttpart);
        }


    }
    return mesh;
}





function getModelByDeviceData(sizeData,data,parentView) {
        var mtlLoader = new THREE.MTLLoader();
        var objLoader = new THREE.OBJLoader();
        var sizeReal = {
            x: sizeData.width * V3DSettings.RESIZE_RATIO,
            y: sizeData.height * V3DSettings.RESIZE_RATIO,
            z: sizeData.depth * V3DSettings.RESIZE_RATIO
        };

        var model = JSON.parse(sizeData.model.storage);
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
                    object.data = data;
                    parentView.add(object);
                });
            });
        }
        else if (obj) {
            objLoader.load(obj, function (object) {
                var size = getBound3D(object);
                object.scale.set(
                    sizeReal.x /size.width,
                    sizeReal.y / size.height,
                    sizeReal.z / size.depth
                );
                object.data = data;
                parentView.add(object);
            });
        }
}