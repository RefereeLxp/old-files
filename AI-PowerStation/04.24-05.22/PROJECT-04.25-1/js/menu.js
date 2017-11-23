/**
 * Created by PVer on 2017/4/13.
 */
var pathname=window.location.pathname;

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
            success: function (list) {
                var gt_id=null;
                $.each(list.roleGrant, function (i, p) {
                    gt_id=p.gt_id;
                    console.log(gt_id);
                    console.log($('.sidebar-menu').find(`[data-class-id=${gt_id}]`).removeClass('lifade').addClass('liin'));
                });
            }
        })
    } else{
        alert(data.errors);
    }
});
