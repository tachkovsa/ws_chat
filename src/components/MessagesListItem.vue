<template>
  <div class="message">
    {{ message.text }}
  </div>
</template>

<script>
import { computed, defineComponent, watch, ref } from "vue";

import { Message } from '../models/message.model';

export default defineComponent({
  name: "MessagesListItem",
  components: {
  },
  props: {
    message: Object
  },
  setup(props, context) {
    const message = props?.message;

    return {
      message
    }
  }
});
</script>

<style></style>
