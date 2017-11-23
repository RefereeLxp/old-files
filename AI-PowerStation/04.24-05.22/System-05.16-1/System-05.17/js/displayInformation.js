/**
 * Created by SDS on 2017/3/7.
 */


function showFloors() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }
  var temp = tempHost.hostDataRepository.getAllFloorsInfo();
  console.warn(JSON.stringify(temp));
}

function showRoom() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }
  var temp = tempHost.hostDataRepository.getAllRoomsInfo();
  console.warn(JSON.stringify(temp));
}

function showAllDevices() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }
  var temp = tempHost.hostDataRepository.getAllDevicesInfo();
  console.warn(JSON.stringify(temp));
}

function showNewDevices() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }
  var temp = tempHost.hostDataRepository.getAllNewDevicesInfo();
  console.warn(JSON.stringify(temp));
}

function showDevicesType() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  var temp = tempHost.hostDataRepository.getDevicesByName($("#deviceType").val());
  console.warn(JSON.stringify(temp));
}
