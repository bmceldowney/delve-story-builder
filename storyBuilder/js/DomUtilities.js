angular.module('DomUtilities', []);

angular.module('DomUtilities').factory('utilities', function () {
    return {
        getElementTop: function (elem) {
            yPos = elem.offsetTop;
            tempEl = elem.offsetParent;

            while (tempEl != null) {
                yPos += tempEl.offsetTop;
                tempEl = tempEl.offsetParent;
            }

            return yPos;
        },
        whichTransitionEvent: function () {
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }

    };
});
