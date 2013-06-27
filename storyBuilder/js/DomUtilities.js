angular.module('DomUtilities', []);

angular.module('DomUtilities').factory('utilities', function () {
    return {
        getElementTop: function (elem) {
            //var elem;

            //if (document.getElementById) {
            //    elem = document.getElementById(Elem);
            //}
            //else if (document.all) {
            //    elem = document.all[Elem];
            //}

            yPos = elem.offsetTop;
            tempEl = elem.offsetParent;

            while (tempEl != null) {
                yPos += tempEl.offsetTop;
                tempEl = tempEl.offsetParent;
            }

            return yPos;
        }
    };
});
