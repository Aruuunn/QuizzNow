(function () {
    'use strict';
    (function () { if (void 0 === window.Reflect || void 0 === window.customElements || window.customElements.hasOwnProperty('polyfillWrapFlushCallback'))
        return; const a = HTMLElement; window.HTMLElement = function () { return Reflect.construct(a, [], this.constructor); }, HTMLElement.prototype = a.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, a); })();
}());
//# sourceMappingURL=custom-elements-es5-adapter.js.map