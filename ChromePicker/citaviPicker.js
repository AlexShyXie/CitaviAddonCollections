
function picker() {

    this.citaviIsRunning = function (showMsgBox) {

        var plugin = document.getElementById("npCitaviBridge")
        var isRunning = plugin.citaviIsRunning();
        if (!isRunning &&
			showMsgBox) {

            alert(chrome.i18n.getMessage("CitaviNotRunning"));
            return false;
        }
        return isRunning;
    }

    this.createNewReference = function (siteSource, type) {

        if (type == undefined) type = "html";

        var plugin = document.getElementById("npCitaviBridge");
        plugin.createNewReference(siteSource, type);
        if (pickerOptions.getShowImportMsgBox()) {
        	alert(chrome.i18n.getMessage("ReferenceSentToCitavi"));
        }
    }

    this.containsCitaviEntityId = function (id) {
    	if (id == undefined) return false;
    	var plugin = document.getElementById("npCitaviBridge");
    	var isRunning = plugin.citaviIsRunning();
    	if (!isRunning) return false;
    	return plugin.containsCitaviEntityId(id);
    }

    this.showCitaviEntity = function (id) {
    	if (id == undefined) return false;
    	var plugin = document.getElementById("npCitaviBridge");
    	var isRunning = plugin.citaviIsRunning();
    	if (!isRunning) return false;
    	return plugin.showCitaviEntity(id);
    }

    this.getCitaviPath = function () {

    }

    this.getVersion = function () {

        var manifestData = chrome.app.getDetails();
        var version = "";
        var versionSplit = manifestData.version.split(".");
        for (var i = 0; i < versionSplit.length ; i++) {
            var v = versionSplit[i];
            if (v.length == 1) v = "0" + v;
            version += v;
        }
        return version;
    }

    this.getVersionString = function () {
        var manifestData = chrome.app.getDetails();
        return manifestData.version;
    }


    this.startCitavi = function () {
        var plugin = document.getElementById("npCitaviBridge");
        plugin.startCitavi();
    }

    this.getIsbnTransformerCount = function () {
        var plugin = document.getElementById("npCitaviBridge");
        return plugin.getIsbnTransformerCount();
    }

    this.getIsbnTransformer = function (index) {
        var plugin = document.getElementById("npCitaviBridge");
        return plugin.getIsbnTransformer(index);
    }

    this.isIdentifierAlreadyInProject = function (identifier) {
        var plugin = document.getElementById("npCitaviBridge");
        return plugin.isIdentifierAlreadyInProject(identifier);
    }

    this.sendImport = function (records) {

        try {

            var plugin = document.getElementById("npCitaviBridge");
            plugin.sendImport(records);
        }
        catch (e) {
            citaviPickerLogger.log("sendImport:" + e);
        }
    }

    this.sendHunterImport = function (records) {
        try {
            var plugin = document.getElementById("npCitaviBridge");
            plugin.sendHunterImport(records);
        }
        catch (e) {
            citaviPickerLogger.log("sendImport:" + e);
        }
    }

    this.sendSnapshot = function (data) {

        if (!this.citaviIsRunning(true)) return;

        var plugin = document.getElementById("npCitaviBridge");

        try {

            plugin.sendCover(data);
        }
        catch (e) {
            citaviPickerLogger.log("sendTextSelectionToCitavi:" + e);
        }
    }

    this.sendTextSelectionToCitavi = function (fieldName, text) {
        try {

            if (!this.citaviIsRunning(true)) return;

            var plugin = document.getElementById("npCitaviBridge");

            try {

                plugin.sendTitleData(fieldName, text);
            }
            catch (e) {
                citaviPickerLogger.log(e);
            }

        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    }

    this.sendQuotationImageToCitavi = function (base64Data) {
        try {

            if (!this.citaviIsRunning(true)) return;

            var plugin = document.getElementById("npCitaviBridge");

            try {

                plugin.sendQuotationImage(base64Data);
            }
            catch (e) {
                citaviPickerLogger.log(e);
            }
        }
        catch (e) {
            citaviPickerLogger.log("sendImageSelectionToCitavi:" + e);
        }
    }

    this.sendCoverToCitavi = function (base64Data) {
        try {

            if (!this.citaviIsRunning(true)) return;

            var plugin = document.getElementById("npCitaviBridge");

            try {
                plugin.sendCover(base64Data);
            }
            catch (e) {
                citaviPickerLogger.log(e);
            }
        }
        catch (e) {
            citaviPickerLogger.log("sendImageSelectionToCitavi:" + e);
        }
    }

    this.validateCookiePermission = function () {
        var citaviExFound = false;
        try {
            alert("TODO validateCookiePermission");
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }

    }

    this.setCookiePermission = function () {
        try {

            alert("TODO setCookiePermission");
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    }

    this.showNotImplementedMsgBox = function () {
       
    }
}

