/**
 * Created by PVer on 2017/3/27.
 */
function logout(){
    sessionStorage.removeItem('sessionid');
    location.href='../../home/login.html'
}
//操作员获取
$.ajax({
    type: 'GET',
    data:{sessionId:sessionStorage['sessionid']},
    url: 'http://202.119.65.27:9999/monitor/prv/user/findAllUser',
    success: function(list){
        var html = '';
        if(list.length == 0){
            console.log('错误');
        }else{
            $.each(list.user, function(i, p){
                html += `
                     <tr data-id="${p.cu_id}">
                            <td>${p.cu_id}</td>
                            <td>${p.cu_code}</td>
                            <td>${p.cu_name}</td>
                            <td data-show="no" data-role_id=${p.role_id}>${p.role_name}</td>
                            <td>${p.login_name}</td>
                            <td>
                                <a href="#" class="cu-revise" data-toggle="modal" data-target="#revise" onclick="show(this)">修改</a>
                                <span>|</span>
                                 <a href="#" class="cu-del">删除</a>
                                 <span>|</span>
                                 <a href="#" class="cu-pw-revise" data-toggle="modal" data-target="#pw-revise">修改密码</a>
                            </td>
                        </tr>
				`;
            });
        }
        $('#example2 tbody').empty().html(html);
        $("#example2").DataTable();
    }
});
//删除操作员 传入cu_id
$('#example2').on('click','.cu-del', function (e) {
    e.preventDefault();
    var cu_id=$(this).parent().parent().find('td').eq(0).html();
    console.log(cu_id);
    $.ajax({
        type: 'POST',
        url: 'http://202.119.65.27:9999/monitor/prv/user/destroy',
        data: {sessionId:sessionStorage['sessionid'],cu_id: cu_id},
        success: function(){
            alert('已删除');
            setTimeout(location.reload(),2000);
        }
    });
});
//增加操作员
$('#ctAdd').click(function(){
    if(($('#maintenance').css('display') == 'none')){
        $('#maintenance').find('.main-title').empty().html('添加项目');
        $('#maintenance').find(".head-box input[type='text']").each(function () {
            $(this).val('');
        });
    }
    //获取所属角色
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: 'http://202.119.65.27:9999/monitor/prv/role/getAll',
        success: function (list) {
            console.log('请选择角色');
            var html1 = ` <option value=null>--请选择角色--</option>`;
            if (list.length == 0) {
                console.log('错误');
            } else {
                $.each(list.role, function (i, p) {
                    html1 += `
                                    <option value=${p.role_id}>${p.role_name}</option>
                                    `;
                });
            }
            $('#role_select').empty().html(html1);
        }
    });
});

