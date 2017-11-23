/**
 * Created by SDS on 2017/3/7.
 */

var IFTTTId = "";
var IFTTTName = "";
var IFTTTRoomId = "";
var IFTTTNote = "";
var IFTTTEnable = "";
var IFTTTCondition = "";
var IFTTTLimitCondition = "";
var IFTTTAction = "";

var conditions =
    [
      {
        "id" : '3186',
        "name" : '',
        "roomId" : '480',
        "area" : '',
        "deivceIcon" : '',
        "compareType" : '相等',
        "leftValue" : '',
        "rightValue" : '1',
        "deviceType" : 'ZIGBEE_InfraredSensor'
      },
      {
        "id" : '3198',
        "name" : '',
        "roomId" : '480',
        "area" : '',
        "deivceIcon" : '',
        "compareType" : '大于',
        "leftValue" : '*',
        "rightValue" : '25',
        "deviceType" : 'ZIGBEE_TempSensor'
      }
    ];
var limitConditions =
    [
      {
        "limitType" : "device",
        "content"   : {
          "id" : '3186',
          "name" : '',
          "roomId" : '480',
          "area" : '',
          "deivceIcon" : '',
          "compareType" : '相等',
          "leftValue" : '*',
          "rightValue" : '0',
          "deviceType" : 'ZIGBEE_DoorSensor'
        }
      },
      {
        "limitType" : "device",
        "content"   : {
          "id" : '3198',
          "name" : '',
          "roomId" : '480',
          "area" : '',
          "deivceIcon" : '',
          "compareType" : '小于',
          "leftValue" : '*',
          "rightValue" : '30',
          "deviceType" : 'ZIGBEE_TempSensor'
        }
      },
      {
        "limitType" : "time",
        "content"   : [
          {
            "startTime" : "23:00",
            "endTime" : "3:00",
            "crossDay" : false,
            "repeatDays" : ["1","3","5","7"],
            "inUse" : true
          }
        ]
      }
    ];
var IFTTTActions =
    [
      {
        "id": "3032",
        "area": "web测试区",
        "name": "",
        "roomId": "480",
        "operation": "ON",
        "deviceType": "ZIGBEE_Light",
        "delay": "2"
      },
      {
        "id": "3033",
        "area": "web测试区",
        "name": "",
        "roomId": "480",
        "operation": "ON",
        "deviceType": "ZIGBEE_Light",
        "delay": "3"
      },
      {
        "id": "3034",
        "area": "web测试区",
        "name": "",
        "roomId": "480",
        "operation": "ON",
        "deviceType": "ZIGBEE_Light",
        "delay": "4"
      }
    ];

$("#condition").val(JSON.stringify(conditions));
$("#limitCondition").val(JSON.stringify(limitConditions));
$("#result").val(JSON.stringify(IFTTTActions));

function getIFTTTConfigValue() {
  IFTTTId = $("#IFTTTId").val();
  IFTTTName = $("#IFTTTName").val();
  IFTTTRoomId = $("#IFTTTRoom").val();
  IFTTTNote = ($("#IFTTTNoteEnable").val() == "true") ? true : false;
  IFTTTEnable = ($("#IFTTTEnable").val() == "true") ? true : false;
  IFTTTCondition = JSON.parse($("#condition").val() == "" ? "[]" : $("#condition").val());
  IFTTTLimitCondition = JSON.parse($("#limitCondition").val() == "" ? "[]" : $("#limitCondition").val());
  IFTTTAction = JSON.parse($("#result").val() == "" ? "[]" : $("#result").val());
}

function showIFTTT() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  console.warn(JSON.stringify(tempHost.hostDataRepository.getAllIFTTTInfo()));
  return tempHost.hostDataRepository.getAllIFTTTInfo();
}

function addIFTTT() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getIFTTTConfigValue();
  tempHost.asyncAddIFTTT(IFTTTName, IFTTTRoomId, IFTTTNote, IFTTTEnable, IFTTTCondition, IFTTTAction);
}

function updateIFTTT() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getIFTTTConfigValue();
  tempHost.asyncUpdateIFTTT(IFTTTId, IFTTTName, IFTTTRoomId, IFTTTNote, IFTTTEnable, IFTTTCondition, IFTTTAction);
}

