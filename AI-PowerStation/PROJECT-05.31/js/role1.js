/**
 * Created by PVer on 2017/4/18.
 */
/**
 * Created by PVer on 2017/3/25.
 */
function logout(){
    sessionStorage.removeItem('sessionid');
    location.href='../../home/login.html'
}
//显示全部角色
$.ajax({
    type: 'GET',
    data:{sessionId:sessionStorage['sessionid']},
    url: url_top+'monitor/prv/role/getAll',
    success: function(list){
        var html = '';
        if(list.length == 0){
            console.log('错误');
        }else{
            $.each(list.role, function(i, p){
                html += `
                <tr data-id="${p.id}">
                      <td>${p.role_id}</td>
                      <td>${p.role_code}</td>
                      <td>${p.role_name}</td>
                      <td>
                        <a href="#" class="role-revise" data-toggle="modal" data-target="#revise"onclick="show(this)">修改</a>
                        <span>|</span>
                        <a href="#" class="role-del">删除</a>
                       </td>
                  </tr>
				`;
            });
        }
        $('#example2 tbody').empty().html(html);
        $("#example2").DataTable();
    }
});
//删除角色
$('#example2').on('click','.role-del', function (e) {
    e.preventDefault();
    if(confirm('确认要删除？')) {
        var role_id = $(this).parent().parent().find('td').eq(0).html(),
            role_code = $(this).parent().parent().find('td').eq(1).html(),
            role_name = $(this).parent().parent().find('td').eq(2).html();
        //var id=$(this).parent().parent().attr('data-id');
        //console.log(id);
        console.log(role_id, role_code, role_name);
        $.ajax({
            type: 'POST',
            url: url_top + 'monitor/prv/role/destroy',
            data: {
                sessionId: sessionStorage['sessionid'],
                role_id: role_id,
                role_code: role_code,
                role_name: role_name
            },
            success: function () {
                alert('已删除');
                setTimeout(location.reload(), 2000);
            }
        });
    }
});

