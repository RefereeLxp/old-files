/**
 * Created by PVer on 2017/5/17.
 */
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


//动态修改左侧边栏的高度
$(function(){
    var box_height=$(window).height()-$('body').find('.container:first').height();
    //console.log(box_height);
    if($('.md-box').height()<box_height){
        $('.lf-box').height(box_height);
    }else if($('.md-box').height()>box_height){
        $('.lf-box').height($('.md-box').height());
    }
});
$('.one').click(function () {
    $('.box1').show();
    $('.box2').hide();
    $.ajax({
        type: 'POST',
        //async: false,
        url: '/nuaa/viewTypeChange',
        data:{viewType:"1"},
        dataType:"json",
    })
    var html="<input type='text' placeholder='输入工号查询人员'/><b></b><button class='my-btn inquire-user'>查询</button>";
    $(".search-box").empty().html(html);
});
$('.two').click(function () {
    $('.box2').show();
    $('.box1').hide();
    $.ajax({
        type: 'POST',
        //async: false,
        url: '/nuaa/viewTypeChange',
        data:{viewType:"0"},
        dataType:"json",
    })
    var html="<input type='text' placeholder='输入设备受控号查询设备'/><b></b><button class='my-btn inquire-machine'>查询</button>";
    $(".search-box").empty().html(html);
});
$('.lf-box').on('click','.panel-heading',function () {
    if($(this).next().hasClass('in')){
        $(this).find('.panel-title b').css('background',"url('/nuaa/image/icon-rg.png') no-repeat");
    }else if(!($(this).next().hasClass('in'))){
        $(this).find('.panel-title b').css('background',"url('/nuaa/image/icon1.png') no-repeat");
    }
});


