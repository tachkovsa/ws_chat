<template>
  <div class="conversations-list">
    <div class="conversations-list__item" v-for="conversation of conversations" :key="conversation.id">
      <ConversationsListItem v-bind:conversation="conversation" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from '../store';

import ConversationsListItem from "./ConversationsListItem.vue";

export default defineComponent({
  name: 'ConversationsList',
  components: {
    ConversationsListItem
  },
  setup(props, context) {
    const store = useStore();
    const conversations = computed(() => store.getters.getConversations);

    return { conversations }
  }
})
</script>

<style scoped lang="scss">
.conversations-list {
  display: flex;
  flex-direction: column;

  overflow-y: auto;

  &__item {
    padding-left: 1rem;
    padding-right: 1rem;

    &:first-child {
      margin-top: 1rem;
    }
    
    &:last-child {
      margin-bottom: 1rem;
    }
  }
}
</style>
