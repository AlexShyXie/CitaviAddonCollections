
var citaviWebServiceURL = "http://webservicec3.citavi.com/CitaviWebService.asmx";

var onlineAssistant = new function () {

    this.success = false;
    this.sessionActive = true;
    this.callback;
    this.pickerVersion = "20120918";
    this.doRequest = function (query, transformer, callback) {

        this.success = false;
        this.sessionActive = true;
        this.callback = callback;

        try {

            citaviPickerLogger.log("Search in: " + transformer);
            var pl = new SOAPClientParameters();
            var ffPVersion = this.pickerVersion;
            pl.add("PickerVersion", ffPVersion);
            pl.add("PickerType", "Firefox");
            pl.add("TransformerId", transformer);
            pl.add("SearchTermCollection", query);
            SOAPClient.invoke(citaviWebServiceURL, "StartPickerSearch", pl, true, this.citaviWebRequest_onProgress);
        }
        catch (e) {
            citaviPickerLogger.log("startCitaviWebRequest:" + e);
        }
    }

    this.quitSession = function () {
        if (!this.sessionActive) return;

        this.sessionActive = false;
        citaviPickerLogger.log("quitSession");
        var pl = new SOAPClientParameters();
        pl = new SOAPClientParameters();
        pl.add("PickerVersion", onlineAssistant.pickerVersion);
        pl.add("PickerType", "Firefox");
        SOAPClient.invoke(citaviWebServiceURL, "QuitPickerSession", pl, false, null);
    }

    this.citaviWebRequest_onProgress = function (recordCount) {
        try {

            if (recordCount > 0) {

                pl = new SOAPClientParameters();

                pl.add("PickerVersion", onlineAssistant.pickerVersion);
                pl.add("PickerType", "Firefox");
                pl.add("StartIndex", 0);

                if (recordCount > 20) {
                    recordCount = 20;
                }

                pl.add("Length", recordCount);

                SOAPClient.invoke(citaviWebServiceURL, "GetReferences", pl, false, function (r, soapResponse) {

                    var s = (new XMLSerializer()).serializeToString(soapResponse);

                    if (recordCount > 1) {
                        var references = new referenceCollection();
                        references.loadXml(s);
                        onlineAssistant.callback(true, true, references);
                    }
                    else {
                        chrome.extension.sendRequest({ action: "importReferences", value: s });
                        onlineAssistant.callback(true, false);
                    }

                    return;
                });
            }
            else {
                onlineAssistant.callback(false);
            }
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    }
}