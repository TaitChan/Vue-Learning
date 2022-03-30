<template>
  <div>
    首页
    <svg-icon icon-class="odometer"></svg-icon>
    <el-input v-model="bb"></el-input>
    <div v-html="aa"></div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        aa: null,
        bb: '22',
      }
    },
    mounted() {
      for (let i = 0; i < 200; i++) {
        this.aa += `${i}<br>`
      }
    },
    methods: {},
  }
</script>

<style scoped></style>
