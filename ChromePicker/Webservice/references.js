
reference.prototype.shortTitle = "";
reference.prototype.id;
reference.prototype.tag;
reference.prototype.checked;
reference.prototype.isHeading;

function reference(shortTitle, id, checked) {

    this.shortTitle = shortTitle;
    this.id = id;
    if (checked == undefined) {
        this.checked = false;
     }
    else {
        this.checked = checked;
    }
    this.isHeading = false;
}


referenceCollection.prototype.innerList;

function referenceCollection() {
    this.innerList = new Array();
}

referenceCollection.prototype.count = function () {
    return this.innerList.length;
}

referenceCollection.prototype.length = function () {
    return this.innerList.length;
}

referenceCollection.prototype.addReferenceEx = function (ref) {
    this.innerList.push(ref);
}

referenceCollection.prototype.addReference = function (shortTitle, id, checked) {
    this.innerList.push(new reference(shortTitle, id, checked));
}

referenceCollection.prototype.addHeading = function (headingText) {
    try {
        var r = new reference(headingText, "-", false);
        r.isHeading = true;
        this.innerList.push(r);
    }
    catch (e) {
        alert(e);
    }
}
referenceCollection.prototype.getReference = function (index) {
    return this.innerList[index];
}

referenceCollection.prototype.evaluateXPath = function (aNode, aExpr) {
    var xpe = new XPathEvaluator();
    var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
     aNode.documentElement : aNode.ownerDocument.documentElement);
    var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
    var found = [];
    var res;
    while (res = result.iterateNext())
        found.push(res);
    return found;
}

referenceCollection.prototype.loadXml = function (s) {
	try {

		var parser = new DOMParser();
		s = s.replace("<string>", "");
		s = s.replace("</string>", "");
		s = "<References>" + s + "</References>";
		var xmlDoc = parser.parseFromString(s, "text/xml");
		var r = xmlDoc.getElementsByTagName("Reference");

		for (var i = 0; i < r.length; i++) {
			var referenceNode = r[i];
			if (referenceNode.parentNode.nodeName == "ParentReference") continue;
			var title = "";
			var person = "";
			var year = "";
			var id = "";
			var shortTitle = "";
			var referenceType = "";
			for (var j = 0; j < referenceNode.childNodes.length; j++) {
				var data = referenceNode.childNodes[j];
				switch (data.nodeName) {
					case "Authors":
					case "Editors":
						for (var jj = 0; jj < data.childNodes.length; jj++) {
							for (var jjj = 0; jjj < data.childNodes[jj].childNodes.length; jjj++) {
								var personNode = data.childNodes[jj].childNodes[jjj];
								if (personNode.nodeName == "LastName") {
									if (person == "") person += personNode.textContent;
									else person += ", " + personNode.textContent;
								}
							}
						}

						break;

					case "Id":
						id = data.textContent;
						break;

					case "Title":
						title = data.textContent;
						break;

					case "Year":
						year = data.textContent;
						break;

					case "ReferenceTypeId":
						referenceType = data.textContent;
						break;
				}
			}
			if (person != "" && title != "" && year != "") shortTitle = person + " (" + year + "): " + title;
			else if (title != "" && year != "") shortTitle = "(" + year + "): " + title;
			else if (person != "" && title != "") shortTitle = person + ": " + title;
			else if (person != "" && year != "") shortTitle = person + " (" + year + ":";

			var referenceEx = new reference(shortTitle, id);
			referenceEx.tag = (new XMLSerializer()).serializeToString(referenceNode);
			this.addReferenceEx(referenceEx);
		}
	}
    catch (e) {

    }

}


Date.prototype.toCitaviWebString = function () {
    var dateTimeString = this.getFullYear().toString();
    var month = this.getMonth() + 1;
    var day = this.getDate();

    dateTimeString += month < 10 ? "0" + month.toString() : month.toString();
    dateTimeString += day < 10 ? "0" + day.toString() : day.toString();
    return dateTimeString;
}

Date.prototype.getMinDate = function () {
    var date = new Date();
    date.setFullYear(2000, 1, 1);
    return date;
}