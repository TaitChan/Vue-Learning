<template>
  <empty-content :empty-data="filterIconList">
    <div class="grid">
      <div
        v-for="item of filterIconList"
        :key="item"
        @click="handleClipboard(generateIconCode(item), $event)"
      >
        <el-tooltip placement="top">
          <template #content>
            {{ generateIconCode(item) }}
          </template>
          <div class="icon-item">
            <i>
              <svg-icon :icon-class="item" />
            </i>
            <span>{{ item }}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </empty-content>
</template>

<script>
  import clipboard from '@/utils/clipboard'
  import { svgIcons, svgColorIcons } from '@/views/icons/svg-icons'
  import EmptyContent from '@/components/EmptyContent'

  export default {
    name: 'Icons',
    components: { EmptyContent },
    props: {
      name: {
        type: String,
        default: 'alone',
        required: true,
      },
      search: {
        type: String,
      },
    },
    data() {
      return {
        svgIcons,
        svgColorIcons,
      }
    },
    computed: {
      filterIconList() {
        if (this.name === 'alone') {
          return svgIcons.filter((item) => {
            return item.includes(this.search)
          })
        } else {
          return svgColorIcons.filter((item) => {
            return item.includes(this.search)
          })
        }
      },
    },
    methods: {
      generateIconCode(symbol) {
        return `<svg-icon icon-class="${symbol}" />`
      },
      handleClipboard(text, event) {
        clipboard(text, event, '图标')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
    grid-gap: $space-sm;
    overflow: hidden;
    .icon-item {
      text-align: center;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
      border: 1px solid var(--el-border-color-dark);
      border-radius: var(--el-border-radius-base);
      position: relative;
      overflow: hidden;
      padding: $space-df 0 $space-sm 0;
      min-height: 85px;
      display: flex;
      justify-content: space-between;
      flex-flow: column;
      span {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 $space-sm;
      }
      i {
        pointer-events: none;
        transform: translateY(0);
        transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
      }
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        i {
          transform: translateY(-6px);
        }
      }
      &:hover::after {
        transform: translateY(0);
      }
      &::after {
        content: '点击复制';
        background: $primary;
        color: white;
        font-size: 14px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 30px;
        line-height: 30px;
        transform: translateY(100%);
        transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
      }
    }
  }
</style>
