/**
 * Created by PVer on 2017/3/30.
 */
//点击人员设备图标切换页面中部内容
//$('.lf-box').on('click','.panel-heading',function () {
//    console.log(1);
//    if($(this).hasClass('collapse ')){
//        }
//    $(this).attr('background','url("../image/icon1.png") no-repeat');
//});
$('.box2').hide();
$('.one').click(function () {
    console.error('123');
    $('.box1').show();
    $('.box2').hide();
});
$('.two').click(function () {
    console.error('123');
    $('.box2').show();
    $('.box1').hide();
});
$('.lf-box').on('click','.panel-heading',function () {
    if($(this).next().hasClass('in')){
        console.log(1);
        $(this).find('.panel-title b').css('background',"url('image/icon-rg.png') no-repeat");
    }else if(!($(this).next().hasClass('in'))){
        $(this).find('.panel-title b').css('background',"url('image/icon1.png') no-repeat");
    }
});
//    点击后input初始状态为锁定
$('#user .user-input form input').each(function () {
    $(this).attr({"disabled":"disabled"});
    console.log($('#user .user-input form input').attr("disabled"));
});
//----------------------05.09
//    点击编辑解除input锁定
$('#user').on('click','#user-alter', function () {
    $('#user .user-input form').find('select').each(function () {
       $(this).prev().addClass('remove');
        $(this).removeClass('remove');
    });
    console.error(1);
    if( $('#user .user-input form input').attr("disabled")=='disabled'){
        $('#user .user-input form input').each(function () {
            $(this).attr({"disabled":"disabled"});
            $('#user .user-input form input').removeAttr("disabled");
        });
    }

});
//----------------------05.09
//    点击保存锁定input
$('#user').on('click','#user-submit', function () {
    $('#user .user-input form').find('select').each(function () {
        console.error($(this));
        console.log($(this).find('option:selected').val());
        if($(this).find('option:selected').val()!='null'){
            $(this).prev().val($(this).find('option:selected').text());
        }
        $(this).prev().removeClass('remove');
        $(this).addClass('remove');
    });
    if( $('#user .user-input form input').attr("disabled")!='disabled'){
        $('#user .user-input form input').each(function () {
            $(this).attr({"disabled":"disabled"});
        });
    }

});
//    计算机设备增加-弹框点击保存
$('#computer-add-pop').on('click','#computer-add-btn', function () {
    var computer_id=$('#computer-add-pop').find('.computer-add-input').find('input').eq(0).val();
    var computer_brand=$('#computer-add-pop').find('.computer-add-input').find('input').eq(1).val();
    var computer_code=$('#computer-add-pop').find('.computer-add-input').find('input').eq(2).val();
    var computer_type=$('#computer-add-pop').find('.computer-add-input').find('input').eq(3).val();
    console.log(computer_id,computer_brand,computer_code,computer_type);
    $('#computer-add-pop').modal('hide');
//        $.ajax({
//            type: 'POST',
//            url: ' url地址',
//            data: {computer_id:computer_id},
//            success: function(){
////                如果请求成功弹框关闭
//        $('#computer-add-pop').modal('hide');

//            }
//        });
});
//    设备页弹框人员信息部分内容锁定
$('#eq-pop').find('.disabled-input').each(function () {
    $(this).attr({"disabled":"disabled"});
//        console.log($('#user .user-input form input').attr("disabled"));
});
//锁定表格中的输入框
$('#user-add-pop .tb-input input').each(function () {
    $(this).attr({"disabled":"disabled"});
});
//-----------------计算机设备添加-----------------
//点击添加
$('#user-add-pop').on('click','.tb-add', function () {
    var html='';
    html+=`
      <tr>
            <td><input type="radio" name="computer-select"/></td>
            <td class="tb-input" ><input type="text" name="computer-id"/></td>
            <td class="tb-input" ><input type="text" name="computer-brand"/></td>
            <td class="tb-input" ><input type="text" name="computer-code"/></td>
            <td class="tb-input" ><input type="text" name="computer-type"/></td>
        </tr>
    `;
  $(this).parent().parent().parent().find('.pop-tb tbody').append(html);
  $('#user-add-pop').find(' .tb-add').html('保存');
  $('#user-add-pop').find(' .tb-add').removeClass('tb-add').addClass('tb-add-submit');
});
//点击保存
$('#user-add-pop').on('click','.tb-add-submit', function () {
    $("#user-add-pop input[type='radio']:checked").each(function (){
        console.log($('#user-add-pop').find(' .tb-add-submit').html('新增'));
        console.log($('#user-add-pop').find(' .tb-add-submit').addClass('tb-add').removeClass('tb-add-submit'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).attr({"disabled":"disabled"});
        });
    });
});

//点击删除行(存在bug/删除后表格高度)
$('#user-add-pop').on('click','.tb-del', function () {
    $("#user-add-pop input[type='radio']:checked").each(function () {
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().remove();
    });
});
//-----------------计算机设备修改-----------------
//点击编辑
$('#user-add-pop').on('click','.tb-alter', function () {
    $("#user-add-pop input[type='radio']:checked").each(function (){
        console.log($('#user-add-pop').find(' .tb-alter').html('保存'));
        console.log($('#user-add-pop').find(' .tb-alter').removeClass('tb-alter').addClass('tb-alter-submit'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).removeAttr("disabled");
        });
    });
});
//点击保存
$('#user-add-pop').on('click','.tb-alter-submit', function () {
    $("#user-add-pop input[type='radio']:checked").each(function (){
        console.log($('#user-add-pop').find(' .tb-alter-submit').html('编辑'));
        console.log($('#user-add-pop').find(' .tb-alter-submit').addClass('tb-alter').removeClass('tb-alter-submit'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).attr({"disabled":"disabled"});
        });
    });
});
$('body').on('focus','.pop-tb tr', function () {
    console.log($(this).html())
    $(this).find("input[type='radio']").prop('checked',true);
});
//动态修改左侧边栏的高度
$(function(){
    var box_height=$(window).height()-$('body').find('.container:first').height();
    console.log(box_height);
    if($('.md-box').height()<box_height){
       $('.lf-box').height(box_height);
    }else if($('.md-box').height()>box_height){
        $('.lf-box').height($('.md-box').height());
    }
});