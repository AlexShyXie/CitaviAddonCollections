var citaviPickerGuiManager = {

    initalizeContextMenus: function () {
        try {
            var parentId = chrome.contextMenus.create({ "title": "Citavi Picker", "contexts": ["all"] }, function () { citaviPickerLogger.log("create") });

            this.initializeTextSelectionContextMenu(parentId);
            this.initializeImageSelectionContextMenu(parentId);
            this.initializeNoSelectionContextMenu(parentId);
            this.initializeDefaultContextMenu(parentId);
        }
        catch (e) {
            alert(e);
            citaviPickerLogger.log(e);
        }
    },

    initializeTextSelectionContextMenu: function (parentId) {

        var textSelectionNewReferenceParent = chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AddReferenceAndAddSelection"),
                    "contexts": ["selection"],
                    "parentId": parentId
                });
        //Neuer Titel
        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsQuotation"),
                    "contexts": ["selection"],
                    "parentId": textSelectionNewReferenceParent,
                    "onclick": contextMenuEventhandler.sendTextAsQuotation_NewReference
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsAbstract"),
                    "contexts": ["selection"],
                    "parentId": textSelectionNewReferenceParent,
                    "onclick": contextMenuEventhandler.sendTextAsAbstract_NewReference
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsTableOfContents"),
                    "contexts": ["selection"],
                    "parentId": textSelectionNewReferenceParent,
                    "onclick": contextMenuEventhandler.sendTextAsTOC_NewReference
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsKeyword"),
                    "contexts": ["selection"],
                    "parentId": textSelectionNewReferenceParent,
                    "onclick": contextMenuEventhandler.sendTextAsKeyword_NewReference
                });

        //====================

        chrome.contextMenus.create(
                {
                    "type": "separator",
                    "contexts": ["selection"],
                    "parentId": parentId
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AddSelectionAsQuotation"),
                    "contexts": ["selection"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.sendTextAsQuotation
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsAbstract"),
                    "contexts": ["selection"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.sendTextAsAbstract
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsTableOfContents"),
                    "contexts": ["selection"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.sendTextAsTOC
                });


        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsKeyword"),
                    "contexts": ["selection"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.sendTextAsKeyword
                });


        //Online
//        var onlineSearchParent = chrome.contextMenus.create(
//                {
//                    "title": chrome.i18n.getMessage("ContextMenu_TextSelection_OnlineSearch"),
//                    "contexts": ["selection"],
//                    "parentId": parentId
//                });
//        chrome.contextMenus.create(
//                {
//                    "title": chrome.i18n.getMessage("ContextMenu_TextSelection_OnlineSearch_SimpleSearch"),
//                    "contexts": ["selection"],
//                    "parentId": onlineSearchParent,
//                    "onclick": contextMenuEventhandler.onlineSearch_Simple
//                });
//        chrome.contextMenus.create(
//                {
//                    "title": chrome.i18n.getMessage("ContextMenu_TextSelection_OnlineSearch_AdvancedSearch"),
//                    "contexts": ["selection"],
//                    "parentId": onlineSearchParent,
//                    "onclick": contextMenuEventhandler.onlineSearch_Advanced
//                });
        //==========================
        chrome.contextMenus.create(
                {
                    "type": "separator",
                    "contexts": ["all"],
                    "parentId": parentId
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("CopySelectionAndURLToClipboard"),
                    "contexts": ["selection"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.copyTextSelectionToClipboard
                });

         chrome.contextMenus.create(
                {
                    "type": "separator",
                    "contexts": ["all"],
                    "parentId": parentId
                });

    },

    initializeDefaultContextMenu: function (parentId) {

        chrome.contextMenus.create(
                {
                    "type": "separator",
                    "contexts": ["all"],
                    "parentId": parentId
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("Settings"),
                    "contexts": ["all"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.show_Options
                });
        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("RunCitavi"),
                    "contexts": ["all"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.runCitavi
                });
    },

    initializeImageSelectionContextMenu: function (parentId) {
        var imageSelectionNewReference = chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AddReferenceAndAddSelection"),
                    "contexts": ["image"],
                    "parentId": parentId,
                });
         chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsImageQuotation"),
                    "contexts": ["image"],
                    "parentId": imageSelectionNewReference,
                    "onclick": contextMenuEventhandler.sendImageSelectionAsQuotation_NewReference
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsCoverArt"),
                    "contexts": ["image"],
                    "parentId": imageSelectionNewReference,
                    "onclick": contextMenuEventhandler.sendImageSelectionAsCover_NewReference
                });

        chrome.contextMenus.create(
                {
                    "type": "separator",
                    "contexts": ["image"],
                    "parentId": parentId
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AddSelectionAsImageQuotation"),
                    "contexts": ["image"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.sendImageSelectionAsQuotation
                });

        chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AsCoverArt"),
                    "contexts": ["image"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.sendImageSelectionAsCover
                });

    },

    initializePDFContextMenu: function (parentId) {

        chrome.contextMenus.create(
                {
                    "title": "Pdf als Titel aufnehmen",
                    "contexts": ["all"],
                    "documentUrlPatterns": ["http://*/*.pdf"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.importPDFAsReference
                });

       chrome.contextMenus.create(
            {
                "title": "PDF screenshot",
                "contexts": ["all"],
                "documentUrlPatterns": ["http://*/*.pdf"],
                "parentId": parentId,
                "onclick": contextMenuEventhandler.captureScreenshotAsCover_CurrentView
            });
       chrome.contextMenus.create(
              {
                  "type": "separator",
                  "contexts": ["all"],
                  "documentUrlPatterns": ["http://*/*.pdf"],
                  "parentId": parentId
              });
    },

    initializeNoSelectionContextMenu: function (parentId) {
        chrome.contextMenus.create(
                {
                    "type": "separator",
                    "contexts": ["all"],
                    "parentId": parentId
                });

          chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AddWebPageAsReference"),
                    "contexts": ["all"], //Wir müssen hier all nehmen, da ansonsten kein Eintrag bei "NUR" pdf angezeigt wird. Scheint ein Bug von Chrome zu sein...
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.importWebPageAsReference
                });

            var screenshotParentId = chrome.contextMenus.create(
                {
                	"title": chrome.i18n.getMessage("AddScreenAsScreenshot"),
                    "contexts": ["all"],
                    "parentId": parentId,
                    "onclick": contextMenuEventhandler.captureScreenshotAsCover_CurrentView
                });

             chrome.contextMenus.create(
                {
                    "type": "separator",
                    "contexts": ["all"],
                    "parentId": parentId
                });
    },

    
    testClick: function (info, tab) {
        try {

            alert(document.URL);
        }
        catch (e) {
            alert(e);
        }
    },
};


citaviPickerGuiManager.initalizeContextMenus();


