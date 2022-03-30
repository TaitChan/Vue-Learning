<template>
  <div>
    <el-button @click="dd">详情</el-button>
  </div>
</template>
<script>
  export default {
    name: 'Test',
    components: {},
    data() {
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      dd() {
        // console.log('点击ddd，添加详情路由')
        // this.$router.replace(this.$router.currentRoute.value.fullPath)
        this.$router.push('/test/about')
        // console.log(this.$router.getRoutes())
      },
    },
  }
</script>

<style lang="scss" scoped></style>
