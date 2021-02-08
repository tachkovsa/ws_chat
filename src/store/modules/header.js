export default {
  state() {
    return {
      headerSearchVisible: true,
      headerSearchPlaceholder: 'Поиск'
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
    getHeaderSearchVisible: (state) => state.headerSearchVisible,
    getHeaderSearchPlaceholder: (state) => state.headerSearchPlaceholder,
  }
}