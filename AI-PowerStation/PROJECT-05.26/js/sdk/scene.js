/**
 * Created by SDS on 2017/3/7.
 */

var sceneId = '';
var sceneName = '';
var sceneRoom = '';
var sceneType = '';
var sceneEnable = '';
var sceneWeek = '';
var sceneTime = '';
var sceneAction = '';

var sceneActions =
    [
      {
        "id": "3032",
        "area": "web测试区",
        "name": "",
        "roomId": "480",
        "operation": "OFF",
        "deviceType": "ZIGBEE_Light",
        "delay": "2"
      },
      {
        "id": "3033",
        "area": "web测试区",
        "name": "",
        "roomId": "480",
        "operation": "OFF",
        "deviceType": "ZIGBEE_Light",
        "delay": "3"
      },
      {
        "id": "3034",
        "area": "web测试区",
        "name": "",
        "roomId": "480",
        "operation": "OFF",
        "deviceType": "ZIGBEE_Light",
        "delay": "4"
      }
    ];

$("#sceneActions").val(JSON.stringify(sceneActions));

function getSceneValue () {
  sceneId = $("#sceneId").val();
  sceneName = $("#sceneName").val();
  sceneRoom = $("#sceneRoomId").val();
  sceneType = $("#sceneType").val();
  sceneEnable = ($("#sceneEnable").val() == 'true') ? true : false;
}

function showScenes() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  var scenes = tempHost.hostDataRepository.getAllScenesInfo();
  console.warn(JSON.stringify(scenes));
  return scenes
}

function addScene() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getSceneValue();
  tempHost.asyncAddScene(sceneName, sceneRoom, sceneType);
}

function editScene() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getSceneValue();
  tempHost.asyncEditScene(sceneName, sceneRoom, sceneType, sceneId);
}

function deleteScene() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getSceneValue();
  tempHost.asyncDeleteScene(sceneId);
}

function setSceneTime() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getSceneValue();
  tempHost.asyncSetSceneTimer(sceneId, sceneEnable, sceneTime, sceneWeek);
}

function addSceneAction() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getSceneValue();
  tempHost.asyncSetSceneAction(sceneId, sceneAction);
}

function doSceneAction() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getSceneValue();
  tempHost.asyncOperationSceneExecute(sceneId);
}
