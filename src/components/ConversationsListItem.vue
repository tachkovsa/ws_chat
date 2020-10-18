<template>
    <div class="conversation">
        <div class="conversation__column conversation__column--no-shrink">
            <div class="conversation__image" v-bind:style="{ 'background-image': 'url(' + conversation.iconUrl + ')' }"></div>
        </div>
        <div class="conversation__column">
            <div class="conversation__name">{{ conversation?.name }}</div>
            <div class="conversation__last-message-text">{{ conversation.lastUnreadMessage ? conversation.lastUnreadMessage : 'В этом разговоре пока нет сообщений' }}</div>
        </div>
        <div class="conversation__column">
            <div class="conversation__last-message-date">{{ lastUnreadMessageDate }}</div>
            <div class="conversation__unread-messages-count" v-if="unreadMessageCount !== ''">{{ unreadMessageCount }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import moment from 'moment';

export default defineComponent({
  name: 'ConversationsListItem',
  props: {
    conversation: Object,
  },
  setup(props, context) {
    const conversation = props?.conversation;
  },
  computed: {
    unreadMessageCount() {
      const count = this.conversation.unreadMessageCount;
      
      if (count === 0) {
        return '';
      } else if (count > 99) {
        return '99+';
      } else {
        return '' + count;
      }
    },
      lastUnreadMessageDate() {
        if (!this.conversation.lastUnreadMessageDate) {
          return '';
        }

        let resultFormat = 'DD.MM.YYYY';
        const now = moment(new Date());
        const messageDate = moment(this.conversation.lastUnreadMessageDate);

        if (messageDate.year() === now.year()) {
          if (
            messageDate.month() === now.month()
            && messageDate.day() === now.day()
          ) {
            resultFormat = 'hh:mm';
          } else {
            resultFormat = 'DD.MM';
          }
        }

        return moment(this.conversation.lastUnreadMessageDate).format(resultFormat);
      }
  },
});
</script>

<style scoped lang="scss">
.conversation {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;

    &__column {
        box-sizing: border-box;
        overflow: hidden;

        &--no-shrink {
            flex-shrink: 0;
        }

        &:nth-child(1) {
          width: 2rem;
        }

        &:nth-child(2) {
          width: 100%;
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }

        &:nth-child(3) {
          flex-shrink: 0;
          min-width: 2rem;
          max-width: 4rem;
        }
    }

    &__image {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
    }

    &__name {
        font-size: $font-size-base;
        color: $font-color-main;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__last-message- {
        &text {
            font-size: $font-size-small;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          color: $font-color-main;
          margin-top: 0.25rem;
        }

        &date {
            font-size: $font-size-smaller;
            text-align: right;
            color: $font-color-secondary;
        }
    }

    &__unread-messages-count {
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $color-primary;
      color: $font-color-space;
      margin-left: auto;
      font-size: $font-size-smallest;
      box-sizing: border-box;
      width: $font-size-big;
      height: $font-size-big;
      border-radius: 50%;
    }
}
</style>
