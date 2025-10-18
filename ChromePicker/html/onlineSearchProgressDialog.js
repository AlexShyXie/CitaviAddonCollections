
var onlineSearchProgressDialog = new function () {

    this.cancelRequest = false;


    this.show = function (value, action, validateCitaviState, checkForDuplicates) {

        if (validateCitaviState) {
            chrome.extension.sendRequest({ action: "isCitaviRunning" }, function (response) {

                if (response.value) {
                    onlineSearchProgressDialog.show(value, action, false, checkForDuplicates);
                }
            });
            return;
        }

        if (checkForDuplicates) {
            chrome.extension.sendRequest({ action: "checkForDuplicates", identifier: value, identifierType: action }, function (response) {

                if (!response.value) {
                    onlineSearchProgressDialog.show(value, action, false, false);
                }
                else {
                    return;
                }
            });
            return;
        }

        this.cancelRequest = false;
        if (document.getElementById("citaviPickerProgessDialog") == null) {
            var pickerDiv = $("<div id='citaviPickerProgessDialog' class='uiPicker'></div>");
            $(document.body).append(pickerDiv);
        }

        $('#citaviPickerProgessDialog').dialog({
            dialogClass: "uiPicker",
            modal: true,
            autoOpen: false,
            hide: "fadeOut",
            create: function (event, ui) {
            },

            open: function (event, ui) {

                $('.uiPicker-widget-overlay').hide();

                $(this).load(chrome.extension.getURL("html//onlineSearchProgressDialog.html"));
                $(this).ready(function f() { setTimeout(onlineSearchProgressDialog.beginSearch($(this), value, action), 50); });
                $(this).parent().children(':first').children('a').remove();
                $('.uiPicker-widget-header').mouseup(function () {
                    //Das müssen wir von Hand machen, wg. "GoogleScholar-Bug"
                    //Auf GoogeScholar wird ansonsten kein MouseUp gefeuert
                    //Drag endet nie :-(
                    $(document).mouseup();
                });
                $(event.target).parent().css('position', 'fixed');

                $(event.target).parent().css('top', $(window).height() / 2 - ($(this).height() / 2));
                $(event.target).parent().css('left', $(window).width() / 2 - 150);
            },
            close: function (ev, ui) {
                onlineSearchProgressDialog.cancelRequest = true;
                $(this).dialog('destroy').remove();
            },
            position: ['center', 'center'],
            //position: [$(window).width / 2 - 150, $(window).height() / 2 - 75],
            width: 300,
            resizable: false,
            //title: '<img class="uiPicker-icon" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsZJREFUeNpkU11IFVEQ/s7u5k/d0jL603wKLBMDpRuIFEQ+BkVGGUgEReBLRSEa+BD0EgVJP74kCElppVbqQxAUFBgJUiISUaQ+iGB2Re/evXd/zplmz+rtoYU55+yZMzPffDMjEi1Xd8GyOlVy+ZDKpAGlQOBPRKLP/JEQLOFBQaZs+LMzb9z5+Sb8ab782f02SUqprEgptQSBJD8IyPMDcj2fXNejTMYjJ+3S3MALGtm7Y8RSi4nqNWV7okgrC5Feo53oP+EYsA7WYVlR3JJ2yowwEvzxr3DfvQVME7nH6yG2l0AxXOfZE7gT4zB3lyP/7HmQYSDgVF2CaYGkjhRMTyF5/Roo7bBRCk5PNzY8H4Ld0Y4Un1UY+XU/0pMTKLh1j1EoKObEiEhi5WIia6wcB/7Cbzh9vQj4XhuzSH6ZGnoFb24WTJEm2QgXTglmZRVyLzTBKCsHFRVBSQn/10+svdKK3NONMCoqQTl52ok3Mw2ppK6KEaWvKUNOfQNind1Yd+eBhkgFGyFKShBru4nC3kHkHDsBFRoUbmIEMkIQellllrjGxLtaWtKQzX1V+l7K6D5YTgJbt0HsLIUMVIRAN4h2oPRj7gQ4gwNcgWJYh+sYqtK6IJlE+tNH5J08w2kIXYXQ1gpJ1HBXiMp8eA9n+CXWd3SBuEjaKesTbc2gzVuQ13BOw9cI2NbSKYQw+ZHz9DFSD+8idvs+zHgNE8lta9tItFxCYCdR2P4IintAcQW4SzUHHIK9hdFdF/6P74h190EUl2ZTcr6MwqiOo+BUIxMospx4jCIk1JKpJFckMKVhIb/1RgQ5jBw65UfWgVoY+2vAY6HTDOvv+h4cRuZzF1rezNTYQn9v3DhyVCsjYxXt6t9ZV4f1vgzgZDJIDPcwB2JUjFUU71pU1GUrqvX02FJ2nDU/QkTznP1fHXHBQ4OLfwUYALhaDRT0WgkEAAAAAElFTkSuQmCC\" /> Citavi Picker',
            title: "Citavi Picker",
            buttons: [
                        {
                            text: chrome.i18n.getMessage("Cancel"),

                            click: function () {
                                onlineSearchProgressDialog.cancelRequest = true;
                                $(this).dialog("close");

                            }
                        }
                      ]
        });

        $('#citaviPickerProgessDialog').dialog("open");
    },

    this.transfomers = new Array();

    this.beginSearch = function (dialog, value, action) {

    	onlineSearchProgressDialog.isbn = "";
        if (action == "searchIsbn") {

            chrome.extension.sendRequest({ action: "getISBNTransformers" }, function (response) {

                if (response.action == "citaviIsNotRunning") {
                    $('#citaviPickerProgessDialog').dialog("close");
                    alert(chrome.i18n.getMessage("CitaviNotRunning"));
                    return;
                }
                onlineSearchProgressDialog.transfomers = response.value;
                onlineSearchProgressDialog.isbn = value;
                transformerindex = 0;
                onlineSearchProgressDialog.search(0);

            });
        }
        else if (action == "searchDoi") {
            var transformerCollection = new Array();
            transformerCollection[0] = "CC35FE7F-7D00-4816-9304-71121159FEF4";
            onlineSearchProgressDialog.transfomers = transformerCollection;
            fetcher.FetchByDoi(value, this.searchCallback);
        }
    }

    this.isbn = "";

    this.search = function (transformerindex) {

    	var t = onlineSearchProgressDialog.transfomers[transformerindex];
    	if (onlineSearchProgressDialog.isbn != "") {

    		fetcher.FetchByIsbn(onlineSearchProgressDialog.isbn, t, this.searchCallback, "", "", "");
    	}
   }

    this.searchCallback=function (success, showImportDialog, references) {

    	try {
    		if (onlineSearchProgressDialog.cancelRequest) {
    			//onlineAssistant.quitSession();
    			return;
    		}

    		if (success) {
    			//gefunden

    			//onlineAssistant.quitSession();
    			$('#citaviPickerProgessDialog').dialog("close");
    			if (!showImportDialog) {
                        
    			}
    			else {

    				importDialog.show(references, false, function (importReferenceIds) {

    					var referencesToImport = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<References>\n";
    					for (var i = 0; i < references.count(); i++) {
    						var r = references.getReference(i);
    						for (var j = 0; j < importReferenceIds.length; j++) {
    							var rId = importReferenceIds[j];
    							if (r.id == rId) {
    								referencesToImport += r.tag + "\n";
    								break;
    							}
    						}
    					}
    					referencesToImport += "\n</References>";
    					chrome.extension.sendRequest({ action: "importReferences", value: referencesToImport });
    				});
    			}
    		}
    		else {
    			if (transformerindex + 1 == onlineSearchProgressDialog.transfomers.length) {
    				//Nichts gefunden
    				//onlineAssistant.quitSession();
    				$('#citaviPickerProgessDialog').dialog("close");
    				alert(chrome.i18n.getMessage("NoResultsWereFoundForTheseCriteria"));
    			}
    			else {
    				//Weiter suchen
    				transformerindex = transformerindex + 1;
    				onlineSearchProgressDialog.search(transformerindex);
    			}
    		}
    	}
    	catch (e) {
    		citaviPickerLogger.log(e);
    	}
    }
}