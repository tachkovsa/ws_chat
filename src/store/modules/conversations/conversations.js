import counversationsMutations from './mutations';
import counversationsActions from './actions';
import counversationsGetters from './getters';

export default {
  state() {
    return {
      conversations: [],
      selectedConversationId: null,
      conversationsLoaded: false
    };
  },
  mutations: counversationsMutations,
  actions: counversationsActions,
  getters: counversationsGetters
};