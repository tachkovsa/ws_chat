<template>
  <main class="chat-app">
    <section class="chat-app__left-side">
      <Header />
      <ConversationsList />
    </section>
    <section class="chat-app__right-side">
      <router-view />
    </section>
    <button class="btn-go-to-teleconference" @click="goToTeleconference">Teleconference</button>
  </main>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue';

import ConversationsList from '@/components/ConversationsList.vue';
import Header from '@/components/Header.vue';
import { useStore } from '../store';

export default defineComponent({
  name: 'Main',
  components: {
    Header,
    ConversationsList
  },
  methods: {
    goToTeleconference() {
      const routConversation = this.$store.state.config.user.conversation_id;
      this.$router.push('/teleconference/' + routConversation);
    }
  },
  // setup(props, context) {
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
  // }
});
</script>

<style lang="scss">
.chat-app {
  $chat-app: &;

  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 0.25rem;

  @include media('>=desktop') {
    width: 90%;
    height: 90%;
    border: 1px solid $color-border;
  }

  &__left-side {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-right: 1px solid $color-border;

    @include media('>=tablet') {
      width: 30%;
      max-width: 30%;
    }
  }

  &__right-side {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    @include media('>=tablet') {
      width: 70%;
      max-width: 70%;
    }
  }
}
.btn-go-to-teleconference {
  display: block;
  position: absolute;
  right: 10rem;
  bottom: 5rem;
  height: 3rem;
  line-height: 3em;
  background-color: $color-primary;
  color: $font-color-space;
  text-align: center;
}
</style>
