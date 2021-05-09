<template>
  <div class="basic-layout-wrapper">
    <base-menu></base-menu>
    <div class="right-wrap">
      <base-header></base-header>
      <base-content></base-content>
    </div>
  </div>
</template>

<script>
import BaseHeader from './Header';
import BaseContent from './Content';
import BaseMenu from './Menu';

export default {
  name: 'BasicLayout',
  components: { BaseHeader, BaseContent, BaseMenu },
};
</script>

<style scoped lang="scss">
.basic-layout-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  .right-wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
