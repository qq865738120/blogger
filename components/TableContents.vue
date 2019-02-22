<template>
  <div class="table-contents-root">
    <div class="head bg-color-main-color font-large flex-center">
      <span style="-webkit-box-orient: vertical;">{{ name }}</span>
    </div>
    <div class="content">
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
        <span
          class="tree-node font-medium color-base-black-4"
          slot-scope="{ node, data }"
          :class="data.lv == 1 ? 'iconfont open-wenzhang2' : 'iconfont open-wenzhang'">
          {{ node.label }}
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    bookId: String
  },

  data() {
    return {
      treeData: [
        {
          id: '1',
          lv: '1',
          label: '一级 1',
          children: [
            { id: '2', lv: '2', label: '二级 1-1' }
          ]
        },
        {
          id: '1',
          lv: '1',
          label: '一级 1',
          children: [
            { id: '2', lv: '2', label: '二级 1-1' }
          ]
        },
        {
          id: '1',
          lv: '1',
          label: '一级 1',
          children: [
            { id: '2', lv: '2', label: '二级 1-1' }
          ]
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  async created() {
    let res = await this.$axios.get('/api/v1/chapters', { params: { bookId: this.bookId } })
    console.log('res', res);
    if (res.data.code == 200) {
      let treeArr = []
      for (let item of res.data.data) {
        treeArr.push({
          id: item.id,
          lv: '1',
          label: item.title,
          children: []
        })
      }
      this.treeData = treeArr
    } else {
      this.$router.push({name: 'error', params: { statusCode: 500 }})
    }
  },

  methods: {
    handleNodeClick(e) {
      console.log(e);
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
  text-align: center;
}
.content {
  padding: 20px 10px;
  overflow-y: scroll;
  min-height: 280px;
  max-height: 480px;
}
</style>
