/**
 * Created by PVer on 2017/3/27.
 */
function logout(){
    sessionStorage.removeItem('sessionid');
    location.href='../../home/login.html';
}
//操作员获取
$.ajax({
    type: 'GET',
    data:{sessionId:sessionStorage['sessionid']},
    url: url_top+'monitor/prv/user/findAllUser',
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
    if(confirm('确认要删除？')) {
        var cu_id = $(this).parent().parent().find('td').eq(0).html();
        console.log(cu_id);
        $.ajax({
            type: 'POST',
            url: url_top + 'monitor/prv/user/destroy',
            data: {sessionId: sessionStorage['sessionid'], cu_id: cu_id},
            success: function () {
                alert('已删除');
                setTimeout(location.reload(), 2000);
            }
        });
    }
});
//增加操作员
$('#ctAdd').click(function(){
    //if(($('#maintenance').css('display') == 'none')){
    //    $('#maintenance').find('.main-title').empty().html('添加项目');
    //    $('#maintenance').find(".head-box input[type='text']").each(function () {
    //        $(this).val('');
    //        $(this).parent().next().empty();
    //    });
    //    $('#maintenance').find(".head-box select").each(function () {
    //        $(this).parent().next().empty();
    //    });
    //    $('#maintenance').find(".head-box input[type='button']").each(function () {
    //        $(this).parent().next().empty();
    //    });
    //}
    var data=$('#maintenance');
    clear_data(data);
    //获取所属角色
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/prv/role/getAll',
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
            $('#role_select1').empty().html(html1);
        }
    });
        $('#maintenance form').find('input').eq(0).attr('data-type','1'),
        $('#maintenance form').find('input').eq(1).attr('data-type','2'),
        $('#maintenance form').find('input').eq(2).attr('data-type','4'),
        $('#maintenance form').find('input').eq(3).attr('data-type','5');
        $('#maintenance form').find('input').eq(4).attr('data-type','0');
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
        url: url_top+'monitor/prv/role/getAll',
        success: function (list) {
            var html1 = `<option value=null>--请选择角色--</option>`;
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
        url: url_top+'monitor/prv/user/findStation',
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
                var address=$('#revise');
                var RegEx_judgment=member_verify(address,cu_str.length);
                console.error(RegEx_judgment);
                var arr=[];
                arr.push(cu_str,cu_id,cu_code,cu_name,role_id,login_name);
                console.log(cu_str,cu_id,cu_code,cu_name,role_id,login_name);
                if(RegEx_judgment==true){
                    $.ajax({
                        type: 'POST',
                        url: url_top+'monitor/prv/user/update',
                        data: {sessionId:sessionStorage['sessionid'],jdata: cu_str,cu_id:cu_id, cu_code: cu_code,cu_name:cu_name,role_id:role_id,login_name:login_name},
                        beforeSend: function () {
                            $('.loading').addClass('loadingin');
                        }
                        ,error: function () {
                            $('.loading').removeClass('loadingin');
                            alert('出错');
                        },
                        success: function(data){
                            if(data.success==false){
                                console.error(data.errors);
                                remove_repetition(address,data.errors);
                                $('.loading').removeClass('loadingin');

                            }else {
                                //alert('已修改成功');
                                $('.loading').removeClass('loadingin');
                                setTimeout(location.reload(),2000);
                                $("#example3").DataTable();
                            }
                        }
                    });
                }
            });
            //同步操作员权限
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/prv/user/findByUid',
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
        url: url_top+'monitor/prv/user/findStation',
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
        role_id=$('#role_select1').find('option:checked').val(),
        login_name=$('#maintenance form').find('input').eq(2).val(),
        login_pwd=$('#maintenance form').find('input').eq(3).val();
    console.log(cu_str,cu_code,cu_name,role_id,login_name,login_pwd);
    var arr=[];
    arr.push(cu_str,cu_code,cu_name,role_id,login_name,login_pwd);
    var address=$('#maintenance');
    var RegEx_judgment=member_verify(address,cu_str.length);
    console.error(arr);
    console.error(role_id);
    if(RegEx_judgment==true){
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/prv/user/create',
                data: {sessionId:sessionStorage['sessionid'],jdata: cu_str, cu_code: cu_code,cu_name:cu_name,role_id:role_id,login_name:login_name,login_pwd:login_pwd},
                beforeSend: function () {
                    $('.loading').addClass('loadingin');
                }
                ,error: function () {
                    $('.loading').removeClass('loadingin');
                    alert('出错');
                },
                success: function(list){
                    if(list.success==false){
                        console.error(list.errors);
                        remove_repetition(address,list.errors);
                        $('.loading').removeClass('loadingin');
                    }else{
                        //alert('已添加成功');
                        //setTimeout(location.reload(),2000);
                        $('.loading').removeClass('loadingin');
                        $("#example3").DataTable();
                    }
                }
            });
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
        num=type2($.trim(login_pwd));
        $('#pw-revise #ct_pwre_pw').parent().next().removeClass('succ-notice').removeClass('err-notice');
        if(num==true){
            $('#pw-revise #ct_pwre_pw').parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
            if($.inArray('', arr)==-1){
                $.ajax({
                    type: 'POST',
                    url: url_top+'monitor/prv/user/updatePwd',
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
        }else if(num==false){
            $('#pw-revise #ct_pwre_pw').parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>限6到10位数字和字母');
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
function member_verify(address,len){
    //console.error($('#maintenance').find('.input-box input[data-type]').length);
    var arr=[];
    //验证input框
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
            case 4:
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
            case 5:
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
            case 0:
                console.error(len);
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(len>2){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else{
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>权限选择不能为空');
                    arr.push('-1');
                }
                break;
        }
    })
    //验证select框
    address.find('.input-line select').each(function () {
        console.error('存在select框');
        var num=$(this).find('option:selected').val();
        console.error(num);
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
