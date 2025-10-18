
var kindleHunter = new function () {

	this.scan = function () {

		if (document.URL.toLocaleLowerCase() != "https://kindle.amazon.com/your_highlights") return;

		this.findQuotations();
		this.findReferences();
	}

	this.findQuotations = function () {
		var nodes = document.getElementsByClassName("linkOut");
		
		for (var i = 0; i < nodes.length; i++) {
			
			var node = nodes[i];
			var hasCitaviElement = false;
			for (var j = 0; j < node.parentNode.childElementCount; j++) {
				if (node.parentNode.childNodes[j].isCitaviPickerElement) {
					hasCitaviElement = true;
				}
			}
			for (var j = 0; j < node.childElementCount; j++) {
				if (node.childNodes[j].isCitaviPickerElement) {
					hasCitaviElement = true;
				}
			}
			if (hasCitaviElement) continue;

			var id = this.getId(node.parentNode);
			var addToCitaviElement = document.createElement("span");
			addToCitaviElement.isCitaviPickerElement = true;
			addToCitaviElement.setAttribute("class", "deleteHighlight");
			var button = document.createElement("button");
			button.setAttribute("class", "textSubmit");
			addToCitaviElement.appendChild(button);
			var span = document.createElement("span");
			span.setAttribute("class", "bullet");
			span.innerHTML = "&nbsp;&nbsp;&nbsp;•&nbsp;";
			button.appendChild(span);

			span = document.createElement("span");
			span.setAttribute("class", "underline");
			span.id = id;

			button.style.height = "1.5em";
			button.appendChild(span);

			var insertBeforeNode = node.parentNode.childNodes[node.parentNode.childElementCount - 1];
			if (insertBeforeNode == node) {
				node.parentNode.insertBefore(addToCitaviElement, node.parentNode.childNodes[node.parentNode.childElementCount]);
			}
			else {
				node.parentNode.insertBefore(addToCitaviElement, node.parentNode.childNodes[node.parentNode.childElementCount - 1]);
			}

			chrome.extension.sendRequest({ action: "containsCitaviEntityId", id: id }, function (response) {
				try
				{
					var span = document.getElementById(response.id);

					if (response.value) {
						span.innerHTML = chrome.i18n.getMessage("ShowKindleQuotation")
						span.ClickAction = "Open";
					}
					else {
						span.innerHTML = chrome.i18n.getMessage("AddKindleQuotation")
						span.ClickAction = "Add";
					}
				}
				catch (e) {
					
				}
			});

			button.onclick = function (event) {
				event.stopPropagation();
				var parent = event.srcElement.parentNode.parentNode.parentNode;

				if (event.srcElement.ClickAction == "Open") {
					chrome.extension.sendRequest({ action: "showCitaviEntity", id: kindleHunter.getId(parent) });
				}
				else {
					
					var quotation = "";
					quotation += "ReferenceId=" + kindleHunter.getAsin(parent) + "\r\n";
					for (var j = 0; j < parent.childNodes.length; j++) {
						var node = parent.childNodes[j];
						if (node.className == "highlight" || node.className == "context") {
							quotation += "Text=" + node.innerText + "\r\n";
						}

						if (node.className == "editNote" || node.className == "editNote ") {
							try {
								var coreStatement = node.getElementsByClassName("noteContent")[0].innerHTML;
								if (coreStatement != undefined && coreStatement.length > 0) {
									quotation += "CoreStatement=" + coreStatement + "\r\n";
								}
							}
							catch (e) {

							}
						}
						if (node.href != undefined && node.href.indexOf("kindle://book?action") != -1) {
							quotation += "PageRange=" + /location=\d+/.exec(node.href)[0].replace(/\D/g, "") + "\r\n";
							quotation += "NumberingType=Other\r\n";
						}
					}
					
					quotation += "Id=" + kindleHunter.getId(parent) + "\r\n";
					chrome.extension.sendRequest({ action: "isCitaviRunning"}, function (response)
					{
						if (response.value) {
							chrome.extension.sendRequest({ action: "sendTextSelectionToCitavi", field: "QuotationText", content: quotation });
							event.srcElement.innerHTML = chrome.i18n.getMessage("ShowKindleQuotation");
							event.srcElement.ClickAction = "Open";
						}
					});
				}
			};
		}
	}

	this.findReferences = function () {
		var nodes = document.getElementsByClassName("title");

		for (var i = 0; i < nodes.length; i++) {

			var node = nodes[i];
			var hasCitaviElement = false;
			for (var j = 0; j < node.parentNode.childElementCount; j++) {
				if (node.parentNode.childNodes[j].isCitaviPickerElement) {
					hasCitaviElement = true;
				}
			}
			for (var j = 0; j < node.childElementCount; j++) {
				if (node.childNodes[j].isCitaviPickerElement) {
					hasCitaviElement = true;
				}
			}
			if (hasCitaviElement) continue;

			var id = node.childNodes[0].href.replace(/.+\//, "");
			

			var addToCitaviElement = document.createElement("span");
			addToCitaviElement.isCitaviPickerElement = true;
			addToCitaviElement.setAttribute("class", "deleteHighlight");
			var button = document.createElement("button");
			button.setAttribute("class", "textSubmit");
			addToCitaviElement.appendChild(button);
			var span = document.createElement("span");
			span.setAttribute("class", "bullet");
			span.innerHTML = "&nbsp;&nbsp;&nbsp;•&nbsp;";
			button.appendChild(span);

			span = document.createElement("span");
			span.setAttribute("class", "underline");
			span.id = id;
			span.AmazonURL = node.childNodes[0].href;

			button.style.height = "1.5em";
			button.appendChild(span);

			node.parentNode.insertBefore(addToCitaviElement, node.nextSibling.nextSibling.nextSibling);

			chrome.extension.sendRequest({ action: "containsCitaviEntityId", id: id }, function (response) {
				try {
					var span = document.getElementById(response.id);

					if (response.value) {
						span.innerHTML = chrome.i18n.getMessage("ShowKindleReference")
						span.ClickAction = "Open";
					}
					else {
						span.innerHTML = chrome.i18n.getMessage("AddKindleReference")
						span.ClickAction = "Add";
					}
				}
				catch (e) {

				}
			});

			button.onclick = function (event) {
				event.stopPropagation();
				var parent = event.srcElement.parentNode.parentNode.parentNode;

				var id = event.srcElement.id;
				var element = event.srcElement;
				if (element.ClickAction == "Open") {
					chrome.extension.sendRequest({ action: "showCitaviEntity", id: id });
				}
				else if (element.ClickAction == "Add") {
					chrome.extension.sendRequest({ action: "isCitaviRunning" }, function (response) {
						if (response.value) {
							element.ClickAction = "Import";
							element.innerHTML = chrome.i18n.getMessage("ImportKindleReference");
							kindleHunter.importReference(id, element);
						}
					});
				}
			};
		}
	}

	this.importReference = function (asin, element) {
		try {
			var request = new XMLHttpRequest();
			var url = element.AmazonURL;
			request.onerror = function () {
				alert(chrome.i18n.getMessage("NoResultsWereFoundForTheseCriteria"));
				element.parentNode.setAttribute("hidden", "true");
			}
			request.onloadend = function () {
				if (request.status == 200) {
					request = new XMLHttpRequest();
					request.onerror = function () {
						alert(chrome.i18n.getMessage("NoResultsWereFoundForTheseCriteria"));
						element.parentNode.setAttribute("hidden", "true");
					}
					request.onloadend = function () {
						if (request.status == 200) {
							var country = "com";
							if (/www.amazon.de/.test(request.responseText)) {
								country = "de";
							}
							else if (/www.amazon.co.jp/.test(request.responseText)) {
								country = "jp";
							}
							else if (/www.amazon.co.uk/.test(request.responseText)) {
								country = "uk";
							}
							else if (/www.amazon.fr/.test(request.responseText)) {
								country = "fr";
							}
							else if (/www.amazon.com/.test(request.responseText)) {
								country = "com";
							}
							else {
								alert(chrome.i18n.getMessage("NoResultsWereFoundForTheseCriteria"));
								element.parentNode.setAttribute("hidden", "true");
								return;
							}

							chrome.extension.sendRequest({ action: "importHunterReferences", value: "ImportFormat:ASIN\r\nASIN:" + asin + "\r\nCountry:" + country });
							element.innerHTML = chrome.i18n.getMessage("ShowKindleReference");
							element.ClickAction = "Open";

						}
						else {
							alert(chrome.i18n.getMessage("NoResultsWereFoundForTheseCriteria"));
							element.parentNode.setAttribute("hidden", "true");
						}
					}
					request.open("Get", url);
					request.send(null);
				}
				else {
					alert(chrome.i18n.getMessage("NoResultsWereFoundForTheseCriteria"));
					element.parentNode.setAttribute("hidden", "true");
				}
			}
			request.open("Get", "http://www.amazon.com/dp/" + asin + "/ref=cm_sw_su_dp");
			request.send(null);
		}
		catch (e) {
			alert(e);
			alert(chrome.i18n.getMessage("NoResultsWereFoundForTheseCriteria"));
			element.parentNode.setAttribute("hidden", "true");
		}
	}

	this.getAsin = function (element) {
	try
	{
		var asin = "";
		for (var j = 0; j < element.childNodes.length; j++) {
			var node = element.childNodes[j];
			if (node.href != undefined && node.href.indexOf("kindle://book?action") != -1) {
				asin = /asin=.+?&/.exec(node.href)[0];
				asin = asin.replace("asin=", "");
				asin = asin.replace("&", "");
			}
		}

		return asin;
	}
	catch (e) {
		return "";
	}
}
	this.getId = function (element) {
		try
		{
			var annotation_id = "";
			var asin = "";
			for (var j = 0; j < element.childNodes.length; j++) {
				var node = element.childNodes[j];
				if (node.className == "editNote" || node.className == "editNote ") {
					annotation_id = node.id.replace("editNote_", "");
					annotation_id = annotation_id.replace("editNote", "");
				}
				if (node.href != undefined && node.href.indexOf("kindle://book?action") != -1) {
					asin = /asin=.+?&/.exec(node.href)[0];
					asin = asin.replace("asin=", "");
					asin = asin.replace("&", "");
				}
			}

			if (annotation_id == "" || asin == "") return "";

			var id = annotation_id + asin;
			while (id.length < 32) {
				id += "0";
			}
			return id;
		}
		catch (e) {
			return "";
		}
	}
}