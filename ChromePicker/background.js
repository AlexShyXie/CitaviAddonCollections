//Dieses Script wird via background.html immer geladen (genau 1 mal).

var hunters = new function () {
    this.count = -1;
    this.innerList = new Array();

    this.getHunter = function (index) {
        return this.innerList[index];
    },
    this.addHunter = function (hunter) {
    	this.count = this.innerList.length + 1;
        this.innerList.push(hunter);
    }
}

var blacklist = new Array();

var pickerOptions = new function () {

    this.init = function () {

        var plugin = document.getElementById("npCitaviBridge");
        localStorage["DetectIsbnDoi"] = plugin.getSetting("DetectIsbnDoi");
        localStorage["EnableHunter"] = plugin.getSetting("EnableHunter");
        localStorage["ShowImportMsgBox"] = plugin.getSetting("ShowImportMsgBox");
        localStorage["EnableTrace"] = plugin.getSetting("EnableTrace");
    }

    this.getShowISBNIcon = function () {
        return localStorage["DetectIsbnDoi"] == "true";
    }

    this.setShowISBNIcon = function (enabled) {
        localStorage["DetectIsbnDoi"] = enabled;
        var plugin = document.getElementById("npCitaviBridge");
        plugin.setSetting("DetectIsbnDoi", enabled ? "1" : "0");
    }

    this.getShowHunterStatusbar = function () {
        return localStorage["EnableHunter"] == "true";
    }
    this.setShowHunterStatusbar = function (enabled) {
        localStorage["EnableHunter"] = enabled;
        var plugin = document.getElementById("npCitaviBridge");
        plugin.setSetting("EnableHunter", enabled ? "1" : "0");
    }

    this.getShowImportMsgBox = function () {
        return localStorage["ShowImportMsgBox"] == "true";
    }
    this.setShowImportMsgBox = function (enabled) {
        localStorage["ShowImportMsgBox"] = enabled;
        var plugin = document.getElementById("npCitaviBridge");
        plugin.setSetting("ShowImportMsgBox", enabled ? "1" : "0");
    }

    this.getEnableTrace = function () {
        return localStorage["EnableTrace"] == "true";
    }
    this.setEnableTrace = function (enabled) {
        localStorage["EnableTrace"] = enabled;
        plugin.setSetting("EnableTrace", enabled ? "1" : "0");
    }
}

