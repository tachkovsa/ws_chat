export default {
  state: {
    conversations: [],
    selectedConversationId: null,
    conversationsLoaded: false,
    conversationsHeader: 'Мои разговоры'
  },
  mutations: {
    setConversations(state, payload) {
      state.conversations = payload;
    },
    updateConversation(state, payload) {
      const conversationIndex = state.conversations.findIndex(c => c.id === payload.id);
      if (conversationIndex >= 0) {
        const conversation = state.conversations[conversationIndex].update(payload);
        state.conversations.splice(conversationIndex, 1, conversation);
      }

    },
    addMessage(state, payload) {
      const conversationId = payload.conversation?.id;
      const conversationIndex = state.conversations.findIndex(c => c.id === conversationId);
      if (conversationIndex >= 0) {
        const conversation = state.conversations[conversationIndex].update(payload.conversation);
        conversation.messages.push(payload);
        state.conversations.splice(conversationIndex, 1, conversation);
      }
    },
    selectConversation(state, payload) {
      state.selectedConversationId = payload;
    },
    setConversationLoadingState(state, payload) {
      state.conversationsLoaded = payload;
    }
  },
  actions: {
    fetchConversations({ commit, state }, objectType) {
      commit("setConversationLoadingState", false);
      this.dispatch("sendWebSocket", { action: "get_my_conversations", objectType });
    },
    selectConversation({ commit, state }, conversationId) {
      commit("selectConversation", conversationId);
    },
    sendMessage({ commit, state }, message) {
      this.dispatch("sendWebSocket", {
        action: "send_message",
        ...message
      });
    }
  },
  getters: {
    getConversationsHeader: state => state.conversationsHeader,
    getConversationLoading: state => state.conversationsLoaded,
    getConversations: state => state.conversations,
    getConversationById: (state, getters) => id => getters.getConversations.find(c => c.id === id),
    getSelectedConversationId: state => state.selectedConversationId,
    getConversationMessages: (state, getters) => id => {
      const conversation = getters.getConversationById(id);
      return conversation ? conversation.messages : [];
    },
    getSortedConversationMessages: (state, getters) => id => {
      const messages = getters.getConversationMessages(id);
      return messages.sort((a, b) => {
        if (!isNaN(b.createDate.getTime()) && !isNaN(a.createDate.getTime())) {
          return b.createDate?.getTime() - a.createDate?.getTime();
        } else if (!isNaN(b.createDate.getTime())) {
          return 1;
        } else {
          return -1;
        }
      }).reverse();
    }
  }
};
