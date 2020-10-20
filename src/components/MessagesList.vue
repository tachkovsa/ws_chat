<template>
  <section class="messages-list">
    <div
      class="messages-list__item"
      v-for="(message, index) of messages"
      :key="message.id"
      v-bind:class="{
        'messages-list__item--no-margin-top': isSameAuthor(messages[index - 1], message)
      }"
    >
      <MessagesListItem
        :message="message"
        :userId="userId"
        :sameAuthor="isSameAuthor(messages[index - 1], message)"
      />
    </div>
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
    messages: Array
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    const userId = computed(() => store.getters.getCurrentUserId);
    const messages = ref([]);

    const isSameAuthor = (previous, current) => previous?.sender?.id === current?.sender?.id;

    watch(
      () => props.messages,
      (first, second) => (messages.value = first)
    );

    return {
      messages,
      userId,
      isSameAuthor
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

  &__item {
    padding-left: 1rem;
    padding-right: 1rem;

    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    &--no-margin-top {
      margin-top: -0.5rem;
    }
  }
}
</style>
