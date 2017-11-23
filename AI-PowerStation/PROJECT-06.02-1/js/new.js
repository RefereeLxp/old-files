/**
 * Created by PVer on 2017/3/14.
 */
    //饼状图
var bg_color=[];
bg_color=['#BFBFBF','#B98FBF','#38BAC7','#768FC7','#9ACF99','#F4DE93','#B5E0F0','#035773'];
$.ajax({
    type: 'GET',
    url: url_top+'monitor/mon/alert/conNum',
    //data: {sessionId:sessionStorage['sessionid']},
    success: function(list){
        var value,percentage,sum=0,color,html='';
        var json='[';
        var p=list.alert;
        $.each(list.alert, function (i, p) {
            sum+=parseInt(p.number);
        });
        if(list.alert.length>0){
            $.each(list.alert, function (i, p) {
                value=p.number;
                percentage=(value/sum*100).toFixed(1)+ "%";
                //color=bg3();
                json+=`{
                    value: ${value},
                    color:"${bg_color[i]}",
                    text: "${percentage}"
                },`;
                html+=`
                   <div><b style="background:${bg_color[i]}"></b><span>${p.dict_name}</span><i>${percentage}</i></div>

                    `;
            });
            $('#pie-type-box .pie-type').empty().html(html);
            json=json.slice(0,-1);
            json+=']';
            function strToJson(str){
                var json = eval('(' + str + ')');
                 return json;
            }
            json=strToJson(json);
        }else{
            json=[{
                value: 100,
                color:"#FFD48D",
                text: "无设备故障"
            }];
            html=`
                   <div><b style="background:#FFD48D"></b><span>无设备故障</span><i></i></div>

                    `;
            $('#pie-type-box .pie-type').empty().html(html);

        }
        //console.log(html);
        var pieData = json;
        var pie = new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData);

    }
});
function bg3(){
    //Math.floor(Math.random()*(max-min+1)+min)
    var r=Math.floor(Math.random()*(225-30+1)+30);
    var g=Math.floor(Math.random()*(220-100+1)+100);
    var b=Math.floor(Math.random()*(225-50+1)+50);
    return "rgb("+r+','+g+','+b+")";
}

$.ajax({
    type: 'GET',
    url: url_top+'monitor/mon/alert/stNum',
    //data: {sessionId:sessionStorage['sessionid']},
    success: function(list){
        var arr_name=[],arr_num=[];
        $.each(list.alert, function (i, p) {
            arr_name.push(p.st_name);
            arr_num.push(parseInt(p.number));
        });
        if(list.alert.length<11){
            for(var i=0;i<11-list.alert.length;i++){
                arr_name.push('');
                arr_num.push('');
            }
        }
        if(list.alert.length==0){
            $('.chart-box-layer').removeClass('fade');
        }
        console.log(arr_name);
        console.log(arr_num);
        var barChartData = {
            labels : arr_name,
                //["环境传感","燃气传感","门磁传感","湿度传感","灯光传感","烟雾传感","门禁传感","声光传感","智能插座","智能监控"],
            datasets : [
                {
                    fillColor : "#ECE795",
                    strokeColor : "#ECE795",
                    data : arr_num
                        //[28,48,40,19,45,27,34,23,25,12]
                }
            ]

        };
        var bar = new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
    }
});











