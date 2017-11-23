/**
 * Created by hongxu.lin on 3/2/2017.
 */
AutoWalkHelper = function (camera, controls) {

    
    function setCameraToEdit() {
        
    }



    function startWalk(data) {
        var animations = [];
        var firstPath = data[0];

        camera.position.set(firstPath.from.x,firstPath.from.y,firstPath.from.z);
        cameraLookPath(firstPath.to);

        var initData = {from:camera.position, to:firstPath.from};
        var t0 = getTween(initData);
        animations.push(t0);
        var lastAngle = 0;
        for(var i = 0;i<data.length;i++)
        {
            var tweenRotate= null;
            var tween = getTween(data[i]);
            if(i > 0)
            {
                //try find rotate angle

                var vlast = getVect(data[i -1]);
                var from = new THREE.Vector3( data[i -1].to.x,data[i -1].to.y, data[i -1].to.z).add(vlast);

                tweenRotate= new TWEEN.Tween( from )
                    .to( data[i].to , 1000)
                    .onUpdate(function () {
                            cameraLookPath(this);
                        }
                    );
                animations.push(tweenRotate);
                animations[2*i -1].chain(tweenRotate);
                tweenRotate.chain(tween);
            }
            else
            {
                //first path
                animations[0].chain(tween);
            }
            animations.push(tween);
            if(i == data.length-1)
                tween.onComplete(
                    function () {
                        startWalk(data);
                    }
                );
        }
        animations[0].start();
    }

    function getTween(item) {
        var distance = getVect(item).length();
        var tween= new TWEEN.Tween( camera.position )
            .to( item.to , distance * 150);
        return tween;
    }

    function cameraLookPath(toValue) {
        camera.lookAt(toValue.x,toValue.y,toValue.z);
        controls.target.set(toValue.x,toValue.y, toValue.z);
        controls.update();
    }

    function getVect(item) {
        var f = new THREE.Vector3( item.from.x,item.from.y, item.from.z );
        var t = new THREE.Vector3( item.to.x,item.to.y, item.to.z);
        var v = t.sub(f);
        return v;
    }


    this.startWalk = startWalk;

    this.stopWalk = function () {
        TWEEN.removeAll();
    }
};