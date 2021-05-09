<template>
  <!-- 左侧菜单 -->
  <div class="menu-wrapper" v-if="!collapsed">
    <div class="menu-header">
      <img class="img-box" src="../../assets/img/logo.png" alt>
      <span class="menu-title">{{ defaultTitle }}</span>
    </div>
    <div class="menu-content">
      <a-menu
        mode="inline"
        v-model="defaultSelectedKeys"
        style="width: 255px;"
        @openChange="onOpenChange"
        :openKeys="openKeys"
      >
        <template v-for="item in menuArr">
          <a-menu-item
            v-if="!item.children || item.children.length===0"
            :key="item.name"
          >
            <router-link :to="{path: item.path}">
              <base-icon :type="item.icon" class="icon"/>
              <span class="name">{{ item.name }}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu v-else :key="item.name">
            <div slot="title" style="font-size:18px;">
              <base-icon :type="item.icon" class="icon"/>
              <span class="name">{{ item.name }}</span>
            </div>
            <template v-for="ele in item.children">
              <a-menu-item :key="ele.name" style="font-size:16px;">
                <router-link :to="{path: ele.path}">{{ ele.name }}</router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </div>
  <div class="menu-collapsed-wrapper" v-else>
    <a-tooltip placement="right">
      <template slot="title">
        <span>{{ defaultTitle }}</span>
      </template>
      <div class="menu-icon-wrapper">
        <img class="menu-icon" src="../../assets/img/logo-small.png" alt>
      </div>
    </a-tooltip>

    <a-menu
      theme="dark"
      v-model="defaultSelectedKeys"
      :defaultSelectedKeys="defaultSelectedKeys"
    >
      <template v-for="item in menuArr">
        <a-tooltip placement="right" :key="item.name" v-if="!item.children || item.children.length===0">
          <template slot="title">
            <span>{{ item.name }}</span>
          </template>
          <a-menu-item
            :class="defaultSelectedKeys[0] !== item.name ? 'icon-wrapper' : 'icon-wrapper ant-menu-item-selected'"
            :key="item.name"
          >
            <router-link :to="{path: item.path}">
              <base-icon :type="item.icon" class="icon"/>
            </router-link>
          </a-menu-item>
        </a-tooltip>
        <a-sub-menu v-else :key="item.name">
          <div slot="title" class="icon-wrapper">
            <base-icon :type="item.icon" class="icon"/>
          </div>
          <template v-for="ele in item.children">
            <a-menu-item :key="ele.name" v-if="!ele.children || ele.children.length===0" style="font-size:16px;">
              <router-link :to="{path: ele.path}">{{ ele.name }}</router-link>
            </a-menu-item>
            <a-sub-menu v-else :key="ele.name">
              <div slot="title">{{ ele.name }}</div>
              <a-menu-item v-for="subEle in ele.children" :key="subEle.name">
                <router-link :to="{path: subEle.path}">{{ subEle.name }}</router-link>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import config from '@/utils/config';
  import BaseIcon from '../BaseIcon';

  export default {
    name: 'Menu',
    props: {
      msg: String,
    },
    data() {
      return {
        defaultTitle: config.title || 'xxx',
        defaultSelectedKeys: ['首页'], // 选择的菜单项
        rootSubmenuKeys: [],
        openKeys: [''], // 展开的父级菜单
      };
    },
    computed: {
      ...mapState('menu', ['collapsed']),
      menuArr() {
        return [
          {
            name: '首页',
            icon: 'physical',
            path: '/home',
          },
          {
            name: '菜单1',
            icon: 'medical-care',
            children: [
              {
                name: '子菜单1',
                path: '/path/xxx1',
              },
              {
                name: '子菜单2',
                path: '/path/xxx2',
              },
            ],
          },
          {
            name: '菜单2',
            icon: 'physical',
            path: '/sum',
          },
        ];
      },
    },
    watch: {
      $route: 'getRouterPath',
    },
    created() {
      this.getRouterPath();
    },
    mounted() {
      this.menuArr.forEach((ele) => {
        if (ele.children && ele.children.length > 0) {
          this.rootSubmenuKeys.push(ele.name);
        }
      });
    },
    methods: {
      getRouterPath() {
        const menuObj = this.menuArr.find((menu) => (menu.children || []).some((it) => it.name === this.name));
        if (!menuObj) return;
        const { name } = menuObj;
        this.openKeys = name ? [name] : [];
        this.defaultSelectedKeys = this.name ? [this.name] : [];
      },
      // 只展开当前父级菜单
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
    },
    components: {
      BaseIcon,
    },
  };
