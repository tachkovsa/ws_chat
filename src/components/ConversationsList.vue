<template>
  <div class="conversations-list">
    <div class="conversations-list__item"
      v-for="conversation of conversations" :key="conversation.id"
      v-bind:class="{ 'conversations-list__item--selected': conversation.id === selectedConversationId }"
      @click="selectConversation(conversation.id)">
      <ConversationsListItem v-bind:conversation="conversation" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from '../store';

import ConversationsListItem from './ConversationsListItem.vue';

export default defineComponent({
  name: 'ConversationsList',
  components: {
    ConversationsListItem,
  },
  setup(props, context) {
    const store = useStore();
    const conversations = computed(() => store.getters.getConversations);
    const selectedConversationId = computed(() => store.getters.getSelectedConversationId);

    function selectConversation(conversationId) {
      store.dispatch('selectConversation', conversationId);
    }

    return {
      conversations,
      selectedConversationId,
      selectConversation
    };
  },
});
</script>

<style scoped lang="scss">
.conversations-list {
  display: flex;
  flex-direction: column;

  overflow-y: auto;

  &__item {
    padding-left: 1rem;
    padding-right: 1rem;
    
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    &:hover {
      cursor: pointer;
      background-color: $color-backdrop;
    }

    &:first-child {
      margin-top: 0.5rem;
    }

    &:last-child {
      margin-bottom: 0.5rem;
    }

    &--selected {
      cursor: default;
      background-color: $color-backdrop;
    }
  }
}
</style>
