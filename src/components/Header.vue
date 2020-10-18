<template>
  <div class="header">
    <div class="header__search">
      <input class="header__input" type="text" placeholder="Поиск" />
      <svg
        class="header__search-icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
          stroke="#8C98B5"
          stroke-width="2"
        />
        <path d="M15 15L12 12" stroke="#8C98B5" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
    <div class="header__menu">
      <svg
        class="header__menu-icon"
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
</template>

<style scoped lang="scss">
.header {
  $header: &;

  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  height: $header-height;
  background-color: $color-backdrop;
  border-bottom: 1px solid $color-border;
  padding: 0.5rem 1rem;

  &__search {
    display: flex;
    flex-grow: 1;
    color: $font-color-secondary;
    font-size: $font-size-base;
    box-sizing: border-box;
    position: relative;

    #{$header}__input {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid $color-border;
      border-radius: 0.25rem;
      line-height: 1rem;
      font-size: $font-size-base;
      font-family: inherit;
      outline: none;
      height: 1.5rem;
      padding: 0 0.25rem 0 1.8rem;
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
