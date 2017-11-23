/**
 * Created by SDS on 2017/3/7.
 */

var pos = "";
var icon = "";
var name = "";
var enable = "";
var roomId = "";
var nodeId = "";
var floorId = "";

function getConfigValue() {
  pos     = $("#pos").val();
  icon    = $("#configIcon").val();
  name    = $("#configName").val();
  enable  = ($("#floorEnable").val() == "true") ? true : false;
  roomId  = $("#roomId").val();
  nodeId  = $("#nodeId").val();
  floorId = $("#floorId").val();
}

function editFloor() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getConfigValue();
  tempHost.asyncEditFloor(floorId, pos, enable);
}

function addRoom() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getConfigValue();
  tempHost.asyncAddRoom(name, icon, floorId, pos);
}

function editRoom() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getConfigValue();
  tempHost.asyncEditRoom(roomId, name, icon, floorId, pos);
}

function deleteRoom() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getConfigValue();
  tempHost.asyncDeleteRoom(roomId);
}

function editDevice() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getConfigValue();
  tempHost.asyncEditDevice(nodeId, name, icon, roomId);
}

function deleteDevice() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getConfigValue();
  tempHost.asyncDeleteDevice(nodeId);
}
