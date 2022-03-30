<template>
  <el-empty :image="svg_500" description="抱歉，服务器出了点问题: (">
    <el-button type="primary" @click="this.$router.go(-1)">返回</el-button>
  </el-empty>
</template>

<script>
  import svg_500 from './assets/500.svg'
  export default {
    data() {
      return {
        svg_500,
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
