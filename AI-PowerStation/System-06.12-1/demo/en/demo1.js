// Init plugin

// overall save the current selected window
var g_iWndIndex = 0; //don't have to set the variable; default to use the current selected window without transmiting value when the interface has window parameters
$(function () {
	// check the installation status of plugin 
	if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
		alert(" If the plugin is uninstalled, please install the WebComponents.exe!");
		return;
	}
	
	// Init plugin parameters and insert the plugin
	WebVideoCtrl.I_InitPlugin(500, 300, {
        iWndowType: 2,
		cbSelWnd: function (xmlDoc) {
			g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
			var szInfo = "selected window number：" + g_iWndIndex;
			showCBInfo(szInfo);
		}
	});
	WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");

	// check plugin to see whether it is the latest
	if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
		alert("Detect the latest version, please double click WebComponents.exe to update！");
		return;
	}

	// window event binding
	$(window).bind({
		resize: function () {
			var $Restart = $("#restartDiv");
			if ($Restart.length > 0) {
				var oSize = getWindowSize();
				$Restart.css({
					width: oSize.width + "px",
					height: oSize.height + "px"
				});
			}
		}
	});

    //init date
    var szCurTime = dateFormat(new Date(), "yyyy-MM-dd");
    $("#starttime").val(szCurTime + " 00:00:00");
    $("#endtime").val(szCurTime + " 23:59:59");
});

// display operation info
function showOPInfo(szInfo) {
	szInfo = "<div>" + dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo + "</div>";
	$("#opinfo").html(szInfo + $("#opinfo").html());
}

// display callback info
function showCBInfo(szInfo) {
	szInfo = "<div>" + dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo + "</div>";
	$("#cbinfo").html(szInfo + $("#cbinfo").html());
}

// time format
function dateFormat(oDate, fmt) {
	var o = {
		"M+": oDate.getMonth() + 1, //month
		"d+": oDate.getDate(), //day
		"h+": oDate.getHours(), //hour
		"m+": oDate.getMinutes(), //minute
		"s+": oDate.getSeconds(), //second
		"q+": Math.floor((oDate.getMonth() + 3) / 3), //quarter
		"S": oDate.getMilliseconds()//millisecond
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

// get window size
function getWindowSize() {
	var nWidth = $(this).width() + $(this).scrollLeft(),
		nHeight = $(this).height() + $(this).scrollTop();

	return {width: nWidth, height: nHeight};
}

// open option dialog 0: folder, 1: file 
	function clickOpenFileDlg(id, iType) {
	var szDirPath = WebVideoCtrl.I_OpenFileDlg(iType);
	
	if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
		$("#" + id).val(szDirPath);
	}
}

// get local parameters
function clickGetLocalCfg() {
	var xmlDoc = WebVideoCtrl.I_GetLocalCfg();

	$("#netsPreach").val($(xmlDoc).find("BuffNumberType").eq(0).text());
	$("#wndSize").val($(xmlDoc).find("PlayWndType").eq(0).text());
	$("#rulesInfo").val($(xmlDoc).find("IVSMode").eq(0).text());
	$("#captureFileFormat").val($(xmlDoc).find("CaptureFileFormat").eq(0).text());
	$("#packSize").val($(xmlDoc).find("PackgeSize").eq(0).text());
	$("#recordPath").val($(xmlDoc).find("RecordPath").eq(0).text());
	$("#downloadPath").val($(xmlDoc).find("DownloadPath").eq(0).text());
	$("#previewPicPath").val($(xmlDoc).find("CapturePath").eq(0).text());
	$("#playbackPicPath").val($(xmlDoc).find("PlaybackPicPath").eq(0).text());
	$("#playbackFilePath").val($(xmlDoc).find("PlaybackFilePath").eq(0).text());
    	$("#protocolType").val($(xmlDoc).find("ProtocolType").eq(0).text());

	showOPInfo("local configuration success！");
}

// set local parameters
function clickSetLocalCfg() {
	var arrXml = [],
		szInfo = "";
	
	arrXml.push("<LocalConfigInfo>");
	arrXml.push("<PackgeSize>" + $("#packSize").val() + "</PackgeSize>");
	arrXml.push("<PlayWndType>" + $("#wndSize").val() + "</PlayWndType>");
	arrXml.push("<BuffNumberType>" + $("#netsPreach").val() + "</BuffNumberType>");
	arrXml.push("<RecordPath>" + $("#recordPath").val() + "</RecordPath>");
	arrXml.push("<CapturePath>" + $("#previewPicPath").val() + "</CapturePath>");
	arrXml.push("<PlaybackFilePath>" + $("#playbackFilePath").val() + "</PlaybackFilePath>");
	arrXml.push("<PlaybackPicPath>" + $("#playbackPicPath").val() + "</PlaybackPicPath>");
	arrXml.push("<DownloadPath>" + $("#downloadPath").val() + "</DownloadPath>");
	arrXml.push("<IVSMode>" + $("#rulesInfo").val() + "</IVSMode>");
	arrXml.push("<CaptureFileFormat>" + $("#captureFileFormat").val() + "</CaptureFileFormat>");
    	arrXml.push("<ProtocolType>" + $("#protocolType").val() + "</ProtocolType>");
	arrXml.push("</LocalConfigInfo>");

	var iRet = WebVideoCtrl.I_SetLocalCfg(arrXml.join(""));

	if (0 == iRet) {
		szInfo = "local configuration success！";
	} else {
		szInfo = "local configuration failed！";
	}
	showOPInfo(szInfo);
}

// windows number
function changeWndNum(iType) {
	iType = parseInt(iType, 10);
	WebVideoCtrl.I_ChangeWndNum(iType);
}

// login
function clickLogin() {
	var szIP = $("#loginip").val(),
		szPort = $("#port").val(),
		szUsername = $("#username").val(),
		szPassword = $("#password").val();

	if ("" == szIP || "" == szPort) {
		return;
	}

	var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
		success: function (xmlDoc) {
			showOPInfo(szIP + " login success！");

			$("#ip").prepend("<option value='" + szIP + "'>" + szIP + "</option>");
			setTimeout(function () {
				$("#ip").val(szIP);
				getChannelInfo();
			}, 10);
		},
		error: function () {
			showOPInfo(szIP + " login failed！");
		}
	});

	if (-1 == iRet) {
		showOPInfo(szIP + " login already !");
	}
}


