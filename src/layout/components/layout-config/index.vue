<template>
  <div
    class="layout-overlay"
    v-show="configVisiable"
    @click="changeIsCollapse"
  />
  <div class="layout-config" :class="configVisiable ? 'show' : ''">
    <div class="layout-config__btn" @click="changeIsCollapse">
      <svg-icon icon-class="setting" v-show="!configVisiable" />
      <svg-icon icon-class="close" v-show="configVisiable" />
    </div>
    <div class="layout-config__main">
      <div class="layout-config__main__header">可配置项</div>
      <div class="layout-config__main__main">
        <el-form>
          <el-form-item label="layoutTags">
            <el-switch v-model="layoutTagsVisible" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LayoutConfig',
    components: {},
    data() {
      return {
        configVisiable: false,
      }
    },
    computed: {
      layoutTagsVisible: {
        get() {
          return this.$store.state.layoutTagsVisible
        },
        set(value) {
          this.$store.commit('setLayoutTagsVisible', value)
        },
      },
    },
    methods: {
      changeIsCollapse() {
        this.configVisiable = !this.configVisiable
      },
    },
  }
</script>

<style lang="scss" scoped>
  .layout-overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
  .layout-config {
    position: fixed;
    height: 100%;
    width: 100%;
    max-width: 250px;
    right: 0;
    background: white;
    transform: translate(100%);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    z-index: 1;
    &.show {
      transform: translate(0);
    }
    &__btn {
      position: absolute;
      width: $layout-config-height;
      height: $layout-config-height;
      background-color: $primary;
      color: white;
      font-size: $layout-config-height * 0.5;
      left: -$layout-config-height;
      top: calc(50vh - $layout-config-height);
      border-radius: 6px 0 0 6px;
      z-index: 2;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__main {
      &__header {
        height: $layout-header-height;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        display: flex;
        align-items: center;
        padding-left: 1rem;
      }
      &__main {
        padding: 1rem;
        height: calc(100vh - $layout-header-height);
      }
    }
  }
</style>
