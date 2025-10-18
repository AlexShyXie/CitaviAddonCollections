

var searchTermBuilder = new function () {

    this.searchTerms = new Array();

    this.begin = function () {
        this.searchTerms = new Array();
    }

    this.add = function (searchAttribute, text) {
        var searchTerm = {};
        searchTerm[0] = searchAttribute;
        searchTerm[1] = text;
        this.searchTerms.push(searchTerm);
    }

    this.isValid = function () {
        return this.searchTerms.length > 0;
    }

    this.toXml = function () {

        var xmlQuery = "<SearchTerms>";

        for (var i = 0; i < this.searchTerms.length; i++) {
            var text = this.searchTerms[i][1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            xmlQuery += "<SearchTerm>";

            xmlQuery += "<SearchAttributeType>" + this.searchTerms[i][0] + "</SearchAttributeType>"
            xmlQuery += "<Text>" + text + "</Text>";

            xmlQuery += "</SearchTerm>";
        }

        xmlQuery += "</SearchTerms>";

        return xmlQuery;
    }

};

