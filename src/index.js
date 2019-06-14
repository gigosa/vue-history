function genTimestamp() {
    return Date.now().toFixed(3);
}

const pastLocations = [
    {
        url: window.location.pathname,
        state: {
            timestamp: genTimestamp(),
        },
    },
];

const VueHistory = {
    install(Vue) {
        let timestamp = genTimestamp();
        Vue.prototype.$appLocation = 1;
        const { pushState } = window.history;
        window.history.pushState = (state, title, url) => {
            timestamp = genTimestamp();
            const data = Object.assign({}, { timestamp }, state);
            pastLocations.push({ url, state: data });
            Vue.prototype.$appLocation += 1;
            return pushState.apply(window.history, [data, title, url]);
        };

        const { replaceState } = window.history;
        window.history.replaceState = (state, title, url) => {
            const data = Object.assign({}, { timestamp }, state);
            pastLocations.splice(Vue.prototype.$appLocation - 1, 1, { url, state: data });
            return replaceState.apply(window.history, [data, title, url]);
        };

        window.addEventListener('popstate', (e) => {
            const appLocation = pastLocations
                .findIndex(v => e.state && (v.state.timestamp === e.state.timestamp)) + 1;
            Vue.prototype.$appLocation = appLocation !== 0 ? appLocation : 1;
        });
    },
};

export default VueHistory;
