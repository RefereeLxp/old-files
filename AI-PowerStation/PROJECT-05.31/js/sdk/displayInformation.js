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
  return temp;

}

function showNewDevices() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }
  var temp = tempHost.hostDataRepository.getAllNewDevicesInfo();
  console.warn(JSON.stringify(temp));
}

function showDevicesType(a) {
  if(a!=2) {
    if (a == 7) {
      var deviceType = 'ZIGBEE_InfraredSensor';
    }
    if (a == 4) {
      var deviceType = 'ZIGBEE_TempSensor';
    }
    if (a == 23) {
      var deviceType = 'ZIGBEE_Light';
    }
    if (a == 5) {
      var deviceType = 'ZIGBEE_HumiSensor';
    }
    if (a == 3) {
      var deviceType = 'ZIGBEE_SmokeSensor';
    }
    if (a == 6) {
      var deviceType = 'ZIGBEE_DipSensor';
    }
    if (a == 14) {
      var deviceType = 'ZIGBEE_DoorSensor';
    }
    if (a == 15) {
      var deviceType = 'ZIGBEE_CurtainMotor';
    }

    if (!checkHostObject()) {
      console.log("please link host.");
      return;
    }

    var temp = tempHost.hostDataRepository.getDevicesByName(deviceType);
  }else {
    var deviceType1 = 'ZIGBEE_Outlet';
    var deviceType2 = 'ZIGBEE_KonkeSocket';
    var temp1 = tempHost.hostDataRepository.getDevicesByName(deviceType1);
    var temp2 = tempHost.hostDataRepository.getDevicesByName(deviceType2);
    var temp=temp1.concat(temp2)
  }
  console.warn(temp);
  return temp
}
