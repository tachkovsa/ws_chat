import { createStore } from "vuex";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";

const state = {
  conversations: [],
  config: {
    server: null,
    user: {
      id: "6148914691236517121" // TODO: Fetch ID via API, for now it's user73 / 73user
    }
  },
  app: {
    conversationsLoaded: false,
    selectedConversationId: null,
    connection: null,
    isConnected: false
  }
};

export const store = createStore({
  state,
  mutations: {
    setConnection(state, payload) {
      state.app.connection = payload;
    },
    setConnectionState(state, payload) {
      state.app.isConnected = payload;
    },

    setConversations(state, payload) {
      state.conversations = payload;
    },
    updateConversation(state, payload) {
      const conversationIndex = state.conversations.findIndex(c => c.id === payload.id);
      if (conversationIndex) {
        const conversation = state.conversations[conversationIndex].update(payload);
        state.conversations.splice(conversationIndex, 1, conversation);
      }
    },
    addMessage(state, payload) {
      const conversationId = payload.conversation?.id;
      const conversationIndex = state.conversations.findIndex(c => c.id === conversationId);
      if (conversationIndex) {
        const conversation = state.conversations[conversationIndex].update(payload.conversation);
        conversation.messages.push(payload);
        state.conversations.splice(conversationIndex, 1, conversation);
      }
    },
    selectConversation(state, payload) {
      state.app.selectedConversationId = payload;
    },
    setConversationLoadingState(state, payload) {
      state.app.conversationsLoaded = payload;
    }
  },
  actions: {
    connect({ commit, state }, { url }) {
      const connection = new WebSocket(url);

      connection.onopen = event => commit("setConnectionState", true);
      connection.onclose = event => commit("setConnectionState", false);
      connection.onmessage = event => store.dispatch("handleWebSocket", event);
      commit("setConnection", connection);
    },

    fetchConversations({ commit, state }, objectType) {
      commit("setConversationLoadingState", false);
      store.dispatch("sendWebSocket", { action: "get_my_conversations", objectType });
    },
    sendWebSocket({ commit, state }, payload) {
      const connection = state.app.connection;
      const jsonPayload = JSON.stringify(payload);
      connection.send(jsonPayload);
    },
    handleWebSocket({ commit, state }, message) {
      const data = JSON.parse(message?.data) || null;

      data.forEach(d => {
        const action = d.action || null;

        switch (action) {
          case "get_my_conversations":
            const fetchedConversations = d.conversations.map(c => new Conversation(c)) || []; // TODO: map()
            fetchedConversations.sort((a, b) => {
              if (
                !isNaN(b.lastUnreadMessageDate.getTime()) &&
                !isNaN(a.lastUnreadMessageDate.getTime())
              ) {
                return b.lastUnreadMessageDate?.getTime() - a.lastUnreadMessageDate?.getTime();
              } else if (!isNaN(b.lastUnreadMessageDate.getTime())) {
                return 1;
              } else {
                return -1;
              }
            });

            commit("setConversations", fetchedConversations);
            commit("setConversationLoadingState", true);
            break;
          case "send_message":
            // TODO: Set message state to waiting
            if (d.hasOwnProperty('id')) {
              const fetchedMessage = new Message(d) || null;
              commit("addMessage", fetchedMessage);
            } else if (d.hasOwnProperty('message_id')) {
              // console.log('Waiting for process...');
            }
            break;
        }
      });
    },
    selectConversation({ commit, state }, conversationId) {
      commit("selectConversation", conversationId);
    },
    sendMessage({ commit, state }, message) {
      store.dispatch("sendWebSocket", {
        action: "send_message",
        ...message
      });
    }
  },
  getters: {
    getConnection: state => state.app.connection,
    getConnectionState: state => state.app.isConnected,

    getConversationLoading: state => state.app.conversationsLoaded,
    getConversations: state => state.conversations,
    getConversationById: (state, getters) => id => getters.getConversations.find(c => c.id === id),
    getSelectedConversationId: state => state.app.selectedConversationId,

    getCurrentUserId: state => state.config.user.id
  },
  modules: {}
});

export function useStore() {
  return store;
}
