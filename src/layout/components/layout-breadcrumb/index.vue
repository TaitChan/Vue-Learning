<template>
  <div class="layout-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <svg-icon
          :icon-class="matched[0].meta.icon || matched[1].meta.icon"
        ></svg-icon>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in myMatched" :key="item.path">
        <router-link
          :to="item.path"
          v-if="item.components.default.name !== 'Layout'"
        >
          {{ item.meta.title }}
        </router-link>
        <span v-else>
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'LayoutBreadcrumb',
    components: {},
    data() {
      return {}
    },
    watch: {},
    computed: {
      matched() {
        console.log(this.$route.matched)
        return this.$route.matched
      },
      myMatched() {
        if (
          this.matched[0].children.filter((v) => {
            return !v.meta.hidden
          }).length === 1
        ) {
          return this.matched.slice(1)
        } else {
          return this.matched
        }
      },
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .layout-breadcrumb {
    margin-left: $layout-header-height * 0.75;
  }
  .el-breadcrumb__item {
    span {
      color: var(--el-text-color-placeholder);
    }
    a {
      font-weight: normal;
      color: var(--el-text-color-placeholder);
      &:hover {
        font-weight: bold;
        color: var(--el-text-color-regular);
      }
    }
    &:last-child {
      a {
        font-weight: bold;
        &:hover {
          font-weight: bold;
        }
      }
    }
  }
</style>