$('#maintenance').on('click','#role_select_btn',function (){
    //获取操作员所有权限
    console.log('获取操作员所有权限');
    all_role();
    var cu_str=gain_role_str();
});
//修改操作员
$('#example2').on('click','.cu-revise', function () {
    var role_id_old=$(this).parent().parent().find('td').eq(3).attr('data-role_id');
    var cu_id=$(this).parent().parent().find('td').eq(0).html();
    if(($('#revise').css('display') == 'none')){
        console.log('jiu');
        $('#revise').find('.main-title').empty().html('修改项目');
    }
    //获取所属角色
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: 'http://202.119.65.27:9999/monitor/prv/role/getAll',
        success: function (list) {
            var html1 = ` <option value=null>--请选择角色--</option>`;
            if (list.length == 0) {
                console.log('错误');
            } else {
                $.each(list.role, function (i, p) {
                    html1 += `
                                    <option value=${p.role_id}>${p.role_name}</option>
                                    `;
                });
            }
            $('#revise').find('#role_select').empty().html(html1);
            $('#revise').find("#role_select option[value="+role_id_old+"]").attr('selected',true);
        }
    });
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: 'http://202.119.65.27:9999/monitor/prv/user/findStation',
        success: function(list){
            var html1=``;
            var parent_id=0;
            $.each(list.center, function(i, p){
                parent_id=p.st_id;
                html1+=`
            <div class="panel panel-default">
                        <div class="panel-heading">
                        <div class=" multiselect">
                            <lable><input type="radio" name="role${p.st_id}" value="1"/>查看</lable>
                            <lable><input type="radio" name="role${p.st_id}" value="2"/>操作</lable>
                            <lable><input type="radio" name="role${p.st_id}" value="3"/>编辑</lable>
                        </div>
                          <p>
                            <a data-toggle="collapse" data-parent="#SelectBox" href="#collapse${p.st_id}">
                              <span class="collapse-one glyphicon glyphicon-triangle-bottom"></span>
                              ${p.st_name}
                            </a>
                          </p>
                        </div>
                        <div id="collapse${p.st_id}" class="panel-collapse collapse">
                          <div class="list-group">
                            <ul class="list-unstyled cu_role_list" data-id="${p.st_id}">
                            `;
                $.each(list.st, function(i, p){
                    if(p.parent_id==parent_id){
                        html1+=`
                           <li data-st_id=${p.st_id} data-parent_id=${p.parent_id}>
                                <span >${p.st_name}</span>
                                <input type="radio" name="role${p.st_id}" value="1"/>查看
                                <input type="radio" name="role${p.st_id}" value="2"/>操作
                                <input type="radio" name="role${p.st_id}"  value="3"/>编辑
                            </li>
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
            //多选
            //获取权限拼接的字符串
            $('#role-select').on('click','#cu_pw_sm',function(){
                var cu_str='';
                cu_str=role_str();
            });
            function role_str(){
                var cu_str='';
                var st_id,prv;
                cu_str='[';
                if($("#role-select .select-box li ").find("input[type='radio']:checked").length>0){
                    //console.log($("#role-select .select-box li ").find("input[type='radio']:checked").length);
                    $("#role-select .select-box li input[type='radio']:checked").each(function () {
                        i++;
                        st_id=$(this).parent().attr('data-st_id');
                        prv=$(this).val();
                        cu_str+=`{st_id:${st_id},prv:${$(this).val()}},`;
                    });
                    cu_str=cu_str.slice(0,-1);
                    cu_str+=`]`;
                    $('#role-select').modal('hide');
                }else{
                    alert('角色权限不能全为空');
                }
                return cu_str;
            }
            $('#revise').on('click','#roleRevise-submit', function () {
                var cu_code=$('#revise form').find('input').eq(0).val(),
                    cu_name=$('#revise form').find('input').eq(1).val(),
                    role_id=$('#revise').find("#role_select option:selected").val(),
                    login_name=$('#revise form').find('input').eq(2).val();
                var cu_str=role_str();

                var arr=[];
                arr.push(cu_str,cu_id,cu_code,cu_name,role_id,login_name);
                console.log(cu_str,cu_id,cu_code,cu_name,role_id,login_name);
                if($.inArray('', arr)==-1){
                    $.ajax({
                        type: 'POST',
                        url: 'http://202.119.65.27:9999/monitor/prv/user/update',
                        data: {sessionId:sessionStorage['sessionid'],jdata: cu_str,cu_id:cu_id, cu_code: cu_code,cu_name:cu_name,role_id:role_id,login_name:login_name},
                        success: function(){
                            alert('已修改成功');
                            setTimeout(location.reload(),2000);
                            $("#example3").DataTable();
                        }
                    });

                }else{
                    var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
     `;
                    $('#revise').find('.main-title').empty().append(html);
                }
            });
            //同步操作员权限
            $.ajax({
                type: 'POST',
                url: 'http://202.119.65.27:9999/monitor/prv/user/findByUid',
                data: {sessionId:sessionStorage['sessionid'],cu_id:cu_id},
                success: function(list){
                    //console.error(list);
                    var html = '';
                    $.each(list.user, function (i, p) {
                        console.log('开始同步');
                        console.log($('#role-select').find(`[name='role${p.st_id}'][value='${p.prv}']`)[0]);
                        $('#role-select').find(`[name='role${p.st_id}'][value='${p.prv}']`).prop('checked',true);
                        console.log(p.st_id,p.prv);
                    });
                }
            });
        }
    });
});

