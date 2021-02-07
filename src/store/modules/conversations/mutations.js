export default {
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
		const conversationId = payload.conversation ?.id;
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
	},
}