/**
 * Created by PVer on 2017/4/13.
 */
    $(function () {
        var html='';
        $.ajax({
            type: 'GET',
            url: url_top+'monitor/prv/user/PwdGrant',
            data:{sessionId:sessionStorage['sessionid']},
            success: function(data){
                if(data.success==true){
                    html=`
       <div class="modal fade" id="change-pw-pop" tabindex="-1" role="dialog" aria-labelledby="ModalLabel1" aria-hidden="true" data-backdrop="static" >
       `
                }else if(data.success==false){
                    html=`
       <div class="modal fade" id="change-pw-pop-fade" tabindex="-1" role="dialog" aria-labelledby="ModalLabel1" aria-hidden="true" data-backdrop="static" >
       `
                }
                html+=`
                  <div class="modal-dialog" style="width:560px;margin-top: 220px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                ×
                            </button>
                            <h4 class="modal-title" id="myModalLabe6">
                                密码修改
                            </h4>
                        </div>
                        <div class="modal-body">
                            <div class="pop-main">
                                <div class="monitor-station">
                                    <p class="main-title"></p>
                                    <div class="head-box">
                                        <form>
                                            <div class="row">
                                                <div class="col-xs-12 input-line">
                                                    <span>登录名</span>
                                                    <div class="input-box">
                                                        <input type="text"/>
                                                    </div>
                                                    <b>
                                                        <!--<i class="glyphicon glyphicon glyphicon-ok"></i>提示信息-->
                                                    </b>
                                                </div>
                                                <div class="col-xs-12 input-line">
                                                    <span>原密码</span>
                                                    <div class="input-box">
                                                        <input type="text"/>
                                                    </div>
                                                    <b>
                                                        <!--<i class="glyphicon glyphicon glyphicon-remove"></i>提示信息-->
                                                    </b>
                                                </div>
                                                <div class="col-xs-12 input-line">
                                                    <span>新密码</span>
                                                    <div class="input-box">
                                                        <input type="text"/>
                                                    </div>
                                                    <b>
                                                        <!--<i class="glyphicon glyphicon glyphicon-ok"></i>提示信息-->
                                                    </b>
                                                </div>
                                                <div class="col-xs-12 input-line">
                                                    <span>重复输入密码</span>
                                                    <div class="input-box">
                                                        <input type="text"/>
                                                    </div>
                                                    <b>
                                                        <!--<i class="glyphicon glyphicon glyphicon-remove"></i>提示信息-->
                                                    </b>
                                                </div>
                                            </div>
                                            <div class="row"><div class="col-xs-4"></div><div class="col-xs-4"></div><div class="col-xs-4"><botton type="button" class="btn my-btn" id='change-pw-submit'>保存</botton></div></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `;
                $('section.content').append(html);
            }
        });
        $('section.content').append(html);
    });
var url_top='http://202.119.65.27:9999/';
var pathname=window.location.pathname;
var loading='';
loading=`
    <div class="loading">
        <img src="../../../image/loading.gif" alt=""/>
    </div>
`;
$('body').prepend(loading);

$('#sidebar').append(`
        <div class="menu-loading ">
         <img src="../../../image/menu-loading.gif" alt=""/>
        </div>
    `);
