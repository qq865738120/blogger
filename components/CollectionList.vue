<template>
  <div class="collection-list">
    <template v-for="(item, index) of list">
      <works-card class="list-item" v-if="item.type == 'works'" :isShowButton="item.isShowButton" :date="item.data.date" :title="item.data.title" :img="item.data.img"></works-card>
      <book class="list-item" v-if="item.type == 'book'" :title="item.data.title" :author="item.data.author" :startDate="item.data.startDate" :img="item.data.img"></book>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="20"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import WorksCard from '~/components/WorksCard.vue'
import Book from '~/components/Book.vue'

export default {
  components: {
    WorksCard,
    Book
  },
  data() {
    return {
      list: [
        { id: '1', type: 'book', data: { title: "标题啊标题标题啊标题标题啊标题", img: "http://www.haipic.com/icon/32d5903237.jpg" } },
        { id: '2', type: 'works', isShowButton: false, data: { date: '2019-01-29 13:54', title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？', img: 'http://www.haipic.com/icon/32d5903237.jpg' } },
        { id: '3', type: 'works', isShowButton: false, data: { date: '2019-01-29 13:54', title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？', img: 'http://www.haipic.com/icon/32d5903237.jpg' } },
        { id: '4', type: 'book', data: { title: "标题啊标题标题啊标题标题啊标题", img: "http://www.haipic.com/icon/32d5903237.jpg" } },
        { id: '5', type: 'book', data: { title: "标题啊标题标题啊标题标题啊标题", img: "http://www.haipic.com/icon/32d5903237.jpg" } },
      ],
      currentPage: 3
    }
  },
  methods: {
    handleSizeChange(e) {
      console.log('handleSizeChange', e);
    },
    handleCurrentChange(e) {
      console.log('handleCurrentChange', e);
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.collection-list {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  margin: 0 17px $--px30 19px;
}
</style>
