<template>
  <div>
    <el-container class="layout-container">
      <layout-aside></layout-aside>
      <el-container direction="vertical">
        <layout-header></layout-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="component-fade">
              <keep-alive :include="cachedViews">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
      <layout-config></layout-config>
    </el-container>
  </div>
</template>
<script>
  import LayoutAside from '@/layout/components/layout-aside'
  import LayoutHeader from '@/layout/components/layout-header'
  import LayoutTags from '@/layout/components/layout-tags'
  import LayoutConfig from '@/layout/components/layout-config'
  import { layoutHeaderHeight, layoutTagsHeight } from '@/styles/variables.scss'
  import { mapState } from 'vuex'
  export default {
    components: { LayoutAside, LayoutHeader, LayoutTags, LayoutConfig },
    name: 'Layout',
    data() {
      return {
        layoutHeaderHeight,
        layoutTagsHeight,
      }
    },
    computed: {
      ...mapState(['cachedViews']),
    },
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .layout-container {
    height: 100vh;
    background: white;
  }
  .el-main {
    padding: 0;
    background: #eff1f4;
  }
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }
  .component-fade-enter-from {
    opacity: 0;
    transform: translateX(-20px);
  }
  .component-fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
</style>
