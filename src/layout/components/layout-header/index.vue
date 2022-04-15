<template>
  <el-header
    :style="{
      '--el-header-height': elHeaderHeight,
    }"
  >
    <div class="layout-header">
      <layout-breadcrumb></layout-breadcrumb>
      <el-dropdown ref="dropdown">
        <div class="layout-user">
          <el-avatar :src="avatar"></el-avatar>
          {{ userName }}
          <svg-icon
            icon-class="arrow-down"
            :class-name="
              this.$refs.dropdown && this.$refs.dropdown.popperRef.open
                ? 'is-open'
                : ''
            "
          ></svg-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="this.$router.push('/account')">
              <svg-icon icon-class="user"></svg-icon>
              个人中心
            </el-dropdown-item>
            <el-dropdown-item divided>
              <svg-icon icon-class="switch-button"></svg-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <layout-tags v-if="layoutTagsVisible"></layout-tags>
  </el-header>
</template>

<script>
  import LayoutTags from '@/layout/components/layout-tags'
  import { layoutHeaderHeight, layoutTagsHeight } from '@/styles/variables.scss'
  import { mapState } from 'vuex'
  import LayoutBreadcrumb from '@/layout/components/layout-breadcrumb'
  import SvgIcon from '@/components/SvgIcon'

  export default {
    name: 'LayoutHeader',
    components: { SvgIcon, LayoutBreadcrumb, LayoutTags },
    data() {
      return {
        avatar:
          'http://5b0988e595225.cdn.sohucs.com/images/20200401/b20d9f8af234495786a2f5131d69c7ed.jpeg',
      }
    },
    computed: {
      ...mapState(['userName', 'layoutTagsVisible']),
      elHeaderHeight() {
        return {
          '--el-header-height': this.layoutTagsVisible
            ? layoutHeaderHeight + layoutTagsHeight
            : layoutHeaderHeight,
        }
      },
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .layout-header {
    height: $layout-header-height;
    background: white;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-df;
    .layout-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-avatar {
        margin-right: 6px;
        width: 2rem;
        height: 2rem;
      }
      .svg-icon {
        transition: 0.3s;
        margin-left: 3px;
        font-size: 14px;
        &.is-open {
          transform: rotateZ(180deg);
        }
      }
    }
  }
</style>
