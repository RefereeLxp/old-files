/**
 * Created by PVer on 2017/6/23.
 */

var num=6;
model_move(num);
function model_move(num) {
    var model_num=$('.model-main').find('.other-model').length;
    console.log(model_num);
    console.log(num);
    if(model_num>num){
        //Ìí¼Ó±ê¼Ç
        for(var i=0;i<model_num;i++){
            $('.model-main').find('.other-model').eq(i).attr('data-num',i);
        }
    }else{
        $('.model-box-rg').find('.model-lf-btn b').hide();
        $('.model-box-rg').find('.model-rg-btn b').hide();
    }
    //console.log($('.model-main').find('.other-model').eq(1).attr('data-num'));
    if($('.model-main').find('.other-model').eq(0).attr('data-num')==0){
        $('.model-box-rg').find('.model-lf-btn b').hide();
    }
}