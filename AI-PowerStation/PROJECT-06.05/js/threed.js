/**
 * Created by PVer on 2017/4/27.
 */
var url_top='http://202.119.65.27:9999/';
console.error(sessionStorage.st_id);
var st_id=sessionStorage.st_id;
$.ajax({
    type: "POST",
    url: url_top+"monitor/prv/user/TDSence",
    data:{sessionId:sessionStorage['sessionid'],st_id:st_id},
    success: function (list) {
        var html='';
        $.each(list.prv, function (i, p) {
            if(p.prv==1){
                console.error('查看权限');
                $.each(list.dict, function (i,data) {
                    console.error(data);
                    if(data.dict_id>0){
                        html+=`
                         <li><a><i class="fa ${data.notes_2}"></i> ${data.dict_name} <b class="fa fa-caret-right"></b></a></li>
                        `;
                    }

                })
            }else if(p.prv>=2){
                console.error('操作权限');
                $.each(list.dict, function (i,data) {
                    console.error(data);
                    if(data.dict_id>0){
                        html+=`
                         <li><a href="${data.notes_1}"><i class="fa ${data.notes_2}"></i> ${data.dict_name} <b class="fa fa-caret-right"></b></a></li>
                        `;
                    }

                });
                if(p.prv==3){
                    console.error('编辑权限');
                    $('#editFloorDefineBtn').removeClass('fade');
                    $('#role3').removeClass('fade');
                    $('#view3dToolbar').removeClass('fade');
                }
            }
        });
        $('#equipBar').empty().html(html);

    }
});
//用户信息同步
$.ajax({
    type: 'GET',
    url: url_top+'monitor/prv/user/getName',
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
                  <a href="#" class="btn btn-default btn-flat" id='change-pw'>修改密码</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat"onclick="logout()">登出</a>
                </div>
              </li>
            </ul>
            `;
        });
        $('#userName').empty().html(html);
    }
});
