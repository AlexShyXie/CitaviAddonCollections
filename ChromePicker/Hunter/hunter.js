Hunter.prototype.name = "name";
Hunter.prototype.fileName = "";
Hunter.prototype.id = "id";
Hunter.prototype.importFormat = "unknown";
Hunter.prototype.ffPickerMinVersion = "20090626";
Hunter.prototype.iePickerMinVersion = "20090624";
Hunter.prototype.chromePickerMinVersion = "20090624";
Hunter.prototype.version = "1";
Hunter.prototype.priority = 10;
Hunter.prototype.enabled = true;

function getHunter() {
    return new Hunter();
}

function showHunterMenu() {
    hunters.showMenu();
}


getHTMLElementAttributeValue = function (element, attr) {
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
