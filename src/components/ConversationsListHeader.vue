<template>
  <div class="conversations-list-header">
    <div class="conversations-list-header__column">
      <!-- <div class="conversations-list-user-image" style="background-image: url('/person_icon.html?id=1105387902724063510&type=200x200')"></div> -->
    </div>
    <div class="conversations-list-header__column">
      <h2 class="control-box_header">{{ conversationsListHeader }}</h2>
      <!-- <span class="conversations-list-user-name">Анисимов Геннадий Федорович</span> -->
    </div>
    <div class="conversations-list-header__column">
      <div class="conversation-menu-btn" v-click-outside="hideMenu" @click.stop="showMenu">
        <ul class="conversation-menu" v-if="isMenuVisible">
          <li class="conversation-menu__item conversation-menu__item--essential" action="">
            Анисимов Геннадий Федорович
          </li>
          <li class="conversation-menu__item" action="chat" style="display: none;">
            Мои разговоры
          </li>
          <li class="conversation-menu__item" action="requests">Разговоры по заявкам</li>
          <li class="conversation-menu__item" action="go_home">Вернуться на главную</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuVisible: false
    }
  },
  computed: {
    conversationsListHeader() {
      return this.$store.getters.getConversationsHeader
    }
  },
  methods: {
    showMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    hideMenu() {
      this.isMenuVisible = false;
    }
  }
}
</script>

<style scoped lang="scss">
.conversations-list-header {
  display: flex;
  flex-direction: row;
  height: $header-height-main;
  box-sizing: border-box;
  background-color: $color-primary;
  border-top-left-radius: 0.5rem;

  &__column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;

    &:first-child {
      display: none;
    }

    &:nth-child(2) {
      flex-grow: 9.2;
      width: 0px;

      .control-box_header {
        margin-left: 1.2rem;
        color: $font-color-space;
        font-size: $font-size-h2;
        font-weight: normal;
      }
    }

    &:last-child {
      margin: 0 1rem;

      .conversation-menu-btn {
        @extend %menu__button_hamburger;

        &:hover {
          cursor: pointer;
          background-image: $bg-image-menu-hover;
        }
      }
    }

    .conversation-menu {
      position: absolute;
      left: -10rem;
      width: 12.5rem;
      margin: 0;
      padding: 0;
      background-color: $bg-color-header-menu;
      border: 1px solid $border-color-header-menu;
      list-style: none;
      overflow: hidden;
      border-radius: .5rem;
      z-index: 100;
      @include box-shadow(0 2px 4px rgba(#000000, 0.2));

      &__item {
        font-size: $font-size-small;
        padding: 0.5rem;
      }

      &__item:hover {
        background-color: #f0f2fc;
      }      

      &__item--essential {
        padding: 0.9rem 1rem;
        border-bottom: 1px solid #eeeeee;
        color: $color-primary;
      }      
    }
  }
}
</style>
