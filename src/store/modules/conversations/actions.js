export default {
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
}