<template>
  <div class="table-contents-root">
    <div class="head bg-color-main-color font-large flex-center">
      <span style="-webkit-box-orient: vertical;">{{ name }}</span>
    </div>
    <div class="content" v-loading="loading">
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
        <span
          class="tree-node font-medium color-base-black-4"
          style="-webkit-box-orient: vertical;"
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
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      loading: true
    }
  },

  async created() {
    let loading = this.$utils.loading(this)
    let res = await this.$axios.get('/api/v1/chapters', { params: { bookId: this.bookId } })
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
    let res2 = await this.$axios.get('/api/v1/book/article', { params: { bookId: this.bookId } })
    let firstObj = ''
    if (res2.data.code == 200) {
      let isFirst = true
      for (let i = 0; i < this.treeData.length; i++) {
        let childrenArr = []
        for (let it of res2.data.data) {
          if (it.chapter_id == this.treeData[i].id) {
            if (isFirst) {
              firstObj = { id: it.article_id, lv: '2', serial: i + 1 }
              isFirst = false
            }
            childrenArr.push({
              id: it.article_id,
              lv: '2',
              label: it.section_title,
              serial: i + 1
            })
          }
        }
        this.treeData[i].children = childrenArr
      }
    }
    this.$store.commit('SET_TREE_DATA', this.$utils.clone(this.treeData))
    this.handleNodeClick(firstObj)
    this.loading = false
    loading.close();
  },

  methods: {
    async handleNodeClick(e) {
      if (e.lv == '2') {
        this.$emit('onNodeTap', e)
      }
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
.tree-node {
  width: 100%;
  @include over-length(1)
}
</style>