// set volume
function clickSetVolume() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		iVolume = parseInt($("#volume").val(), 10),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_SetVolume(iVolume);
		if (0 == iRet) {
			szInfo = "set volume success！";
		} else {
			szInfo = "set volume failed！";
		}
		showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}


// get audio channel
function clickGetAudioInfo() {
	var szIP = $("#ip").val();

	if ("" == szIP) {
		return;
	}

	WebVideoCtrl.I_GetAudioInfo(szIP, {
		success: function (xmlDoc) {
			var oAudioChannels = $(xmlDoc).find("TwoWayAudioChannel"),
				oSel = $("#audiochannels").empty();
			$.each(oAudioChannels, function () {
				var id = $(this).find("id").eq(0).text();

				oSel.append("<option value='" + id + "'>" + id + "</option>");
			});
			showOPInfo(szIP + " get audio channel success！");
		},
		error: function () {
			showOPInfo(szIP + " get audio channel failed！");
		}
	});
}

// strat real play
function clickStartRealPlay() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szIP = $("#ip").val(),
		iStreamType = parseInt($("#streamtype").val(), 10),
		iChannelID = parseInt($("#channels").val(), 10),
		bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
		szInfo = "";

	if ("" == szIP) {
		return;
	}

	if (oWndInfo != null) {// stop first
		WebVideoCtrl.I_Stop();
	}

	var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
		iStreamType: iStreamType,
		iChannelID: iChannelID,
		bZeroChannel: bZeroChannel
	});

	if (0 == iRet) {
		szInfo = "start real play success！";
	} else {
		szInfo = "start real play failed！";
	}

	showOPInfo(szIP + " " + szInfo);
}

// stop real play
function clickStopRealPlay() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Stop();
		if (0 == iRet) {
			szInfo = "stop real play success！";
		} else {
			szInfo = "stop real play failed！";
		}
		showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}

// open sound
function clickOpenSound() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var allWndInfo = WebVideoCtrl.I_GetWindowStatus();
		// close the sound by iterating over all the window
		for (var i = 0, iLen = allWndInfo.length; i < iLen; i++) {
			oWndInfo = allWndInfo[i];
			if (oWndInfo.bSound) {
				WebVideoCtrl.I_CloseSound(oWndInfo.iIndex);
				break;
			}
		}

		var iRet = WebVideoCtrl.I_OpenSound();

		if (0 == iRet) {
			szInfo = "open sound success！";
		} else {
			szInfo = "open sound failed！";
		}
		showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}

// close sound
function clickCloseSound() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_CloseSound();
		if (0 == iRet) {
			szInfo = "close sound success！";
		} else {
			szInfo = "close sound failed！";
		}
		showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}

// start voice talk
function clickStartVoiceTalk() {
	var szIP = $("#ip").val(),
		iAudioChannel = parseInt($("#audiochannels").val(), 10),
		szInfo = "";

	if ("" == szIP) {
		return;
	}

	if (isNaN(iAudioChannel)){
		alert("please select channel first！");
		return;
	}

	var iRet = WebVideoCtrl.I_StartVoiceTalk(szIP, iAudioChannel);

	if (0 == iRet) {
		szInfo = "start voice talk success！";
	} else {
		szInfo = "start voice talk failed！";
	}
	showOPInfo(szIP + " " + szInfo);
}

// stop voice talk
function clickStopVoiceTalk() {
	var szIP = $("#ip").val(),
		iRet = WebVideoCtrl.I_StopVoiceTalk(),
		szInfo = "";

	if ("" == szIP) {
		return;
	}

	if (0 == iRet) {
		szInfo = "stop voice talk success！";
	} else {
		szInfo = "stop voice talk failed！";
	}
	showOPInfo(szIP + " " + szInfo);
}


