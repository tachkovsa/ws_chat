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
            <div class="conversation__last-message-date">{{ conversation.lastUnreadMessageDate }}</div>
            <div class="conversation__unread-messages-count">{{ conversation.unreadMessageCount }}</div>
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
  filters: {
    moment: (date) => moment(date),
  },
});
</script>

<style scoped lang="scss">
.conversation {
    display: flex;
    box-sizing: border-box;

    &__column {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;

        &--no-shrink {
            flex-shrink: 0;
        }

        // TODO: Нужно переделать на CSS Grid - flex-grow криво работает
        &:nth-child(1) {
            flex-grow: 1;
        }

        &:nth-child(2) {
            flex-grow: 6;
        }

        &:nth-child(3) {
            flex-grow: 3;
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
        color: $color-primary;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__last-message- {
        &text {
            font-size: $font-size-small;
        }

        &date {
            font-size: $font-size-small;
        }
    }
}
</style>
