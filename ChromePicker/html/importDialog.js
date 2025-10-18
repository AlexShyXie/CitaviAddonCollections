
var importDialog = new function () {

    this.show = function (value, validateCitaviState, callback) {

        try {
            if (validateCitaviState) {
                chrome.extension.sendRequest({ action: "isCitaviRunning" }, function (response) {

                    if (response.value) {
                        importDialog.show(value, false, callback);
                    }
                });
                return;
            }

            var references = new Array();
            var referencesCount = value.innerList.length;
            var h = 0;
            if (referencesCount > 10) h = 500;
            else {
                h = 50 * referencesCount;
            }
            for (var i = 0; i < value.innerList.length; i++) {
                references.push(value.innerList[i]);
            }

            sessionStorage.setItem("References", JSON.stringify(references));

            if (document.getElementById("importDialog") == null) {
                var pickerDiv = $("<div id='importDialog' class='uiPicker uiPicker-ImportDialog'></div>");
                $(document.body).append(pickerDiv);

            }
            

            $('#importDialog').dialog({
                dialogClass: "uiPicker",
                autoOpen: false,
                modal: true,
                hide: "fadeOut",
                show: "fast",

                close: function (ev, ui) {
                    $(this).dialog('destroy').remove();
                },

                create: function () {

                    var p = chrome.extension.getURL("html//importDialog.html");
                    $(this).load(p);

                },

                open: function (event, ui) {

                    $('.uiPicker-widget-overlay').hide();
                    
                    $(this).parent().children(':first').children('a').remove();

                    $('.uiPicker-widget-header').mouseup(function () {
                        //Das müssen wir von Hand machen, wg. "GoogleScholar-Bug"
                        //Auf GoogeScholar wird ansonsten kein MouseUp gefeuert
                        //Drag endet nie :-(
                        $(document).mouseup();
                    });

                    $(this).parent().find('.uiPicker-dialog-buttonpane button:last').focus();
                    $(event.target).parent().css('position', 'fixed');
                    $(event.target).parent().css('top', $(window).height() / 2 - ($(this).height() / 2));
                    $(event.target).parent().css('left', $(window).width() / 2 - 250);
                   
                },
                position: ['center', 'center'],
                resizable: false,
                height: h,
                width: 550,
                title: 'Citavi Picker',
                buttons: [

                        {
                            text: chrome.i18n.getMessage("ImportButton"),
                            id: "ImportButton",
                            click: function () {
                                try {
                                    $(this).dialog("close");
                                    var importReferences = JSON.parse(sessionStorage.getItem("ImportReferences"));

                                    if (importReferences) {
                                        sessionStorage.removeItem("References");
                                        sessionStorage.removeItem("ImportReferences");
                                        if (importReferences.length > 0) {
                                            callback(importReferences);
                                        }
                                    }
                                }
                                catch (e) {

                                }
                            }
                        },
                        {
                            id: "CancelButton",
                            text: chrome.i18n.getMessage("Cancel"),

                            click: function () {
                                sessionStorage.removeItem("References");
                                sessionStorage.removeItem("ImportReferences");
                                $(this).dialog("close");
                            }
                        },
                      ]
            });

           $('#importDialog').dialog("open");
                  
        }
        catch (e) {
        }
    }
}