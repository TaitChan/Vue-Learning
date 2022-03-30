<template>
  <el-empty :image="svg_404" description="抱歉，页面不见了: (">
    <el-button @click="this.$router.go(0)">重试</el-button>
    <el-button type="primary" @click="this.$router.go(-1)">返回</el-button>
  </el-empty>
</template>

<script>
  import svg_404 from './assets/404.svg'
  export default {
    data() {
      return {
        svg_404,
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
