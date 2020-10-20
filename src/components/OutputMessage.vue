<template>
  <!-- TODO: Recipients list -->
  <!-- TODO: Files list with preview -->
  <form class="output" @submit.prevent="submitForm($event)" ref="form">
    <label class="attach-file">
      <input type="file" class="attach-file__input" name="file" />
      <svg class="attach-file__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#101820"
          d="M14,31a6,6,0,0,1-6-6V9A8,8,0,0,1,24,9V28a1,1,0,0,1-2,0V9A6,6,0,0,0,10,9V25a4,4,0,0,0,8,0V10a2,2,0,0,0-4,0V23a1,1,0,0,1-2,0V10a4,4,0,0,1,8,0V25A6,6,0,0,1,14,31Z"
        />
      </svg>
    </label>
    <textarea class="output__text" name="text" v-model="message.text" />
    <button class="output__submit" type="submit">
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#101820"
          d="M19.47,31a2,2,0,0,1-1.8-1.09l-4-7.57a1,1,0,0,1,1.77-.93l4,7.57L29,3.06,3,12.49l9.8,5.26,8.32-8.32a1,1,0,0,1,1.42,1.42l-8.85,8.84a1,1,0,0,1-1.17.18L2.09,14.33a2,2,0,0,1,.25-3.72L28.25,1.13a2,2,0,0,1,2.62,2.62L21.39,29.66A2,2,0,0,1,19.61,31Z"
        />
      </svg>
    </button>
  </form>
</template>

<script>
import { computed, defineComponent, watch, ref, reactive } from "vue";

export default defineComponent({
  name: "OutputMessage",
  props: {},
  setup(props, context) {
    const form = ref(null);

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

    return {
      form,
      submitForm,
      message
    };
  }
});
</script>

<style scoped lang="scss">
.output {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;

  &__text {
    display: flex;
    border: 1px solid $color-border;
    outline: none;
    border-radius: 0.25rem;
    margin: 0 0.5rem;
    width: 100%;
    font-size: inherit;
    font-family: inherit;
    resize: none;
    padding: 0.25rem 0.5rem;
    height: 2rem;
    box-sizing: border-box;
  }

  &__submit {
    border: none;
    outline: none;
    background: none;
    width: 2.3rem;

    svg > path {
      fill: $font-color-light;

      &:not(:disabled) {
        fill: $color-primary;
      }
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

    #{$attach-file}__icon {
      & > path {
        fill: $font-color-main;
      }
    }
  }

  &__icon {
    width: 100%;
    height: 100%;

    & > path {
      fill: $font-color-dark;
    }
  }
}
</style>
