

var fetcher = new function () {

	this.baseUrl = "http://citavibackoffice.cloudapp.net/api/onlinesearch/";
	this.callback;

	this.FetchByIsbn = function (isbn, transformerId, callback, user, pass, group) {
		try
		{
			this.callback = callback;
			var url = this.baseUrl + "FetchByIsbn?format=Xml&isbn=" + isbn + "&transformerId=" + transformerId + "&username=" + user + "&password=" + pass + "&group=" + group;
			return this.Fetch(url);
		}
		catch (e) {
			alert(e);
			citaviPickerLogger.log("FetchByIsbn:" + e);
		}
	}

	this.FetchByDoi = function (doi, callback) {
		try {

			this.callback = callback;
			var url = this.baseUrl + "FetchByDoi?format=Xml&doi=" + encodeURIComponent(doi);
			return this.Fetch(url);
		}
		catch (e) {
			alert(e);
			citaviPickerLogger.log("FetchByDoi:" + e);
		}
	}

	this.Fetch = function (url) {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var response = xhr.responseText;
				var s = response.substring(2, response.length - 2);
				var references = new referenceCollection();
				references.loadXml(s);
				fetcher.SendReferences(references);
			}
		}
	}

	//ChromeFunctions
	this.SendReferences = function (references) {
		if (references == null || references.length() == 0) {
			this.callback(false);
		}
		else if (references.length() > 1) {
			this.callback(true, true, references);
		}
		else {
			
			chrome.extension.sendRequest({ action: "importReferences", value: references.getReference(0).tag });
			this.callback(true, false);
		}
	}

}