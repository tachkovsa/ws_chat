<template>
  <div
    class="message"
    v-bind:id="'message_' + message.id"
    v-bind:class="{
      'message--is-own': isOwn,
      'message--same-author': sameAuthor,
      'message--system': isSystem
    }"
  >
    <div
      class="message__icon"
      v-if="!isSystem"
      v-bind:style="{ 'background-image': 'url(' + message.sender?.iconUrl + ')' }"
    ></div>
    <div class="message__info">
      <div class="message__header" v-if="!isSystem">
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
        <div
          class="message__images"
          v-if="imagesForDisplay.length > 0"
          v-bind:class="{
            'message__images--wo-text': !message.hasText,
            'message__images--1': imagesForDisplay.length === 1,
            'message-images--3': imagesForDisplay.length === 3
          }"
        >
          <div
            class="file"
            v-for="(image, index) of imagesForDisplay"
            :key="image.id"
            v-bind:class="'file--img'"
          >
            <img class="file__image" v-bind:src="image.url" />
            <div v-if="index === 3 && moreThanFourImages" class="file__cover">
              <div class="file__more">+{{ images.length - imagesForDisplay.length }}</div>
            </div>
          </div>
        </div>
        <div class="message__files"></div>
        <div class="message__text" v-if="message.hasText" v-html="message.text"></div>
        <!-- message buttons -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watch, ref, onMounted } from 'vue';
import moment from 'moment';

import { Message } from '../models/message.model';

export default defineComponent({
  name: 'MessagesListItem',
  components: {},
  props: {
    isLast: Boolean,
    message: Object,
    userId: String,
    sameAuthor: Boolean
  },
  setup(props, context) {
    const isLast = props?.isLast || false;
    const message = props?.message;
    const userId = props?.userId;
    const sameAuthor = props?.sameAuthor;

    const isOwn = computed(() => message.sender?.id === userId);
    const isSystem = computed(() => message.typeId === 'system');

    const messageDate = computed(() => {
      if (!message.createDate) {
        return '';
      }

      let resultFormat = 'DD.MM.YYYY hh:mm';
      const now = moment(new Date());
      const messageDate = moment(message.createDate);

      if (messageDate.year() === now.year()) {
        if (messageDate.month() === now.month() && messageDate.day() === now.day()) {
          resultFormat = 'hh:mm';
        } else {
          resultFormat = 'DD.MM hh:mm';
        }
      }

      return messageDate.format(resultFormat);
    });

    const images = message.files.filter(f => f.type === 'img');
    const imagesForDisplay = images.slice(0, 4);
    const moreThanFourImages = images.length > 4;

    const files = message.files.filter(f => f.type !== 'img');

    onMounted(() => {
      if (isLast) {
        context.emit('lastMessageRendered', message.id);
      }
    });

    return {
      message,
      isOwn,
      sameAuthor,
      messageDate,
      isSystem,
      images,
      moreThanFourImages,
      imagesForDisplay
    };
  }
});
</script>

<style scoped lang="scss">
.message {
  $message: &;

  display: flex;
  box-sizing: border-box;

  @include media('<tablet') {
    max-width: 85%;
  }

  @include media('>=tablet') {
    max-width: 65%;
  }

  @include media('>=desktop') {
    max-width: 50%;
  }

  &:hover {
    #{$message}__menu {
      visibility: visible;
    }
  }

  &--system {
    margin-left: auto;
    margin-right: auto;

    color: $font-color-secondary;
  }

  &--is-own {
    flex-direction: row-reverse;
    margin-left: auto;

    #{$message}__icon {
      display: none;
    }

    #{$message}__body {
      background-color: #ffffff;
    }

    #{$message}__info {
      margin-left: 0;
      // margin-right: 0.5rem;
    }

    #{$message}__header {
      flex-direction: row-reverse;
    }

    #{$message}__owner {
      display: none;
    }

    #{$message}__date {
      margin-right: 0;
    }

    #{$message}__menu {
      margin-left: 0;
      margin-right: auto;
    }
  }

  &--same-author {
    #{$message}__header {
      display: none;
    }
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
    padding: 0.143rem;
    // padding: 0.8rem 1rem;
    border-radius: 0.5rem;
    background-color: $color-space;
  }

  &__text {
    font-size: $font-size-smaller;
    // padding: 0.8rem 1rem;
    padding: 0.571rem;
  }

  &__images {
    display: grid;
    grid-template-columns: minmax(0, 7.6rem) minmax(0, 7.6rem);
    grid-gap: 0.143rem;

    &--1 {
      grid-template-columns: calc(7.6rem * 2);
      grid-row: calc(7.6rem * 2);
      grid-gap: 0;

      div.file--img {
        width: calc(7.6rem * 2);
        height: calc(7.6rem * 2);
      }
    }

    &--3 {
      grid-row: 2 / 1;

      div.file--img:nth-child(3) {
        width: calc(7.6rem * 2);
        height: calc(7.6rem * 2);
      }
    }

    &--wo-text {
      margin-bottom: 0;
    }

    .file {
      display: flex;
      position: relative;

      &:hover {
        cursor: pointer;
      }

      &__more {
        position: absolute;
        z-index: 2;
      }

      &__cover {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        font-size: $font-size-biggest;
        color: $font-color-space;
        width: 100%;
        height: 100%;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: $font-color-dark;
          opacity: 0.5;
          z-index: 1;
        }
      }

      &--img {
        width: 7.6rem;
        height: 7.6rem;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 0.5rem;
        // margin: 0.143rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
