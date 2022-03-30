<template>
  <el-empty :image="svg_403" description="对不起，您没有访问该资源的权限: (">
    <el-button type="primary" @click="this.$router.go(-1)">返回</el-button>
  </el-empty>
</template>

<script>
  import svg_403 from './assets/403.svg'
  export default {
    data() {
      return {
        svg_403,
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
