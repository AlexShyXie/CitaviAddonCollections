

var citaviPickerIsbnValidator = new function () {
    this.isISBN = function (isbn) {

        if (isbn.length < 10) return false;

        if (this.isISBN10(isbn) == true) return true;

        if (this.isISBN13(isbn) == true) return true;

        return false;
    }

    this.scanISBN10 = function (S, f) {
        var t = 0, j, c;
        for (j = 0; j < S.length; j++) {
            c = S.charCodeAt(j);
            if ((c == 88 && f == 1) ||
				(c == 120 && f == 1)) {
                t += 10;
                f--;
            }
            if (c > 47 && c < 58) {
                t += (c - 48) * f--;
            }
        }

        return { F: f, T: t };
    }

    this.isISBN10 = function (isbn) {

        with (this.scanISBN10(isbn, 10)) {
            return F == 0 && T % 11 == 0;
        }
    }

    this.scanISBN13 = function (S) {
        var f = 13, t = 0, j, c, k = 1;
        for (j = 0; j < S.length; j++) {
            c = S.charCodeAt(j);
            if (c > 47 && c < 58) {
                f--;
                t += (c - 48) * (2 + (k = -k));
            }
        }
        return { F: f, T: t };
    }

    this.isISBN13 = function (isbn) {
        with (this.scanISBN13(isbn)) {
            return F == 0 ? T % 10 == 0 : "size?";
        }
    }

};