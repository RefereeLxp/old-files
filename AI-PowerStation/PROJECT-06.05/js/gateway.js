/**
 * Created by PVer on 2017/3/24.
 */
$('.loading').height($(document).height());
function logout(){
    sessionStorage.removeItem('sessionid');
    location.href='../../home/login.html'
}
//获取所有主机信息
$.ajax({
    type: 'GET',
    data:{sessionId:sessionStorage['sessionid']},
    url: url_top+'monitor/ass/host/getAll',
    success: function(list){
        console.log(list);
        var html1 = '';
        if(list.length == 0){
            console.log('错误');
        }else{
            $.each(list.hosts, function(i, p){
                //监控主机设置表
                html1 += `
                <tr>
                    <td data-host_id=${p.host_id} >${p.host_id}</tddata>
                    <td>${p.host_code}</td>
                    <td>${p.host_name}</td>
                    <td>${p.host_key}</td>
                    <td data-show="no" data-st_id=${p.st_id}>${p.st_name}</td>
                    <td>${p.ip_address}</td>
                    <td>
                        <a href="#" data-host="${p.host_id}" class="stations-check">查看</a>
                        <span>|</span>
                        <a href="#" data-toggle="modal" data-target="#revise" onclick="show(this)">修改</a>
                        <span>|</span>
                        <a href="#" data-oper="delete">删除</a></td>
                    </tr>
                `;

            });
        }
        $('#example2 tbody').empty().html(html1);
        $("#example2").DataTable();
    }
});
if(sessionStorage['host_id']!=null){
    $.ajax({
        type: 'GET',
        data: {sessionId: sessionStorage['sessionid'],host_id:sessionStorage['host_id']},
        url: url_top+'monitor/ass/controller/getAll',
        beforeSend: function () {
            $('.loading').addClass('loadingin');
        },
        error: function () {
            $('.loading').removeClass('loadingin');
            alert('出错');
        },
        success: function (list) {
            var html2 = '';
            if (list.length == 0) {
                console.log('错误');
            } else {
                $.each(list.Controller, function (i, p) {
                    //console.log(p);
                    //设备设置表
                    if (sessionStorage['host_id'] == p.host_id) {
                        var thH;
                        var thL;
                        if(p.threshold_h==-1){
                            thH=''
                        }else if(p.threshold_h==-2){
                            thH='未设置'
                        }else{
                            thH=p.threshold_h
                        }
                        if(p.threshold_l==-1){
                            thL=''
                        }else if(p.threshold_l==-2){
                            thL='未设置'
                        }else{
                            thL=p.threshold_l
                        }
                        html2 += `
                             <tr>
                                <td>${p.ctrl_id}</td>
                                <td>${p.ctrl_code}</td>
                                <td>${p.ctrl_name}</td>
                                <td data-show="-1" data-host_id=${p.host_id}>${p.host_name}</td>
                                <td data-show="-2" data-room_id=${p.room_id}>${p.room_name}</td>
                                <td>${p.ip_address}</td>
                                <td>${p.mac}</td>
                                <td data-show="-3" data-dict_id=${p.dict_id}>${p.dict_name}</td>
                                <td data-show="th">${thH}</td>
                                <td data-show="th">${thL}</td>
                                <td>${p.bindstate}</td>
                                <td>
                                    <a href="#" data-toggle="modal" data-target="#binding2" onclick="bind1(this)" class="ct_revise">绑定</a>
                                       <span>|</span>
                                    <a href="#" data-toggle="modal" data-target="#revise" onclick="show1(this)" class="ct_revise">修改</a>
                                       <span>|</span>
                                    <a href="#"data-oper="delete">删除</a></td>
                            </tr>
                            `;
                    }
                })
            }
            $('#example3 tbody').empty().html(html2);
            $('.loading').removeClass('loadingin');
            $("#example3").DataTable();
        }
    });
}
//查看相应主机下的设备
$('#example2').on('click','.stations-check',function(){
    var host_id=$(this).parent().parent().find('td').eq(0).html();
    var host_code=$(this).parent().parent().find('td').eq(1).html();
    var host_key=$(this).parent().parent().find('td').eq(3).html();
    console.log(host_id);
    sessionStorage.setItem('host_id',host_id*1);
    sessionStorage.setItem('host_code',host_code);
    sessionStorage.setItem('host_key',host_key);
    $.ajax({
        url:url_top+'monitor/ass/dfloor/findHid',
        data:{host_id:host_id},
        success:function(text){
            sessionStorage.setItem('floor',text.map[0].id);
            location.reload();
        }
    })
});
//获取全部站点
function getAllStation(){
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/ass/station/getAllStation2',
        success: function (list) {
            var html = ' <option value="null">-请选择-</option>';
            $.each(list.stations, function (i, p) {
                html += `
                     <option value="${p.st_id}">${p.st_name}</option>
                `;
                //console.log(p.st_id_2);
            });
            $('#maintenance select').empty().html(html);
            $("#example2").DataTable()
        }
    });
}
//添加主机
$('.hostAdd').click(function () {
    //获取全部站点
    getAllStation();
    var data=$('#maintenance');
    clear_data(data);
    add_data_type(data);
});
var host_id=null;
$('#insH').click(function(){
    var host_code=$('#maintenance #hostADD').find('input').eq(0).val(),
        host_name=$('#maintenance #hostADD').find('input').eq(1).val(),
        host_key=$('#maintenance #hostADD').find('input').eq(2).val(),
    //host_id=$(this).parent().parent().find('td').eq(0).html(),
        st_id=$('#maintenance #hostADD').find('option:selected').val(),
        ip_address=$('#maintenance #hostADD').find('input').eq(3).val();
    var arr=[];
    arr.push(host_code,host_name,host_key,st_id,ip_address);
    var address=$('#maintenance');
    var RegEx_judgment=host_verify(address);
    console.error(RegEx_judgment);
    if(RegEx_judgment==true){
        $.ajax({
            url:url_top+'monitor/ass/host/create',
            data:{sessionId:sessionStorage['sessionid'],
                host_code:$.trim(encodeURI(host_code)),
                host_name:$.trim(encodeURI(host_name,'UTF-8')),
                host_key: $.trim(encodeURI(host_key,'UTF-8')),
                st_id:$.trim(st_id),
                ip_address:$.trim(ip_address)},
            success:function(data){
                if(data.success==false){
                    console.error(data.errors);
                    remove_repetition(address,data.errors);
                    $('.loading').removeClass('loadingin');
                }else {
                    $.ajax({
                        url: url_top + 'monitor/ass/dfloor/create',
                        data: {name: encodeURI(host_name, 'UTF-8')},
                        success: function () {
                            location.reload();
                        }
                    })
                }
            }
        })
    }
});
//主机内容修改
$('#example2 tbody').on('click',"[data-target='#revise']", function (e) {
    e.preventDefault();
    var st_id_old=$(this).parent().parent().find('td').eq(4).attr('data-st_id');
    host_id=$(this).parent().parent().find('td').eq(0).html()*1;
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/ass/station/getAllStation2',
        success: function (list) {
            var html = ' <option value="null">-请选择-</option>';
            $.each(list.stations, function (i, p) {
                html += `
                     <option value="${p.st_id}">${p.st_name}</option>
                `;
                //console.log(p.st_id_2);
            });
            $('#revise select').empty().html(html);
            $('#revise').find("select option[value="+st_id_old+"]").attr('selected',true);
            $("#example2").DataTable()
        }
    });
    if(($('#revise').css('display') == 'none')){
        $('#revise').find('.main-title').empty().html('添加项目');
    }
});
$('#revise').on('click','#hostchange',function () {
    var host_code=$('#revise form').find('input').eq(0).val(),
        host_name=$('#revise form').find('input').eq(1).val(),
        host_key=$('#revise form').find('input').eq(2).val(),
        st_id=$('#revise form').find('option:selected').val(),
        ip_address=$('#revise form').find('input').eq(3).val();
    console.log(host_id,host_code,host_name,host_key,st_id,ip_address);
    var arr=[];
    arr.push(host_id,host_code,host_name,host_key,st_id,ip_address);
    var address=$('#revise');
    var RegEx_judgment=host_verify(address);
    if(RegEx_judgment==true){
        if($.inArray('', arr)==-1){
            //修改主机
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/ass/host/update',
                data: {sessionId:sessionStorage['sessionid'],host_id:$.trim(host_id),host_code: $.trim(host_code), host_name:$.trim(host_name),host_key:$.trim(host_key),st_id:$.trim(st_id),ip_address:$.trim(ip_address)},
                success: function(data){
                    if(data.success==false){
                        console.error(data.errors);
                        remove_repetition(address,data.errors);
                        $('.loading').removeClass('loadingin');
                    }else {
                        alert('已修改');
                        location.reload();
                        $("#example2").DataTable();
                    }
                }
            });
        }else{
            var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
     `;
            $('#revise').find('.main-title').empty().append(html);
        }
    }
});
$("#maintenance1").on('hidden.bs.modal',function(){
    $("#maintenance1").unbind("click");
});
//设备增加
$('#ctAdd').click(function () {
    var data=$('#maintenance1');
    clear_data(data);
    add_data_type(data);
    data=$('#binding');
    clear_data(data);
    //点击监控主机选择按钮
    $('#maintenance1').on('click',"input[data-target='#host-select']",function () {
        console.log($(this).val());
        var host_name='',
            host_id=0;
        //监控主机三级联动
        $('#hostselect-submit').click(function(){
            if($('#searea').find('option:selected').text()!='--主机--'){
                $('#host-select').modal('hide');
                host_name=$('#searea').find('option:selected').text();
                host_id=$('#searea').find('option:selected').val();
                $("input[data-target='#host-select']").val(host_name).attr("data-host_id",host_id);
            }
            //console.log(host_id);
        });
    });
    //房间号增加
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/ass/controller/getAll',
        success: function (list) {
            var html1 = ` <option value=null>--请选择房间--</option>`,
                html2 = ` <option value=null>--请选择设备类型--</option>`;
            if (list.length == 0) {
                console.log('错误');
            } else {
                $.each(list.room, function (i, p) {
                    //console.log(p);
                    //设备设置表
                    html1 += `
                    <option value=${p.id}>${p.room_name}</option>
                    `;
                });

                $.each(list.dict, function (i, p) {
                    //console.log(p);
                    //设备设置表
                    html2 += `
                    <option value=${p.dict_id}>${p.dict_name}</option>
                    `;
                });
            }
            $('#room-select').empty().html(html1);
            $('#dict-select').empty().html(html2);
            $("#example3").DataTable();
        }
    });
    //allHost();
    $('#ctAdd-submit').click(function () {
        var ctrl_code=$.trim($('#maintenance1 form').find('input').eq(0).val()),
            ctrl_name=$.trim($('#maintenance1 form').find('input').eq(1).val()),
            host_id=$.trim($('#maintenance1').find("[data-target='#host-select']").attr('data-host_id')),
            room_id=$.trim($('#room-select').val()),
            ip_address=$.trim($('#maintenance1 form').find('input').eq(3).val()),
            mac=$.trim($('#maintenance1 form').find('input').eq(4).val()),
            class_id=$.trim($('#dict-select option:selected').val()),
            threshold_h=$.trim($('#maintenance1 form').find('input').eq(5).val()),
            threshold_l=$.trim($('#maintenance1 form').find('input').eq(6).val());
        if(threshold_h=='')threshold_h=-1;
        if(threshold_l=='')threshold_l=-1;
        //console.log(threshold_h,threshold_l);
        console.log(ctrl_code,ctrl_name,host_id,room_id,ip_address,mac,threshold_h,threshold_l);
        var arr=[];
        arr.push(ctrl_code,ctrl_name,host_id,room_id,ip_address,mac,threshold_h,threshold_l);
        var address=$('#maintenance1');
        var RegEx_judgment=ctrl_verify(address);
        if(RegEx_judgment==true){
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/ass/controller/create',
                data: {sessionId:sessionStorage['sessionid'],ctrl_code:$.trim(encodeURI(ctrl_code,'UTF-8')), ctrl_name: $.trim(encodeURI(ctrl_name,'UTF-8')),host_id:$.trim(host_id),room_id: $.trim(room_id), ip_address:$.trim(encodeURI(ip_address,'UTF-8')),mac:$.trim(mac),dict_id:$.trim(1),threshold_h: $.trim(threshold_h),threshold_l:$.trim(threshold_l)},
                success: function(data){
                    if(data.success==false){
                        console.error(data.errors);
                        remove_repetition(address,data.errors);
                        $('.loading').removeClass('loadingin');

                    }else {
                        alert('已保存成功');
                        location.reload();
                        $("#example3").DataTable();
                        clear_host_select();
                    }
                }
            });
        }
    });
    if(($('#maintenance1').css('display') == 'none')){
        clear_host_select();
        $("input[data-target='#host-select']").val('请选择主机');
        $('#maintenance1').find('.main-title').empty().html('添加项目');
        $('#maintenance1').find(".head-box input[type='text']").each(function () {
            $(this).val('');
        });
    }
});
//设备修改
$('#example3').on('click','.ct_revise',function () {
    //var data=$('#revise');
    //clear_data(data);
    var data=$('#binding2');
    clear_data(data);
    var room_id_old=$(this).parent().parent().find('td').eq(4).attr('data-room_id');
    var dict_id_old=$(this).parent().parent().find('td').eq(7).attr('data-dict_id');
    var ctrl_id=$(this).parent().parent().find('td').eq(0).html();
    var host_id_old=$(this).parent().parent().find('td').eq(3).attr('data-host_id');
    console.log('旧'+room_id_old,dict_id_old);
    $('#revise').find("input[data-target='#host-select']").attr('data-host_id',host_id_old);
    //点击监控主机选择按钮
    $("input[data-target='#host-select']").click(function () {
        console.log($(this).val());
        var host_name='',
            host_id=0;
        //监控主机三级联动
        $('#hostselect-submit').click(function(){
            if($('#searea').find('option:selected').text()!='--主机--'){
                $('#host-select').modal('hide');
                host_name=$('#searea').find('option:selected').text();
                host_id=$('#searea').find('option:selected').val();
                $("input[data-target='#host-select']").val(host_name).attr("data-host_id",host_id);
            }
            //console.log(host_id);
        });
    });
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/ass/controller/getAll',
        success: function (list) {
            var html1 = ` <option value=null>--请选择房间--</option>`,
                html2 = ` <option value=null>--请选择设备类型--</option>`;
            if (list.length == 0) {
                console.log('错误');
            } else {
                $.each(list.room, function (i, p) {
                    html1 += `
                    <option value=${p.id}>${p.room_name}</option>
                    `;
                });

                $.each(list.dict, function (i, p) {
                    html2 += `
                    <option value=${p.dict_id}>${p.dict_name}</option>
                    `;
                });
            }
            $('#room-select').empty().html(html1);
            $('#dict-select').empty().html(html2);
            $('#revise').find("#room-select option[value="+room_id_old+"]").attr('selected',true);
            $('#revise').find("#dict-select option[value="+dict_id_old+"]").attr('selected',true);
            $("#example3").DataTable();
        }
    });
    $('#ctRevise-submit').click(function () {
        var ctrl_code=$.trim($('#revise form').find('input').eq(0).val()),
            ctrl_name=$.trim($('#revise form').find('input').eq(1).val()),
            room_id=$.trim($('#room-select').val()),
            ip_address=$.trim($('#revise form').find('input').eq(3).val()),
            mac=$.trim($('#revise form').find('input').eq(4).val()),
            class_id=$.trim($('#dict-select').val()),
            threshold_h=$.trim($('#revise form').find('input').eq(5).val()),
            threshold_l=$.trim($('#revise form').find('input').eq(6).val());
        host_id=$.trim($('#revise').find("[data-target='#host-select']").attr('data-host_id'));
        if(threshold_h=='')threshold_h=-1;
        if(threshold_l=='')threshold_l=-1;
        //console.log(ctrl_code);
        //console.log('新'+ctrl_id,ctrl_code,ctrl_name,host_id,room_id,ip_address,mac,threshold_h,threshold_l);
        var arr=[];
        arr.push(ctrl_id,ctrl_code,ctrl_name,host_id,room_id,mac,threshold_h,threshold_l);
        var address=$('#revise');
        var RegEx_judgment=ctrl_verify(address);
        console.error(RegEx_judgment);
        if(RegEx_judgment==true){
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/ass/controller/update',
                data: {sessionId:sessionStorage['sessionid'],ctrl_id:$.trim(ctrl_id),ctrl_code:$.trim(encodeURI(ctrl_code,'UTF-8')), ctrl_name: $.trim(encodeURI(ctrl_name,'UTF-8')),host_id:$.trim(host_id),room_id: $.trim(room_id), ip_address:$.trim(encodeURI(ip_address,'UTF-8')),mac:$.trim(mac),dict_id:$.trim(class_id),threshold_h:$.trim(threshold_h),threshold_l:$.trim(threshold_l)},
                success: function(data){
                    if(data.success==false){
                        console.error(data.errors);
                        remove_repetition(address,data.errors);
                        $('.loading').removeClass('loadingin');

                    }else {
                        location.reload();
                        $("#example3").DataTable();
                        clear_host_select();
                    }
                }
            });
        }

    });
    if(($('#revise').css('display') == 'none')){
        clear_host_select();
        //$("input[data-target='#host-select']").val(host_name);
        $('#revise').find('.main-title').empty().html('添加项目');
    }
});
//设备绑定
$('#ab').click(function(){
    var value=$('#maintenance1 .col-xs-12:eq(0) input').val();
    $('input[name="ctrl_code"]').val(value);
    var data=$('#binding');
    add_data_type(data);
})
function bind1(nn){
    var data=$('#binding2');
    add_data_type(data);
    console.error($(nn).parent().parent().children('td:nth-child(2)').html())
    var value=$(nn).parent().parent().children('td:nth-child(2)').html()*1;
    $.ajax({
        url:url_top+'monitor/ass/device/findByCcode',
        data:'ctrl_code='+value,
        success:function(list) {
            console.log(list);
            if(list.device[0]!=undefined) {
                $('#newBind2 input[name="id"]').val(list.device[0].id);
                $('#newBind2 input[name="name"]').val(list.device[0].name);
                $('#newBind2 input[name="fact_no"]').val(list.device[0].fact_no);
                $('#newBind2 input[name="fact_name"]').val(list.device[0].fact_name);
                $('#newBind2 input[name="u_size"]').val(list.device[0].u_size);
                $('#newBind2 input[name="height"]').val(list.device[0].height);
                $('#newBind2 input[name="width"]').val(list.device[0].width);
                $('#newBind2 input[name="depth"]').val(list.device[0].depth);
                $('#newBind2 select[name="category"]').val(list.device[0].category);
                $('#newBind2 select[name="model_id"]').val(list.device[0].model_id);
                $('#newBind2 select[name="status"]').val(list.device[0].status);
                $('#newBind2 input[name="ctrl_code"]').val(value);
            }else{
                $('#newBind2 input[name="id"]').val(-1)
                $('#newBind2 input[name="ctrl_code"]').val(value);
            }

        }
    });

}
$(function(){
        var data=$('#newBind2').serializeArray();
        $('#bindGo2').click(function(){
            if($('#newBind2 input[name="id"]').val()!=-1) {
                var data = $('#newBind2').serializeArray();
                $.each(data, function (i, p) {
                    if (p.name == 'name'||p.name=='fact_name') {
                        p.value =p.value.toString();
                        console.log(p.value);
                        p.value = encodeURI(p.value, 'UTF-8');
                    }
                })
                data.push({name:'floor',value:sessionStorage['floor']*1});
                var address=$('#binding2');
                var RegEx_judgment=bind_verify(address);
                console.error(RegEx_judgment);
                if(RegEx_judgment==true){
                    $.ajax({
                        url: url_top+'monitor/ass/device/update',
                        data: data,
                        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
                        success: function () {
                            alert('成功');
                            location.reload()
                        }
                    })
                }
            }else{
                var data=$('#newBind2').serializeArray();
                $.each(data, function(i, p){
                    if(p.name=='name'){
                        p.value=p.value.toString();
                        console.log(p.value);
                        p.value=$.trim(encodeURI(p.value,'UTF-8'));
                    }
                });
                data.push({name:'floor',value:sessionStorage['floor']*1});
                var address=$('#binding2');
                var RegEx_judgment=bind_verify(address);
                console.error(RegEx_judgment);
                if(RegEx_judgment==true){
                    $.ajax({
                        url:url_top+'monitor/ass/device/create',
                        data:data,
                        headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                        success:function(){
                            alert('成功')
                            location.reload()
                        }
                    })

                }
            }
        })}
)
$('#bindGo').click(function(){
    var data=$('#newBind').serializeArray();
    $.each(data, function(i, p){
        if(p.name=='name'){
            p.value=p.value.toString();
            console.log(p.value);
            p.value=$.trim(encodeURI(p.value,'UTF-8'));
        }
    })
    data.push({name:'floor',value:sessionStorage['floor']*1});
    console.error(data);
    var address=$('#binding');
    var RegEx_judgment=bind_verify(address);
    if(RegEx_judgment==true){
        $.ajax({
            url:url_top+'monitor/ass/device/create',
            data:data,
            headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            success:function(){
                alert('成功')
            }
        })
    }
})
$('#example2').on('click','a[data-oper="delete"]',function(e){
    e.preventDefault();
    if(confirm('确认要删除？')) {
        var hid = $(this).parent().parent().children('.sorting_1').html();
        $.ajax({
            url: url_top + 'monitor/ass/host/containsCtrl',
            data: {sessionId: sessionStorage['sessionid'], host_id: hid},
            success: function (data) {
                console.error(data);
                if(data.success==false){
                    if(confirm(data.errors)){
                        $.ajax({
                            url: url_top + 'monitor/ass/host/destroy',
                            data: {sessionId: sessionStorage['sessionid'], host_id: hid},
                            success: function () {
                                $.ajax({
                                    url: url_top + 'monitor/ass/dfloor/delete',
                                    data: {host_id: hid},
                                    success: function () {
                                        sessionStorage.removeItem('host_id');
                                        location.reload();
                                    }
                                })
                            }
                        })
                    }
                }else if(data.success==true){
                    $.ajax({
                        url: url_top + 'monitor/ass/host/destroy',
                        data: {sessionId: sessionStorage['sessionid'], host_id: hid},
                        success: function () {
                            $.ajax({
                                url: url_top + 'monitor/ass/dfloor/delete',
                                data: {host_id: hid},
                                success: function () {
                                    sessionStorage.removeItem('host_id');
                                    location.reload();
                                }
                            })
                        }
                    })
                }

            }
        })

    }
});
//设备删除
$('#example3').on('click','a[data-oper="delete"]',function(e){
    e.preventDefault();
    if(confirm('确认要删除？')) {
        var did = $(this).parent().parent().children('.sorting_1').html();
        var dcode = $(this).parent().parent().children('td').eq(1).text();
        console.error(did);
        $.ajax({
            url: url_top + 'monitor/ass/controller/destroy',
            data: {sessionId: sessionStorage['sessionid'], ctrl_id: did},
            success: function () {
                $.ajax({
                    url: url_top + 'monitor/ass/device/delete',
                    data: {ctrl_code: dcode},
                    success: function () {
                        location.reload()
                    }
                })
            }
        })
    }
});

//三级联动
$(function () {
//监控中心
    $.ajax({
        type: "post",
        url: url_top+"monitor/ass/station/getAllStation1",
        data:{sessionId:sessionStorage['sessionid']},
        success: function (list) {
            var html = "";
            $.each(list.stations, function(i, p){
//                        console.log(p);
                html += `
                            <option value=${p.st_id}>${p.st_name}</option>
				        `;
            });
            $("#seprovince").append(html);
        }
    });
//选择某中心，出现相应监控站监控站
    $('#seprovince').change(function () {
        $('#secity option:gt(0)').remove();
        $('#searea option:gt(0)').remove();
        var num=$(this).val();
        $.ajax({
            type: "get",
            url: url_top+"monitor/ass/station/getAll",
            data:{sessionId:sessionStorage['sessionid']},
            success: function (list) {
                var html = "";
                $.each(list.rows, function (i, p) {
                    if (p.st_id_1 ==num ) {
                        html += `
                                   <option value=${p.st_id_2}>${p.st_name_2}</option>
                                `;
                    }
                });
                $('#secity').append(html);
            }
        })
    })

//选择某监控站，出现相应主机
    $('#secity').change(function () {
        console.log($(this).find('option:selected').text());
        var tit=$(this).find('option:selected').text();
        $.ajax({
            type: "get",
            url: url_top+"monitor/ass/host/getAll",
            data:{sessionId:sessionStorage['sessionid']},
            success: function (list) {
                var html = '<option value="null">--主机--</option>';
                $.each(list.hosts, function (i, p) {
                    if (p.st_name ==tit ) {
                        html += `
                                   <option value="${p.host_id}">${p.host_name}</option>
                                `;
                    }
                });
                $('#searea').empty().html(html);
            }
        })
    })
});

//清空主机选择
function clear_host_select(){
    $('#seprovince').find('option:selected').attr("selected",false);
    $('#secity').find('option:selected').attr("selected",false);
    $('#searea').find('option:selected').attr("selected",false);
}
$("#maintenance1").on('hidden.bs.modal',function(){
    $("#ctAdd-submit").unbind("click");
});
function host_verify(address){
    //console.error($('#maintenance').find('.input-box input[data-type]').length);
    var arr=[];
    //验证input框
    address.find('.input-line input[data-type]').each(function () {
        var num;
        switch(parseInt($(this).attr('data-type'))){
            case 1:
                num=type7($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>仅限数字、字母、下划线');
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
            case 3:
                num=type1($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>仅限字母和数字');
                    arr.push('-1');
                }
                break;
            case 5:
                num=type9($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>输入正确IP地址');
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
function ctrl_verify(address,len){
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
            case 5:
                num=type9($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>请输入正确IP地址');
                    arr.push('-1');
                }
                break;

            case 6:
                num=type8($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>请输入正确MAC地址');
                    arr.push('-1');
                }
                break;
            case 8:
                num=type6($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    //$(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    $(this).parent().next().empty();
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>请输入正确数值');
                    arr.push('-1');
                }
                break;
            case 9:
                num=type6($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    //$(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    $(this).parent().next().empty();
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>请输入正确数值');
                    arr.push('-1');
                }
                break;
            case 0:
                num=$.trim($(this).attr('data-host_id'));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num>0){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else{
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>主机选择不能为空');
                    arr.push('-1');
                }
                break;
        }
    })
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
function bind_verify(address,len){
    //console.error($('#maintenance').find('.input-box input[data-type]').length);
    var arr=[];
    //验证input框
    address.find('.input-line input[data-type]').each(function () {
        var num;
        switch(parseInt($(this).attr('data-type'))){
            case 1:
                num=type3($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>仅限中文、英文、数字、下划线');
                    arr.push('-1');
                }
                break;
            case 2:
                num=type1($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>仅限字母、数字');
                    arr.push('-1');
                }
                break;
            case 4:
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
            case 5:
                num=type10($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>仅限中文、英文');
                    arr.push('-1');
                }
                break;
            case 6:
                num=type4($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>请输入的数值');
                    arr.push('-1');
                }
                break;
            case 7:
                num=type11($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>请输入非负数值');
                    arr.push('-1');
                }
                break;
            case 8:
                num=type11($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>请输入非负数值');
                    arr.push('-1');
                }
                break;
            case 9:
                num=type11($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>请输入非负数值');
                    arr.push('-1');
                }
                break;
            case 10:
                num=type1($.trim($(this).val()));
                $(this).parent().next().removeClass('succ-notice').removeClass('err-notice');
                if(num==true){
                    $(this).parent().next().empty().addClass('succ-notice').append('<i class="glyphicon glyphicon glyphicon-ok"></i>');
                    arr.push('1');
                }else if(num==false){
                    $(this).parent().next().empty().addClass('err-notice').append('<i class="glyphicon glyphicon glyphicon-remove"></i>仅限输入数字、字母');
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