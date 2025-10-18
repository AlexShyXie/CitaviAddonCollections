var citaviPickerLogger = {

    log: function (e) {

       chrome.extension.sendRequest({ action: "log", value: e });
    },
}
