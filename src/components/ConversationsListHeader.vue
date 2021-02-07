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
        :menu-burger-visible="menuVisible"
        :menu-burger-options="menuOptions"
        @trigger-menu-burger="triggerMenu"
        @hide-menu-burger="hideMenu"
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
      menuVisible: false,
      menuOptions: [
        { action: 'chat', label: 'Мои разговоры' }, 
        { action: 'requests', label: 'Разговоры по заявкам' },
        { action: 'go_home', label: 'Вернуться на главную' }
      ],
    }
  },
  methods: {
    triggerMenu() {
      this.menuVisible = !this.menuVisible;
    },
    hideMenu() {
      this.menuVisible = false;
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
