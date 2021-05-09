<template>
  <div class="header-wrapper">
    <div class="header-left">
      <span @click="toggleCollapsed" style="cursor: pointer;">
        <a-icon :type="collapsed ? 'align-right' : 'align-left'"/>
      </span>
      <span class="tips" v-show="collapsed">{{ defaultTitle }}</span>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import config from '@/utils/config';

  export default {
    name: 'Header',
    props: {
      msg: String,
    },
    data() {
      return {
        defaultTitle: config.title || 'xxx',
        visible: false,
      };
    },
    computed: {
      ...mapState('menu', ['collapsed']),
    },
    methods: {
      ...mapMutations('menu', ['updateState']),
      toggleCollapsed() {
        this.updateState({ collapsed: !this.collapsed });
        localStorage.setItem('collapsed', this.collapsed);
      },
    },
  };
</script>

<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  z-index: 1;
  .header-left {
    position: relative;
    display: flex;
    padding: 0 20px;
    float: left;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
    line-height: 70px;
    .icon {
      font-size: 28px;
      color: #2ea9e6;
      cursor: pointer;
    }
    .tips {
      margin-left: 5px;
    }
  }
  .user-info {
    float: right;
    margin-right: 15px;
    z-index: 999;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .user-name {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user-avatar {
      display: flex;
      width: 49px;
      height: 48px;
      background: url("../../assets/img/circle.png");
      margin-left: 20px;
      justify-content: center;
      align-items: center;
      .img {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: url("../../assets/img/head-logo.png");
        background-size: cover;
      }
    }
  }
}
.department-select {
  width: 200px;
  color: #fff;
  > .ant-select-selection--single {
    color: #fff;
    background: none;
    border: none;
    .ant-select-arrow {
      color: #fff;
    }
  }
}
</style>
