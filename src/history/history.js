import { genTimestamp } from './util';

export class History {
  constructor() {
    this.timestamp = genTimestamp();
    this.pastLocations = [
      {
        url: window.location.pathname,
        state: {
          timestamp: this.timestamp,
        },
      },
    ];
    this.appLocation = 1;
    this.init();
  }

  init() {
    const {pushState} = window.history;
    window.history.pushState = (state, title, url) => {
      this.timestamp = genTimestamp();
      const data = Object.assign({}, { timestamp: this.timestamp }, state);
      this.pastLocations.push({url, state: data});
      this.appLocation += 1;
      return pushState.apply(window.history, [data, title, url]);
    };

    const {replaceState} = window.history;
    window.history.replaceState = (state, title, url) => {
      const data = Object.assign({}, { timestamp: this.timestamp }, state);
      this.pastLocations.splice(this.appLocation - 1, 1, {url, state: data});
      return replaceState.apply(window.history, [data, title, url]);
    };

    window.addEventListener('popstate', (e) => {
      const appLocation = this.pastLocations
        .findIndex(v => e.state && (v.state.timestamp === e.state.timestamp)) + 1;
      this.appLocation = appLocation !== 0 ? appLocation : 1;
    });
  }
}