//动态添加监控中心监控站
function all_role(){
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: 'http://202.119.65.27:9999/monitor/prv/user/findStation',
        success: function(list){
            var html1=``;
            var parent_id=0;
            $.each(list.center, function(i, p){
                parent_id=p.st_id;
                html1+=`
            <div class="panel panel-default">
                        <div class="panel-heading">
                                                <div class=" multiselect">
                            <lable><input type="radio" name="role${p.st_id}" value="1"/>查看</lable>
                            <lable><input type="radio" name="role${p.st_id}" value="2"/>操作</lable>
                            <lable><input type="radio" name="role${p.st_id}" value="3"/>编辑</lable>
                        </div>

                          <p>
                            <a data-toggle="collapse" data-parent="#SelectBox" href="#collapse${p.st_id}">
                              <span class="collapse-one glyphicon glyphicon-triangle-bottom"></span>
                              ${p.st_name}
                            </a>
                          </p>
                        </div>
                        <div id="collapse${p.st_id}" class="panel-collapse collapse">
                          <div class="list-group">
                            <ul class="list-unstyled cu_role_list" data-id="${p.st_id}">
                            `;
                $.each(list.st, function(i, p){
                    if(p.parent_id==parent_id){
                        html1+=`
                           <li data-st_id=${p.st_id} data-parent_id=${p.parent_id}>
                                <span >${p.st_name}</span>
                                <input type="radio" name="role${p.st_id}" value="1"/>查看
                                <input type="radio" name="role${p.st_id}" value="2"/>操作
                                <input type="radio" name="role${p.st_id}"  value="3"/>编辑
                            </li>
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
//获取权限拼接的字符串
$('#cu_pw_sm').click(function(){
    var cu_str=gain_role_str();
});
//添加操作员保存按钮
$('#cu_add_submit').click(function () {
    var cu_str=gain_role_str();
    var cu_code=$('#maintenance form').find('input').eq(0).val(),
        cu_name=$('#maintenance form').find('input').eq(1).val(),
        role_id=$('#role_select').find('option:checked').val(),
        login_name=$('#maintenance form').find('input').eq(2).val(),
        login_pwd=$('#maintenance form').find('input').eq(3).val();
    console.log(cu_str,cu_code,cu_name,role_id,login_name,login_pwd);
    var arr=[];
    arr.push(cu_str,cu_code,cu_name,role_id,login_name,login_pwd);
    if($.inArray('', arr)==-1){
        $.ajax({
            type: 'POST',
            url: 'http://202.119.65.27:9999/monitor/prv/user/create',
            data: {sessionId:sessionStorage['sessionid'],jdata: cu_str, cu_code: cu_code,cu_name:cu_name,role_id:role_id,login_name:login_name,login_pwd:login_pwd},
            success: function(list){
                if(list.success==false){
                    alert('用户名已存在!');
                }else if(list.success==true){
                    alert('已添加成功');
                    //setTimeout(location.reload(),2000);
                    $("#example3").DataTable();
                }
            }
        });

    }else{
        var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
     `;
        $('#maintenance').find('.main-title').empty().append(html);
    }
});
//操作员密码修改
$('#example2').on('click','a.cu-pw-revise', function () {
    if(($('#pw-revise').css('display') == 'none')){
        $('#pw-revise').find('.main-title').empty().html('添加项目');
    };
    //$('#ct_pwre_pw').val("");
    var cu_id=$(this).parent().parent().find('td').eq(0).html();
    $('#pw-revise #ct_pwre_name').attr("disabled",true);
    $('#pw-revise #ct_pwre_name').val($(this).parent().parent().find('td').eq(4).html());
    $('#cu_pw_re_submit').click(function(){
        var login_pwd=$('#pw-revise #ct_pwre_pw').val();
        console.log(cu_id,login_pwd);
        var arr=[];
        arr.push(cu_id,login_pwd);
        if($.inArray('', arr)==-1){
            $.ajax({
                type: 'POST',
                url: 'http://202.119.65.27:9999/monitor/prv/user/updatePwd',
                data: {sessionId:sessionStorage['sessionid'],cu_id:cu_id,login_pwd:login_pwd},
                success: function(){
                    //进入前清空密码
                    $('#ct_pwre_pw').val("");
                    $('#pw-revise').modal('hide');
                    alert('密码已修改');
                }
            });
        }else{
            var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
     `;
            $('#pw-revise').find('.main-title').empty().append(html);
        }
    })
});
function gain_role_str(){
    var i=0;
    var st_id,prv,cu_str;
    cu_str='[';
    $("#role-select .select-box li input[type='radio']:checked").each(function () {
        i++;
        st_id=$(this).parent().attr('data-st_id');
        prv=$(this).val();
        cu_str+=`{st_id:${st_id},prv:${$(this).val()}},`;
    });
    cu_str=cu_str.slice(0,-1);
    cu_str+=`]`;
    $('#role-select').modal('hide');
    return cu_str;
}
$('#role-select').on('dblclick','.multiselect input[type="radio"]', function () {
    $(this).prop('checked',false);
    console.log($(this).attr('name'));
    var st_val1=$(this).val();
    $(this).parent().parent().parent().parent().find(`[value=${st_val1}]`).each(function () {
        $(this).prop('checked',false);
    });
});
$('#role-select').on('click','.multiselect input[type="radio"]', function () {
    var st_val2=$(this).val();
    $(this).parent().parent().parent().parent().find(`[value=${st_val2}]`).each(function () {
        $(this).prop('checked',true);
    });
});
$("#role-select").on('dblclick',' li span',function () {
    console.log(0);
    $(this).parent().find('input').attr('checked',false);
});