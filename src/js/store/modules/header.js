const state = () => ({
  headerHasColor: false,
  startColor: false,
});

const mutations = {
  set_headerHasColor(state, input) {
    state.headerHasColor = input;
  },
  set_startColor(state, input) {
    state.startColor = input;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
