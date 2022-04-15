<template>
  <div class="layout-aside" :class="layoutAsideClass">
    <div class="layout-aside__btn" @click="changeIsCollapse">
      <svg-icon icon-class="expand" v-show="layoutAsideCollapse" />
      <svg-icon icon-class="fold" v-show="!layoutAsideCollapse" />
    </div>
    <div class="layout-aside__title">{{ layoutAsideTitle }}</div>
    <div class="layout-aside__menu">
      <el-scrollbar>
        <el-menu
          :background-color="layoutAsideBg"
          :active-text-color="layoutAsideActiveColor"
          :text-color="layoutAsideColor"
          class="layout-aside__el-menu"
          :default-active="defaultActive"
          :collapse="layoutAsideCollapse"
          router
        >
          <template v-for="m in showMenus(asyncRoutes)" :key="m.path">
            <el-menu-item
              v-if="showMenus(m.children).length === 1"
              :index="m.children[0].path"
            >
              <svg-icon :icon-class="m.children[0].meta.icon"></svg-icon>
              <template #title>{{ m.children[0].meta.title }}</template>
            </el-menu-item>
            <el-sub-menu
              v-else-if="showMenus(m.children).length > 1"
              :index="m.path"
              popper-class="layout-aside__popper"
            >
              <template #title>
                <svg-icon :icon-class="m.meta.icon"></svg-icon>
                <span>{{ m.meta.title }}</span>
              </template>
              <el-menu-item
                v-for="n in showMenus(m.children)"
                :key="n.path"
                :index="n.path"
              >
                <svg-icon
                  v-if="n.meta.icon"
                  :icon-class="n.meta.icon"
                ></svg-icon>
                <div v-else style="width: 5px"></div>
                <template #title>{{ n.meta.title }}</template>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import {
    layoutAsideBg,
    layoutAsideOpenBg,
    layoutAsideColor,
    layoutAsideActiveColor,
  } from '@/styles/variables.scss'
  import { asyncRoutes } from '@/router'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'LayoutAside',
    components: {},
    data() {
      return {
        asyncRoutes,
        layoutAsideBg,
        layoutAsideOpenBg,
        layoutAsideColor,
        layoutAsideActiveColor,
        isRun: false,
        isCollapse: false,
      }
    },
    computed: {
      ...mapState(['layoutAsideCollapse']),
      layoutAsideClass() {
        return this.isRun
          ? this.layoutAsideCollapse
            ? '.ct-aside-fold'
            : '.ct-aside-expand'
          : ''
      },
      layoutAsideTitle() {
        return this.layoutAsideCollapse ? 'Vue' : 'Vue Learning'
      },
      defaultActive() {
        const emptyMenu = this.$route.matched.filter((v) => {
          return v.components.default.name === 'LayoutEmpty'
        })
        if (emptyMenu.length > 0) {
          return emptyMenu[0].path
        } else {
          return this.$route.path
        }
      },
    },
    methods: {
      ...mapMutations(['setLayoutAsideCollapse']),
      changeIsCollapse() {
        this.isRun = true
        this.setLayoutAsideCollapse(!this.layoutAsideCollapse)
      },
      showMenus(menus) {
        return menus.filter((menu) => {
          return !menu.meta || !menu.meta.hidden
        })
      },
    },
  }
</script>

<style lang="scss">
  .layout-aside__popper {
    border-radius: $space-df;
    overflow: hidden;
    border: none !important;
    ul {
      //background: red !important;
      padding: 0;
    }
  }
</style>
<style lang="scss" scoped>
  .layout-aside {
    background: $layout-aside-bg;
    position: relative;
    &__title {
      height: $layout-header-height;
      background: $layout-aside-bg;
      color: $layout-aside-color;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__btn {
      position: absolute;
      top: 0;
      right: -$layout-header-height;
      height: $layout-header-height;
      width: $layout-header-height;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: $layout-header-height * 0.5;
      svg {
        height: 50%;
      }
    }
    &__menu {
      height: calc(100vh - $layout-header-height);
    }
  }
  ::v-deep.layout-aside {
    &__el-menu {
      //不用边框右侧会有1px的空白，不理解
      border-right: red;
      &:not(.el-menu--collapse) {
        width: $layout-aside-width;
      }
      .el-sub-menu.is-opened {
        ul {
          background: $layout-aside-open-bg !important;
        }
      }
    }
    ////一级菜单颜色
    //&__el-menu > li,
    //&__el-menu > li > div {
    //  background: $layout-aside-bg !important;
    //}
  }
  //折叠动画
  .ct-aside-fold {
    animation: fold 0.3s;
  }
  .ct-aside-expand {
    animation: expand 0.3s;
  }
  @keyframes fold {
    0% {
      width: $layout-aside-width;
    }
    100% {
      width: $layout-aside-min-width;
    }
  }
  @keyframes expand {
    0% {
      width: $layout-aside-min-width;
    }
    100% {
      width: $layout-aside-width;
    }
  }
</style>
