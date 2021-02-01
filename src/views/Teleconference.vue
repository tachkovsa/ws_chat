<template>
  <main class="teleconference-app">
    <section class="teleconference-app__broadcasts">
      <Broadcasts />
    </section>
    <section class="teleconference-app__chat">
      <Conversation />
    </section>
  </main>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from "vue";

import Conversation from "@/components/Conversation.vue";
import Broadcasts from "@/components/broadcasts/Broadcasts.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "Teleconference",
  components: {
    Broadcasts,
    Conversation
  },
  setup(props, context) {

  }
});
</script>

<style lang="scss">
.teleconference-app {
  $teleconference-app: &;

  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 0.25rem;

  @include media(">=desktop") {
    width: 90%;
    height: 90%;
    border: 1px solid $color-border;
  }

  &__broadcasts {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-right: 1px solid $color-border;

    @include media(">=tablet") {
      width: 70%;
      max-width: 70%;
    }
  }

  &__chat {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    @include media(">=tablet") {
      width: 30%;
      max-width: 30%;
    }
  }
}
</style>
