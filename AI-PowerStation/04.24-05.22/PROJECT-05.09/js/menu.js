/**
 * Created by PVer on 2017/4/13.
 */
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
$.getJSON('http://202.119.65.27:9999/monitor/prv/role/getCurrentGrants', function(data){
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
            url: "http://202.119.65.27:9999/monitor/prv/role/roleGrant",
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
//用户信息同步
$.ajax({
    type: 'GET',
    url: 'http://202.119.65.27:9999/monitor/prv/user/getName',
    data:{sessionId:sessionStorage['sessionid']},
    success: function(list){
        var html='';
        $.each(list.names, function(i, p){
            console.log(p);
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
                  <a href="#" class="btn btn-default btn-flat">修改密码</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat" onclick="logout()">登出</a>
                </div>
              </li>
            </ul>
            `;
        });
        $('#userName').empty().html(html);
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
//IP地址
function type4(txt) {
    var patrn = /\d+\.\d+\.\d+\.\d+/;
    if (!patrn.exec(txt)) return false;
    return true
}

//正数、负数、和小数  数值类
function type4(txt) {
    var patrn = /^(\-|\+)?\d+(\.\d+)?$/;
    if (!patrn.exec(txt)) return false;
    return true
}