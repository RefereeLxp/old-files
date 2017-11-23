/**
 * Created by SDS on 2017/3/10.
 */

var gatewayId = "";
var gatewayName = "";

function getGatewayValue () {
  gatewayId = $("#gatewayId").val();
  gatewayName = $("#gatewayName").val();
}

function showGateWayInfo() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  var temp = tempHost.hostDataRepository.getAllGatewayInfo();
  console.warn(JSON.stringify(temp));
}

function openGateway() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getGatewayValue();
  tempHost.asyncOpenZigbeeNetChannel(gatewayId);
}

function editGatewayName() {
  if (!checkHostObject()) {
    console.log("please link host.");
    return;
  }

  getGatewayValue();
  tempHost.asyncEditGatewayName(gatewayId, gatewayName);
}
//    table_djust(ID,表体显示行数)