//-----------------查看人员点击编辑和保存-----------------
//点击编辑
$('#click-user').on('click','.user-alter', function (event) {
    console.log($('#click-user').find('.user-alter').html('保存'));
    console.log($('#click-user').find('.user-alter').removeClass('user-alter').addClass('user-submit'));
    if( $('#user .user-input input').attr("readonly")=='readonly'){
        $('#user .user-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
            $('#user .user-input input').removeAttr("readonly");
        });
    }

    $('#user .user-input ').find('select').each(function () {
        $(this).prev().addClass('remove');
        $(this).removeClass('remove');
    });
    event.preventDefault();
});
//人员点击保存
$('#click-user').on('click','.user-submit', function (event) {
    console.log($('#click-user').find(' .user-submit').html('编辑'));
    console.log($('#click-user').find(' .user-submit').addClass('user-alter').removeClass('user-submit'));
    if( $('#user .user-input input').attr("readonly")!='readonly'){
        $('#user .user-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    }
    $('#user .user-input').find('select').each(function () {
        console.log($(this).find('option:selected').val());
        if($(this).find('option:selected').val()!='null'){
            $(this).prev().val($(this).find('option:selected').text());
        }
        $(this).prev().removeClass('remove');
        $(this).addClass('remove');
    });
    event.preventDefault();
});
//-----------------查看计算机点击编辑和保存-----------------
//点击编辑
$('#click-computer').on('click','.computer-alter', function (event) {
    console.log($('#click-computer').find('.computer-alter').html('保存'));
    console.log($('#click-computer').find('.computer-alter').removeClass('computer-alter').addClass('computer-submit'));
    if( $('#eq-pop-computer .user-input-pop1 input').attr("readonly")=='readonly'){
        $('#eq-pop-computer .user-input-pop1 input').each(function () {
            $(this).attr({"readonly":"readonly"});
            $('#eq-pop-computer .user-input-pop1 input').removeAttr("readonly");
        });
    }
    event.preventDefault();
});
//计算机点击保存
$('#click-computer').on('click','.computer-submit', function (event) {
    console.log($('#click-computer').find(' .computer-submit').html('编辑'));
    console.log($('#click-computer').find(' .computer-submit').addClass('computer-alter').removeClass('computer-submit'));
    if( $('#eq-pop-computer .user-input-pop1 input').attr("readonly")!='readonly'){
        $('#eq-pop-computer .user-input-pop1 input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    }
    event.preventDefault();
});
//-----------------查看自动化设备点击编辑和保存-----------------
//点击编辑
$('#click-office').on('click','.office-alter', function (event) {
    console.log($('#click-office').find('.office-alter').html('保存'));
    console.log($('#click-office').find('.office-alter').removeClass('office-alter').addClass('office-submit'));
    if( $('#eq-pop-office .user-input-pop1 input').attr("readonly")=='readonly'){
        $('#eq-pop-office .user-input-pop1 input').each(function () {
            $(this).attr({"readonly":"readonly"});
            $('#eq-pop-office .user-input-pop1 input').removeAttr("readonly");
        });
    }
    event.preventDefault();
});
//计算机点击保存
$('#click-office').on('click','.office-submit', function (event) {
    console.log($('#click-office').find(' .office-submit').html('编辑'));
    console.log($('#click-office').find(' .office-submit').addClass('office-alter').removeClass('office-submit'));
    if( $('#eq-pop-office .user-input-pop1 input').attr("readonly")!='readonly'){
        $('#eq-pop-office .user-input-pop1 input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    }
    event.preventDefault();
});
//-----------------查看存储设备点击编辑和保存-----------------
//点击编辑
$('#click-storage').on('click','.storage-alter', function (event) {
    console.log($('#click-storage').find('.storage-alter').html('保存'));
    console.log($('#click-storage').find('.storage-alter').removeClass('storage-alter').addClass('storage-submit'));
    if( $('#eq-pop-storage .user-input-pop1 input').attr("readonly")=='readonly'){
        $('#eq-pop-storage .user-input-pop1 input').each(function () {
            $(this).attr({"readonly":"readonly"});
            $('#eq-pop-storage .user-input-pop1 input').removeAttr("readonly");
        });
    }
    event.preventDefault();
});
//计算机点击保存
$('#click-storage').on('click','.storage-submit', function (event) {
    console.log($('#click-storage').find(' .storage-submit').html('编辑'));
    console.log($('#click-storage').find(' .storage-submit').addClass('storage-alter').removeClass('storage-submit'));
    if( $('#eq-pop-storage .user-input-pop1 input').attr("readonly")!='readonly'){
        $('#eq-pop-storage .user-input-pop1 input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    }
    event.preventDefault();
});

//锁定表格中的输入框
$('#user-add-pop .tb-input input').each(function () {
    $(this).attr({"readonly":"readonly"});
});
//-----------------新建人员计算机设备添加-----------------
//点击添加
$('#user-add-computer').on('click','.tb-add-computer', function (event) {
    var html='';
    html+=`
    <tr>
    <td><input type="radio" name="computer-select"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-sn"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-place"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-assets_no"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-mac"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-series_no"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-state" /></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-connectivity"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-date"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-brand" /></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-purpose"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-remark"/></td>
    </tr>
    `;
    $(this).parent().parent().parent().find('.pop-tb tbody').append(html);
    $('#user-add-pop').find(' .tb-add-computer').html('保存');
    $('#user-add-pop').find(' .tb-add-computer').removeClass('tb-add-computer').addClass('tb-add-submit-computer');
    event.preventDefault();

});
//计算机点击保存
$('#user-add-computer').on('click','.tb-add-submit-computer', function (event) {
    $("#user-add-pop input[type='radio']:checked").each(function (){
        console.log($('#user-add-pop').find(' .tb-add-submit-computer').html('新增'));
        console.log($('#user-add-pop').find(' .tb-add-submit-computer').addClass('tb-add-computer').removeClass('tb-add-submit-computer'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//计算机点击删除行
$('#user-add-pop').on('click','.tb-del-computer', function (event) {
    $("#user-add-pop input[name='computer-select']:checked").each(function () {
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().remove();
    });
    event.preventDefault();
});
//-----------------新建人员办公自动化设备添加-----------------
//点击添加
$('#user-add-office').on('click','.tb-add-office', function (event) {
    var html='';
    html+=`
    <tr>
    <td><input type="radio" name="office-select"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-sn"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-place"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-assets_no" /></td>
    <td class="tb-input office-input" ><input type="text" name="office-mac"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-series_no"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-state" /></td>
    <td class="tb-input office-input" ><input type="text" name="office-connectivity"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-date"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-brand" /></td>
    <td class="tb-input office-input" ><input type="text" name="office-purpose"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-remark"/></td>
    </tr>
  `;
    $(this).parent().parent().parent().find('.pop-tb tbody').append(html);
    $('#user-add-pop').find(' .tb-add-office').html('保存');
    $('#user-add-pop').find(' .tb-add-office').removeClass('tb-add-office').addClass('tb-add-submit-office');
    event.preventDefault();
});
//自动化设备点击保存
$('#user-add-office').on('click','.tb-add-submit-office', function (event) {
    $("#user-add-pop input[type='radio']:checked").each(function (){
        console.log($('#user-add-pop').find(' .tb-add-submit-office').html('新增'));
        console.log($('#user-add-pop').find(' .tb-add-submit-office').addClass('tb-add-office').removeClass('tb-add-submit-office'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//自动化点击删除行
$('#user-add-pop').on('click','.tb-del-office', function (event) {
    $("#user-add-pop input[name='office-select']:checked").each(function () {
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().remove();
    });
    event.preventDefault();
});
//-----------------新建人员存储设备添加-----------------
//点击添加
$('#user-add-storage').on('click','.tb-add-storage', function (event) {
    var html='';
    html+=`
    <tr>
    <td><input type="radio" name="storage-select"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-sn"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-place"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-assets_no" /></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-mac"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-series_no" /></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-state" /></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-connectivity"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-date"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-brand" /></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-purpose"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-remark"/></td>
    </tr>
`;
    $(this).parent().parent().parent().find('.pop-tb tbody').append(html);
    $('#user-add-pop').find(' .tb-add-storage').html('保存');
    $('#user-add-pop').find(' .tb-add-storage').removeClass('tb-add-storage').addClass('tb-add-submit-storage');
    event.preventDefault();
});


//存储设备点击保存
$('#user-add-storage').on('click','.tb-add-submit-storage', function (event) {
    $("#user-add-pop input[type='radio']:checked").each(function (){
        console.log($('#user-add-pop').find(' .tb-add-submit-storage').html('新增'));
        console.log($('#user-add-pop').find(' .tb-add-submit-storage').addClass('tb-add-storage').removeClass('tb-add-submit-storage'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});

//存储点击删除行
$('#user-add-pop').on('click','.tb-del-storage', function (event) {
    $("#user-add-pop input[name='storage-select']:checked").each(function () {
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().remove();
    });
    event.preventDefault();
});
//-----------------新建人员计算机设备修改-----------------
//点击编辑
$('#user-add-computer').on('click','.tb-alter-computer', function (event) {
    $("#user-add-computer input[type='radio']:checked").each(function (){
        console.log($('#user-add-computer').find(' .tb-alter-computer').html('保存'));
        console.log($('#user-add-computer').find(' .tb-alter-computer').removeClass('tb-alter-computer').addClass('tb-alter-submit-computer'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).removeAttr("readonly");
        });
    });
    event.preventDefault();
});
//计算机点击保存
$('#user-add-computer').on('click','.tb-alter-submit-computer', function (event) {
    $("#user-add-computer input[type='radio']:checked").each(function (){
        console.log($('#user-add-computer').find(' .tb-alter-submit-computer').html('编辑'));
        console.log($('#user-add-computer').find(' .tb-alter-submit-computer').addClass('tb-alter-computer').removeClass('tb-alter-submit-computer'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//-----------------新建人员办公自动化设备修改-----------------
//点击编辑
$('#user-add-office').on('click','.tb-alter-office', function (event) {
    $("#user-add-office input[type='radio']:checked").each(function (){
        console.log($('#user-add-office').find(' .tb-alter-office').html('保存'));
        console.log($('#user-add-office').find(' .tb-alter-office').removeClass('tb-alter-office').addClass('tb-alter-submit-office'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).removeAttr("readonly");
        });
    });
    event.preventDefault();
});
//自动化点击保存
$('#user-add-office').on('click','.tb-alter-submit-office', function (event) {
    $("#user-add-office input[type='radio']:checked").each(function (){
        console.log($('#user-add-office').find(' .tb-alter-submit-office').html('编辑'));
        console.log($('#user-add-office').find(' .tb-alter-submit-office').addClass('tb-alter-office').removeClass('tb-alter-submit-office'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//-----------------新建人员存储设备修改-----------------
//点击编辑
$('#user-add-storage').on('click','.tb-alter-storage', function (event) {
    $("#user-add-storage input[type='radio']:checked").each(function (){
        console.log($('#user-add-storage').find(' .tb-alter-storage').html('保存'));
        console.log($('#user-add-storage').find(' .tb-alter-storage').removeClass('tb-alter-storage').addClass('tb-alter-submit-storage'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).removeAttr("readonly");
        });
    });
    event.preventDefault();
});

//存储点击保存
$('#user-add-storage').on('click','.tb-alter-submit-storage', function (event) {
    $("#user-add-storage input[type='radio']:checked").each(function (){
        console.log($('#user-add-storage').find(' .tb-alter-submit-storage').html('编辑'));
        console.log($('#user-add-storage').find(' .tb-alter-submit-storage').addClass('tb-alter-storage').removeClass('tb-alter-submit-storage'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.tb-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});

$('body').on('focus','.pop-tb tr', function () {
    console.log($(this).html())
    $(this).find("input[type='radio']").prop('checked',true);
});

//-----------------查看人员计算机设备添加-----------------
//点击添加
$('#click-user').on('click','.tb-add-computer', function (event) {
    var html='';
    html+=`
    <tr>
    <td><input type="radio" name="computer-select"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-sn"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-place"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-assets_no"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-mac"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-series_no"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-state" /></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-connectivity"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-date"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-brand" /></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-purpose"/></td>
    <td class="tb-input computer-input" ><input type="text" name="computer-remark"/></td>
    </tr>
  `;
    $(this).parent().parent().parent().find('.pop-tb tbody').append(html);
    $('#click-user').find(' .tb-add-computer').html('保存');
    $('#click-user').find(' .tb-add-computer').removeClass('tb-add-computer').addClass('tb-add-submit-computer');
    event.preventDefault();

});
//计算机点击保存
$('#click-user').on('click','.tb-add-submit-computer', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-add-submit-computer').html('新增'));
        console.log($('#click-user').find(' .tb-add-submit-computer').addClass('tb-add-computer').removeClass('tb-add-submit-computer'));
        $(this).parent().parent().find('.computer-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//计算机点击删除行
$('#click-user').on('click','.tb-del-computer', function (event) {
    $("#click-user input[name='computer-select']:checked").each(function () {
        $(this).parent().parent().remove();
    });
    event.preventDefault();
});
//-----------------查看人员计算机设备修改-----------------
//点击编辑
$('#click-user').on('click','.tb-alter-computer', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-alter-computer').html('保存'));
        console.log($('#click-user').find(' .tb-alter-computer').removeClass('tb-alter-computer').addClass('tb-alter-submit-computer'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.computer-input input').each(function () {
            $(this).removeAttr("readonly");
        });
    });
    event.preventDefault();
});
//计算机点击保存
$('#click-user').on('click','.tb-alter-submit-computer', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-alter-submit-computer').html('编辑'));
        console.log($('#click-user').find(' .tb-alter-submit-computer').addClass('tb-alter-computer').removeClass('tb-alter-submit-computer'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.computer-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//-----------------查看人员办公自动化设备添加-----------------
//点击添加
$('#click-user').on('click','.tb-add-office', function (event) {
    var html='';
    html+=`
    <tr>
    <td><input type="radio" name="office-select"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-sn"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-place"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-assets_no" /></td>
    <td class="tb-input office-input" ><input type="text" name="office-mac"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-series_no"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-state" /></td>
    <td class="tb-input office-input" ><input type="text" name="office-connectivity"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-date"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-brand" /></td>
    <td class="tb-input office-input" ><input type="text" name="office-purpose"/></td>
    <td class="tb-input office-input" ><input type="text" name="office-remark"/></td>
    </tr>
`;
    $(this).parent().parent().parent().find('.pop-tb tbody').append(html);
    $('#click-user').find(' .tb-add-office').html('保存');
    $('#click-user').find(' .tb-add-office').removeClass('tb-add-office').addClass('tb-add-submit-office');
    event.preventDefault();

});
//办公自动化点击保存
$('#click-user').on('click','.tb-add-submit-office', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-add-submit-office').html('新增'));
        console.log($('#click-user').find(' .tb-add-submit-office').addClass('tb-add-office').removeClass('tb-add-submit-office'));
        $(this).parent().parent().find('.office-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//办公自动化点击删除行
$('#click-user').on('click','.tb-del-office', function (event) {
    $("#click-user input[name='office-select']:checked").each(function () {
        $(this).parent().parent().remove();
    });
    event.preventDefault();
});
//-----------------查看人员办公自动化设备修改-----------------
//点击编辑
$('#click-user').on('click','.tb-alter-office', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-alter-office').html('保存'));
        console.log($('#click-user').find(' .tb-alter-office').removeClass('tb-alter-office').addClass('tb-alter-submit-office'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.office-input input').each(function () {
            $(this).removeAttr("readonly");
        });
    });
    event.preventDefault();
});
//办公自动化点击保存
$('#click-user').on('click','.tb-alter-submit-office', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-alter-submit-office').html('编辑'));
        console.log($('#click-user').find(' .tb-alter-submit-office').addClass('tb-alter-office').removeClass('tb-alter-submit-office'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.office-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//-----------------查看人员存储设备添加-----------------
//点击添加
$('#click-user').on('click','.tb-add-storage', function (event) {
    var html='';
    html+=`
    <tr>
    <td><input type="radio" name="storage-select"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-sn"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-place"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-assets_no" /></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-mac"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-series_no" /></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-state" /></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-connectivity"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-date"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-brand" /></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-purpose"/></td>
    <td class="tb-input storage-input" ><input type="text" name="storage-remark"/></td>
    </tr>
`;
    $(this).parent().parent().parent().find('.pop-tb tbody').append(html);
    $('#click-user').find(' .tb-add-storage').html('保存');
    $('#click-user').find(' .tb-add-storage').removeClass('tb-add-storage').addClass('tb-add-submit-storage');
    event.preventDefault();

});
//存储点击保存
$('#click-user').on('click','.tb-add-submit-storage', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-add-submit-storage').html('新增'));
        console.log($('#click-user').find(' .tb-add-submit-storage').addClass('tb-add-storage').removeClass('tb-add-submit-storage'));
        $(this).parent().parent().find('.storage-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//存储点击删除行
$('#click-user').on('click','.tb-del-storage', function (event) {
    $("#click-user input[name='storage-select']:checked").each(function () {
        $(this).parent().parent().remove();
    });
    event.preventDefault();
});
//-----------------查看人员存储设备修改-----------------
//点击编辑
$('#click-user').on('click','.tb-alter-storage', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-alter-storage').html('保存'));
        console.log($('#click-user').find(' .tb-alter-storage').removeClass('tb-alter-storage').addClass('tb-alter-submit-storage'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.storage-input input').each(function () {
            $(this).removeAttr("readonly");
        });
    });
    event.preventDefault();
});
//存储点击保存
$('#click-user').on('click','.tb-alter-submit-storage', function (event) {
    $("#click-user input[type='radio']:checked").each(function (){
        console.log($('#click-user').find(' .tb-alter-submit-storage').html('编辑'));
        console.log($('#click-user').find(' .tb-alter-submit-storage').addClass('tb-alter-storage').removeClass('tb-alter-submit-storage'));
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().find('.storage-input input').each(function () {
            $(this).attr({"readonly":"readonly"});
        });
    });
    event.preventDefault();
});
//---------------js419新增
$(function(){
    var box_height = $("#check").offset().top;
    $(window).scroll(function(){
        var this_scrollTop = $(this).scrollTop();
        //console.log($(this).scrollTop(),box_height);
        if(this_scrollTop+50>box_height  ){
            $("#check").addClass('boxfix');
        }else if(this_scrollTop<box_height){
            $("#check").removeClass('boxfix');
        }
    });
});
//------------------------------------------------------------



//计算机提交
$('#click-computer').on('click','#submit', function () {
    var sn=$(this).parent().parent().parent().find('#sn').val();
    var place=$(this).parent().parent().parent().find('#place').val();
    var assets_no=$(this).parent().parent().parent().find('#assets_no').val();
    var mac=$(this).parent().parent().parent().find('#mac').val();
    var series_no=$(this).parent().parent().parent().find('#series_no').val();
    var state=$(this).parent().parent().parent().find('#state').val();
    var connectivity=$(this).parent().parent().parent().find('#connectivity').val();
    var date=$(this).parent().parent().parent().find('#date').val();
    var brand=$(this).parent().parent().parent().find('#brand').val();
    var purpose=$(this).parent().parent().parent().find('#purpose').val();
    var remark=$(this).parent().parent().parent().find('#remark').val();
    var id=$(this).parent().parent().parent().find('#id').val();
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/updateComputer',
        data:{id:id,sn:sn,place:place,assets_no:assets_no,mac:mac,series_no:series_no,state:state,connectivity:connectivity,date:date,brand:brand,purpose:purpose,remark:remark},
        success: function(){
            initialPage();
            $('#eq-pop-computer').modal('hide');
        }
    })
})
//自动化设备提交
$('#click-office').on('click','#submit', function () {
    var sn=$(this).parent().parent().parent().find('#sn').val();
    var place=$(this).parent().parent().parent().find('#place').val();
    var assets_no=$(this).parent().parent().parent().find('#assets_no').val();
    var mac=$(this).parent().parent().parent().find('#mac').val();
    var series_no=$(this).parent().parent().parent().find('#series_no').val();
    var state=$(this).parent().parent().parent().find('#state').val();
    var connectivity=$(this).parent().parent().parent().find('#connectivity').val();
    var date=$(this).parent().parent().parent().find('#date').val();
    var brand=$(this).parent().parent().parent().find('#brand').val();
    var purpose=$(this).parent().parent().parent().find('#purpose').val();
    var remark=$(this).parent().parent().parent().find('#remark').val();
    var id=$(this).parent().parent().parent().find('#id').val();
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/updateOffice',
        data:{id:id,sn:sn,place:place,assets_no:assets_no,mac:mac,series_no:series_no,state:state,connectivity:connectivity,date:date,brand:brand,purpose:purpose,remark:remark},
        success: function(){
            initialPage();
            $('#eq-pop-office').modal('hide');
        }
    })
})
//存储提交
$('#click-storage').on('click','#submit', function () {
    var sn=$(this).parent().parent().parent().find('#sn').val();
    var place=$(this).parent().parent().parent().find('#place').val();
    var assets_no=$(this).parent().parent().parent().find('#assets_no').val();
    var mac=$(this).parent().parent().parent().find('#mac').val();
    var series_no=$(this).parent().parent().parent().find('#series_no').val();
    var state=$(this).parent().parent().parent().find('#state').val();
    var connectivity=$(this).parent().parent().parent().find('#connectivity').val();
    var date=$(this).parent().parent().parent().find('#date').val();
    var brand=$(this).parent().parent().parent().find('#brand').val();
    var purpose=$(this).parent().parent().parent().find('#purpose').val();
    var remark=$(this).parent().parent().parent().find('#remark').val();
    var id=$(this).parent().parent().parent().find('#id').val();
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/updateStorage',
        data:{id:id,sn:sn,place:place,assets_no:assets_no,mac:mac,series_no:series_no,state:state,connectivity:connectivity,date:date,brand:brand,purpose:purpose,remark:remark},
        success: function(){
            initialPage();
            $('#eq-pop-storage').modal('hide');
        }
    })
})
//查看人员学院研究所二级联动
$('#click-user').on('click','.college-select #college', function (event) {
    var college=$(this).val();
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/getLabByCollege',
        data:{college:college},
        success: function(list){
            var html=`<option value="null">--请选择--</option>`;
            for(var i in list.laboratory){
                html+=`<option>${list.laboratory[i].laboratory}</option>`;
            }
            $('#click-user #laboratory').empty().html(html);
        }
    })
    event.preventDefault();
})
//新增人员学院研究所二级联动
$('#user-add-pop').on('click','.college-select #college', function (event) {
    var college=$(this).val();
    console.log("113");
    $.ajax({
        type: 'POST',
        async: false,
        url: '/nuaa/getLabByCollege',
        data:{college:college},
        success: function(list){
            var html=`<option value="null">--请选择--</option>`;
            for(var i in list.laboratory){
                html+=`<option>${list.laboratory[i].laboratory}</option>`;
            }
            $('#user-add-pop #laboratory').empty().html(html);
        }
    })
    event.preventDefault();
})
//搜索人员功能
$('.search-box').on('click','.inquire-user', function () {
    var no=$(this).parent().find('input').val();
    console.log(no);
    $.ajax({
        type: 'POST',
        //async: false,
        url: '/nuaa/inquireUser',
        data:{no:no},
        success: function(list){
            if(list.user!=null){
                var html_user=`
            <div class="col-xs-2 col-lg-1 user-info-box">
                <div class="user-info"  data-toggle="modal" data-target="#user" user-no="${list.user.no}">
                <div class="img-box"><img src="/nuaa/image/head.png" alt=""/></div>
                <p>${list.user.name}</p>
                </div>
                </div>
    		`;
                $('#view-user').empty().html(html_user);
                $('#user_paginate').empty();
            }else
                alert("没有查询到工号为"+no+"的用户");
        }
    })
})
//搜索设备功能
$('.search-box').on('click','.inquire-machine', function () {
    var sn=$(this).parent().find('input').val();
    console.log(sn);
    $.ajax({
        type: 'POST',
        //async: false,
        url: '/nuaa/inquireMachine',
        data:{sn:sn},
        success: function(list){
            if(list.machine!=null){
                if(list.machine.type=="计算机"){
                    var html=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                    <div class="user-info"  data-toggle="modal" data-target="#eq-pop-computer" computer-id="${list.machine.id}">
                    <div class="img-box"><img src="/nuaa/image/com.png" alt=""/></div>
                    <p>${list.machine.sn}</p>
                    </div>
                    </div>`;
                    $('#view-computer').empty().html(html);
                    $('#view-office').empty();
                    $('#view-storage').empty();
                }
                else if(list.machine.type=="自动办公设备"){
                    var html=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                    <div class="user-info"  data-toggle="modal" data-target="#eq-pop-office" office-id="${list.machine.id}">
                    <div class="img-box"><img src="/nuaa/image/dayinji.png" alt=""/></div>
                    <p>${list.machine.sn}</p>
                    </div>
                    </div>`;
                    $('#view-office').empty().html(html);
                    $('#view-storage').empty();
                    $('#view-computer').empty();
                }
                else if(list.machine.type=="移动存储"){
                    var html=`
                <div class="col-xs-2 col-lg-1 user-info-box">
                    <div class="user-info"  data-toggle="modal" data-target="#eq-pop-storage" storage-id="${list.machine.id}">
                    <div class="img-box"><img src="/nuaa/image/yingpan.png" alt=""/></div>
                    <p>${list.machine.sn}</p>
                    </div>
                    </div>`;
                    $('#view-storage').empty().html(html);
                    $('#view-computer').empty();
                    $('#view-office').empty();
                }
                $('#computer_paginate').empty();
                $('#office_paginate').empty();
                $('#storage_paginate').empty();
            }else
                alert("没有查询到设备受控号为"+sn+"的设备");
        }
    })
})
//导出Excel
$('.excel').click(function () {
    $.ajax({
        type: 'POST',
        url: '/nuaa/excel',
    })
});