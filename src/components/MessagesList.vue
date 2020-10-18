<template>
  <section class="messages-list">
    <MessagesListItem v-for="message of messages" :key="message.id" :message="message" />
  </section>
</template>

<script>
import { computed, defineComponent, watch, ref } from "vue";
import { useStore } from "../store";
import { useRouter } from "../router";

import Loader from "./Loader";
import MessagesListItem from "./MessagesListItem.vue";

export default defineComponent({
  name: "MessagesList",
  components: {
    Loader,
    MessagesListItem
  },
  props: {
    messages: []
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    const messages = ref([]);

    watch(
      () => props.messages,
      (first, second) => (messages.value = first)
    );

    return {
      messages
    };
  }
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
}
</style>
