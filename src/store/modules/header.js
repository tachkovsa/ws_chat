export default {
  state() {
    return {
      headerSearchVisible: true
    }
  },
  mutations: {
    setHeaderSearchVisible(state, payload) {
      state.headerSearchVisible = payload;
    }
  },
  actions: {
    setHeaderSearchVisible({ commit, state }, headerSearchState) {
      commit('setHeaderSearchVisible', headerSearchState);
    }
  },
  getters: {
    getHeaderSearchVisible: (state) => state.headerSearchVisible
  }
}