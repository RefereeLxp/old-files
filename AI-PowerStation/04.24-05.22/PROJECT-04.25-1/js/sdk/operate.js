/**
 * Created by SDS on 2017/3/7.
 */

function lightOperate() {
  var id = $("#lightId").val();
  var action = $("#lightAction").val();
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  tempHost.asyncOperationSwitchDevices(id, (action == "ON") ? true : false);
}

function outletOperate() {
  var id = $("#outletId").val();
  var action = $("#outletAction").val();
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  tempHost.asyncOperationSocketSwitchDevices(id, (action == "ON") ? true : false);
}

function motorOperate() {
  var id = $("#motorId").val();
  var action = $("#motorAction").val();
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  tempHost.asyncOperationMotorSwitchDevices(id, action);
}

function zoneLightOperate() {
  var id = $("#zoneLightId").val();
  var action = ($("#zoneLightAction").val() == "ON");
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  tempHost.asyncOperationZoneLights(id, action);
}

function zoneCurtainOperate() {
  var id = $("#zoneCurtainId").val();
  var action = $("#zoneCurtainAction").val();
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  tempHost.asyncOperationZoneCurtains(id, action);
}


