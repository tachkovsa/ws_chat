import { createStore } from 'vuex';
import { Conversation } from '../models/conversation.model';

const state = {
  conversations: [],
  config: {
    server: null,
    user: null,
  },
  app: {
    conversationsLoaded: false,
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

    setConversationLoadingState(state, payload) {
      state.app.conversationsLoaded = payload;
    },
  },
  actions: {
    fetchConversations({ commit, state }, ws, objectType) {
      commit('setConversationLoadingState', false);
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
            fetchedConversations.sort((a, b) => {
              if (!isNaN(b.lastUnreadMessageDate.getTime()) && !isNaN(a.lastUnreadMessageDate.getTime())) {
                return b.lastUnreadMessageDate?.getTime() - a.lastUnreadMessageDate?.getTime()
              } else if (!isNaN(b.lastUnreadMessageDate.getTime())) {
                return 1;
              } else {
                return -1;
              }
            });

            commit('setConversations', fetchedConversations);
            commit('setConversationLoadingState', true);
        }
      });
    },

    selectConversation({ commit, state }, conversationId) {
      commit('selectConversation', conversationId);
    }
  },
  getters: {
    getConversationLoading: (state) => state.app.conversationsLoaded,
    getConversations: (state) => state.conversations,
    getConversationById: (state, getters) => (id) => getters.getConversations.find((c) => c.id === id),
    getSelectedConversationId: (state) => state.app.selectedConversationId,
  },
  modules: {},
});

export function useStore() {
  return store;
}
