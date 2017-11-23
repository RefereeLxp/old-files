/**
 * Created by hongxu.lin on 2/15/2017.
 */

var HOSTURL = "http://v.linhongxu.com";

var SERVICE = {
    "GetDeviceList": HOSTURL + "/device-placement/get-device-list-ajax",
    "GetDeviceDetails": HOSTURL + "/device-placement/get-device-details-ajax",
    "GetFloorList": HOSTURL + "/floor/floor-list-ajax",
    "GetFloorShape": HOSTURL + "/floor/get-floor-shape-ajax",
    "SaveFloorShape": HOSTURL + "/floor/save-floor-shape-ajax",
    "GetRackMount": HOSTURL + "/device-placement/get-rack-mount-ajax",
    "SaveRackMount": HOSTURL + "/device-placement/save-rack-mount-ajax",
    "GetFloorMount": HOSTURL + "/device-placement/get-floor-mount-ajax",
    "SavePlaceNode": HOSTURL + "/device-placement/save-placenode-ajax",
    "GetFloorRackCapacity": HOSTURL + "/data-analysis/get-rack-capacity-ajax",
    "GetNetworkList": HOSTURL + "/data-analysis/get-network-list-ajax",
    "GetNetworkLabels": HOSTURL + "/data-analysis/get-network-labels-ajax",
    "SaveNetworkLabel": HOSTURL + "/data-analysis/save-network-label-ajax",
};



function loadData(serviceUrl, params, successCallBack, errorCallBack, options) {
    var t = "POST";
    if (options != null && options != undefined && options != "") {
        if(options.type != null && options.type != undefined && options.type != "")
            t = options.type;
    }
    if (params == null)
        params = {};
    params.timestampclearcache = (new Date()).getTime()

    $.ajax({
        type: t,
        cache: "False",
        url: serviceUrl,
        data: params,
        beforeSend: function (XMLHttpRequest) { showLoading() },
        success: function (value) {
            if (value.status_code == '1') {
                (successCallBack && typeof (successCallBack) === "function") && successCallBack(value.data);
            }
            else {
                showAlert(AlertType.Error,value.msg);
            }
            hideLoading()
        },
        error: function (data, status, e) {
            (hideLoading && typeof (hideLoading) === "function") && hideLoading();
            (errorCallBack && typeof (errorCallBack) === "function") && errorCallBack('Connection error!');
        }
    });
    hideLoading()
}