

var citaviPickerPageModifier = new function () {
    this.lastCheckedPage = "";
    this.lastReloadTime = null;
    this.isbnNodes = [];
    this.maxCounter = 1000;
    this.foundIsbnTag = false;
    this.pendingNodesToCheck = new Array();

    this.onPageLoad = function (subscibeEvents) {
        try {


            var doc = window.document;

            if (doc.location) {

                var domNodeInserting = false;

                chrome.extension.sendRequest({ action: "getOptions", type: "hunter" }, function (r1) {
                    if (r1.value) {
                        hunterManager.checkSite(0);
                    } 
                });


                kindleHunter.scan()
                if (subscibeEvents) {
                	this.subscribePageChangeEvent(doc);

                	doc.addEventListener("DOMNodeInserted", function (event) {

                		if (domNodeInserting) {

                			citaviPickerPageModifier.pendingNodesToCheck.push(event.target);
                			return;
                		}
                		if (event.target.nodeName != undefined && event.target.nodeName.toLowerCase() == "style") return;
                		if (event.target.getAttribute == null) return;
                		if (event.target.getAttribute("cref") != null) return;
                		if (event.target.innerHtml != undefined && event.target.innerHtml.indexOf("hunter") != -1) return;


                		domNodeInserting = true;

                		try {
                			var insertTimeOut = setTimeout(function () {

                				citaviPickerPageModifier.findIdentifiers(event.target);
                				domNodeInserting = false;
                				for (var i = 0; i < citaviPickerPageModifier.pendingNodesToCheck.length; i++) {
                					citaviPickerPageModifier.findIdentifiers(citaviPickerPageModifier.pendingNodesToCheck[i]);
                					citaviPickerPageModifier.pendingNodesToCheck.splice(i, 1);
                					i--;
                				}
                				kindleHunter.scan()
                				chrome.extension.sendRequest({ action: "getOptions", type: "hunter" }, function (r1) {
                					if (r1.value) {
                						hunterManager.checkSite(0);
                					}
                				});
                			}, 1000);
                		}
                		catch (e) {
                			domNodeInserting = false;
                		}

                	}

														, false);

                }

                if (!this.canModifyPage(doc)) {
                    return;
                }

                this.checkPage();
            }
        }
        catch (e) {

        }
    }

    this.checkPage = function () {
    	chrome.extension.sendRequest({ action: "getOptions", type: "isbn" }, function (r1) {

    		if (r1.value) {

    			if (citaviPickerPageModifier.isValidReload()) {


    				citaviPickerPageModifier.lastReloadTime = new Date();
    				citaviPickerPageModifier.lastCheckedPage = document.location.href;
    				citaviPickerPageModifier.loadGenericPage(document);
    			}
    		}
    	});
    }

    this.subscribePageChangeEvent = function (document) {
    	document.addEventListener('page:change', function (event) {
    		citaviPickerPageModifier.onPageLoad();
    	});

		//Dieser Event für externe (webseiten) benötigt
    	document.addEventListener('CitaviPickerInitialize', function (e) { citaviPickerPageModifier.onPageLoad(false); }, false);
    }

    this.canModifyPage = function (doc) {
    	try {


            var innerHTML = doc.getElementsByTagName('HEAD')[0].innerHTML;
            if (innerHTML == null) return false;

            if (/(DokuWiki|Kwiki|MediaWiki|MoinMoin|Oddmuse|PbWiki|PhpWiki|PmWiki|SlipSlap|TikiWiki|UseMod|WakkaWiki|WikkaWiki)/ig.test(innerHTML)) {
                return false;
            }

            var htmlText = doc.body.innerHTML;
            if (htmlText == "") {

                return false;
            }

            if (htmlText.indexOf("Isbn") == -1 &&
                htmlText.indexOf("ISBN") == -1 &&
                htmlText.indexOf("EAN") == -1 &&
                htmlText.indexOf("ean") == -1 &&
                htmlText.indexOf("DOI") == -1 &&
                htmlText.indexOf("doi") == -1 &&
                htmlText.indexOf("978") == -1 &&
                htmlText.indexOf("979") == -1) {
               
                return false;
            }

            return true;
        }
        catch (e) {
            return false;
        }
    }

    this.isValidReload = function () {
        try {

            return true;
            //Wir versuchen es mal 01.07.2011
            if (this.lastReloadTime == null) return true;

            var now = new Date();
            var date = new Date(this.lastReloadTime);
            date.setSeconds(date.getSeconds() + 1);
            if (now >= date) {
                return true;
            }
        }
        catch (e) {

        }
        return false;
    }

    this.removeNodeAttribute = function (node, attributeName) {
        if (node.hasAttribute(attributeName)) {
            node.removeAttribute(attributeName);
        }
    }

    this.getIsbnMatch = function (isbn, startIndex) {
        try {

            if (isbn == null) {
                return null;
            }

            var reg1 = /(\s|\>|:|^|;)((978\-|979\-)(\d|\-){11,13})($|\D)/g;   //978-3-86640-001-6
            reg1.lastIndex = startIndex;
            var match = reg1.exec(isbn);

            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN13(match[2])) {

                    return match;
                }
            }

            //978 1872962 917
            //979 1872962 986
            var reg1a = /(\s|\>|:|^|;)((978\s|979\s)(\d|\s){11,13})($|\D)/g;   //978 3 86640 001 6
            reg1a.lastIndex = startIndex;
            var match = reg1a.exec(isbn);
            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN13(match[2])) {
                    return match;
                }
            }

            var reg1b = /(\s|\>|:|^|;)((978|979)(\-){0,1}(\d|\s){10})($|\D)/g;   //9783866400016
            reg1b.lastIndex = startIndex;
            var match = reg1b.exec(isbn);
            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN13(match[2])) {
                    return match;
                }
            }

            var reg3 = /(\s|\>|:|^|;)((\d|x|X){10})($|\D)/g;   //3866400016
            reg3.lastIndex = startIndex;
            match = reg3.exec(isbn);

            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN10(match[2])) {
                    return match;
                }
            }

            var reg2 = /(\s|\>|:|^|;)((\d|\-|\-|x|X){13})($|\D)/g;   //3-86640-001-6
            reg2.lastIndex = startIndex;
            match = reg2.exec(isbn);
            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN10(match[2])) {
                    return match;
                }
            }

            reg2 = /(\s|\>|:|^|;)((\d|\-|\-|x|X){12})($|\D)/g;   //3-86640-0016
            reg2.lastIndex = startIndex;
            match = reg2.exec(isbn);
            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN10(match[2])) {
                    return match;
                }
            }

            reg2 = /(\s|\>|:|^|;)((\d|\-|\-|x|X){11})($|\D)/g;   //3-866400016
            reg2.lastIndex = startIndex;
            match = reg2.exec(isbn);
            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN10(match[2])) {
                    return match;
                }
            }

            var reg2a = /(\s|\>|:|^|;)((\d|\s|x|X){13})($|\D)/g;   //3 86640 001 6
            reg2a.lastIndex = startIndex;
            match = reg2a.exec(isbn);

            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN10(match[2])) {
                    return match;
                }
            }

            reg2a = /(\s|\>|:|^|;)((\d|\s|x|X){12})($|\D)/g;   //3 86640 0016
            reg2a.lastIndex = startIndex;
            match = reg2a.exec(isbn);

            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN10(match[2])) {
                    return match;
                }
            }

            reg2a = /(\s|\>|:|^|;)((\d|\s|x|X){11})($|\D)/g;   //3 866400016
            reg2a.lastIndex = startIndex;
            match = reg2a.exec(isbn);

            if (match != null) {
                if (citaviPickerIsbnValidator.isISBN10(match[2])) {
                    return match;
                }
            }

            var doiReg = /(\s|\>|:|^|;|\/)(10\.\d\d\d\d\/.+?)(\s|\.\s|\.$|$)/g;
            doiReg.lastIndex = startIndex;
            match = doiReg.exec(isbn);
            if (match != null) {

                return match;
            }

            return null;
        }
        catch (e) {

        }
    }

    this.isNumeric = function (c) {
        if (c == "0" ||
			c == "1" ||
			c == "2" ||
			c == "3" ||
			c == "4" ||
			c == "5" ||
			c == "6" ||
			c == "7" ||
			c == "8" ||
			c == "9"
		  ) {
            return true;
        }
        return false;
    }

    this.loadGenericPage = function (document) {
        try {

            if (document.body == null || document.body.innerHTML == null) return;

            this.foundIsbnTag = false;

            for (var i = 0; i < document.body.childNodes.length; i++) {

                var child = document.body.childNodes[i];
                var innerHTML = child.innerHTML;
                if (this.getIsbnMatch(innerHTML, 0) == null) {
                    continue;
                }
                this.findIdentifiers(child);
            }
            if (!this.foundIsbnTag) return;

            this.attachClickEvent(document);
        }
        catch (e) {

        }
    }

    this.attachClickEvent = function (document) {

        var hits = document.getElementsByTagName("a");
        try {
            for (var r = 0; r < hits.length; r++) {


                var element = hits[r];
                if (element.getAttribute("cref") != null &&
				element.getAttribute("cref").indexOf("CitaviPicker") != -1) {
                    element.addEventListener('click', function (e) {

                        var isbn = this.getAttribute("cref");
                        isbn = isbn.replace(/CitaviPicker/, '');
                        e.stopPropagation();
                        jqueryHelper.validate();
                        var action;

                        if (isbn.indexOf("10.") != -1) {
                            action = "searchDoi";

                        }
                        else {
                            action = "searchIsbn";
                        }

                        chrome.extension.sendRequest({ action: "isCitaviRunning"}, function (r1) {

                            if (r1.value) {
                                onlineSearchProgressDialog.show(isbn, action, true, true);
                            }
                        });

                      
                    }
															, false);
                }
            }
        }
        catch (e) {
            alert(e);
        }
    }

    this.findIdentifiers = function (node) {
        try {

        	
            if (node.childNodes == null) return;

            if (node.nodeName.toLowerCase() == "textarea") return;

            for (var ii = 0; ii < node.childNodes.length; ii++) {

                var child = node.childNodes[ii];

                if (child.hasCitaviPickerIcon) {
                	continue;
                }
                if (child.noCitaviPicker) {
                	continue;
                }
                if (child.tagName != undefined && (child.tagName == "input" || child.tagName == "INPUT" || child.tagName.toLowerCase() == "textarea")) continue;
                if (child.style != null &&
                    (child.style.display == "none" || child.style.display == "NONE" || child.style.visibility == "hidden" || child.style.visibility == "HIDDEN")) continue;

                if (child.nodeType == 3) {

                    var searchIndex = 0;

                    while (true) {

                    	
                    	var isbnMatch = this.getIsbnMatch(child.nodeValue, searchIndex);
                    	var foundIndentifier = isbnMatch != null;

                    	
                        var title = "";
                        if (isbnMatch != null) {

                        	
                        	title = chrome.i18n.getMessage("AddToCitaviProjectByISBN");
                            if (isbnMatch[2].indexOf("10.") != -1) {
                            	title = chrome.i18n.getMessage("AddToCitaviProjectByDOI");
                            }

                            var insertIndex = isbnMatch.index + isbnMatch[2].length;

                            if (child.nodeValue.length > insertIndex) insertIndex++;

                            if (/tel\.|phon/ig.test(child.nodeValue)) {

                                searchIndex = isbnMatch.index + isbnMatch[2].length;
                                continue;
                            }

                            var identifier = isbnMatch[2];
                            identifier = identifier.replace(/\s/g, "");

                            var insertData = " %CITAVIPICKER;" + identifier + ";" + title + ";%";
                            child.insertData(insertIndex, insertData);
                            
                            searchIndex = isbnMatch.index + isbnMatch[2].length + insertData.length;
                            this.foundIsbnTag = true;
                            node.hasCitaviPickerIcon = true;
                        }
                        else {
                            break;
                        }
                    }
                }

                this.findIdentifiers(child);
            }

            var innerHtml = node.innerHTML;
            if (innerHtml == null) return;
            if (innerHtml.indexOf("%CITAVIPICKER") == -1) return;
            if (node.noCitaviPicker != undefined) return;
            var added = false;
        	try
        	{

        		var h = node.style.height.replace("px", "");
        		if (h < 16) {
        			innerHtml = innerHtml.replace(/%CITAVIPICKER;(.+?);(.+?);%/g, " <a href=\"javascript:\" cref=\"CitaviPicker$1\"><img style=\"border: 0px none;height: " + h + "px;\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsZJREFUeNpkU11IFVEQ/s7u5k/d0jL603wKLBMDpRuIFEQ+BkVGGUgEReBLRSEa+BD0EgVJP74kCElppVbqQxAUFBgJUiISUaQ+iGB2Re/evXd/zplmz+rtoYU55+yZMzPffDMjEi1Xd8GyOlVy+ZDKpAGlQOBPRKLP/JEQLOFBQaZs+LMzb9z5+Sb8ab782f02SUqprEgptQSBJD8IyPMDcj2fXNejTMYjJ+3S3MALGtm7Y8RSi4nqNWV7okgrC5Feo53oP+EYsA7WYVlR3JJ2yowwEvzxr3DfvQVME7nH6yG2l0AxXOfZE7gT4zB3lyP/7HmQYSDgVF2CaYGkjhRMTyF5/Roo7bBRCk5PNzY8H4Ld0Y4Un1UY+XU/0pMTKLh1j1EoKObEiEhi5WIia6wcB/7Cbzh9vQj4XhuzSH6ZGnoFb24WTJEm2QgXTglmZRVyLzTBKCsHFRVBSQn/10+svdKK3NONMCoqQTl52ok3Mw2ppK6KEaWvKUNOfQNind1Yd+eBhkgFGyFKShBru4nC3kHkHDsBFRoUbmIEMkIQellllrjGxLtaWtKQzX1V+l7K6D5YTgJbt0HsLIUMVIRAN4h2oPRj7gQ4gwNcgWJYh+sYqtK6IJlE+tNH5J08w2kIXYXQ1gpJ1HBXiMp8eA9n+CXWd3SBuEjaKesTbc2gzVuQ13BOw9cI2NbSKYQw+ZHz9DFSD+8idvs+zHgNE8lta9tItFxCYCdR2P4IintAcQW4SzUHHIK9hdFdF/6P74h190EUl2ZTcr6MwqiOo+BUIxMospx4jCIk1JKpJFckMKVhIb/1RgQ5jBw65UfWgVoY+2vAY6HTDOvv+h4cRuZzF1rezNTYQn9v3DhyVCsjYxXt6t9ZV4f1vgzgZDJIDPcwB2JUjFUU71pU1GUrqvX02FJ2nDU/QkTznP1fHXHBQ4OLfwUYALhaDRT0WgkEAAAAAElFTkSuQmCC\" title='$2'/></a> ");
        			node.innerHTML = innerHtml;
        			added = true;
        		}
        	}
        	catch (e) {
        	}
        	if (!added) {
        		innerHtml = innerHtml.replace(/%CITAVIPICKER;(.+?);(.+?);%/g, " <a href=\"javascript:\" cref=\"CitaviPicker$1\"><img style=\"border: 0px none;height: 16px;width: 16px;display: inline;\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsZJREFUeNpkU11IFVEQ/s7u5k/d0jL603wKLBMDpRuIFEQ+BkVGGUgEReBLRSEa+BD0EgVJP74kCElppVbqQxAUFBgJUiISUaQ+iGB2Re/evXd/zplmz+rtoYU55+yZMzPffDMjEi1Xd8GyOlVy+ZDKpAGlQOBPRKLP/JEQLOFBQaZs+LMzb9z5+Sb8ab782f02SUqprEgptQSBJD8IyPMDcj2fXNejTMYjJ+3S3MALGtm7Y8RSi4nqNWV7okgrC5Feo53oP+EYsA7WYVlR3JJ2yowwEvzxr3DfvQVME7nH6yG2l0AxXOfZE7gT4zB3lyP/7HmQYSDgVF2CaYGkjhRMTyF5/Roo7bBRCk5PNzY8H4Ld0Y4Un1UY+XU/0pMTKLh1j1EoKObEiEhi5WIia6wcB/7Cbzh9vQj4XhuzSH6ZGnoFb24WTJEm2QgXTglmZRVyLzTBKCsHFRVBSQn/10+svdKK3NONMCoqQTl52ok3Mw2ppK6KEaWvKUNOfQNind1Yd+eBhkgFGyFKShBru4nC3kHkHDsBFRoUbmIEMkIQellllrjGxLtaWtKQzX1V+l7K6D5YTgJbt0HsLIUMVIRAN4h2oPRj7gQ4gwNcgWJYh+sYqtK6IJlE+tNH5J08w2kIXYXQ1gpJ1HBXiMp8eA9n+CXWd3SBuEjaKesTbc2gzVuQ13BOw9cI2NbSKYQw+ZHz9DFSD+8idvs+zHgNE8lta9tItFxCYCdR2P4IintAcQW4SzUHHIK9hdFdF/6P74h190EUl2ZTcr6MwqiOo+BUIxMospx4jCIk1JKpJFckMKVhIb/1RgQ5jBw65UfWgVoY+2vAY6HTDOvv+h4cRuZzF1rezNTYQn9v3DhyVCsjYxXt6t9ZV4f1vgzgZDJIDPcwB2JUjFUU71pU1GUrqvX02FJ2nDU/QkTznP1fHXHBQ4OLfwUYALhaDRT0WgkEAAAAAElFTkSuQmCC\" title='$2'/></a> ");
        		node.innerHTML = innerHtml;
        	}

        }
        catch (e) {
        	console.log(e);
        }
    }
}

$(document).ready(function () {
    chrome.extension.sendRequest({ action: "isURLBlacklisted", value: document.URL }, function (r1) {
    	if (r1.value) {
    		citaviPickerLogger.log("Citavi Picker: " + document.URL + " is blacklisted");
            return;
        }
    	citaviPickerPageModifier.onPageLoad(true);
    	
    });

});


//Das muss von WebPage aufgerufen werden
function CitaviPickerInitialize() {

	var evt = document.createEvent('HTMLEvents');
	evt.initEvent("CitaviPickerInitialize", true, true);
	document.dispatchEvent(evt);
}


