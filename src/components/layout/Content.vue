<template>
  <div class="content-wrapper">
    <div class="content-bread" v-if="showBread">
      <div>
        <span v-for="(item,index) in myBread" :key="item.path">
          <span>
            <router-link v-if="index!==myBread.length-1" :to="{path: item.path}">{{ item.name }}</router-link>
            <span :style="{cursor: 'default'}" v-else>{{ item.name }}</span>
          </span>
          <span class="content-split" v-if="index!==0 && index!==myBread.length-1">></span>
        </span>
      </div>
      <div v-if="hasBack">
        <a-button @click="handleBack" class="back">返回</a-button>
      </div>
    </div>
    <div class="content-in" :style="{width: (contentWidth < 1080 ? 1080 : contentWidth) + 'px'}">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  const hasBackRouter = ['/home', '/apply/create', '/resource/detail',
    '/system/detail', '/system/add', '/system/edit', '/worksheet/detail', '/specifications/detail', '/authority/add'];

  export default {
    name: 'Content',
    props: {
      msg: String,
    },
    provide() {
      return {
        reload: this.reload,
      };
    },
    data() {
      return {
        contentWidth: null,
        isRouterAlive: true,
      };
    },
    computed: {
      ...mapState('menu', ['collapsed']),
      myBread: function () {
        return this.$route.matched;
      },
      hasBack() {
        const { path } = this.$route;
        return hasBackRouter.indexOf(path) > -1;
      },
      showBread() {
        const str = this.$route.path.slice(1);
        return str.indexOf('/') > -1;
      },
    },
    watch: {
      collapsed() {
        this.getWindowWidth();
      },
    },
    created() {
      this.getWindowWidth();
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        that.getWindowWidth();
      };
    },
    methods: {
      handleBack() {
        this.$router.go(-1);
      },
      getWindowWidth() {
        const menuWidth = this.collapsed ? 80 : 256;
        this.contentWidth = window.innerWidth - menuWidth;
        console.log(this.contentWidth);
      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      },
    },
  };
</script>

<style scoped lang="scss">
.content-wrapper {
  background: #f2f5fa;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  .content-bread {
    width: auto;
    height: 42px;
    padding: 20px 20px 15px 20px;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back {
      cursor: pointer;
      text-decoration: none;
      color: #2ca0e5;
      width: 50px;
      height: 24px;
      padding: 0;
      line-height: 20px;
      margin-right: 5px;
      font-size: 12px;
    }
    .content-split {
      cursor: default;
      padding-left: 5px;
      padding-right: 5px;
    }
  }
  .content-in {
    /*min-width: 1044px;*/
    overflow: auto;
    // padding: 20px;
    flex-grow: 2;
  }
}
</style>
