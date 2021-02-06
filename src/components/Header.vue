<template>
  <ConversationsListHeader />
  <div class="header">
    <div class="header__search">
      <input class="header__input" type="text" placeholder="Поиск" />
    </div>
  </div>
</template>

<script>
import ConversationsListHeader from './ConversationsListHeader.vue';

export default {
  components: {
    ConversationsListHeader
  }
}
</script>

<style scoped lang="scss">
.header {
  $header: &;

  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  height: 2.8rem;
  background-color: $color-backdrop;
  border-bottom: 1px solid $color-border;

  &__search {
    height: 100%;
    display: flex;
    flex-grow: 1;
    color: $font-color-secondary;
    font-size: $font-size-base;
    box-sizing: border-box;
    position: relative;

    #{$header}__input {
      flex-grow: 1;
      font-size: 1rem;
      border: none;
      outline: none;
      box-sizing: border-box;
      padding: .5rem 3.6rem .5rem 1rem;
      transition: all .3s ease-out;
      background-size: 2rem;
      background-position-x: calc(100% - 1rem);
      background-position-y: center;
      background-repeat: no-repeat;
      color: $font-color-secondary;
      background-color: $color-secondary;
      border-bottom: 1px solid $color-secondary;

      @include input-placeholder { 
        color: $font-color-secondary;
        font-size: 0.9rem;
      };

      &:focus {
        background-color: $bg-color-input-focused;
        color: $font-color-input-unfocused;
      }
    }

    &-icon {
      position: absolute;
      width: 0.8rem;
      left: 0.5rem;
      top: 0.25rem;
    }
  }

  &__menu {
    display: flex;
    width: 1rem;
    justify-content: flex-end;

    &:hover {
      cursor: pointer;
    }

    &-icon {
      transform: rotate(90deg);
    }
  }
}
</style>
