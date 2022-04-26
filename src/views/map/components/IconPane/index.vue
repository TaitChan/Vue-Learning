<template>
  <div class="grid">
    <div
      v-for="(item, index) in pngIcons"
      :key="index"
      class="content"
      :class="modelValue === generateIconName(item) ? 'active' : ''"
      @click="handleClick(generateIconName(item))"
    >
      <el-image :src="generateIconName(item)"></el-image>
    </div>
  </div>
</template>

<script>
  import { pngIcons } from './icons'
  export default {
    name: 'IconPane',
    data() {
      return {
        pngIcons,
      }
    },
    props: {
      modelValue: {},
    },

    methods: {
      generateIconName(item) {
        return require('./icons/' + item)
      },
      handleClick(item) {
        this.$emit('update:modelValue', item)
        this.$emit('select', item)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
    grid-gap: $space-sm;
    .content {
      width: 35px;
      height: 35px;
      padding: 5px;
      &.active,
      &:hover {
        border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow-light);
      }
    }
  }
</style>
