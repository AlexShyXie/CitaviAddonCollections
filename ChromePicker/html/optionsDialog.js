

var optionsDialog = new function () {

    this.show = function () {


        if (document.getElementById("citaviPickerOptionsDialog") == null) {
            var pickerDiv = $("<div id='citaviPickerOptionsDialog' class='uiPicker'></div>");
            $(document.body).append(pickerDiv);
        }

        var url = chrome.extension.getURL("html//optionsDialog.html");

        $('#citaviPickerOptionsDialog').dialog({
            dialogClass: "uiPicker",
            modal: true,
            autoOpen: false,
            show: "fast",
            create: function (event, ui) {
                //                $('.uiPicker-widget-overlay').remove();
                $(this).load(url);
            },
            hide: "fadeOut",
            open: function (event, ui) {
                $('.uiPicker-widget-overlay').hide();
                $(this).parent().children(':first').children('a').remove();
                $('.uiPicker-widget-header').mouseup(function () {
                    //Das müssen wir von Hand machen, wg. "GoogleScholar-Bug"
                    //Auf GoogeScholar wird ansonsten kein MouseUp gefeuert
                    //Drag endet nie :-(
                    $(document).mouseup();
                });
                $(event.target).parent().css('position', 'fixed');
                $(event.target).parent().css('top', $(window).height() / 2 - ($(this).height() / 2));
                $(event.target).parent().css('left', $(window).width() / 2 - 250);
            },
            close: function (ev, ui) {
                $(this).dialog('destroy').remove()
            },
            position: ['center', 'center'],
            resizable: false,
            height: 600,
            resizable: false,
            title: "Citavi Picker",
            width: 550,
            buttons: [
                        {
                            text: chrome.i18n.getMessage("OK"),

                            click: function () {
                                $(this).dialog("close");

                            }
                        }
                      ]
        });

        $('#citaviPickerOptionsDialog').dialog("open");

    };
}
