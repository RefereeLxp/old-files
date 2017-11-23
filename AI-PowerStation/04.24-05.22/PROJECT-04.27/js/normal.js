/**
 * Created by PVer on 2017/4/11.
 */
function logout(){
    sessionStorage.removeItem('sessionid');
    location.href='../../home/login.html'
}
//获取所有主机信息
$.ajax({
    type: 'GET',
    data:{sessionId:sessionStorage['sessionid']},
    url: 'http://202.119.65.27:9999/monitor/ass/host/getAll',
    success: function(list){
        console.error(list);
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
                </tr>
                `;

            });
        }
        $('#example1 tbody').empty().html(html1);
        $("#example1").DataTable();
    }
});