</script>

<style lang="scss">
.menu-wrapper {
  width: 256px;
  height: 100%;
  background-color: #26334D;
  color: #9098BA;
  font-size: 20px;
  .menu-header {
    position: relative;
    display: flex;
    width: 216px;
    height: 170px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 20px 20px;
    cursor: pointer;
    .img-box {
      width: 100px;
      height: 100px;
    }
    .menu-title {
      margin-top: 20px;
      color: #fff;
      font-size: 20px;
    }
  }
  .menu-content {
    width: 100%;
    padding-bottom: 30px;
    height: calc(100% - 230px);
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #26334D;
    .ant-menu, .ant-menu-inline, .ant-menu-sub, .ant-menu-item {
      background-color: #26334D;
      font-size: 18px;
      border-right: 0;
      a {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
      }
      a:hover {
        color: #fff;
      }
      .icon {
        font-size: 18px;
      }
      .name {
        font-size: 16px;
        margin-left: 6px;
      }
    }
    .ant-menu-item, .ant-menu-submenu {
      border-bottom: 1px solid #444D5E;
    }
    .ant-menu-item, .ant-menu-submenu-title {
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
      height: 60px;
      line-height: 60px;
    }
    .ant-menu-inline .ant-menu-item:not(:last-child) {
      margin: 0;
    }
    .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
      height: 60px;
      line-height: 60px;
    }
    .ant-menu-sub.ant-menu-inline > .ant-menu-item {
      margin: 0;
      height: 46px;
      line-height: 46px;
      border-top: 1px solid #3A4457;
      border-bottom: none;
      font-size: 16px;
    }
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: #344057;
    }
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected:after {
      left: 0;
      border-right: none;
      width: 3px;
      background-image: linear-gradient(to bottom, #2E8BE6, #2EA9E6);
    }
    .ant-menu-submenu-title:hover,
    .ant-menu-submenu-selected .ant-menu-submenu-title,
    .ant-menu-item-selected > a,
    .ant-menu-item-selected > a:hover {
      color: #fff;
    }
    .ant-menu-submenu-title:hover .ant-menu-submenu-arrow,
    .ant-menu-submenu-selected .ant-menu-submenu-title .ant-menu-submenu-arrow {
      &::before,
      &::after {
        background: #fff;
      }
    }
  }
}
.menu-collapsed-wrapper {
  width: 80px;
  height: 100%;
  background-color: #242F44;
  color: #9098BA;
  .menu-icon-wrapper {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .menu-icon {
      width: 35px;
      height: 35px;
    }
  }
  .icon-wrapper {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    font-size: 24px;
  }
  .ant-menu, .ant-menu-inline, .ant-menu-sub, .ant-menu-item {
    background-color: #242F44;
    a {
      color: #9098BA;
      text-decoration: none;
    }
    a:hover {
      color: #fff;
    }
  }
  .ant-menu-item, .ant-menu-submenu-title {
    color: #9098BA;
  }
  .ant-menu-submenu-title:hover,
  .ant-menu-item-selected > a:hover {
    color: #fff;
  }
  .ant-menu-submenu-selected .ant-menu-submenu-title,
  .ant-menu-item-selected > a {
    color: #fff;
    background-color: #1890ff !important;
  }
  .ant-menu-submenu-arrow {
    display: none;
  }
}
</style>
