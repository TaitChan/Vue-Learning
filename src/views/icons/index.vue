<template>
  <ct-card title="图标">
    <div class="search-container">
      <el-input v-model="search" placeholder="请输入图标名称" clearable>
        <template #append>
          <el-button>
            <svg-icon icon-class="search"></svg-icon>
          </el-button>
        </template>
      </el-input>
    </div>
    <el-tabs v-model="tabName" type="border-card">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <tab-pane :search="search" :name="tabName"></tab-pane>
      </el-tab-pane>
    </el-tabs>
  </ct-card>
</template>

<script>
  import TabPane from './components/TabPane.vue'
  export default {
    name: 'Icons',
    components: { TabPane },
    data() {
      return {
        tabList: [
          { label: '单色图标', name: 'alone' },
          { label: '彩色图标', name: 'color' },
        ],
      }
    },
    computed: {
      search: {
        get() {
          return this.$route.query.search || ''
        },
        set(value) {
          this.$router.push({
            path: this.$route.path,
            query: { ...this.$route.query, search: value },
          })
        },
      },
      tabName: {
        get() {
          return this.$route.query.tabName || 'alone'
        },
        set(value) {
          this.$router.push({
            path: this.$route.path,
            query: { ...this.$route.query, tabName: value },
          })
        },
      },
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .el-tabs--border-card {
    box-shadow: none;
  }
</style>
