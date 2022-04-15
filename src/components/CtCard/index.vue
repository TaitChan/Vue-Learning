<template>
  <div
    class="ct-card-container"
    :class="`
    ${shadow}
    ${border ? 'border' : ''}
    ${noPadding ? 'no-padding' : ''}`"
  >
    <div class="ct-card-header">
      <div class="ct-card-header__left">
        <ct-ellipsis>
          <slot name="title">{{ title }}</slot>
        </ct-ellipsis>
      </div>
      <div class="ct-card-header__right"><slot name="extra"></slot></div>
    </div>
    <div class="ct-card-body">
      <slot></slot>
    </div>
    <div class="ct-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CtCard',
    components: {},
    props: {
      title: {
        type: String,
        default: '',
      },
      shadow: {
        type: String,
        default: '',
      },
      float: {
        type: Boolean,
        default: false,
      },
      border: {
        type: Boolean,
        default: false,
      },
      noPadding: {
        type: Boolean,
        default: false,
      },
    },
    computed: {},
  }
</script>

<style lang="scss" scoped>
  .ct-card-container {
    background: white;
    border-radius: var(--el-border-radius-base);
    padding: $space-lg;
    display: flex;
    flex-flow: column; //修改主轴方向
    justify-content: space-between;
    font-size: 16px;
    transform: translateY(0);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    //transition-property: all;
    &.hover:hover,
    &.always {
      box-shadow: var(--el-box-shadow-light);
      &.float {
        transform: translateY(-4px);
      }
    }
    &.border {
      border: 1px solid var(--el-border-color-dark);
    }
    &.no-padding {
      padding: 0;
    }
  }
  .ct-card-header {
    margin-bottom: $space-df;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--el-text-color-primary);
    &__left {
      font-weight: 500;
      margin-right: $space-sm;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__right {
    }
  }
  .ct-card-body {
    overflow: scroll;
    font-size: 14px;
    line-height: 1.5;
    color: var(--el-text-color-regular);
    flex: 1;
  }
  .ct-card-footer {
    margin-top: $space-sm;
    align-self: end;
  }
</style>
