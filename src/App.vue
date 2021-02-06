<template>
  <router-view/>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, reactive, ref, watch, computed, provide } from 'vue';
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup(props, context) {
    provide('$window', window);

    const store = useStore();

    const state = reactive({
      connection: ref(store.getters.getConnection), // WebSocket
      originUrl: ref(''),
      isLoading: ref(false),
      isConnected: computed(() => store.getters.getConnectionState),
    });

    watch(
      () => state.isConnected,
      (current, previous) => {
        if (current && !previous) {
          fetchConversations();
        }
      }
    );

    function connect(url) {
      store.dispatch('connect', { url });
    }

    function fetchConversations() {
      store.dispatch('fetchConversations');
    }

    onBeforeMount(() => {
      const url = window.location.href;
      state.originUrl = new URL(url).origin;
    });

    onMounted(() => {
      const wsUrl = state.originUrl.replace(/(http)(s)?\:\/\//, 'ws$2://');
      connect(`${wsUrl}/services/chat_ws_service`);

      // state.connection.onopen = (event) => {
      //   state.isConnected = true;
      //   fetchConversations();
      // };

      // state.connection.onmessage = (event) => {
      //   store.dispatch('handleWebSocket', event);
      // };

      // state.connection.onclose = (event) => {
      //   state.isConnected = false;
      // };
    });

    return {
      state,
      store,
      connect,
      fetchConversations,
    };
  },
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
