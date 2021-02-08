<template>
  <div class="conversations-list-header">
    <div class="conversations-list-header__column">
      <!-- <div class="conversations-list-user-image" style="background-image: url('/person_icon.html?id=1105387902724063510&type=200x200')"></div> -->
    </div>
    <div class="conversations-list-header__column">
      <h2 class="control-box_header">{{ header }}</h2>
      <!-- <span class="conversations-list-user-name">Анисимов Геннадий Федорович</span> -->
    </div>
    <div class="conversations-list-header__column">
      <the-menu-burger
        :menu-burger-mode="menuMode"
        :menu-burger-visible="menuVisible"
        :menu-burger-options="menuOptions"
        @trigger-menu-burger="triggerMenu"
        @hide-menu-burger="hideMenu"
        @select-menu-burger-option="selectMenuOption"
      >
        <template v-slot:default>
          <li class="conversation-menu__item conversation-menu__item--essential">{{ userFullName }}</li>
        </template>
      </the-menu-burger>
    </div>
  </div>
</template>

<script>
import TheMenuBurger from './TheMenuBurger.vue';

export default {
  components: {
    TheMenuBurger
  },
  data() {
    return {
      header: 'Мои разговоры',
      userFullName: 'Анисимов Геннадий Федорович',
      menuMode: 'chat',
      menuVisible: false,
      menuOptionsInit: [
        { action: 'chat', label: 'Мои разговоры' }, 
        { action: 'request', label: 'Разговоры по заявкам' },
        { action: 'go_home', label: 'Вернуться на главную' }
      ],
    }
  },
  computed: {
    menuOptions() {
      return this.menuOptionsInit.filter(option => option.action !== this.menuMode);
    }
  },
  methods: {
    triggerMenu() {
      this.menuVisible = !this.menuVisible;
    },
    hideMenu() {
      this.menuVisible = false;
    },
    selectMenuOption(mode) {
      this.menuMode = mode;
      if (mode === 'request') { 
        // this.$store.dispatch('setHeaderSearchVisible', false);
        this.$store.dispatch('fetchConversations', mode);
      } else {
        // this.$store.dispatch('setHeaderSearchVisible', true);
        this.$store.dispatch('fetchConversations');
      }
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

      .conversation-menu__item--essential {
        padding: 0.9rem 1rem;
        border-bottom: 1px solid #eeeeee;
        color: $color-primary;
      }
    }
  }
}
</style>
