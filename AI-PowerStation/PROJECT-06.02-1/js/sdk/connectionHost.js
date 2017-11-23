/**
 * Created by SDS on 2017/3/7.
 */

var tempHost = null;

function test() {
    if((sessionStorage['host_code']&&sessionStorage['host_key'])==undefined){
        location.href='../../home/main/index.html'
    }
//    var deviceId = 'CCU_00162';
//    var accessKey = "A11DD1E8441295ED05D5E02633A06E57"
    var deviceId = sessionStorage['host_code'];
    var accessKey = sessionStorage['host_key'];


  // 生成主机对象
  tempHost = new SHost(deviceId, accessKey);

  // 初始化主机
  tempHost.init();

  // 注册主机状态推送
  tempHost.registerHostStatusCallbackFunc(callBack);

  // 注册主机设备状态推送
  tempHost.registerDevicesStatusCallbackFunc(deviceCallBack);



}
test();
var htmln=[];
var device3 = {};
var device4={};
var jinggao={};
var a='';
var c=[];
var d=[];
var labelwarning=null;
function callBack(temp) {
  console.warn(temp);
  var tempJson = JSON.parse(temp);
  if (tempJson.status.statusStep == "link" && tempJson.status.statusValue == 1) {
    $("#link").html('链接成功');
  }
  if (tempJson.status.statusStep == "login" && tempJson.status.statusValue == 1) {
    $("#login").html('登录成功');
  }
  if (tempJson.status.statusStep == "synch" && tempJson.status.statusValue == 1) {
    $("#synch").html('信息同步成功');
  }
    var temp=showAllDevices();
    if(temp.length!=0) {
        for (var k in temp) {
            (function(k) {
                var threshold_l='';
                var threshold_h='';
                $.ajax({
                    url: url_top+'monitor/ass/controller/findByCtrlCode',
                    data: {ctrl_code: temp[k].id,sessionId:sessionStorage['sessionid']},
                    success: function (text) {
                        threshold_l=text.Controller[0].threshold_l;
                        threshold_h=text.Controller[0].threshold_h;
                        if (temp[k].status != null && temp[k].status.hasOwnProperty('alarm')) {
                            if (temp[k].status.alarm == 1) {
                                $.ajax({
                                    url: url_top+'monitor/ass/device/findIdByCcode',
                                    data: {ctrl_code: temp[k].id},
                                    success: function (text) {
                                        c = [];
                                        d = [];
                                        jinggao[text.map[0].id] = '警告&nbsp;&nbsp;' + temp[k].name + '超出阈值'
                                        device3[text.map[0].id] = "red";
                                        device4[text.map[0].id] = "blue";
                                        for (var keyname in device3) {
                                            c.push({id: keyname, color: device3[keyname]})
                                        }
                                        for (var keyname in device4) {
                                            d.push({id: keyname, color: device4[keyname]})
                                        }
                                        if (temp[k].deviceType == 'ZIGBEE_InfraredSensor') {
                                            v3d.floorExplorer.showHideInfrared(text.map[0].id,false);
                                            v3d.floorExplorer.showHideInfrared(text.map[0].id, true);
                                        }
                                    }
                                })
                                $.ajax({
                                    url: url_top+'monitor/mon/alert/saveAlert',
                                    data: {
                                        st_id: sessionStorage['st_id'],
                                        host_id: sessionStorage['host_id'],
                                        ctrl_id: temp[k].id,
                                        state: 1,
                                        log_desc: encodeURI(temp[k].name + '超出阈值', "utf-8")
                                    },
                                    success: function (text) {

                                    }
                                })
                            }
                        } else if (temp[k].status != null && temp[k].status.hasOwnProperty('type')) {

                            console.error(threshold_h)
                            if (temp[k].status.type == "℃" && (temp[k].status.value >= threshold_h || temp[k].status.value <= threshold_l)) {
                                alert(threshold_l)
                                var g = k;
                                $.ajax({
                                    url: url_top+'monitor/ass/device/findIdByCcode',
                                    data: {ctrl_code: temp[k].id},
                                    success: function (text) {
                                        c = [];
                                        d = [];
                                        jinggao[text.map[0].id] = '警告&nbsp;&nbsp;' + temp[g].name + '超出阈值'
                                        device3[text.map[0].id] = "red";
                                        device4[text.map[0].id] = "blue";
                                        for (var keyname in device3) {
                                            c.push({id: keyname, color: device3[keyname]})
                                        }
                                        for (var keyname in device4) {
                                            d.push({id: keyname, color: device4[keyname]})
                                        }
                                    }
                                })
                                $.ajax({
                                    url: url_top+'monitor/mon/alert/saveAlert',
                                    data: {
                                        st_id: sessionStorage['st_id'],
                                        host_id: sessionStorage['host_id'],
                                        ctrl_id: temp[k].id,
                                        state: 1,
                                        log_desc: encodeURI(temp[k].name + '超出阈值', "utf-8")
                                    },
                                    success: function (text) {
                                    }
                                })
                            } else if (temp[k].status.type == "%" && (temp[k].status.value >= threshold_h || temp[k].status.value <= threshold_l)) {
                                var g = k;
                                $.ajax({
                                    url: url_top+'monitor/ass/device/findIdByCcode',
                                    data: {ctrl_code: temp[k].id},
                                    success: function (text) {
                                        c = [];
                                        d = [];
                                        jinggao[text.map[0].id] = '警告&nbsp;&nbsp;' + temp[g].name + '超出阈值'
                                        device3[text.map[0].id] = "red";
                                        device4[text.map[0].id] = "blue";
                                        for (var keyname in device3) {
                                            c.push({id: keyname, color: device3[keyname]})
                                        }
                                        for (var keyname in device4) {
                                            d.push({id: keyname, color: device4[keyname]})
                                        }
                                    }
                                })
                                $.ajax({
                                    url: url_top+'monitor/mon/alert/saveAlert',
                                    data: {
                                        st_id: sessionStorage['st_id'],
                                        host_id: sessionStorage['host_id'],
                                        ctrl_id: temp[k].id,
                                        state: 1,
                                        log_desc: encodeURI(temp[k].name + '超出阈值', "utf-8")
                                    },
                                    success: function (text) {
                                    }
                                })
                            }
                        }else if (temp[k].status != null && temp[k].status.hasOwnProperty('switch')) {
                            if(temp[k].status.switch=="ON"){
                                $.ajax({
                                    url: url_top+'monitor/ass/device/findIdByCcode',
                                    data: {ctrl_code: temp[k].id},
                                    success: function (text) {
                                        v3d.floorExplorer.showHideLight(text.map[0].id,false);
                                        v3d.floorExplorer.showHideLight(text.map[0].id,true);
                                    }
                                })
                            }
                        }
                    }
                })

            })(k)
        }
    }
    var b='';
    var timer=setInterval(
        function(){
            var htmlJ='';
            var lastkey=null;
            for (var keyname in jinggao){
                htmlJ+=`
            <li><a href="#"onclick="locateDevice(${keyname})"><b></b><span>${jinggao[keyname]}</span></a></li>`
                lastkey=keyname
            }
            if(lastkey!=null) {
                $('#warning-box').css('display','block');
                labelwarning=htmlJ;
                var html=[]
                for(var key in jinggao){
                    html[key]=`
                                <li>
                 <a href="#">
                                        <i class="fa fa-warning text-red"></i>
                                        <span onclick="locateDevice(${key});">报警&nbsp;&nbsp;${jinggao[key]}</span>
                                    </a>

                                <li>
                 `
                }
                if(html!=[]) {
                    var b='';
                    htmln=html.concat();
                    for(var key in html){
                        b+=html[key]
                    }
                    $('#alertM').html(b);
                    $('.label-warning').html(Object.getOwnPropertyNames(jinggao).length);
                    $('#alertN').html(Object.getOwnPropertyNames(jinggao).length)
                }
                if(html.sort().toString()==htmln.sort().toString()){
                    clearInterval(timer);
                }
            }
            if(!$('.label-warning').hasClass('twinkling')) {
                $('.label-warning').addClass('twinkling')
            }

        },1000);

}
function deviceCallBack(temp) {
  var tempJson = JSON.parse(temp);
    console.error(tempJson)

    var threshold_l='';
    var threshold_h='';
    $.ajax({
        url: url_top+'monitor/ass/controller/findByCtrlCode',
        data: {ctrl_code: tempJson.id,sessionId:sessionStorage['sessionid']},
        success:function(text) {
            threshold_l=text.Controller[0].threshold_l;
            threshold_h=text.Controller[0].threshold_h;
            if (tempJson.status!=null&&tempJson.status.hasOwnProperty('alarm')) {
                if (tempJson.status.alarm == 1) {
                    $.ajax({
                        url: url_top+'monitor/ass/device/findIdByCcode',
                        data: {ctrl_code: tempJson.id},
                        success: function (text) {
                            c = [];
                            d = [];
                            jinggao[text.map[0].id] = '警告&nbsp;&nbsp;' + tempJson.name + '超出阈值'
                            device3[text.map[0].id] = "red";
                            device4[text.map[0].id] = "blue";
                            for (var keyname in device3) {
                                c.push({id: keyname, color: device3[keyname]})
                            }
                            for (var keyname in device4) {
                                d.push({id: keyname, color: device4[keyname]})
                            }
                            if (tempJson.deviceType == 'ZIGBEE_DipSensor') {
                                v3d.floorExplorer.highlight([{id: 288, color: "red"}]);
                            }
                            if (tempJson.deviceType == 'ZIGBEE_InfraredSensor') {
                                v3d.floorExplorer.showHideInfrared(text.map[0].id, false);
                                v3d.floorExplorer.showHideInfrared(text.map[0].id, true);
                            }
                        }
                    })
                    $.ajax({
                        url: url_top+'monitor/mon/alert/saveAlert',
                        data: {
                            st_id: sessionStorage['st_id'],
                            host_id: sessionStorage['host_id'],
                            ctrl_id: tempJson.id,
                            state: 1,
                            log_desc: encodeURI(tempJson.name + '超出阈值', "utf-8")
                        },
                        success: function (text) {
                        }
                    })
                    var timer=setInterval(
                        function(){
                            var htmlJ='';
                            var lastkey=null;
                            for (var keyname in jinggao){
                                htmlJ+=`
                            <li><a href="#"onclick="locateDevice(${keyname})"><b></b><span>${jinggao[keyname]}</span></a></li>`
                                lastkey=keyname
                            }
                            if(lastkey!=null) {
                                $('#warning-box').css('display','block');
                                labelwarning=htmlJ;
                                var html=[]
                                for(var key in jinggao){
                                    html[key]=`
                                <li>
                 <a href="#">
                                        <i class="fa fa-warning text-red"></i>
                                        <span onclick="locateDevice(${key});">报警&nbsp;&nbsp;${jinggao[key]}</span>
                                    </a>

                                <li>
                 `
                                }
                                if(html!=[]) {
                                    var b='';
                                    htmln=html.concat();
                                    for(var key in html){
                                        b+=html[key]
                                    }
                                    $('#alertM').html(b);
                                    $('.label-warning').html(Object.getOwnPropertyNames(jinggao).length);
                                    $('#alertN').html(Object.getOwnPropertyNames(jinggao).length)
                                }
                                if(html.sort().toString()==htmln.sort().toString()){
                                    clearInterval(timer);
                                }
                            }
                            if(!$('.label-warning').hasClass('twinkling')) {
                                $('.label-warning').addClass('twinkling')
                            }

                        },1000);
                }else{
                    $.ajax({
                        url: url_top+'monitor/ass/device/findIdByCcode',
                        data: {ctrl_code: tempJson.id},
                        success: function (text) {
                            c = [];
                            d = [];
                            delete jinggao[text.map[0].id];
                            delete device3[text.map[0].id];
                            delete device4[text.map[0].id] ;
                            v3d.floorExplorer.deHighlight(c);
                            v3d.floorExplorer.deHighlight(d);
                            for (var keyname in device3) {
                                c.push({id: keyname, color: device3[keyname]})
                            }
                            for (var keyname in device4) {
                                d.push({id: keyname, color: device4[keyname]})
                            }
                            if (tempJson.deviceType == 'ZIGBEE_DipSensor') {
                                v3d.floorExplorer.highlight([{id: 288, color: "red"}]);
                            }
                            if (tempJson.deviceType == 'ZIGBEE_InfraredSensor') {
                                v3d.floorExplorer.showHideInfrared(text.map[0].id, false);
                            }
                        }
                    })


                }
            }else if(tempJson.status!=null&&tempJson.status.hasOwnProperty('type')){
                if (tempJson.status.type == "℃" && (tempJson.status.value >= threshold_h || tempJson.status.value <= threshold_l)) {
                    alert(threshold_l)
                    $.ajax({
                        url: url_top+'monitor/ass/device/findIdByCcode',
                        data: {ctrl_code: tempJson.id},
                        success: function (text) {
                            c = [];
                            d = [];
                            jinggao[text.map[0].id] = '警告&nbsp;&nbsp;' + tempJson.name + '超出阈值'
                            device3[text.map[0].id] = "red";
                            device4[text.map[0].id] = "blue";
                            for (var keyname in device3) {
                                c.push({id: keyname, color: device3[keyname]})
                            }
                            for (var keyname in device4) {
                                d.push({id: keyname, color: device4[keyname]})
                            }
                            if(ctrR==true) {
                                device5[text.map[0].id] = tempJson.status.value;
                            }
                        }


                    })
                    $.ajax({
                        url:url_top+'monitor/mon/alert/saveAlert',
                        data: {
                            st_id: sessionStorage['st_id'],
                            host_id: sessionStorage['host_id'],
                            ctrl_id: tempJson.id,
                            state: 1,
                            log_desc: encodeURI(tempJson.name + '超出阈值', "utf-8")
                        },
                        success: function (text) {
                        }
                    })

                    var timer=setInterval(
                        function(){
                            var htmlJ='';
                            var lastkey=null;
                            for (var keyname in jinggao){
                                htmlJ+=`
                            <li><a href="#"onclick="locateDevice(${keyname})"><b></b><span>${jinggao[keyname]}</span></a></li>`
                                lastkey=keyname
                            }
                            if(lastkey!=null) {
                                $('#warning-box').css('display','block');
                                labelwarning=htmlJ;
                                var html=[]
                                for(var key in jinggao){
                                    html[key]=`
                                <li>
                 <a href="#">
                                        <i class="fa fa-warning text-red"></i>
                                        <span onclick="locateDevice(${key});">报警&nbsp;&nbsp;${jinggao[key]}</span>
                                    </a>

                                <li>
                 `
                                }
                                if(html!=[]) {
                                    var b='';
                                    htmln=html.concat();
                                    for(var key in html){
                                        b+=html[key]
                                    }
                                    $('#alertM').html(b);
                                    $('.label-warning').html(Object.getOwnPropertyNames(jinggao).length);
                                    $('#alertN').html(Object.getOwnPropertyNames(jinggao).length)
                                }
                                if(html.sort().toString()==htmln.sort().toString()){
                                    clearInterval(timer);
                                }
                            }
                            if(!$('.label-warning').hasClass('twinkling')) {
                                $('.label-warning').addClass('twinkling')
                            }

                        },1000);
                } else if (tempJson.status.type == "%" && (tempJson.status.value >= threshold_h || tempJson.status.value <= threshold_l)) {
                    $.ajax({
                        url: url_top+'monitor/ass/device/findIdByCcode',
                        data: {ctrl_code: tempJson.id},
                        success: function (text) {
                            c = [];
                            d = [];
                            jinggao[text.map[0].id] = '警告&nbsp;&nbsp;' + tempJson.name + '超出阈值'
                            device3[text.map[0].id] = "red";
                            device4[text.map[0].id] = "blue";
                            for (var keyname in device3) {
                                c.push({id: keyname, color: device3[keyname]})
                            }
                            for (var keyname in device4) {
                                d.push({id: keyname, color: device4[keyname]})
                            }
                            if(ctrR==2) {
                                device5[text.map[0].id] = tempJson.status.value;
                            }
                        }
                    })
                    $.ajax({
                        url: url_top+'monitor/mon/alert/saveAlert',
                        data: {
                            st_id: sessionStorage['st_id'],
                            host_id: sessionStorage['host_id'],
                            ctrl_id: tempJson.id,
                            state: 1,
                            log_desc: encodeURI(tempJson.name + '超出阈值', "utf-8")
                        },
                        success: function (text) {
                        }
                    })

                    var timer=setInterval(
                        function(){
                            var htmlJ='';
                            var lastkey=null;
                            for (var keyname in jinggao){
                                htmlJ+=`
                            <li><a href="#"onclick="locateDevice(${keyname})"><b></b><span>${jinggao[keyname]}</span></a></li>`
                                lastkey=keyname
                            }
                            if(lastkey!=null) {
                                $('#warning-box').css('display','block');
                                labelwarning=htmlJ;
                                var html=[]
                                for(var key in jinggao){
                                    html[key]=`
                                <li>
                 <a href="#">
                                        <i class="fa fa-warning text-red"></i>
                                        <span onclick="locateDevice(${key});">报警&nbsp;&nbsp;${jinggao[key]}</span>
                                    </a>

                                <li>
                 `
                                }
                                if(html!=[]) {
                                    var b='';
                                    htmln=html.concat();
                                    for(var key in html){
                                        b+=html[key]
                                    }
                                    $('#alertM').html(b);
                                    $('.label-warning').html(Object.getOwnPropertyNames(jinggao).length);
                                    $('#alertN').html(Object.getOwnPropertyNames(jinggao).length)
                                }
                                if(html.sort().toString()==htmln.sort().toString()){
                                    clearInterval(timer);
                                }
                            }
                            if(!$('.label-warning').hasClass('twinkling')) {
                                $('.label-warning').addClass('twinkling')
                            }

                        },1000);
                }else{
                    $.ajax({
                        url: url_top+'monitor/ass/device/findIdByCcode',
                        data: {ctrl_code: tempJson.id},
                        success: function (text) {
                            if((tempJson.status.type == "%"&&ctrR==2)||(tempJson.status.type =="℃"&&ctrR==true)) {
                                device5[text.map[0].id] = tempJson.status.value;
                                jinggao[text.map[0].id]=null;
                                var statusA=true;
                                for(var k in jinggao){
                                    if(k!=null){
                                        statusA=false;
                                        break;
                                    }
                                }
                                if(statusA){
                                    $('#warning-box').css('display','none')
                                }
                            }
                        }
                    })
                    $.ajax({
                        url: url_top+'monitor/mon/history/saveHistory',
                        data: {st_id: sessionStorage['st_id'],host_id:sessionStorage['host_id'],ctrl_id:tempJson.id,value:tempJson.status.value},
                        success: function (text) {
                            alert('成功')
                        }
                    })
                }
            }
        }

    })



    if(tempJson.status!=null&&tempJson.status.hasOwnProperty('type')) {
        v3d.floorExplorer.hideText(devices);
        console.error(devices)
        v3d.floorExplorer.hideText(devices);
        devices=[];
        for (var key in device5) {
            devices.push(
                {
                    id: key,
                    data: {
                        rows: [
                            [
                                {text: ctrR==true ? "当前温度" : "当前湿度", size: 30, color: '#ffffff'},
                            ],
                            [
                                {text: device5[key], size: 60, color: '#000000'},
                                {text: ctrR==true ? "℃" : "%", size: 20, color: '#ffffff'}
                            ]
                        ],
                        bg: 'rgba(0, 191, 255, 0.6)'
                    }
                })
        }

        v3d.floorExplorer.showText(devices);
    }

}

