import { createStore } from "vuex";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";

import conversations from './modules/conversations/conversations';

export const store = createStore({
  state() {
    return {
      config: {
        server: null,
        user: {
          id: "1105387902724063510", // TODO: Fetch ID via API, for now it's user73 / 73user
        }
      },
      app: {
        connection: null,
        isConnected: false,
        // conversationsLoaded: false,
        // selectedConversationId: null,
      }
    }
  },
  mutations: {
    setConnection(state, payload) {
      state.app.connection = payload;
    },
    
    setConnectionState(state, payload) {
      state.app.isConnected = payload;
    },
  },
  actions: {
    connect({ commit, state }, { url }) {
      const connection = new WebSocket(url);

      connection.onopen = event => commit("setConnectionState", true);
      connection.onclose = event => commit("setConnectionState", false);
      connection.onmessage = event => store.dispatch("handleWebSocket", event);

      commit("setConnection", connection);
    },

    sendWebSocket({ commit, state }, payload) {
      const connection = state.app.connection;
      const jsonPayload = JSON.stringify(payload);
      connection.send(jsonPayload);
    },
    handleWebSocket({ commit, state }, message) {
      const data = JSON.parse(message ?.data) || null;

      data.forEach(d => {
        const action = d.action || null;

        switch (action) {
          case "get_my_conversations":
            const fetchedConversations = d.conversations.map(c => new Conversation(c)) || []; // TODO: map()

            fetchedConversations.sort((a, b) => {
              if (!isNaN(b.lastUnreadMessageDate.getTime()) &&
                  !isNaN(a.lastUnreadMessageDate.getTime())
              ) {
                  return b.lastUnreadMessageDate ?.getTime() - a.lastUnreadMessageDate ?.getTime();
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
                // вставить иконку загрузки сообщения
            }
            break;
        }
      });
    }
  },
  getters: {
    getConnection: state => state.app.connection,
    getConnectionState: state => state.app.isConnected,
    getCurrentUserId: state => state.config.user.id
  },
  modules: {
    conversations
  }
});

export function useStore() {
  return store;
}