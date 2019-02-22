<template>
  <div class="table-contents-root">
    <div class="head bg-color-main-color font-large flex-center">
      <span style="-webkit-box-orient: vertical;">{{ name }}</span>
    </div>
    <div class="content">
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '撒打发士大夫',
      treeData: [
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
        {
          label: '一级 1',
          children: [
            { label: '二级 1-1' }
          ]
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.table-contents-root {
  width: 200px;
  background-color: white;
  box-shadow: 0 7px 14px 0 rgba(199, 209, 215, 0.75);
  min-height: 400px;
  max-height: 600px;
  border-radius: 3px;
}
.head {
  height: 40px;
  color: white;
  padding: 20px 10px;
  border-radius: 3px 3px 0 0;
}
.head > span {
  @include over-length(2)
}
.content {
  padding: 20px 10px;
  overflow-y: scroll;
  min-height: 280px;
  max-height: 480px;
}
</style>
