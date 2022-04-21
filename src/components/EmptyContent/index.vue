<template>
  <slot v-if="emptyData.length > 0"></slot>
  <el-empty
    v-else
    :image="svg_emptyContent"
    description="暂无相关内容"
  ></el-empty>
</template>

<script>
  import svg_emptyContent from './empty-content.svg'
  export default {
    name: 'EmptyContent',
    props: {
      emptyData: {
        type: Array,
      },
    },
    data() {
      return {
        svg_emptyContent,
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
