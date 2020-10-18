<template>
  <section class="conversation">
    <div class="conversation__loader" v-if="!isLoaded && conversation">
      <Loader />
    </div>
    
  </section>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import { useStore } from "../store";
import Loader from './Loader.vue';

export default defineComponent({
  name: "Conversation",
  components: {
    Loader
  },
  setup(props, context) {
    const store = useStore();
    const isLoaded = computed(() => store.getters.getConversationLoading);

    // TODO: Need ref, I think
    const conversation = ref(null);
    const conversationId = computed(() => {
      const id = useRoute().params.id;
      conversation.value = store.getters.getConversationById(id);
      return id;
    });

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
      conversation
    };
  }
});
</script>

<style></style>
