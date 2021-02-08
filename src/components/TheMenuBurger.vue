<template>
  <div class="conversation-menu-btn-outside">
    <div class="conversation-menu-btn" v-click-outside="hideMenu" @click.self="triggerMenu">
      <ul class="conversation-menu" v-if="menuBurgerVisible">
        <slot></slot>
        <li
          class="conversation-menu__item"
          v-for="option in menuBurgerOptions"
          :key="option.action"
          @click="selectMenuOption(option.action)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['menuBurgerMode', 'menuBurgerVisible', 'menuBurgerOptions'],
  emits: ['trigger-menu-burger', 'hide-menu-burger', 'select-menu-burger-option'],
  data() {
    return {
      menuMode: this.menuBurgerMode
    };
  },
  methods: {
    triggerMenu() {
      this.$emit('trigger-menu-burger');
    },
    hideMenu() {
      this.$emit('hide-menu-burger');
    },
    selectMenuOption(mode) {
      this.$emit('select-menu-burger-option', mode);
    }
  }
};
</script>

<style scoped lang="scss">
.conversation-menu-btn {
  @extend %menu__button_hamburger;

  &:hover {
    cursor: pointer;
    background-image: $bg-image-menu-hover;
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
    border-radius: 0.5rem;
    z-index: 100;
    @include box-shadow(0 2px 4px rgba(#000000, 0.2));

    &__item {
      font-size: $font-size-small;
      padding: 0.6rem;
    }

    &__item:hover {
      background-color: #f0f2fc;
    }
  }
}
</style>
