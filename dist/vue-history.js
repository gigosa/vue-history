(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VueHistory = {}));
}(this, function (exports) { 'use strict';

  function genTimestamp() {
    return Date.now().toFixed(3);
  }

  var pastLocations = [
    {
      url: window.location.pathname,
      state: {
        timestamp: genTimestamp(),
      },
    } ];

  var VueHistory = {
    install: function install(Vue) {
      var timestamp = genTimestamp();
      Vue.prototype.$history = {
        appLocation: 1,
      };
      var ref = Vue.prototype;
      var $history = ref.$history;
      var ref$1 = window.history;
      var pushState = ref$1.pushState;
      window.history.pushState = function (state, title, url) {
        timestamp = genTimestamp();
        var data = Object.assign({}, {timestamp: timestamp}, state);
        pastLocations.push({url: url, state: data});
        $history.appLocation += 1;
        return pushState.apply(window.history, [data, title, url]);
      };

      var ref$2 = window.history;
      var replaceState = ref$2.replaceState;
      window.history.replaceState = function (state, title, url) {
        var data = Object.assign({}, {timestamp: timestamp}, state);
        pastLocations.splice($history.appLocation - 1, 1, {url: url, state: data});
        return replaceState.apply(window.history, [data, title, url]);
      };

      window.addEventListener('popstate', function (e) {
        var appLocation = pastLocations
          .findIndex(function (v) { return e.state && (v.state.timestamp === e.state.timestamp); }) + 1;
        $history.appLocation = appLocation !== 0 ? appLocation : 1;
      });
    },
  };

  exports.default = VueHistory;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
