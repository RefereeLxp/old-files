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
    url: 'http://202.119.65.27:9999/monitor/prv/role/getAll',
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
    var role_id=$(this).parent().parent().find('td').eq(0).html(),
        role_code=$(this).parent().parent().find('td').eq(1).html(),
        role_name=$(this).parent().parent().find('td').eq(2).html();
    //var id=$(this).parent().parent().attr('data-id');
    //console.log(id);
    console.log(role_id,role_code,role_name);
    $.ajax({
        type: 'POST',
        url: 'http://202.119.65.27:9999/monitor/prv/role/destroy',
        data: {sessionId:sessionStorage['sessionid'],role_id: role_id, role_code:role_code,role_name:role_name},
        success: function(){
            alert('已删除');
            setTimeout(location.reload(),2000);
        }
    });
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
        url: 'http://202.119.65.27:9999/monitor/prv/role/getGrant',
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
    if(($('#maintenance').css('display') == 'none')){
        $('#maintenance').find('.main-title').empty().html('修改项目');
        $('.modal-backdrop').removeClass('in');
        $('#maintenance').find(".head-box input[type='text']").each(function () {
            $(this).val('');
        });
    }
    var gt_id=``;
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
    var role_code=$('#maintenance form').find('input').eq(0).val(),
        role_name=$('#maintenance form').find('input').eq(1).val();
    //console.log(role_code,role_name,gt_id);
    arr.push(role_code,role_name,gt_id);
    if($.inArray('', arr)==-1){
        $.ajax({
            type: 'POST',
            url: ' http://202.119.65.27:9999/monitor/prv/role/create',
            data: {sessionId:sessionStorage['sessionid'],role_code: role_code, role_name: role_name,gt_id:gt_id},
            beforeSend: function () {
                $('.loading').addClass('loadingin');
            },
            error: function () {
                $('.loading').removeClass('loadingin');
                alert('出错');
            },
            success: function(){
                $("#example3").DataTable();
                $('#role-select li input').each(function () {
                    $(this).attr("checked",false);
                })
                $('.loading').removeClass('loadingin');
                setTimeout(location.reload(),2000);
            }
        });
    }else{
        var html=`
                        <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
                    `;
        $('#maintenance').find('.main-title').empty().append(html);
    }
});
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
        url: 'http://202.119.65.27:9999/monitor/prv/role/getAllGrant',
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
        gt_id=AccessPermission()
        var role_code=$('#revise form').find('input').eq(0).val(),
            role_name=$('#revise form').find('input').eq(1).val();
        var arr=[];
        console.log(role_id,role_code,role_name,gt_id);
        arr.push(role_id,role_code,role_name,gt_id);
        if($.inArray('', arr)==-1){
            $.ajax({
                type: 'POST',
                url: ' http://202.119.65.27:9999/monitor/prv/role/update',
                data: {sessionId:sessionStorage['sessionid'],role_id:role_id,role_code: role_code,role_name: role_name,gt_id:gt_id},
                beforeSend: function () {
                    $('.loading').addClass('loadingin');
                },
                error: function () {
                    $('.loading').removeClass('loadingin');
                    alert('出错');
                },
                success: function(){
                    $("#example3").DataTable();
                    $('#role-select').find("input").each(function () {
                        $(this).attr("checked",false);
                    });
                    $('.loading').removeClass('loadingin');
                    setTimeout(location.reload(),2000);

                }
            });

        }else{
            var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
     `;
            $('#revise').find('.main-title').empty().append(html);
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
        //console.log($('#role-select').find('input:checked').val());
        var str=$(this).find('input:checked').val();
        if(str!=undefined){
            gt_id+=str+',';
        }
    });
    gt_id=gt_id.slice(0,-1);
    return gt_id;
}