chrome.extension.onRequest.addListener(function (msg, sender, sendResponse) {

    try {

        switch (msg.action) {

            case "createNewReference":
                {
                	citaviPicker.createNewReference(msg.content, msg.type);
                	
                }
                break;

        	case "containsCitaviEntityId":
        		{

        			var isDuplicate = citaviPicker.containsCitaviEntityId(msg.id);
        			sendResponse({ value: isDuplicate, id: msg.id });
        		}
        		break;

        	case "showCitaviEntity":
        		{
					citaviPicker.showCitaviEntity(msg.id);
        		}
        		break;

            case "checkForDuplicates":
                {
                    var isDuplicate = citaviPicker.isIdentifierAlreadyInProject(msg.identifier);
                    if (isDuplicate) {

                        var alertMsg = "";

                        if (msg.identifierType == "searchIsbn") {
                        	alertMsg = chrome.i18n.getMessage("AlreadyInProject_ISBN");
                        }
                        else {
                        	alertMsg = chrome.i18n.getMessage("AlreadyInProject_DOI");
                        }

                        isDuplicate = !confirm(alertMsg);
                    }
                    sendResponse({ value: isDuplicate });
                }
                break;

            case "isCitaviRunning":
                {
                    sendResponse({ value: citaviPicker.citaviIsRunning(true) });
                }
                break;

            case "isURLBlacklisted":
                {
                    
                    if (blacklist.length == 0) {
                        var plugin = document.getElementById("npCitaviBridge");
                        var list = plugin.getBlacklist().split(';');
                        for (var i = 0 ; i < list.length ; i++) {
                            blacklist.push(list[i]);
                        }
                        blacklist.push("zfl2.hbz-nrw.de");
                        blacklist.push("siegen.de/cms/");
                        blacklist.push("email.uni-rostock.de");
                        blacklist.push("mail.");
                        blacklist.push("semesterbooks.de");
                        blacklist.push("banking.");
                        blacklist.push("typo3");
                        blacklist.push("lss.sub.uni-hamburg.de");
                        blacklist.push("lss2.sub.uni-hamburg.de");
                        blacklist.push("service.citavi.com");
                        blacklist.push("academic-linkshare.de");
                        blacklist.push("crm");
                        blacklist.push("forum.");
                        blacklist.push("studip");
                        blacklist.push("microsoft.com") ;
                        blacklist.push("milibib.de");
                    }
                    var url = msg.value;
                    for (var i = 0; i < blacklist.length; i++) {
                        var pattern = blacklist[i];
                        if (pattern != undefined && pattern.length > 0) {
                            var rgx = new RegExp(pattern);
                            if (rgx.test(url)) {
                                sendResponse({ value: true });
                                return;
                            }
                        }
                    }
                    sendResponse({ value: false });
                }
                break;

            case "getISBNTransformers":
                {
                    var plugin = document.getElementById("npCitaviBridge");
                    if (!citaviPicker.citaviIsRunning(false)) {
                        sendResponse({ action: "citaviIsNotRunning" });
                    }
                    var transformerCollection = new Array();
                    var count = citaviPicker.getIsbnTransformerCount();
                    for (var i = 0; i < count; i++) {
                        transformerCollection[i] = citaviPicker.getIsbnTransformer(i.toString());
                    }
                    sendResponse({ value: transformerCollection });
                }
                break;

            case "getHunter":
                {
                    if (this.hunters.count <= msg.value) {
                        var plugin = document.getElementById("npCitaviBridge");
                        var hunterSource = plugin.getHunter(msg.value);
                        this.hunters.addHunter(hunterSource);

                        if (hunterSource == "" ||
                             hunterSource == null) {
                            console.log("Hunter is null");
                            return;
                        }
                        sendResponse({ h: hunterSource, pickerVersion: citaviPicker.getVersion() });
                        return;

                        //console.log(hunterSource);
                        //chrome.tabs.executeScript(null, { code: hunterSource, allFrames: false }, function () {

                        //    sendResponse({ value: "OK" });
                        //});
                    }
                    else {
                        var hunterSource = this.hunters.getHunter(msg.value);
                        if (hunterSource == "" ||
                            hunterSource == null) {
                            console.log("Hunter is null");
                            return;
                        }

                        sendResponse({ h: hunterSource, pickerVersion: citaviPicker.getVersion() });
                        return;
                        //chrome.tabs.executeScript(null, { code: hunterSource, allFrames: false }, function () {

                        //    sendResponse({ value: "OK" });
                        //});
                    }

                }
                break;

            case "getHuntersCount":
                {
                    if (this.hunters.count == -1) {
                        try {
                            var plugin = document.getElementById("npCitaviBridge");
                            var huntersCount = plugin.getHuntersCount();
                            sendResponse({ value: huntersCount});
                        }
                        catch (e) {
                            alert(e);
                        }

                    }
                    else {
                        sendResponse({ value: this.hunters.count });
                    }
                }
                break;

            case "getVersion":
                {
                    sendResponse({ value: this.citaviPicker.getVersionString() });
                }
                break;

            case "log":
                {
                    if (pickerOptions.getEnableTrace()) {
                        console.log(msg.value);
                        if (msg.value.message != undefined) {
                            console.log(msg.value.message);
                        }
                    }
                }
                break;

            case "importReferences":
            	{
                    citaviPicker.sendImport(msg.value);
                    if (pickerOptions.getShowImportMsgBox()) {
                    	alert(chrome.i18n.getMessage("ReferenceSentToCitavi"));
                    }
                }
                break;

            case "importHunterReferences":
                {
                    citaviPicker.sendHunterImport(msg.value);
                    if (pickerOptions.getShowImportMsgBox()) {
                    	alert(chrome.i18n.getMessage("ReferenceSentToCitavi"));
                    }
                }
                break;

            case "getOptions":
                {
                    switch (msg.type) {
                        case "isbn":
                            {
                                sendResponse({ value: pickerOptions.getShowISBNIcon() });
                            }
                            break;

                        case "hunter":
                            {
                                sendResponse({ value: pickerOptions.getShowHunterStatusbar() });
                            }
                            break;

                        case "showImportMsgBox":
                            {
                                sendResponse({ value: pickerOptions.getShowImportMsgBox() });
                            }
                            break;
                    }

                }
                break;

            case "setOptions":
                {
                    switch (msg.type) {
                        case "isbn":
                            {
                                pickerOptions.setShowISBNIcon(msg.value);
                            }
                            break;

                        case "hunter":
                            {
                                pickerOptions.setShowHunterStatusbar(msg.value);
                            }
                            break;

                        case "showImportMsgBox":
                            {
                                pickerOptions.setShowImportMsgBox(msg.value);
                            }
                            break;
                    }
                }
                break;

        	case "sendTextSelectionToCitavi":
        		{
        			citaviPicker.sendTextSelectionToCitavi(msg.field, msg.content);

        		}
        		break;

        }

    }
    catch (e) {
        console.log(e);
    }
});



var citaviPicker = new picker();
pickerOptions.init();