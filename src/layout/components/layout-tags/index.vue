<template>
  <div class="layout-tags">
    <div class="layout-tags__main">
      <router-link
        :to="item.path"
        v-for="item in visitedViews"
        :key="item.path"
        class="layout-tags__tag"
        :class="$route.path === item.path ? 'active' : ''"
      >
        {{ item.meta.title }}
        <i @click.prevent="delVisitedView(item)" v-if="!item.meta.affix">
          <svg-icon icon-class="close"></svg-icon>
        </i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    name: 'LayoutTags',
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapState(['visitedViews']),
      ...mapGetters(['lastVisitedView']),
    },
    watch: {
      $route() {
        this.addVisitedViw()
      },
    },
    created() {
      this.initVisitedView()
    },
    methods: {
      ...mapMutations(['addVisitedViews', 'delVisitedViews']),
      initVisitedView() {
        //初始化tag固定导航路由，将其路由放入"已访问页面"路由数组
        let affixTags = this.$router.getRoutes().filter((item) => {
          return item.meta.affix
        })
        this.addVisitedViews([...affixTags])
        this.addVisitedViw()
      },
      addVisitedViw() {
        //如果"已访问页面"路由数组不包含当前页面路由，则向其中添加当前页面路由
        if (
          !this.visitedViews.find((item) => {
            return item.path === this.$route.path
          })
        ) {
          this.addVisitedViews([this.$route])
        }
      },
      delVisitedView(view) {
        //当待删除的导航路由为当前路由时，删除后跳转页面至"已访问页面"路由数组最后一项
        this.delVisitedViews([view])
        if (view.path === this.$route.path) {
          this.$router.push(this.lastVisitedView.path)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .layout-tags {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    border-bottom: 1px solid #d8dce5;
    height: $layout-tags-height;
    background: white;
    &__main {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 $padding-lg;
    }
    &__tag {
      height: calc(100% - 6px);
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      border: 1px solid var(--el-border-color-darker);
      font-size: 12px;
      padding: 0 $padding-sm;
      text-decoration: none;
      margin-left: 5px;
      color: var(--el-text-color-regular);
      text-decoration: none;
      &:first-child {
        margin-left: 0;
      }
      i {
        height: 14px;
        width: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        margin-left: 5px;
        font-size: 8px;
        //background: rgba(255, 255, 255, 0);
        //transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
        &:hover {
          background: var(--el-text-color-placeholder);
          color: white;
        }
      }
      &.active {
        background: $layout-tag-bg;
        color: white;
        border: 1px solid $layout-tag-bg;
        position: relative;
        &::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background: white;
          margin-right: 5px;
        }
      }
    }
  }
</style>
