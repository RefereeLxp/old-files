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
  tempHost.asyncAddEXIFTTT(IFTTTName, IFTTTRoomId, IFTTTNote, IFTTTEnable, IFTTTCondition, IFTTTLimitCondition, IFTTTAction);
}

function updateEXIFTTT() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getIFTTTConfigValue();
  tempHost.asyncUpdateEXIFTTT(IFTTTId, IFTTTName, IFTTTRoomId, IFTTTNote, IFTTTEnable, IFTTTCondition, IFTTTLimitCondition, IFTTTAction);
}
