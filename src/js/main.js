import store from './store';

window.store = store;

require('./partical/cookie');
require('./partical/loading');
require('./partical/header');
require('./partical/footer');

// Loading Trigger
window.addEventListener('load', () => {
  window.store.commit('isLoadingSet', false);
});
