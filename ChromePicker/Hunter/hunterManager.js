

getHTMLElementAttributeValue = function (element, attr) {
	if (element == undefined) return "";
    if (element.hasAttribute) {
        //Firefox
        if (element.hasAttribute(attr)) {
            return element.getAttribute(attr);
        }
        else {
            return "";
        }
    }
    else {
        return element.getAttribute(attr);
    }
}

createHunterGetRequest = function (url) {
    var hunterHttpResponse = "";

    try {

        var hunterHttpRequest = new XMLHttpRequest();
        if (hunterHttpRequest) {
            hunterHttpRequest.open("GET", url, false);

            hunterHttpRequest.send(null);
            if (hunterHttpRequest.readyState == 4) {

                if (hunterHttpRequest.status == 200) {
                    hunterHttpResponse = hunterHttpRequest.responseText;
                }
            }
        }
    }
    catch (e) {
        alert(e);
    }
    return hunterHttpResponse;
}

var hunterManager = new function () {

    this.huntersCount = -1;

    this.checkSite = function (hunterIndex) {

        try {

            if (this.huntersCount == -1) {
                chrome.extension.sendRequest({ action: "getHuntersCount" }, function (r1) {
                    hunterManager.huntersCount = r1.value;

                    if (hunterManager.huntersCount != -1) {

                        hunterManager.checkSite(hunterIndex);
                    }
                });
                return;
            }

            if (hunterIndex >= this.huntersCount) return;

            chrome.extension.sendRequest({ action: "getHunter", value: hunterIndex }, function (response) {

                try {

                    var res = eval(response.h);
                    var hunter = new Hunter();

                    if (hunter.chromePickerMinVersion == undefined || hunter.chromePickerMinVersion <= response.pickerVersion) {

                        var count = hunter.identify();
                        if (hunter.identify() == 0) {
                            citaviPickerLogger.log(hunter.name + "(" + hunterIndex + ")" + ": Nothing found");
                            hunterIndex = hunterIndex + 1;
                            hunterManager.checkSite(hunterIndex);
                        }
                        else {

                            citaviPickerLogger.log(hunter.name + ": found");
                            hunterManager.showHunterStatusbar(document, hunter, count, chrome.i18n.getMessage("CitaviFoundReferencesToImportDirectly"), chrome.i18n.getMessage("ClickHereToImportTheReferences"));
                        }
                    }
                    else {
                        citaviPickerLogger.log("Hunter disabled: " + hunter.name + "(" + hunter.chromePickerMinVersion + ") PickerVersion:" + response.pickerVersion);
                        hunterIndex = hunterIndex + 1;
                        hunterManager.checkSite(hunterIndex);
                    }

                }
                catch (e) {
                    citaviPickerLogger.log("HunterManager: " + hunterIndex +" " + e + ":\r\n" + response.h);
                }

            });
        }
        catch (e) {
            citaviPickerLogger.log(e);
        }
    }

    this.showHunterStatusbar = function (doc, hunter, count, text1, text2) {
        try {

        	var hasHunterStatusbar = doc.getElementById("hunterStatusbar") != null;
        	if (hasHunterStatusbar) {
        		var textElement = doc.getElementById("hunterTextArea");
        		var text = " " + text1.replace("{0}", count);
        		console.log(text);
        		textElement.innerText = text;
        		return;
        	}

            var styleElement = doc.createElement("style");
            styleElement.setAttribute("type", "text/css");

            var styleText = ".hunterDiv, #hunterStatusbar" +
						  "{" +
							  "display: inline !important;" +
							  "position: fixed! important;" +
							  "height: 24px! important;" +
							  "border: solid 1px #919191! important;" +
							  "background: #D6E3F7! important;" +
							  "bottom: 0px! important;" +
							  "right: 0px! important;" +
							  "left: 0px! important;" +
							  "z-index:10000! important;" +
							  "font-color:black! important;" +
							  "font-size:100%! important;" +
							  "min-width: 640px !important;" +
						  "}";

            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = styleText;
            }
            else {
                styleElement.appendChild(doc.createTextNode(styleText));
            }

            var linkStyleElement = doc.createElement("style");
            linkStyleElement.setAttribute("type", "text/css");
            styleText = "a.hunterLink:link, #hunterMenuLink, #hunterMenuLink2" +
					  "{" +
							"display: inline !important;" + 
							"color:#0000ff;" +
							"text-decoration: none! important;" +

					  "}" +
					  "a.hunterLink:visited, #hunterMenuLink, #hunterMenuLink2" +
					  "{" +
							"display: inline !important;" +
							"color:#0000ff;" +
							"text-decoration: none! important;" +
					  "}" +
					  "a.hunterLink:hover, #hunterMenuLink, #hunterMenuLink2" +
					  "{" +
							"display: inline !important;" +
							"color:#0000ff;" +
							"text-decoration: none! important;" +
							"cursor:hand;" +
					  "}" +
					  "a.hunterLink:active, #hunterMenuLink, #hunterMenuLink2" +
					  "{" +
							"display: inline !important;" +
							"color:#0000ff;" +
							"text-decoration: none! important;" +
					  "}";

            if (linkStyleElement.styleSheet) {
                linkStyleElement.styleSheet.cssText = styleText;
            }
            else {
                linkStyleElement.appendChild(doc.createTextNode(styleText));
            }

            var spanStyleElement = doc.createElement("style");
            spanStyleElement.setAttribute("type", "text/css");

            styleText = ".hunterSpan, #hunterTextArea" +
				  "{" +
						"display: inline !important;" +
						"margin-top:4px! important;" +
						"margin-bottom:4px! important;" +
						"font-size:12px! important;" +
						"font-style:normal! important;" +
						"font-family:Segoe Ui,arial, sans-serif! important;" +
						"vertical-align: middle! important;" +
				  "}";



            if (spanStyleElement.styleSheet) {
                spanStyleElement.styleSheet.cssText = styleText;
            }
            else {
                spanStyleElement.appendChild(doc.createTextNode(styleText));
            }


            var spanStyleElement2 = doc.createElement("style");
            spanStyleElement2.setAttribute("type", "text/css");
            styleText = ".hunterSpan2, #hunterTextArea2" +
					  "{" +
							"display: inline !important;" +
							"position:absolute;" +
							"margin-top:4px! important;" +
							"margin-bottom:4px! important;" +
							"text-align:left! important;" +
							"font-size:12px! important;" +
							"font-style:normal! important;" +
							"font-family:Segoe Ui, arial, sans-serif! important;" +
							"vertical-align: middle! important;" +
							"right: 4px! important;" +
					  "}"
					  ;
            if (spanStyleElement2.styleSheet) {
                spanStyleElement2.styleSheet.cssText = styleText;
            }
            else {
                spanStyleElement2.appendChild(doc.createTextNode(styleText));
            }

            var imageStyleElement = doc.createElement("style");
            imageStyleElement.setAttribute("type", "text/css");
            styleText = ".hunterImage, #hunterIcon" +
					  "{" +
							"display: inline !important;" + 
				  			"margin-left:4px! important;" +
				  			"margin-top:4px! important;" +
							"margin-bottom:4px! important;" +
							"vertical-align: middle! important;" +
					  "}";
            if (imageStyleElement.styleSheet) {
                imageStyleElement.styleSheet.cssText = styleText;
            }
            else {
                imageStyleElement.appendChild(doc.createTextNode(styleText));
            }

            var headElement = doc.getElementsByTagName('head').item(0);
            headElement.appendChild(styleElement);
            headElement.appendChild(linkStyleElement);
            headElement.appendChild(spanStyleElement);
            headElement.appendChild(imageStyleElement);
            headElement.appendChild(spanStyleElement2);



            var divElement = doc.createElement('div');
            divElement.id = "hunterStatusbar";

            var imgElement = doc.createElement('img');
            imgElement.id = "hunterIcon";
            imgElement.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsZJREFUeNpkU11IFVEQ/s7u5k/d0jL603wKLBMDpRuIFEQ+BkVGGUgEReBLRSEa+BD0EgVJP74kCElppVbqQxAUFBgJUiISUaQ+iGB2Re/evXd/zplmz+rtoYU55+yZMzPffDMjEi1Xd8GyOlVy+ZDKpAGlQOBPRKLP/JEQLOFBQaZs+LMzb9z5+Sb8ab782f02SUqprEgptQSBJD8IyPMDcj2fXNejTMYjJ+3S3MALGtm7Y8RSi4nqNWV7okgrC5Feo53oP+EYsA7WYVlR3JJ2yowwEvzxr3DfvQVME7nH6yG2l0AxXOfZE7gT4zB3lyP/7HmQYSDgVF2CaYGkjhRMTyF5/Roo7bBRCk5PNzY8H4Ld0Y4Un1UY+XU/0pMTKLh1j1EoKObEiEhi5WIia6wcB/7Cbzh9vQj4XhuzSH6ZGnoFb24WTJEm2QgXTglmZRVyLzTBKCsHFRVBSQn/10+svdKK3NONMCoqQTl52ok3Mw2ppK6KEaWvKUNOfQNind1Yd+eBhkgFGyFKShBru4nC3kHkHDsBFRoUbmIEMkIQellllrjGxLtaWtKQzX1V+l7K6D5YTgJbt0HsLIUMVIRAN4h2oPRj7gQ4gwNcgWJYh+sYqtK6IJlE+tNH5J08w2kIXYXQ1gpJ1HBXiMp8eA9n+CXWd3SBuEjaKesTbc2gzVuQ13BOw9cI2NbSKYQw+ZHz9DFSD+8idvs+zHgNE8lta9tItFxCYCdR2P4IintAcQW4SzUHHIK9hdFdF/6P74h190EUl2ZTcr6MwqiOo+BUIxMospx4jCIk1JKpJFckMKVhIb/1RgQ5jBw65UfWgVoY+2vAY6HTDOvv+h4cRuZzF1rezNTYQn9v3DhyVCsjYxXt6t9ZV4f1vgzgZDJIDPcwB2JUjFUU71pU1GUrqvX02FJ2nDU/QkTznP1fHXHBQ4OLfwUYALhaDRT0WgkEAAAAAElFTkSuQmCC";
            divElement.appendChild(imgElement);

            var textElement = doc.createElement("span");
            textElement.id = "hunterTextArea";

            var text = " " + text1.replace("{0}", count);
            var hunterTextElement1 = doc.createTextNode(text);
            hunterTextElement1.id = "HunterTextPart1";
            hunterTextElement1.text = text;
            textElement.appendChild(hunterTextElement1);
            divElement.appendChild(textElement);

            var linkElement = doc.createElement("a");
            linkElement.id = "hunterMenuLink";
            linkElement.setAttribute("style", "cursor:pointer;");

            linkElement.addEventListener('click', function (e) {
                if (count == 1) {
                    var references = hunter.scan();
                    chrome.extension.sendRequest({ action: "isCitaviRunning" }, function (response) {

                        if (response.value) {
                            var importText = "ImportFormat:" + hunter.importFormat + "\r\n" + hunter.send(references.getReference(0).id);
                            chrome.extension.sendRequest({ action: "importHunterReferences", value: importText });

                        }
                    });

                }
                else {
                    var references = hunter.scan();
                    try {
                        jqueryHelper.validate();
                        importDialog.show(references, true, function (importReferences) {

                            var referenceIdList = "";
                            for (var i = 0; i < importReferences.length; i++) {
                                referenceIdList += importReferences[i] + "\n";
                            }
                            var importText = "ImportFormat:" + hunter.importFormat + "\r\n" + hunter.send(referenceIdList);

                            chrome.extension.sendRequest({ action: "importHunterReferences", value: importText });

                        });
                    }
                    catch (e) {
                        citaviPickerLogger.log(e);
                    }
                }
            }
                                                    , true);
            textElement = doc.createElement("span");
            textElement.id = "hunterTextArea";
            var hunterTextElement2 = doc.createTextNode(" " + text2);
            hunterTextElement2.id = "HunterTextPart2";
            textElement.appendChild(hunterTextElement2);
            linkElement.appendChild(textElement);

            divElement.appendChild(linkElement);

            doc.body.appendChild(divElement);
        }
        catch (e) {
            alert(e);
        }
    }
}