function deleteIFTTT() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getIFTTTConfigValue();
  tempHost.asyncDeleteIFTTT(IFTTTId);
}

function enableIFTTT(str) {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getIFTTTConfigValue();
  if (str == '1') {
    tempHost.asyncEnableIFTTT(IFTTTId, true);
  }
  else if (str == '0') {
    tempHost.asyncEnableIFTTT(IFTTTId, false);
  }
}

function showEXIFTTT() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  console.warn(JSON.stringify(tempHost.hostDataRepository.getAllEXIFTTTInfo()));
  return tempHost.hostDataRepository.getAllEXIFTTTInfo()
}

function showEXIFTTTById() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getIFTTTConfigValue();
  console.warn(JSON.stringify(tempHost.hostDataRepository.getEXIFTTTInfoById(IFTTTId)));
}

function addEXIFTTT() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getIFTTTConfigValue();
  console.error( IFTTTCondition);
  tempHost.asyncAddEXIFTTT(IFTTTName, IFTTTRoomId, IFTTTNote, IFTTTEnable, IFTTTCondition, IFTTTLimitCondition, IFTTTAction);
}

function updateEXIFTTT() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getIFTTTConfigValue();
  console.error( IFTTTCondition);
  tempHost.asyncUpdateEXIFTTT(IFTTTId, IFTTTName, IFTTTRoomId, IFTTTNote, IFTTTEnable, IFTTTCondition, IFTTTLimitCondition, IFTTTAction);
}
function CKHost(deviceId, accessKey) {
  var self = this;
  this.deviceId  = deviceId;
  this.accessKey = accessKey;

  this.linkStatus = false;  //连接状态
  this.loginStatus = false; //登录状态
  this.synStatus = false;   //同步状态

  this.mainHost = new SHost(deviceId, accessKey);  // 生成主机对象
  this.mainHost.registerHostStatusCallbackFunc(hostCallBack); // 注册主机状态推送
  this.mainHost.registerDevicesStatusCallbackFunc(deviceCallBack); // 注册主机设备状态推送

  //------------------------------------------------------------------------------------------------------------------

  /**
   * 对外接口(UI) 注册【主机】发生状态变化时，回调函数
   */
  this.registerHostStatusCallback = function (callback) {
    //console.debug('registerHostStatusCallback');
    this.hostStatusCallback = callback;
  };
  this.hostStatusCallback = null;

  function hostCallBack(data) {
    //console.debug('CKHost.hostCallBack: [' + data + ']');
    // data值可能如下：
    // {"deviceId":"CCU_00162","status":{"statusStep":"link","statusValue":1}}
    // {"deviceId":"CCU_00162","status":{"statusStep":"login","statusValue":0}}
    // {"deviceId":"CCU_00162","status":{"statusStep":"synch","statusValue":0}}

    var jdata = JSON.parse(data);
    if (jdata.status.statusStep == "link") {
      self.linkStatus = (jdata.status.statusValue == 1);
    }
    if (jdata.status.statusStep == "login") {
      self.loginStatus = (jdata.status.statusValue == 1);
    }
    if (jdata.status.statusStep == "synch") {
      self.synStatus = (jdata.status.statusValue == 1);
    }

    //console.debug('CKHost.hostCallBack: end[' + self.linkStatus + '][' + self.loginStatus + '][' + self.synStatus + ']');
    if (self.hostStatusCallback) {
      self.hostStatusCallback(data);
    }
  }

  /**
   * 对外接口(UI) 注册【主机设备】发生状态变化时，回调函数
   * data 数据为 json 格式，表示一个设备的状态信息和报警信息，字段与后台数据表 TB_ASS_CONTROLLER 相对应
   */
  this.registerDeviceStatusCallback = function (callback) {
    //console.debug('registerDeviceStatusCallback');
    this.deviceStatusCallback = callback;
  };
  this.deviceStatusCallback = null;

  function deviceCallBack(data) {
    console.debug('CKHost.deviceCallBack: [' + data + ']');

    if (self.deviceStatusCallback) {
      var jdata = eval("(" + data + ")");
      var jsonOut = new Object();
      jsonOut.value = -1;
      jsonOut.state_1 = -1;
      jsonOut.state_2 = -1;
      jsonOut.state_3 = -1;
      jsonOut.state_4 = -1;
      jsonOut.alarm_1 = -1;
      jsonOut.alarm_2 = -1;
      jsonOut.alarm_3 = -1;
      jsonOut.alarm_4 = -1;

      jsonOut.id = jdata.id;
      jsonOut.name = jdata.name;
      jsonOut.room_id = jdata.roomId;

      jsonOut.device_type = jdata.deviceType;
      switch(jsonOut.device_type){
        case "ZIGBEE_Light":
          jsonOut.class_id = 1;
          jsonOut.state_1 = convertState(jdata.status.switch);
          break;
        case "ZIGBEE_CurtainMotor":
          jsonOut.class_id = 11;
          jsonOut.state_1 = convertState(jdata.status.switch);
          break;
        case "ZIGBEE_Outlet":
          jsonOut.class_id = 2;
          jsonOut.state_1 = convertState(jdata.status.socketSwitch);
          break;
        case "ZIGBEE_KonkeSocket":
          jsonOut.class_id = 2;
          jsonOut.state_1 = convertState(jdata.status.socketSwitch);
          jsonOut.state_2 = convertState(jdata.status.lightSwitch);
          break;
        case "ZIGBEE_Socket10A":
          jsonOut.class_id = 2;
          jsonOut.state_1 = convertState(jdata.status.switch);
          break;
        case "ZIGBEE_Socket16A":
          jsonOut.class_id = 2;
          jsonOut.state_1 = convertState(jdata.status.switch);
          break;
        case "NET_KonkeSocket":
          jsonOut.class_id = 2;
          jsonOut.state_1 = convertState(jdata.status.switch);
          jsonOut.state_2 = convertState(jdata.status.lightSwitch);
          jsonOut.state_3 = convertState(jdata.status.USBSwitch);
          break;
        case "ZIGBEE_InfraredSensor":
          jsonOut.class_id = 7;
          jsonOut.value = jdata.status.battery;
          jsonOut.alarm_1 = convertAlarm(jdata.status.alarm);
          jsonOut.alarm_2 = convertAlarm(jdata.status.lowPower);
          jsonOut.alarm_3 = convertAlarm(jdata.status.dismantle);
          break;
        case "ZIGBEE_SmokeSensor":
          jsonOut.class_id = 3;
          jsonOut.value = jdata.status.battery;
          jsonOut.alarm_1 = convertAlarm(jdata.status.alarm);
          jsonOut.alarm_2 = convertAlarm(jdata.status.lowPower);
          jsonOut.alarm_3 = convertAlarm(jdata.status.dismantle);
          break;
        case "ZIGBEE_DipSensor":
          jsonOut.class_id = 6;
          jsonOut.value = jdata.status.battery;
          jsonOut.alarm_1 = convertAlarm(jdata.status.alarm);
          jsonOut.alarm_2 = convertAlarm(jdata.status.lowPower);
          jsonOut.alarm_3 = convertAlarm(jdata.status.dismantle);
          jsonOut.alarm_4 = convertAlarm(jdata.status.probeFallOff);
          break;
        case "ZIGBEE_DoorSensor":
          jsonOut.class_id = 8;
          jsonOut.value = jdata.status.battery;
          jsonOut.state_1 = convertState(jdata.status.status);
          jsonOut.alarm_2 = convertAlarm(jdata.status.lowPower);
          jsonOut.alarm_3 = convertAlarm(jdata.status.dismantle);
          break;
        case "ZIGBEE_TempSensor":
          jsonOut.class_id = 4;
          jsonOut.value = jdata.status.value;
          break;
        case "ZIGBEE_HumiSensor":
          jsonOut.class_id = 5;
          jsonOut.value = jdata.status.value;
          break;
        default:
          jsonOut.class_id = 0;
          break;
      }

      self.deviceStatusCallback(jsonOut);
    }
  }

  //------------------------------------------------------------------------------------------------------------------

  /**
   * 初始化主机
   */
  this.init = function(){
    this.mainHost.init();
  };

  /**
   * 操作灯 ZIGBEE_Light
   * devId: 设备ID
   * action: 开-on/true  关-off/false
   */
  this.lightOperate = function (devId, action) {
    if (!this.checkHostObject()) {
      console.error("please link host first.");
      return false;
    }
    var on = (action.toLowerCase() == "true" || action.toLowerCase() == "on") ? true : false;
    this.mainHost.asyncOperationSwitchDevices(devId, on);
    return true;
  };

  /**
   * 操作插座 ZIGBEE_Outlet
   * devId: 设备ID
   * action: 开-on/true  关-off/false
   */
  this.outletOperate = function (devId, action) {
    if (!this.checkHostObject()) {
      console.error("please link host first.");
      return false;
    }
    var on = (action.toLowerCase() == "true" || action.toLowerCase() == "on") ? true : false;
    this.mainHost.asyncOperationSocketSwitchDevices(devId, on);
    return true;
  };

  /**
   * 操作电机 ZIGBEE_CurtainMotor
   * devId: 设备ID
   * action: 开-on/open  关-off/close 停-stop
   */
  this.motorOperate = function (devId, action) {
    if (!this.checkHostObject()) {
      console.error("please link host first.");
      return false;
    }

    if(action.toLowerCase() == "open" || action.toLowerCase() == "on")
      action = "open";
    else if(action.toLowerCase() == "stop")
      action = "stop";
    else
      action = "close";
    action = action.toUpperCase();
    this.mainHost.asyncOperationMotorSwitchDevices(devId, action);
    return true;
  };

  //------------------------------------------------------------------------------------------------------------------

  /**
   * 获取楼层信息
   * 返回值为json格式
   */
  this.getFloor = function () {
    if (!this.checkHostObject()) {
      console.error("please link host first.");
      return null;
    }
    //范例数据： {id:"3",name:"一楼"}
    var jdata = this.mainHost.hostDataRepository.getAllFloorsInfo();
    //console.debug('getFloor: ' + obj2string2(jdata));
    return jdata;
  };

  /**
   * 获取房间信息
   * 返回值为json格式
   */
  this.getRoom = function () {
    if (!this.checkHostObject()) {
      console.error("please link host first.");
      return null;
    }
    //范例数据： {id:"480",name:"web测试环境",floorId:"3"},{id:"481",name:"测试福",floorId:"3"},{id:"484",name:"好的",floorId:"3"}
    var jdata = this.mainHost.hostDataRepository.getAllRoomsInfo();
    //console.debug('getRoom: ' + obj2string2(jdata));
    return jdata;
  };

  /**
   * 获取设备信息
   * 返回值为json格式
   */
  this.getDevice = function (dtype) {
    if (!this.checkHostObject()) {
      console.error("please link host first.");
      return null;
    }
    var jData;
    if(dtype == ""){
      jData = this.mainHost.hostDataRepository.getAllDevicesInfo();
      //console.debug('getDevice(all): ' + obj2string2(jData));
    } else{
      jData = this.mainHost.hostDataRepository.getDevicesByName(dtype);
      console.debug('getDevice(' + dtype + '): ' + obj2string2(jData));
    }

    if(dtype == ""){
      for(var i in jData){
        jData[i].value = -1;
        jData[i].state_1 = -1;
        jData[i].state_2 = -1;
        jData[i].state_3 = -1;
        jData[i].state_4 = -1;
        jData[i].alarm_1 = -1;
        jData[i].alarm_2 = -1;
        jData[i].alarm_3 = -1;
        jData[i].alarm_4 = -1;
        //根据设备类型选择自定义类型
        switch(parseInt(jData[i].operate_type)){
          case 1: //灯光
            jData[i].class_id = 1;
            jData[i].state_1 = convertState(jData[i].status.switch);
            break;
          case 501: //可调光灯
            jData[i].class_id = 1;
            jData[i].state_1 = convertState(jData[i].status.switch);
            break;
          case 2:  //插座
            jData[i].class_id = 2;
            jData[i].state_1 = convertState(jData[i].status.socketSwitch);
            break;
          case 2001: //智能插座
            jData[i].class_id = 2;
            jData[i].state_1 = convertState(jData[i].status.socketSwitch);
            break;
          case 2002: //小 K 插 座-zigbee
            jData[i].class_id = 2;
            jData[i].state_1 = convertState(jData[i].status.socketSwitch);
            jData[i].state_2 = convertState(jData[i].status.lightSwitch);
            break;
          case 3002: //烟雾传感器
            jData[i].class_id = 3;
            jData[i].value = jData[i].status.battery;
            jData[i].alarm_1 = convertAlarm(jData[i].status.alarm);
            jData[i].alarm_2 = convertAlarm(jData[i].status.lowPower);
            jData[i].alarm_3 = convertAlarm(jData[i].status.dismantle);
            break;
          case 3003: //可燃气体传感器
            jData[i].class_id = 3;
            break;
          case 10001: //温度传感器
            jData[i].class_id = 4;
            jData[i].value = jData[i].status.value;
            break;
          case 10002: //湿度传感器
            jData[i].class_id = 5;
            jData[i].value = jData[i].status.value;
            break;
          case 3004: //水浸传感器
            jData[i].class_id = 6;
            jData[i].value = jData[i].status.battery;
            jData[i].alarm_1 = convertAlarm(jData[i].status.alarm);
            jData[i].alarm_2 = convertAlarm(jData[i].status.lowPower);
            jData[i].alarm_3 = convertAlarm(jData[i].status.dismantle);
            jData[i].alarm_4 = convertAlarm(jData[i].status.probeFallOff);
            break;
          case 3001: //人体红外
            jData[i].class_id = 7;
            jData[i].value = jData[i].status.battery;
            jData[i].alarm_1 = convertAlarm(jData[i].status.alarm);
            jData[i].alarm_2 = convertAlarm(jData[i].status.lowPower);
            jData[i].alarm_3 = convertAlarm(jData[i].status.dismantle);
            break;
          case 3499: //门磁
            jData[i].class_id = 8;
            jData[i].value = jData[i].status.battery;
            jData[i].state_1 = convertState(jData[i].status.status);
            jData[i].alarm_2 = convertAlarm(jData[i].status.lowPower);
            jData[i].alarm_3 = convertAlarm(jData[i].status.dismantle);
            break;
          case 1001:  //电动窗帘
            jData[i].class_id = 11;
            jData[i].state_1 = convertState(jData[i].status.switch);
            break;
          default:
            jData[i].class_id = 0;
            break;
        } //switch
      } //for
      console.debug('getDevice(all): ' + obj2string2(jData));
    } //if(dtype == "")

    return jData;
  };

  function convertState(val){
    if(typeof(val)=="undefined")
      return -1;

    val = val.toString().toLowerCase();
    if(val == "on")
      return 1;
    else if(val == "off")
      return 2;
    else if(val == "open")
      return 1;
    else if(val == "close")
      return 2;
    else if(val == "stop")
      return 3;
    else
      return -1;
  }

  function convertAlarm(val){
    if(val == "1")
      return 1;
    else if(val == "0")
      return 0;
    else
      return -1;
  }

  //------------------------------------------------------------------------------------------------------------------

  this.checkHostObject = function () {
    return (this.mainHost != null);
  };

  function obj2string1(obj){
    var description = "";
    for(var i in obj){
      var property=obj[i];
      description+=i+" = "+property+"\n";
    }
    return description;
  }

  function obj2string2(o) {
    var r = [];
    if(o == null) {
      return 'null';
    }
    if (typeof o == "string") {
      return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    }
    if (typeof o == "object") {
      if (!o.sort) {
        for (var i in o) {
          r.push(i + ":" + obj2string2(o[i]));
        }
        if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
          r.push("toString:" + o.toString.toString());
        }
        r = "{" + r.join() + "}";
      } else {
        for (var i = 0; i < o.length; i++) {
          r.push(obj2string2(o[i]))
        }
        r = "[" + r.join() + "]";
      }
      return r;
    }
    return o.toString();
  }
}
