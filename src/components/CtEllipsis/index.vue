<template>
  <el-tooltip :disabled="!tooltipVisible" :placement="placement">
    <template #content>
      <div :style="{ 'max-width': maxWidth }">
        <slot></slot>
      </div>
    </template>
    <div
      @mouseenter="(e) => isTextRange(e)"
      :class="line === 1 ? 'body alone' : 'body more'"
      :style="line === 1 ? {} : { '-webkit-line-clamp': line }"
    >
      <slot></slot>
    </div>
  </el-tooltip>
</template>

<script>
  import { textRange, moreTextRange } from './utils'
  export default {
    name: 'CtEllipsis',
    data() {
      return {
        tooltipVisible: false,
      }
    },
    props: {
      line: {
        type: Number,
        default: 1,
      },
      placement: {
        type: String,
        default: 'top',
      },
      maxWidth: {
        type: String,
        default: '300px',
      },
    },
    computed: {},
    methods: {
      isTextRange(e) {
        if (this.line === 1) {
          this.tooltipVisible = textRange(e.target)
        } else {
          this.tooltipVisible = moreTextRange(e.target)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .body {
    width: 100%;
    overflow: hidden; /* 超出隐藏 */
    text-overflow: ellipsis; /* 文本超出呈现方式：省略号 */
    &.alone {
      white-space: nowrap; /* 文本不换行 */
    }
    &.more {
      display: -webkit-box; /* 盒模型 */
      -webkit-box-orient: vertical; /* 盒内子元素布局方向 */
    }
  }
</style>
