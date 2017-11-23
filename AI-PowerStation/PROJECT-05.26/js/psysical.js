/**
 * Created by PVer on 2017/3/23.
 */
function logout(){
    sessionStorage.removeItem('sessionid');
    location.href='../../home/login.html'
}
aa();
$('#example2').on('click','.stations-check',function(){
    var parent_id=$(this).attr('data-stations');
    localStorage.setItem('oo',parent_id);
    location.reload();
});
//监控中心获取
$.ajax({
    type: 'GET',
    data:{sessionId:sessionStorage['sessionid']},
    url: url_top+'monitor/ass/station/getAllStation1',
    success: function(list){
        var html = '';
        if(list.length == 0){
            console.log('错误');
        }else{
            $.each(list.stations, function(i, p){
                html += `
                    <tr>
                        <td>${p.st_id}</td>
                        <td>${p.st_code}</td>
                        <td data-parent=0  data-st_id=${p.st_id}>${p.st_name}</td>
                        <td>
                            <a href="#" data-stations="${p.st_id}" class="stations-check">查看</a>
                             <span>|</span>
                            <a href="#" data-toggle="modal" data-target="#revise"onclick="show(this)">修改</a>
                             <span>|</span>
                            <a href="#" class="station-del">删除</a>
                        </td>
                    </tr>
				`;
            });
        }
        $('#example2 tbody').empty().html(html);
        $("#example2").DataTable();
    }
});
//添加监控中心
$('.stationAdd0').click(function () {
    $('#stationAdd0-submit .btn').click(function () {
        var st_code=$('#maintenance .stationAdd-st_code').find('input').val(),
            st_name=$('#maintenance .stationAdd-st_name').find('input').val(),
            parent_id=0;
        var arr=[];
        arr.push(st_code,st_name,parent_id);
        console.log(parent_id);
        if($.inArray('', arr)==-1){
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/ass/station/createStation',
                data: {sessionId:sessionStorage['sessionid'],st_code: st_code, st_name: st_name,parent_id:parent_id},
                success: function(){
                    alert('已保存成功');
                    $("#example2").DataTable();
                    location.reload();
                }
            });

        }else{
            var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
     `;
            $('#maintenance').find('.main-title').empty().append(html);
        }
    });
    if(($('#maintenance').css('display') == 'none')){
        $('#maintenance').find('.main-title').empty().html('添加项目');
        $('#maintenance').find(".head-box input[type='text']").each(function () {
            $(this).val('');
        });
    }
});
//删除监控中心
$('#example2 tbody').on('click','.station-del', function (e) {
    e.preventDefault();
    //$(this).parent().parent().find('td:eq(2)').html();
    var st_id=$(this).parent().parent().find('td').eq(0).html(),
        st_code=$(this).parent().parent().find('td').eq(1).html(),
        st_name=$(this).parent().parent().find('td').eq(2).html(),
        parent_id=0;
    console.log(st_id,st_code,st_name,parent_id);
    $.ajax({
        type: 'POST',
        url: url_top+'monitor/ass/station/destroyStation',
        data: {sessionId:sessionStorage['sessionid'],st_id: st_id, st_code:st_code,st_name:st_name,parent_id:parent_id},
        success: function(){
            alert('已删除');
            location.reload();
            $("#example2").DataTable();

        }
    });
});
//修改监控中心内容
$('#example2 tbody').on('click',"[data-target='#revise']", function (e) {
    e.preventDefault();
    var st_id=$(this).parent().parent().find('td').eq(0).html();
    console.log(st_id);
    $('#correct').on('click','.btn', function () {
        var st_code=$('#correct').first('.row').find('div input').eq(0).val(),
            st_name=$('#correct').first('.row').find('div input').eq(1).val(),
            parent_id=0;
        var arr=[];
        arr.push(st_id,st_code,st_name,parent_id);
        if($.inArray('', arr)==-1){
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/ass/station/updateStation',
                data: {sessionId:sessionStorage['sessionid'],st_id: st_id, st_code:st_code,st_name:st_name,parent_id:parent_id},
                success: function(){
                    alert('已修改');
                    location.reload();
                    $("#example2").DataTable();
                }
            });
        }else{
            var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
     `;
            $('#revise').find('.main-title').empty().append(html);
        }
    });
    if(($('#revise').css('display') == 'none')){
        $('#revise').find('.main-title').empty().html('修改项目');
    }
});
//获取全部监控站
function aa() {
    if (!localStorage.getItem('oo')) {
        $.ajax({
            type: 'GET',
            data:{sessionId:sessionStorage['sessionid']},
            url: url_top+'monitor/ass/station/getAll',
            success: function (list) {
                var html = '';
                if (list.length == 0) {
                    console.log('错误');
                } else {
                    $.each(list.rows, function (i, p) {
                        if (p.st_id_2 != null) {
                            html += `
                        <tr>
                        <td>${p.st_id_2}</td>
                        <td>${p.st_code_2}</td>
                        <td>${p.st_name_2}</td>
                        <td data-parent="${p.st_id_1}" data-st_id=${p.st_id_2}>${p.st_name_1}</td>
                        <td>
                            <a href="#" data-toggle="modal" data-target="#revise" onclick="show(this)">修改</a>
                             |
                            <a href="#"  class="station-del">删除</a>
                        </td>
                        </tr>
                    `;
                        }
                    });
                }
                $('#example3 tbody').empty().html(html);
                $("#example3").DataTable();
            }
        });
    } else {
//点击获取相应监控站信息
        var parent_id = localStorage.getItem('oo')
        console.log(parent_id);
        $.ajax({
            type: 'GET',
            data:{sessionId:sessionStorage['sessionid']},
            url: url_top+'monitor/ass/station/getAll',
            success: function (list) {
                var html = '';
                if (list.length == 0) {
                    console.log('错误');
                } else {
                    $.each(list.rows, function (i, p) {
                        if ((p.st_id_1 == parent_id) && (p.st_id_2 != null)) {
                            html += `
                        <tr>
                        <td>${p.st_id_2}</td>
                        <td>${p.st_code_2}</td>
                        <td>${p.st_name_2}</td>
                        <td  data-parent="${p.st_id_1}" data-st_id=${p.st_id_2}>${p.st_name_1}</td>
                        <td>
                            <a href="#" data-toggle="modal" data-target="#revise" onclick="show1(this)">修改</a>
                            |
                            <a href="#" class="station-del">删除</a>
                            </td>
                        </tr>
                    `;
                        }
                    });
                }
                $('#example3 tbody').empty().html(html);
                $("#example3").DataTable();
            }
        });
    }
}
//新增监控站
$('.stationAdd').click(function () {
    //获取所属监控中心
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/ass/station/getAllStation1',
        success: function(list){
            var html = ' <option value="null">-请选择-</option>';
            //var html='';
            $.each(list.stations, function(i, p){
                    html += `
                     <option value="${p.st_id}">${p.st_name}</option>
                `;
            });
            $('.stationAdd-parent_id select').empty().html(html);
        }
    });
    $('#stationAdd-submit').click(function () {
        var st_code=$('#maintenance1 .stationAdd-st_code').find('input').val(),
            st_name=$('#maintenance1 .stationAdd-st_name').find('input').val(),
            parent_id=$('.stationAdd-parent_id select').find('option:selected').val();
        console.log(parent_id);
        var arr=[];
        arr.push(st_code,st_name,parent_id);
        if($.inArray('', arr)==-1){
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/ass/station/createStation',
                data: {sessionId:sessionStorage['sessionid'],st_code: st_code, st_name: st_name,parent_id:parent_id},
                success: function(){
                    alert('已保存成功');
                    location.reload();
                    $("#example3").DataTable();
                }
            });

        }else{
            var html=`
      <span class="notice"><b class="glyphicon glyphicon-exclamation-sign"></b>填入信息为空时无法保存</span>
     `;
            $('#maintenance1').find('.main-title').empty().append(html);
        }
    });
    if(($('#maintenance1').css('display') == 'none')){
        $('#maintenance1').find('.main-title').empty().html('添加项目');
        $('#maintenance1').find(".head-box input[type='text']").each(function () {
            $(this).val('');
        });
    }

});
//删除监控站
$('#example3 tbody').on('click','.station-del', function (e) {
    e.preventDefault();
    $(this).parent().parent().find('td:eq(2)').html();
    var st_id=$(this).parent().parent().find('td').eq(0).html(),
        st_code=$(this).parent().parent().find('td').eq(1).html(),
        st_name=$(this).parent().parent().find('td').eq(2).html(),
        parent_id=$(this).parent().parent().find('td').eq(3).attr('data-parent');
    console.log(st_id,st_code,st_name,parent_id);
    $.ajax({
        type: 'POST',
        url: url_top+'monitor/ass/station/destroyStation',
        data: {sessionId:sessionStorage['sessionid'],st_id: st_id, st_code:st_code,st_name:st_name,parent_id:parent_id},
        success: function(){
            alert('已删除');
            location.reload();
            $("#example3").DataTable();

        }
    });
});
//修改监控站
$('#example3 tbody').on('click',"[data-target='#revise']", function (e) {
    e.preventDefault();
    var st_id_old=$(this).parent().parent().find('td').eq(3).attr('data-parent');
    console.log(st_id_old);
    var st_id=$(this).parent().parent().find('td').eq(0).html();
    $('#correct').first('.row').find('div input').eq(2).remove('input');
    $.ajax({
        type: 'GET',
        data:{sessionId:sessionStorage['sessionid']},
        url: url_top+'monitor/ass/station/getAllStation1',
        success: function(list){
            var html = ' <select style="width:200px"><option value="null">-请选择-</option>';
            //var html='';
            $.each(list.stations, function(i, p){
                html += `
                     <option value="${p.st_id}">${p.st_name}</option>
                `;
            });
            html+=`</select>`;
            $('#correct').first('.row').find('div').eq(3).append(html);
            $('#revise').find("select option[value="+st_id_old+"]").attr('selected',true);
        }
    });
    $('#correct #stationChange1').click( function () {
        var st_code=$('#correct').first('.row').find('div input').eq(0).val(),
        st_name=$('#correct').first('.row').find('div input').eq(1).val(),
        parent_id=$('#correct').first('.row').find('div select').find('option:selected').val();
        var arr=[];
        arr.push(st_id,st_code,st_name,parent_id);
        if($.inArray('', arr)==-1){
            //修改站点
            $.ajax({
                type: 'POST',
                url: url_top+'monitor/ass/station/updateStation',
                data: {sessionId:sessionStorage['sessionid'],st_id: st_id, st_code:st_code,st_name:st_name,parent_id:parent_id},
                success: function(){
                    alert('已修改');
                    location.reload();
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
    if(($('#revise').css('display') == 'none')){
        $('#revise').find('.main-title').empty().html('修改项目');
    }
});
