var contextMenuEventhandler = {

    importWebPageAsReference: function (info, tab, callback) {
        try {
            
            if (!citaviPicker.citaviIsRunning(true)) return;

            
            var url = "";
            if (info.frameUrl != undefined) {
                url = info.frameUrl;
            }
            else {
                url = tab.url;
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send();
            if (xhr.getResponseHeader("Content-Type") == "application/pdf") {

                contextMenuEventhandler.importPDFAsReference(info, tab, callback);
            }
            else {
                contextMenuEventhandler.sendText_NewReference(function (siteSource) {
                    citaviPicker.createNewReference(siteSource);
                    if (callback != undefined) {
                        callback();
                    }
                });
            }

        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    },

    importPDFAsReference: function (info, tab, callback) {
        try {

            if (!citaviPicker.citaviIsRunning(true)) return;

            var url = "";
            if (info.frameUrl != undefined) {
                url = info.frameUrl;
            }
            else {
                url = info.srcUrl;
            }
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (e) {
                if (this.status == 200) {
                    try
                    {

                        var uInt8Array = new Uint8Array(this.response);
                        var i = uInt8Array.length;
                        var binaryString = new Array(i);
                        var showMsgBoxAtIndex = -1;

                        while (i--) {
                            binaryString[i] = String.fromCharCode(uInt8Array[i]);
                        }

                        var data = binaryString.join('');
                        var base64 = window.btoa(data);

                        citaviPicker.createNewReference(base64, "pdfBase64\r\nName:" + url);
                        citaviPicker.sendTextSelectionToCitavi("LocationElectronic", info.srcUrl);
                        if (callback != undefined) {
                            callback();
                        }
                    }
                    catch (e) {
                        
                    }
                }
            };
            xhr.send();
            
           
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    },

    copyTextSelectionToClipboard: function (info, tab) {
        try {

            bg = chrome.extension.getBackgroundPage();
            clipboardholder= bg.document.getElementById("citaviPickerClipboardholder");
            clipboardholder.style.display = "block";
            clipboardholder.value = "\"" + info.selectionText + "\"\r\n" + info.pageUrl;
            clipboardholder.select();
            bg.document.execCommand("Copy");
            clipboardholder.style.display = "none";
        }
        catch (e) {
            citaviPickerLogger.log("copyTextSelectionToClipboard: " + e);
        }
    },

    captureScreenshot: function(fullSite, callback)
    {
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataURL) {
            try {
                var data = dataURL;
                var image_buffer = document.createElement('img');
                image_buffer.src = dataURL;
                image_buffer.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(image_buffer, 0, 0);
                    data = canvas.toDataURL('image/png');
                };
                data = dataURL.replace(/data:image\/png;base64,/, '');
                callback(data);
            }
            catch (e) {
                    citaviPickerLogger.log(e);
            }

        });
    },

    captureScreenshotAsCover_CurrentView: function (info, tab) {
        try
        {
            contextMenuEventhandler.captureScreenshot(false, function(data)
            {
                 citaviPicker.sendSnapshot(data);
            });
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    },

    captureScreenshotAsCover_FullPage: function (info, tab) {
        try {
             contextMenuEventhandler.captureScreenshot(true, function(data)
            {
                 citaviPicker.sendSnapshot(data);
            });
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    },

    sendTextAsQuotation: function (info, tab) {
        try {
    
             citaviPicker.sendTextSelectionToCitavi("QuotationText", info.selectionText);
        }
        catch (e) {
            citaviPickerLogger.log("sendTextAsQuotation: " + e);
        }
    },
    sendTextAsQuotation_NewReference: function (info, tab) {
        try {
               
            contextMenuEventhandler.importWebPageAsReference(info, tab, function ()
            {
                citaviPicker.sendTextSelectionToCitavi("QuotationText", info.selectionText)
            });
            
        }
        catch (e) {
            citaviPickerLogger.log("sendTextAsQuotation_NewReference: " + e);
        }
    },

    sendTextAsAbstract: function (info, tab) {
        try {
            citaviPicker.sendTextSelectionToCitavi("Abstract", info.selectionText);
        }
        catch (e) {
            citaviPickerLogger.log("sendTextAsAbstract: " + e);
        }
    },
    sendTextAsAbstract_NewReference: function (info, tab) {
        try {

            contextMenuEventhandler.importWebPageAsReference(info, tab, function ()
            {
                citaviPicker.sendTextSelectionToCitavi("Abstract", info.selectionText)
            });
        }
        catch (e) {
            citaviPickerLogger.log("sendTextAsAbstract_NewReference: " + e);
        }
    },

    sendTextAsTOC: function (info, tab) {
        try {
            citaviPicker.sendTextSelectionToCitavi("TableOfContents", info.selectionText);
        }
        catch (e) {
            citaviPickerLogger.log("sendTextAsTOC: " + e);
        }
    },

    sendText_NewReference: function(callback)
    {
        var func = function (request) {
            var text = "";
            try {

                var dateString = "";
                var now = new Date();

                var date = new Date(request.lastModified);
                date.setMinutes(date.getMinutes() + 15);
                if (now >= date) {
                    dateString = date.toGMTString();
                }
                text += "lastModified: " + dateString + "\n";
                text += "title: " + request.title + "\n";
                text += "URL: " + request.url + "\n";
                text += "Source: " + request.source;
            }
            catch (e) {
                citaviPickerLogger.log(e);
            }
            chrome.extension.onRequest.removeListener(func);
            callback(text);
            
         };
        chrome.extension.onRequest.addListener(func);
        chrome.tabs.executeScript(null, { file: "getPageInfo.js" }); 
        
    },
   
    sendTextAsTOC_NewReference: function (info, tab) {
        try {

            contextMenuEventhandler.importWebPageAsReference(info, tab, function () {
                citaviPicker.sendTextSelectionToCitavi("TableOfContents", info.selectionText);
            });
        }
        catch (e) {
            citaviPickerLogger.log("sendTextAsTOC_NewReference: " + e);
        }
    },

    sendTextAsKeyword: function (info, tab) {
        try {
            citaviPicker.sendTextSelectionToCitavi("Keywords", info.selectionText);
        }
        catch (e) {
            citaviPickerLogger.log("sendTextAsKeyword: " + e);
        }
    },
    sendTextAsKeyword_NewReference: function (info, tab) {
        try {
            contextMenuEventhandler.importWebPageAsReference(info, tab, function () {
                citaviPicker.sendTextSelectionToCitavi("Keywords", info.selectionText);
            });
        }
        catch (e) {
            citaviPickerLogger.log("sendTextAsKeyword_NewReference: " + e);
        }
    },
       
    show_Options: function (info, tab) {
        try {
           
          chrome.tabs.executeScript(null, { code: "optionsDialog.show();" }); 
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    },
    show_Help: function (info, tab) {
        try {
            window.open("http://www.citavi.com/de/funktionen.html#picker");
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    },
    runCitavi: function (info, tab) {
        try {
            citaviPicker.startCitavi();
        }
        catch (e) {
            citaviPickerLogger.log("runCitavi: " + e);
        }
    },


    getImageSelectionAsBase64String: function(src, callback){
        if(src.indexOf("http") == 0)
            {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function() {
                    var reader = new FileReader();
                    reader.onload = function (event)
                    {
                        try
                        {
                            var data = event.target.result.replace(/data:image\/.+?;base64,/, '');
                            callback(data);
                        }
                        catch(e)
                        {
                            citaviPickerLogger.log("getImageSelectionAsBase64String (FileReader.onload): " + e);
                        }
                    };
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', src);
                xhr.send();
            }
            else
            {
                //Dann bereits Image-Base64
                var data = src.replace(/data:image\/.+?;base64,/, '');
                 callback(data);
            }
    },

     sendImageSelectionAsQuotation: function (info, tab) {
        try {
            contextMenuEventhandler.getImageSelectionAsBase64String(info.srcUrl, function(data){
                citaviPicker.sendQuotationImageToCitavi(data );
            });
        }
        catch (e) {
            citaviPickerLogger.log("sendImageSelectionAsQuotation: " + e);
        }
    },
     sendImageSelectionAsQuotation_NewReference: function (info, tab) {
        try {
        	contextMenuEventhandler.importWebPageAsReference(info, tab, function ()
            {
                contextMenuEventhandler.getImageSelectionAsBase64String(info.srcUrl, function(data){
                    citaviPicker.sendQuotationImageToCitavi(data );
                });
            });
        }
        catch (e) {
            citaviPickerLogger.log("sendImageSelectionAsQuotation_NewReference: " + e);
        }
    },
     sendImageSelectionAsCover: function (info, tab) {
        try {
                contextMenuEventhandler.getImageSelectionAsBase64String(info.srcUrl, function(data){
                    citaviPicker.sendCoverToCitavi(data );
                });
        }
        catch (e) {
            citaviPickerLogger.log("sendImageSelectionAsCover: " + e);
        }
    },
     sendImageSelectionAsCover_NewReference: function (info, tab) {
        try {
            contextMenuEventhandler.importWebPageAsReference(info, tab, function ()
            {
                contextMenuEventhandler.getImageSelectionAsBase64String(info.srcUrl, function(data){
                    citaviPicker.sendCoverToCitavi(data );
                });
            });
        }
        catch (e) {
            citaviPickerLogger.log("sendImageSelectionAsCover_NewReference: " + e);
        }
    },
}

function usebtoa(data) {
   
    return btoa(String.fromCharCode.apply(data.length, data));
    
}

