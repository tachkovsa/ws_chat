export default {
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
            return b.createDate ?.getTime() - a.createDate ?.getTime();
        } else if (!isNaN(b.createDate.getTime())) {
            return 1;
        } else {
            return -1;
        }
    }).reverse();
  },
}