$.getJSON(url_top+'monitor/prv/role/getCurrentGrants', function(data){
    console.debug(data);
    if(data.success) {
        var html = '';
        var hret_str='';
        var now_href=window.location.pathname;
        var hret_arr=[];
        for(var i in data.rows){
            html += '<li class="treeview ' + data.rows[i].attributes.img + '">';
            html += '<a href="#">';
            html += '<i class="fa"></i> <span>' + data.rows[i].attributes.gt_class_name + '</span>';
            html += '</a>';
            html += '<ul class="treeview-menu">';
            for(var x in data.rows[i].attributes.grantLines){
                html += '<li class="secondary-menu lifade" data-class-id='+data.rows[i].attributes.grantLines[x].gt_id+'><a href="../../' + data.rows[i].attributes.grantLines[x].path + '/index.html"><i class="fa fa-circle"></i> ' + data.rows[i].attributes.grantLines[x].gt_name + ' <i class="fa  fa-caret-right"></i></a></li>';
                console.error(data.rows[i].attributes.grantLines[x].gt_id);
                console.error(data.rows[i].attributes.grantLines[x].path);
            }
            html += '</ul>';
        }
        $(".sidebar-menu").empty().html(html);
        //console.log(html);
        $('.sidebar-menu').find(".secondary-menu").each(function () {
            var int;
            hret_str=$(this).find('a').attr('href');
            hret_arr=hret_str.split('/');
            int=hret_arr[3];
            if(now_href.indexOf(int)>0){
                $(this).find('a').addClass('active');
                $(this).parent().parent().addClass('active');
            };
        });
        //不同角色的不同权限
        $.ajax({
            type: "GET",
            url: url_top+"monitor/prv/role/roleGrant",
            data:{sessionId:sessionStorage['sessionid']},
            beforeSend: function () {
                $('.menu-loading').addClass('loadingin');
            }
            ,error: function () {
                $('.menu-loading').removeClass('loadingin');
                alert('出错');
            },
            success: function (list) {
                var gt_id=null;
                $.each(list.roleGrant, function (i, p) {
                    gt_id=p.gt_id;
                    console.log(gt_id);
                    console.log($('.sidebar-menu').find(`[data-class-id=${gt_id}]`).removeClass('lifade').addClass('liin'));
                });
                $('.menu-loading').removeClass('loadingin');
            }
        })
    } else{
        alert(data.errors);
    }
});
var login_name;
//用户信息同步
$.ajax({
    type: 'GET',
    url: url_top+'monitor/prv/user/getName',
    data:{sessionId:sessionStorage['sessionid']},
    success: function(list){
        var html='';
        $.each(list.names, function(i, p){
            console.log(p);
            login_name=p.login_name;
            html=`
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <img src="../../../image/111.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">${p.cu_name}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img src="../../../image/111.jpg" class="img-circle" alt="User Image">
                <p>
                  ${p.cu_name}
                     <small>
                        ${p.role_name}
                    </small>
                </p>

              </li>
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat" id='change-pw'data-toggle="modal" data-target="#change-pw-pop">修改密码</a>

                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat" onclick="logout()">登出</a>
                </div>
              </li>
            </ul>
            `;
        });
        $('#userName').empty().html(html);
        $('.user-footer').on('click','#change-pw',function(e){
            console.error('点击');
            var address=$('#change-pw-pop');
            clear_data(address);
            e.preventDefault();
            if($('section.content').find('#change-pw-pop-fade').length==1) {
                alert('暂无修改密码权限');
            }
            $('#change-pw-pop').find('.input-line').eq(0).find('input').val(login_name).attr("disabled",true);
            $('#change-pw-pop').on('click','#change-pw-submit', function () {
                console.error($('section.content').find('#change-pw-pop').length);
                if($('section.content').find('#change-pw-pop').length<1){
                    alert('暂无修改密码权限');
                }else {
                    var data = $('section.content').find('#change-pw-pop');
                    add_data_type(data);
                    var oldpwd = $('#change-pw-pop').find('.input-line').eq(1).find('input').val();
                    var newpwd = $.trim($('#change-pw-pop').find('.input-line').eq(2).find('input').val());
                    var newpwd1 = $.trim($('#change-pw-pop').find('.input-line').eq(3).find('input').val());
                    var RegEx_judgment = pwd_verify(address, newpwd);
                    if (RegEx_judgment == true) {
                        $.ajax({
                            type: 'POST',
                            url: url_top + 'monitor/prv/user/updateOwnPwd',
                            data: {
                                sessionId: sessionStorage['sessionid'],
                                login_name: login_name,
                                oldpwd: $.trim(oldpwd),
                                newpwd: $.trim(newpwd)
                            },
                            success: function (data) {
                                if (data.success == false) {
                                    console.error(data.errors);
                                    remove_repetition(address, data.errors);
                                } else {
                                    alert('密码修改成功');
                                    location.reload();
                                }
                            }
                        });
                    }
                }
            });

        })
        $("#change-pw-pop").on("hidden.bs.modal", function () {
            console.error($('#change-pw').html());
            $('#change-pw-pop').unbind('click');
        });
    }
});
$(function(){
    if( $(window).width() < 1300 ) {
        console.error($(window).width());
        $('body').addClass('sidebar-collapse');
    }
});
$('.loading').height($(document).height());
$('.menu-loading').height($('#sidebar').height());
//------------------------正则函数封装
//数字加字母  编号名称
function type1(txt) {
    var patrn = /^[A-Za-z0-9]+$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//6到10位数字和字母组成 密码
function type2(txt) {
    var patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//中文、英文、数字包括下划线 操作员名称
function type3(txt) {
    var patrn = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//正数、负数、和小数  数值类
function type4(txt) {
    var patrn = /^(\-|\+)?\d+(\.\d+)?$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//不能输入特殊字符 角色名称类
function type5(txt) {
    var patrn = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//可输入可不输入，输入则必须为数值
function type6(txt) {
    var patrn = /^$|^(\-|\+)?\d+(\.\d+)?$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//仅限数字字母和下划线
function type7(txt) {
    var patrn = /^[A-Za-z0-9_]+$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//MAC地址
function type8(txt) {
    var patrn = /[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}/;
    if (!patrn.exec(txt)) return false;
    return true
}
//IP地址
function type9(txt) {
    var patrn = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//匹配中文或英文
function type10(txt){
    var patrn = /[a-zA-Z\u4E00-\u9FA5]+$/;
    if (!patrn.exec(txt)) return false;
    return true
}
//非负数
function type11(txt){
    var patrn =  /^\d+(\.{0,1}\d+){0,1}$/ ;
    if (!patrn.exec(txt)) return false;
    return true
}
//验证两次密码是否一致
function type12(txt,newpwd){
    if(txt!=newpwd){return false;}
    return true;
}
//新增页关闭则清空内容
function clear_data(address){
    if((address.css('display') == 'none')){
        address.find('.main-title').empty().html('添加项目');
        address.find(".head-box input[type='text']").each(function () {
            $(this).val('');
            $(this).parent().next().empty();
        });
        address.find(".head-box select").each(function () {
            $(this).parent().next().empty();
        });
        address.find(".head-box input[type='button']").each(function () {
            $(this).parent().next().empty();
        });
    }

}
function add_data_type(address){
    var i=1;
    //累加加上input
    address.find(".head-box .input-box").each(function () {
        if($(this).find("input[type='text']").length > 0){
            $(this).children().attr('data-type',i);
        }else if($(this).find("input[type='button']").length > 0){
            $(this).children().attr('data-type',0);
        }
        i++;
    });
}
//监测新增/修改的内容是否在数据库中已存在
function remove_repetition(pop,data){
    console.error(pop,data);
    var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>${data}</span>
     `;
    pop.find('.main-title').empty().append(html);
}
function pwd_verify(address,newpwd){
    //console.error($('#maintenance').find('.input-box input[data-type]').length);
    var arr=[];
    //验证input框
    address.find('.input-line input[data-type]').each(function () {
        var num;
        switch(parseInt($(this).attr('data-type'))){
            case 2:
                num=type2($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>限6到10位数字和字母');
                    arr.push('-1');
                }
                break;
            case 3:
                num=type2($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>限6到10位数字和字母');
                    arr.push('-1');
                }
                break;
            case 4:
                num=type12($.trim($(this).val()),newpwd);
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true&&newpwd.length>0){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>前后密码不一致');
                    arr.push('-1');
                }
                break;
        }
    });
    //验证select框
    address.find('.input-line select').each(function () {
        var num=$(this).find('option:selected').val();
        //console.error(num);
        $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
        if(num!='null'){
            $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
            arr.push('1');
        }else{
            $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>不能为空');
            arr.push('-1');
        }
    });
    if($.inArray('-1', arr)==-1){
        return true;
    }else{
        return false;
    }
    arr=[];
}
