<template>
  <div>我是重定向redirect页面</div>
</template>
<script>
  export default {
    created() {
      const {
        params: { path },
        query,
      } = this.$route

      this.$router.replace({ path: '/' + path, query })
    },
  }
</script>
