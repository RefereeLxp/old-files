
/**
 * Created by PVer on 2017/3/26.
 */
//登出
function logout(){
    sessionStorage.removeItem('sessionid');
    location.href='../login.html'
}
//$('.station-pop-box').hide();
var st_id_arr=[];
//获取所有监控站监控中心信息
console.log(sessionStorage['sessionid']);

$.ajax({
    type: 'GET',
    url: url_top+'monitor/ass/station/getAllStation1',
    data:{sessionId:sessionStorage['sessionid']},
    success: function(list){
        var html1 = '';
        var html2='';
        var li_num=0;
        var i=0,st_length;
        $.each(list.stations, function(i, p){
            var parent_id=p.st_id;
            st_length=list.stations.length;
            html1 += `
                <h3 data-st_id="${p.st_id}">${p.st_name}</h3>
               `;
            $.ajax({
                type: 'GET',
                url: url_top+'monitor/ass/station/getAllStation2',
                data:{sessionId:sessionStorage['sessionid']},
                success: function(list){
                    html2 += `<li>
                  <div class="station-box-line">
                    <b class="img-disable"></b>`;
                    $.each(list.stations, function(i, p){
                        if(p.parent_id==parent_id){
                            html2 += `
                                <span class="box-disable stations" data-st_id="${p.st_id}">${p.st_name}</span>
                            `;
                            //$('.station-box').on('click','span',function(){
                            //});
                        }
                    });
                    html2 +=`</div>
                  <button data-parent="${p.st_id}">加载更多</button>
                </li>`;
                    //$('.station-box ul').html(html2);

                    //点击加载更多出现相应内容
                    $('.station-box').each(function(){
                        var li_num=$(this).find('li').length;
                        var box_w,li_w;
                        li_auto(li_num);
                        //    如果内容超出盒子显示按钮弹出内容
                        box_w=$('.station-box-line').width(),
                            li_w=$('.station-box li').width();
                        if(box_w >= li_w){
                            $('.station-box-line').css('white-space','normal');
                            $('.station-box-line button').show();
                        }else if(box_w < li_w){
                            $('.station-box-line button').hide();
                        }
                    });
                    i++;
                    if(i==st_length){
                        //无权限部分灰化
                        $.ajax({
                            type: 'GET',
                            url: url_top+'monitor/prv/user/getName',
                            data:{sessionId:sessionStorage['sessionid']},
                            success: function(list){
                                var cu_id;
                                $.each(list.names, function(i, p){
                                    cu_id=p.cu_id;
                                    console.log(cu_id);
                                });
                                $.ajax({
                                    type: 'POST',
                                    url: url_top+'monitor/prv/user/findByUid',
                                    data:{sessionId:sessionStorage['sessionid'],cu_id:cu_id},
                                    success: function(list){
                                        $.each(list.user, function(i, p){
                                            console.log(p.st_id);
                                            st_id_arr.push(p.st_id);
                                        });
                                        console.log(st_id_arr);
                                        console.log($('body').find(".station-box span[data-st_id]").length);
                                        var parent_id=$('.province-box div').find('[data-st_id]').attr('data-st_id');
                                        var html='';
                                        $.ajax({
                                            type: 'GET',
                                            url: url_top+'monitor/ass/station/getAllStation2',
                                            data:{sessionId:sessionStorage['sessionid']},
                                            success: function(list){
                                                //var html='';
                                                $.each(list.stations, function(i, p){
                                                    if(p.parent_id==parent_id){
                                                        html += `
                           <div data-st_id1=${p.st_id}><b class="img-disable"></b><span class="box-disable">${p.st_name}</span></div>
                        `;
                                                    }
                                                });
                                                $('.station-all').html(html);
                                                $('body').find(".station-all div[data-st_id1]").each(function () {
                                                    var my_st_id=$(this).attr('data-st_id1');
                                                    //console.log(my_st_id);
                                                    //console.log(st_id_arr);
                                                    if(st_id_arr.toString().indexOf(my_st_id)!=-1){
                                                        //console.log('存在：'+my_st_id);
                                                        $(this).find('span').removeClass('box-disable');
                                                        $(this).find('b').removeClass('img-disable');
                                                        $(this).click(function () {
                                                            var stId=$(this).attr('data-st_id1');
                                                            var stName=$(this).text();
                                                            sessionStorage.setItem('st_id',stId);
                                                            sessionStorage.setItem('st_name',stName);
                                                            $.ajax({
                                                                url:url_top+'monitor/ass/host/findBystid',
                                                                data:{st_id:stId},
                                                                success:function(text){
                                                                    if(text.bystid[0]==null){
                                                                        alert('暂无此监控站')
                                                                    }else{
                                                                        sessionStorage.setItem('host_id',text.bystid[0].host_id);
                                                                        sessionStorage.setItem('host_code',text.bystid[0].host_code);
                                                                        sessionStorage.setItem('host_key',text.bystid[0].host_key);
                                                                        $.ajax({
                                                                            url:url_top+'monitor/ass/dfloor/findHid',
                                                                            data:{host_id:text.bystid[0].host_id},
                                                                            success:function(list){
                                                                                sessionStorage.setItem('nn',list.map[0].id);
                                                                                location.href='../../monitor/threed/indexn.html'
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                            })
                                                        })
                                                    }else{
                                                        //点击页面跳转
                                                        //console.log('不存在：'+my_st_id);
                                                    }

                                                })
                                            }
                                        });
                                    }
                                });

                            }
                        });
                    }

                }
            });
        });
        $('.province-box').find('div').append(html1);

    }
});
//$.getJSON(url_top+'monitor/prv/role/getCurrentGrants', function(data){
//    console.debug(data);
//    if(data.success) {
//        var html = '';
//        for(var i in data.rows){
//            html += '<li class="treeview ' + data.rows[i].attributes.img + '">';
//            html += '<a href="#">';
//            html += '<i class="fa"></i> <span>' + data.rows[i].attributes.gt_class_name + '</span>';
//            html += '</a>';
//            html += '<ul class="treeview-menu">';
//            for(var x in data.rows[i].attributes.grantLines){
//                html += '<li><a href="' + data.rows[i].attributes.grantLines[x].path + '"><i class="fa fa-circle"></i> ' + data.rows[i].attributes.grantLines[x].gt_name + ' <i class="fa  fa-caret-right"></i></a></li>';
//            }
//            html += '</ul>';
//            //console.log(data.rows[i].attributes.grantLines[x].path);
//        }
//        $(".sidebar-menu").html(html);
//    } else{
//        alert(data.errors);
//    }
//});
//$(function(){setTimeout(onWidthChange,1000);});
//
//function onWidthChange() {
//    if( $(window).width() < 1300 ) {
//        console.error($(window).width());
//        $('.province-box').css('display','none');
//        $('.line1').css('display','none');
//    }else{
//        $('.province-box').css('display','inline-block');
//        $('.line1').css('display','inline-block');
//    }
//    setTimeout(onWidthChange,1000);
//}

