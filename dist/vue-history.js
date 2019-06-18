(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VueHistory = {}));
}(this, function (exports) { 'use strict';

  function genTimestamp() {
    return Date.now().toFixed(3);
  }

  var History = function History() {
    this.timestamp = genTimestamp();
    this.pastLocations = [
      {
        url: window.location.pathname,
        state: {
          timestamp: this.timestamp,
        },
      } ];
    this.appLocation = 1;
    this.init();
  };

  History.prototype.init = function init () {
      var this$1 = this;

    var ref = window.history;
      var pushState = ref.pushState;
    window.history.pushState = function (state, title, url) {
      this$1.timestamp = genTimestamp();
      var data = Object.assign({}, { timestamp: this$1.timestamp }, state);
      this$1.pastLocations.push({url: url, state: data});
      this$1.appLocation += 1;
      return pushState.apply(window.history, [data, title, url]);
    };

    var ref$1 = window.history;
      var replaceState = ref$1.replaceState;
    window.history.replaceState = function (state, title, url) {
      var data = Object.assign({}, { timestamp: this$1.timestamp }, state);
      this$1.pastLocations.splice(this$1.appLocation - 1, 1, {url: url, state: data});
      return replaceState.apply(window.history, [data, title, url]);
    };

    window.addEventListener('popstate', function (e) {
      var appLocation = this$1.pastLocations
        .findIndex(function (v) { return e.state && (v.state.timestamp === e.state.timestamp); }) + 1;
      this$1.appLocation = appLocation !== 0 ? appLocation : 1;
    });
  };

  var VueHistory = {
    install: function install(Vue) {
      Vue.prototype.$history = new History();
    },
  };

  exports.default = VueHistory;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
