<template>
  <section class="conversation">
    <div class="conversation__header">
      <div class="conversation__column conversation__column--no-shrink">
        <div
          class="conversation__image"
          v-bind:style="{ 'background-image': 'url(' + conversation?.iconUrl + ')' }"
        ></div>
      </div>
      <div class="conversation__column">
        <div class="conversation__name">{{ conversation?.name }}</div>
      </div>
      <div class="conversation__column">
        <div class="conversation__menu">
          <svg
            class="conversation__menu-icon"
            width="14"
            height="4"
            viewBox="0 0 14 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="2" r="1.5" fill="#BDC6E0" />
            <circle cx="2" cy="2" r="1.5" fill="#BDC6E0" />
            <circle cx="12" cy="2" r="1.5" fill="#BDC6E0" />
          </svg>
        </div>
      </div>
    </div>
    <div class="conversation__loader" v-if="!isLoaded">
      <Loader />
    </div>
    <div class="conversation__messages" v-else-if="conversation?.messages">
      <MessagesList :messages="conversation.messages" />
    </div>
    <div class="conversation__new-message">
      <OutputMessage @sendMessage="sendMessage($event)" />
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import { useStore } from "../store";
import ConversationsListItemVue from "./ConversationsListItem.vue";
import Loader from "./Loader.vue";
import MessagesList from "./MessagesList.vue";
import OutputMessage from "./OutputMessage.vue";

export default defineComponent({
  name: "Conversation",
  components: {
    Loader,
    MessagesList,
    OutputMessage
  },
  setup(props, context) {
    const store = useStore();
    const isLoaded = computed(() => store.getters.getConversationLoading);

    // TODO: Need ref, I think
    const conversation = computed(() => {
      const id = conversationId?.value;
      return store.getters.getConversationById(id);
    });
    const conversationId = computed(() => {
      return useRoute().params.id;
    });

    const sendMessage = (message) => {
      const outputMessage = {
        conversation_id: conversationId.value,
        message_text: message.text,
        message_type: message.type || 'message'
      }
      if (message.recipients) {
        outputMessage.recipients = `[${message.recipients.map(r => `"${r}"`).join(',')}]`;
      }

      store.dispatch('sendMessage', outputMessage);
    }

    // let outputMessage: OutputMessage = {
    //   conversation_id: this.currentConversation.id,
    //   message_text: message.text,
    //   message_type: message.type ? message.type : 'message'
    // };
    // if (message.recipients) {
    //   outputMessage.message_recipients = `[${message.recipients.map(r => `"${r}"`).join(',')}]`;
    // }

    // this.connection$.next({ action: 'send_message', ...outputMessage });

    // watch(() => props.someprops, () => {
    //   // Do smth...
    // })

    // const conversation = computed(() => {
    //   const conv = store.getters.getConversationById(store.getters.getSelectedConversationId);
    //   console.log(conversationId, conv);
    //   return
    // });

    // function getConversationById(conversationId) {
    //   const conversation = store.getters.getConversationById(conversationId);
    //   console.log('get', conversationId, conversation);
    //   return conversation;
    // }

    return {
      conversationId,
      isLoaded,
      // getConversationById,
      conversation,
      sendMessage,
    };
  }
});
</script>

<style scoped lang="scss">
.conversation {
  $conversation: &;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;

  &__header {
    display: flex;
    background-color: $color-backdrop;
    height: $header-height;
    box-sizing: border-box;
    border-bottom: 1px solid $color-border;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &__column {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    justify-content: center;

    &--no-shrink {
      flex-shrink: 0;
    }

    &:nth-child(1) {
      width: 2rem;
    }

    &:nth-child(2) {
      width: 100%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }

    &:last-child {
      flex-shrink: 0;
      align-items: flex-end;
      min-width: 2rem;
      max-width: 4rem;
    }
  }

  &__image {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
  }

  &__name {
    font-size: $font-size-base;
    color: $font-color-main;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__menu {
    display: flex;
    width: 1rem;
    justify-content: flex-end;

    &:hover {
      cursor: pointer;
    }

    &-icon {
      transform: rotate(90deg);
    }
  }

  &__messages {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  &__new-message {
    display: flex;
    box-sizing: border-box;
    height: 3rem;
    border-top: 1px solid $color-border;
    margin-top: auto;
    flex-shrink: 0;
  }
}
</style>
