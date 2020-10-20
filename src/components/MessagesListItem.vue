<template>
  <div class="message"
    v-bind:class="{
        'message--is-own': isOwn,
        'message--same-author': sameAuthor
    }">
    <div class="message__icon" v-bind:style="{ 'background-image': 'url(' + message.sender?.iconUrl + ')' }"></div>
    <div class="message__info">
      <div class="message__header">
        <div class="message__owner">{{ message.sender?.dispName }}</div>
        <div class="message__date">{{ messageDate }}</div>
        <div class="message__menu">
          <svg
            class="message__menu-icon"
            width="14"
            height="4"
            viewBox="0 0 14 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="2" r="1.5" fill="#BDC6E0" />
            <circle cx="2" cy="2" r="1.5" fill="#BDC6E0" />
            <circle cx="12" cy="2" r="1.5" fill="#BDC6E0" />
          </svg>
        </div>
      </div>
      <div class="message__body">
        <div class="message__text">{{ message.text }}</div>
        <!-- message buttons -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watch, ref } from "vue";
import moment from "moment";

import { Message } from "../models/message.model";

export default defineComponent({
  name: "MessagesListItem",
  components: {},
  props: {
    message: Object,
    userId: String,
    sameAuthor: Boolean
  },
  setup(props, context) {
    const message = props?.message;
    const userId = props?.userId;
    const sameAuthor = props?.sameAuthor;

    const isOwn = computed(() => message.sender?.id === userId);

    const messageDate = computed(() => {
      if (!message.createDate) {
        return "";
      }

      let resultFormat = "DD.MM.YYYY hh:mm";
      const now = moment(new Date());
      const messageDate = moment(message.createDate);

      if (messageDate.year() === now.year()) {
        if (messageDate.month() === now.month() && messageDate.day() === now.day()) {
          resultFormat = "hh:mm";
        } else {
          resultFormat = "DD.MM hh:mm";
        }
      }

      return messageDate.format(resultFormat);
    });

    return {
      message,
      isOwn,
      sameAuthor,
      messageDate,
    };
  }
});
</script>

<style scoped lang="scss">
.message {
  $message: &;

  display: flex;

  &:hover {
    #{$message}__menu {
      visibility: visible;
    }
  }

  &--is-own {
    flex-direction: row-reverse;

    #{$message}__icon { display: none; }

    #{$message}__body {
      background-color: #FFFFFF;
    }

    #{$message}__info {
      margin-left: 0;
      // margin-right: 0.5rem;
    }

    #{$message}__header {
      flex-direction: row-reverse;
    }

    #{$message}__owner { display: none; }

    #{$message}__date { margin-right: 0; }

    #{$message}__menu {
      margin-left: 0;
      margin-right: auto;
    }
  }

  &--same-author {
    #{$message}__header { display: none; }
  }
  
  &__icon {
    display: flex;
    flex-shrink: 0;
    
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
  }

  &__info {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
  }

  &__header {
    display: flex;
    font-size: $font-size-smaller;
  }

  &__owner {
    color: $font-color-dark;
  }

  &__date {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: $font-color-light;
  }

  &__menu {
    visibility: hidden;
    margin-left: auto;
    cursor: pointer;

    &-icon {
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    border: 1px solid $color-space;
    margin-top: 0.25rem;
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
    background-color: $color-space;
  }

  &__text {
    font-size: $font-size-small;
  }
}
</style>
