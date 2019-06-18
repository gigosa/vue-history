import { History } from './history/history';

const VueHistory = {
  install(Vue) {
    Vue.prototype.$history = new History();
  },
};

export default VueHistory;
