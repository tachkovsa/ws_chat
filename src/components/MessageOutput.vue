<template>
  <!-- TODO: Recipients list -->
  <!-- TODO: Files list with preview -->
  <section class="message-output">
    <!-- <section class="files">
      files...
    </section> -->
    <form class="output" @submit.prevent="submitForm($event)" ref="form">
      <textarea class="output__text" name="text" v-model="message.text" />
      <label class="attach-file">
        <input type="file" class="attach-file__input" mulitple name="file" ref="fileInput" />
        <div class="attach-file__icon"></div>
      </label>
      <button class="output__submit" type="submit" :disabled="!message.text"></button>
    </form>
  </section>
</template>

<script>
import { computed, defineComponent, watch, ref, reactive, onMounted } from 'vue';

export default defineComponent({
  name: "MessageOutput",
  props: {},
  setup(props, context) {
    const form = ref(null);
    const fileInput = ref(null);

    const message = reactive({
      text: ""
    });

    const submitForm = $event => {
      context.emit("sendMessage", message);
      clearForm();
    };

    const clearForm = () => {
      form.value.reset();
    };

    onMounted(() => {
      
    });

    return {
      form,
      submitForm,
      message
    };
  }
});
</script>

<style scoped lang="scss">
@mixin bg-image() {
  border: none;
  outline: none;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.message-output {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.output {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 1rem;

  &__text {
    display: flex;
    width: 100%;
    padding: 0.5rem;
    margin: 0 0.5rem 0 0;
    min-height: 3rem;
    max-height: 7rem;
    resize: vertical;
    font-size: inherit;
    font-family: inherit;
    outline: none;
    border: 1px solid $color-border;
    border-radius: 0.25rem;
    background-color: transparent;
    box-sizing: border-box;
  }

  &__submit {
    display: flex;
    height: 1.8rem;
    width: 1.8rem;
    background-image: $bg-image-send-message;
    @include bg-image();

    &:not(:disabled) {
      background-image: $bg-image-send-message-not-disabled;
    }

    &:hover {
      cursor: pointer;
    }
  }
}

.attach-file {
  $attach-file: &;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;

  &__input {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  &:hover {
    &:not(:disabled) {
      cursor: pointer;
    }
  }

  &__icon {
    display: flex;
    height: 2rem;
    width: 2rem;
    background-image: $bg-image-attach-file;
    @include bg-image();
  }
}
</style>
