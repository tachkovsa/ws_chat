import { createStore } from 'vuex';
import { Conversation } from '../models/conversation.model';

const state = {
  conversations: [],
  config: {
    server: null,
    user: null,
  },
  app: {
    selectedConversationId: null,
  },
};

export const store = createStore({
  state,
  mutations: {
    setConversations(state, payload) {
      state.conversations = payload;
    },

    selectConversation(state, payload) {
      state.app.selectedConversationId = payload;
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

    selectConversation({ commit, state }, conversationId) {
      commit('selectConversation', conversationId);
    }
  },
  getters: {
    getConversations(state) {
      return state.conversations;
    },
    getConversationById: (state) => (id) => state.conversations.filter((c) => c.id === id),
    getSelectedConversationId(state) {
      return state.app.selectedConversationId },
  },
  modules: {},
});

export function useStore() {
  return store;
}