Access_all_permission();
$('#maintenance').on('click',"[data-target='#role-select']",function () {
    Access_all_permission();
});
function Access_all_permission(){
    //获取所属角色权限
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/prv/role/getGrant',
        success: function(list){
            var html1=``;
            var class_id=0;
            $.each(list.GrantClass, function(i, p){
                console.log(p);
                class_id=p.gt_class_id;
                html1+=`
            <div class="panel panel-default">
                        <div class="panel-heading">
                          <p  data-class_id="${p.gt_class_id}">
                            <a data-toggle="collapse" data-parent="#SelectBox" href="#collapse${p.gt_class_id}">
                              <span class="collapse-one glyphicon glyphicon-triangle-bottom"></span>
                              ${p.gt_class_name}
                            </a>
                          </p>
                        </div>
                        <div id="collapse${p.gt_class_id}" class="panel-collapse collapse">
                          <div class="list-group">
                            <ul class="list-unstyled">
                            `;
                $.each(list.GrantLine, function(i, p){
                    if(p.gt_class_id==class_id&&p.gt_id!=null){
                        html1+=`
                    <li><input type="checkbox" value="${p.gt_id}">${p.gt_name}</li>
                        `;
                    }
                });
                html1+=`
            </ul>
                          </div>
                        </div>
                      </div>
            `;
            });
            $('#role-select .select-box').empty().html(html1);
        }
    });
}
//-----------------------------------------------------新增角色
$('.roleAdd').click(function () {
    var data=$('#maintenance');
    clear_data(data);
    var gt_id=``;
    $('#maintenance form').find('input').eq(0).attr('data-type',1);
    $('#maintenance form').find('input').eq(1).attr('data-type',2);
    $('#maintenance form').find('input').eq(2).attr('data-type', 0);
});
//权限选择页面的按钮
$('#roleAdd-submit1').click(function () {
    Newrole();
    $('#role-select').css('display','none');
});
//新增角色确认按钮
$('#roleAdd-submit').click(function () {
    gt_id=Newrole();
    var arr=[];
    var role_code=$.trim($('#maintenance form').find('input').eq(0).val()),
        role_name=$.trim($('#maintenance form').find('input').eq(1).val());
    //console.log(role_code,role_name,gt_id);
    arr.push(role_code,role_name,gt_id);
    var address=$('#maintenance');
    var RegEx_judgment=role_verify(address,gt_id.length);
    console.error(RegEx_judgment);
    if(RegEx_judgment==true){
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/prv/role/create',
                data: {sessionId:sessionStorage['sessionid'],role_code: role_code, role_name: role_name,gt_id:gt_id},
                beforeSend: function () {
                    $('.loading').addClass('loadingin');
                },
                error: function () {
                    $('.loading').removeClass('loadingin');
                    alert('出错');
                },
                success: function(data){
                    if(data.success==false){
                        $('.loading').removeClass('loadingin');
                        remove_repetition(address,data.errors);
                    }else {
                        console.error('失败');
                        $("#example3").DataTable();
                        $('#role-select li input').each(function () {
                            $(this).attr("checked", false);
                        })
                        $('.loading').removeClass('loadingin');
                        setTimeout(location.reload(), 2000);
                    }
                }
            });
    }

});
//role界面正则验证
function role_verify(address,len){
    //console.error($('#maintenance').find('.input-box input[data-type]').length);
    var arr=[];
    address.find('.input-line input[data-type]').each(function () {
        var num;
        switch(parseInt($(this).attr('data-type'))){
            case 1:
                num=type1($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>仅限数字、字母');
                    arr.push('-1');
                }
                break;
            case 2:
                num=type3($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>仅限中文、字母、数字');
                    arr.push('-1');
                }
                break;
            case 0:
                console.error(len);
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(len>0){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else{
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>权限选择不能为空');
                    arr.push('-1');
                }
                break;
        }
    })
    if($.inArray('-1', arr)==-1){
        console.error('true');
        return true;
    }else{
        console.error('false');
        return false;
    }
    arr=[];
}
function Newrole(){
    var checkstr='',gt_id='';
    $('#role-select .list-unstyled li').each(function () {
        //console.log($('#role-select').find('input:checked').val());
        var str=$(this).find('input:checked').val();
        if(str!=undefined){
            gt_id+=str+',';
        }
    });
    gt_id=gt_id.slice(0,-1);
    return gt_id;
}
//-------------------------------------------------------修改角色信息
$('#example2 tbody').on('click','.role-revise', function () {
    var role_id=$(this).parent().parent().find('td').eq(0).html();
    var gt_id='';
    //同步角色权限
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/prv/role/getAllGrant',
        success: function(list){
            var html = '';
            var p=list.roles;
            var gt_id=[];
            for(var i=0;i<p.length;i++){
                if(role_id==p[i].role_id){
                    console.log(p[i].gt_id);
                    $("#role-select input[value = "+ p[i].gt_id +"]").attr("checked",true);
                }
            }
        }
    });
    //修改角色权限确认按钮
    $('#roleAdd-submit1').click(function () {
        AccessPermission();
        console.log(gt_id);
        $('#role-select').css('display','none');
    });
    //修改角色确认按钮
    $('#roleRevise-submit').click(function () {
        gt_id=AccessPermission();
        var role_code=$.trim($('#revise form').find('input').eq(0).val()),
            role_name=$.trim($('#revise form').find('input').eq(1).val());
        var arr=[];
        console.log(role_id,role_code,role_name,gt_id);
        arr.push(role_id,role_code,role_name,gt_id);
        var address=$('#revise');
        var RegEx_judgment=role_verify(address,gt_id.length);
        console.error(RegEx_judgment);
        if(RegEx_judgment==true){
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/prv/role/update',
                data: {sessionId:sessionStorage['sessionid'],role_id:$.trim(role_id),role_code: $.trim(role_code),role_name: $.trim(role_name),gt_id:$.trim(gt_id)},
                beforeSend: function () {
                    $('.loading').addClass('loadingin');
                },
                error: function () {
                    $('.loading').removeClass('loadingin');
                    alert('出错');
                },
                success: function(data){
                    if(data.success==false){
                        console.error(data.errors);
                        remove_repetition(address,data.errors);
                        $('.loading').removeClass('loadingin');

                    }else {
                        $("#example3").DataTable();
                        $('#role-select').find("input").each(function () {
                            $(this).attr("checked", false);
                        });
                        $('.loading').removeClass('loadingin');
                        setTimeout(location.reload(), 2000);
                    }
                }
            });
        }

    });
});
$('.cu_role_list li input:checked').click(function () {
    $(this).attr("checked",false);
    console.log($(this).parent().parent().find('span').html());
});
$(function () {
   if(!$('#maintenance').hasClass('in')||!$('#role-select').hasClass('in')||!$('#revise').hasClass('in')){
       $('.modal-backdrop').css('display','none');
   }
});
//获取填入的角色权限
function AccessPermission(){
    if(($('#revise').css('display') == 'none')){
        console.log('saddsa');
        $('#revise').find('.main-title').empty().html('修改项目');
    }
    gt_id='';
    $('#role-select .list-unstyled li').each(function () {
        var str=$(this).find('input:checked').val();
        if(str!=undefined){
            gt_id+=str+',';
        }
    });
    gt_id=gt_id.slice(0,-1);
    return gt_id;
}
function clear_data(address){
    var i=1;
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
$('#role-select').on('hidden.bs.modal', function (e) {
    $(this).find('.select-box .in').each(function () {
        $(this).removeClass('in');
    });
    $(this).find('.select-box .input:checked').each(function () {
        console.error($(this).prop(checked,false));
    })
    var data=$('#role-select');
    clear_data(data);
});