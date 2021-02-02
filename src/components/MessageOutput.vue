<template>
  <!-- TODO: Recipients list -->
  <!-- TODO: Files list with preview -->
  <section class="output-message">
    <!-- <section class="files">
      files...
    </section> -->
    <form class="output" @submit.prevent="submitForm($event)" ref="form">
      <label class="attach-file">
        <input type="file" class="attach-file__input" mulitple name="file" ref="fileInput" />
        <svg width="21" height="21" class="attach-file__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#101820"
            d="M14,31a6,6,0,0,1-6-6V9A8,8,0,0,1,24,9V28a1,1,0,0,1-2,0V9A6,6,0,0,0,10,9V25a4,4,0,0,0,8,0V10a2,2,0,0,0-4,0V23a1,1,0,0,1-2,0V10a4,4,0,0,1,8,0V25A6,6,0,0,1,14,31Z"
          />
        </svg>
      </label>
      <textarea class="output__text" name="text" v-model="message.text" />
      <button class="output__submit" type="submit">
        <svg width="21" height="21" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            fille="#101820"
            d="M28.11,13.32,2.13,2.1,7.44,14.85a3.05,3.05,0,0,1,0,2.3L2.13,29.88l26-11a3,3,0,0,0,0-5.51ZM27.31,17,5.87,26.12l3.41-8.2A4.42,4.42,0,0,0,9.56,17H20V15H9.56a4.42,4.42,0,0,0-.28-.92L5.87,5.9l21.45,9.25a1,1,0,0,1,.6.92A1,1,0,0,1,27.31,17Z"
          />
        </svg>
      </button>
    </form>
  </section>
</template>

<script>
import { computed, defineComponent, watch, ref, reactive, onMounted } from "vue";

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
.output-message {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

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
    // width: 100%;
    // height: 100%;

    & > path {
      fill: $font-color-dark;
    }
  }
}
</style>