setInterval(function(){
    if(a==d){
        a=c
    }else{
        a=d
    }
    v3d.floorExplorer.highlight(a);
},500)
var timerG=null;
setInterval(function(){
    clearInterval(timerG);
    $('#warning-box ul').html(labelwarning);
        var slideShow=$("#warning-box"),  //��ȡ������ܵ�����
            ul=slideShow.find("ul"),
            oneWidth=slideShow.find("ul li").eq(0).width(); //��ȡÿ��ͼƬ�Ŀ��
        var iNow=0;
        function autoPlay(){
            timerG=setInterval(function(){  //�򿪶�ʱ��
                iNow++;       //��ͼƬ������ֵ�����1�������Ϳ���ʵ��˳���ֲ�ͼƬ
                if(iNow>=Object.getOwnPropertyNames(jinggao).length){ //���������һ��ͼ��ʱ����iNow��ֵΪ��һ��ͼ������ֵ���ֲ�Ч����ת����һ��ͼ���¿�ʼ
                    iNow=0;
                }
                ul.animate({
                    "left":-oneWidth*iNow //ע��˴��õ�left���ԣ�����ul����ʽ������Ҫ����position: relative; ��ul����N��ͼƬ��С�Ŀ�ȣ�N���ݱ�����İ�ť����ֵiNowȷ��
                })
            },2000); //2000Ϊ�ֲ���ʱ��
        }
        autoPlay();
        slideShow.hover(
            function(){
                clearInterval(timerG);
            },autoPlay
        );
},6000)
function checkHostObject() {
  if (tempHost == null) {
    return false;
  }

  return true;
}

function showDataRepository() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  var temp = tempHost.hostDataRepository.getHostConfigInformation();
  console.warn(temp);
}

function showNodeInfo() {
  console.log("" +
      "\n * ZIGBEE_Light           3032 3033 3034" +
      "\n * ZIGBEE_CurtainMotor    2918" +
      "\n * ZIGBEE_Outlet          3107" +
      "\n * ZIGBEE_InfraredSensor  3186" +
      "\n * ZIGBEE_SmokeSensor     3139" +
      "\n * ZIGBEE_DipSensor       3251" +
      "\n * ZIGBEE_DoorSensor      3671" +
      "\n * ZIGBEE_TempSensor      3645" +
      "\n * ZIGBEE_HumiSensor      3646");
}
