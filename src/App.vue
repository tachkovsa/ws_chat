<template>
  <router-view/>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup(props, context) {
    const state = reactive({
      connection: ref(),    // WebSocket
      originUrl: ref(""),
      isLoading: ref(false),
      isConnected: ref(false),
    });

    const store = useStore();

    function connect(wsUrl) {
      return new WebSocket(wsUrl);
    }

    function fetchConversations() {
      store.dispatch('fetchConversations', state.connection);
    }

    onBeforeMount(() => {
      const url = window.location.href;
      state.originUrl = new URL(url).origin;
    });

    onMounted(() => {
      const wsUrl = state.originUrl.replace(/(http)(s)?\:\/\//, "ws$2://");
      state.connection = connect(`${wsUrl}/services/chat_ws_service`);

      state.connection.onopen = (event) => {
        state.isConnected = true;
        fetchConversations();
      };

      state.connection.onmessage = (event) => {
        store.dispatch('handleWebSocket', event);
      }

      state.connection.onclose = (event) => {
        state.isConnected = false;
      }
    });

    return {
      state,
      store,
      connect,
      fetchConversations
    }
  }
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
