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
        <h2 class="conversation__name">{{ conversation?.name }}</h2>
      </div>
      <div class="conversation__column conversation__column--menu">
        <the-menu-burger
          :menu-burger-visible="menuVisible"
          :menu-burger-options="menuOptions"
          @trigger-menu-burger="triggerMenu"
          @hide-menu-burger="hideMenu"
        >
        </the-menu-burger>
      </div>
    </div>
    <div class="conversation__loader" v-if="!isLoaded">
      <Loader />
    </div>
    <div class="conversation__messages" v-else-if="messages">
      <MessagesList :messages="messages" />
    </div>
    <div class="conversation__new-message">
      <MessageOutput @send-message="sendMessage" />
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../store';

import Loader from './Loader.vue';
import MessagesList from './MessagesList.vue';
import MessageOutput from './MessageOutput.vue';
import TheMenuBurger from './TheMenuBurger.vue';

export default defineComponent({
  name: 'Conversation',
  data() {
    return {
      menuVisible: false,
      menuOptions: [
        { action: 'add_participant_conversation', label: 'Добавить участников разговора' },
        { action: 'del_participant_conversation', label: 'Удалить участников разговора' }
      ],
    }
  },
  methods: {
    triggerMenu() {
      this.menuVisible = !this.menuVisible;
    },
    hideMenu() {
      this.menuVisible = false;
    }
  },
  components: {
    Loader,
    MessagesList,
    MessageOutput,
    TheMenuBurger
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
    
    const messages = computed(() => {
      let sortMessages = store.getters.getSortedConversationMessages(conversationId?.value)
      return sortMessages;
    });

    const sendMessage = message => {
      const messageOutput = {
        conversation_id: conversationId.value,
        message_text: message.text,
        message_type: message.type || 'message'
      };
      if (message.recipients) {
        messageOutput.recipients = `[${message.recipients.map(r => `"${r}"`).join(',')}]`;
      }
      store.dispatch('sendMessage', messageOutput);
    };
    return {
      conversationId,
      isLoaded,
      conversation,
      sendMessage,
      messages
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
    height: $header-height-main;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: $color-secondary;
    box-sizing: border-box;
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

  &__column--menu {
    overflow: visible;
  }

  &__image {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
  }

  &__name {
    font-size: $font-size-h2;
    color: $font-color-secondary;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    min-height: 3rem;
    border-top: 1px solid $color-border;
    margin-top: auto;
    flex-shrink: 0;
  }
}
</style>
