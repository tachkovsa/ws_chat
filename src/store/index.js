import { createStore } from 'vuex';
import { Conversation } from '../models/conversation.model';

const state = {
  conversations: [],
};

export const store = createStore({
  state,
  mutations: {
    setConversations(state, payload) {
      state.conversations = payload;
    },
  },
  actions: {
    fetchConversations({ commit, state }, ws, objectType) {
      ws.send(
        JSON.stringify({
          action: 'get_my_conversations',
          object_type: objectType,
        }),
      );
    },
    handleWebSocket({ commit, state }, message) {
      const data = JSON.parse(message?.data) || null;

      data.forEach((d) => {
        const action = d.action || null;

        switch (action) {
          case 'get_my_conversations':
            const fetchedConversations = d.conversations.map((c) => new Conversation(c)) || []; // TODO: map()

            commit('setConversations', fetchedConversations);
        }
      });
    },
  },
  getters: {
    getConversations(state) {
      return state.conversations;
    },
    getConversationById: (state) => (id) => state.conversations.filter((c) => c.id === id),
  },
  modules: {},
});

export function useStore() {
  return store;
}
