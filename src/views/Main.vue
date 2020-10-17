<template>
  <main class="chat-app">
    <section class="chat-app__left-side">
      <Header />
      <ConversationsList />
    </section>
    <section class="chat-app__right-side">

    </section>
  </main>
</template>

<script>
import {
  defineComponent, onBeforeMount, onMounted, reactive, ref,
} from 'vue';

import ConversationsList from '@/components/ConversationsList.vue';
import Header from '@/components/Header.vue';
import { useStore } from '../store';

export default defineComponent({
  name: 'Main',
  components: {
    Header,
    ConversationsList,
  },
  setup(props, context) {
    // const state = reactive({
    //   connection: ref(),    // WebSocket
    //   originUrl: ref(""),
    //   isLoading: ref(false),
    //   isConnected: ref(false),
    // });

    // const store = useStore();

    // function connect(wsUrl) {
    //   return new WebSocket(wsUrl);
    // }

    // function fetchConversations() {
    //   store.dispatch('fetchConversations', state.connection);
    // }

    // onBeforeMount(() => {
    //   const url = window.location.href;
    //   state.originUrl = new URL(url).origin;
    // });

    // onMounted(() => {
    //   const wsUrl = state.originUrl.replace(/(http)(s)?\:\/\//, "ws$2://");
    //   state.connection = connect(`${wsUrl}/services/chat_ws_service`);

    //   state.connection.onopen = (event) => {
    //     state.isConnected = true;
    //     fetchConversations();
    //   };

    //   state.connection.onmessage = (event) => {
    //     store.dispatch('processWsMessage', event);
    //   }

    //   state.connection.onclose = (event) => {
    //     state.isConnected = false;
    //   }
    // });

    // return {
    //   state,
    //   store,
    //   connect,
    //   fetchConversations
    // }
  },
});
</script>

<style lang="scss">
.chat-app {
  $chat-app: &;

  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 0.25rem;

  @include media(">=desktop") {
    min-width: 1024px;
    max-width: 1200px;
    height: 90%;
    border: 1px solid $color-border;
  }

  &__left-side {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-right: 1px solid $color-border;

    @include media(">=tablet") {
      width: 30%;
    }
  }

  &__right-side {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
}
</style>
