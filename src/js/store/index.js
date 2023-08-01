import { createStore } from 'vuex';
import header from './modules/header';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isLoading: true,
    loadingIsShow: true,
    cookieIsCheck: false,
  },
  mutations: {
    isLoadingSet: (state, result) => {
      state.isLoading = result;
    },
    loadingIsShowSet: (state, result) => {
      state.loadingIsShow = result;
    },
    cookieIsCheckSet: (state, result) => {
      state.cookieIsCheck = result;
    },
  },
  modules: {
    header,
  },
});
