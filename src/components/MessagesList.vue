<template>
  <ul class="messages-list">
    <li
      class="messages-list__item"
      v-for="(message, index) of messages"
      :key="message.id"
      :class="{
        'messages-list__item--output': !'message.sender.id === userId',
        'messages-list__item--no-margin-top': isSameAuthor(messages[index - 1], message)
      }"
    >
      <MessagesListItem
        :message="message"
        :userId="userId"
        :sameAuthor="isSameAuthor(messages[index - 1], message)"
        :isLast="index === messages.length - 1"
        @last-message-rendered="onLastMessageRendered($event)"
      />
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent, watch, ref, onMounted } from 'vue';
import { useStore } from '../store';
import { useRouter } from '../router';

import Loader from './Loader';
import MessagesListItem from './MessagesListItem.vue';

export default defineComponent({
  name: 'MessagesList',
  components: {
    Loader,
    MessagesListItem
  },
  props: ['messages'],
  computed: {
    userId() {
      return this.$store.getters.getCurrentUserId;
    }
  },
  methods: {
    scrollToMessage(messageId) {
      const messageEl = document.getElementById(`message_${messageId}`);
      if (messageEl) {
        messageEl.scrollIntoView();
      }
    },
    onLastMessageRendered(messageId) {
      this.scrollToMessage(messageId);
    },
    isSameAuthor(previous, current) {
      const previousId =
        previous && previous.sender ? (previous.sender.id ? previous.sender.id : null) : previous;
      const currentId =
        currentId && current.sender ? (current.sender.id ? current.sender.id : null) : currentId;
      return previousId === currentId;
    }
  }
  // setup(props, context) {
  //   const store = useStore();
  //   const router = useRouter();

  //   const userId = computed(() => store.getters.getCurrentUserId);
  //   const messages = ref([]);

  //   const isSameAuthor = (previous, current) => previous?.sender?.id === current?.sender?.id;

  //   watch(
  //     () => props.messages,
  //     (first, second) => (messages.value = first)
  //   );

  //   // TODO: Check current user scroll position
  //   function onLastMessageRendered(messageId) {
  //     scrollToMessage(messageId);
  //   }

  //   function scrollToMessage(messageId) {
  //     const messageEl = document.getElementById(`message_${messageId}`);
  //     if (messageEl) {
  //       messageEl.scrollIntoView();
  //     }
  //   }

  //   return {
  //     messages,
  //     userId,
  //     isSameAuthor,
  //     onLastMessageRendered,
  //     scrollToMessage,
  //   };
  // }
});
</script>

<style scoped lang="scss">
.messages-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;

  &__item {
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    &--output {
      flex-direction: row-reverse;
    }

    &--output .messages-list-item__column:first-child &--no-margin-top:not(:first-child) {
      margin-top: -0.5rem;
    }
  }
}
</style>
