<template>
  <div class="test-page">
    <h1>{{ props.msg }}</h1>
    <a>ddd</a>
    <code>aaa</code>
    <div class="ct-aaa">111</div>
    <el-button type="primary">dd</el-button>
    <el-button type="success">dd</el-button>
    <el-button type="danger">dd</el-button>
    <el-button type="warning">dd</el-button>
    <el-button type="info">dd</el-button>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, ref } from 'vue'
  const props = defineProps({
    msg: String,
  })
  const currentPage = ref(5)
  const pageSize = ref(100)
  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
  }
</script>

<style scoped lang="scss">
  .test-page {
    a {
      color: var(--el-color-primary);
    }
    code {
      border-radius: 2px;
      padding: 2px 4px;
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }

  .#{$ct-namespace}-aaa {
    background: red;
    width: 20px;
  }
</style>
