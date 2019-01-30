<template>
  <div class="book-list-root">
    <template v-for="(item, index) of bookList">
      <book class="book" :title="item.title" :author="item.author" :startDate="item.startDate" :img="item.img"></book>
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
import Book from '~/components/Book.vue'

export default {
  components: {
    Book
  },
  data() {
    return {
      bookList: [
        { id: '1', title: "标题啊标题标题啊标题标题啊标题", img: "http://www.haipic.com/icon/32d5903237.jpg" },
        { id: '2', title: "标题啊标题标题啊标题标题啊标题" },
        { id: '3', title: "标题啊标题标题啊标题标题啊标题" }
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

.book-list-root {
  display: flex;
  flex-wrap: wrap;
}
.book {
  margin: 0 17px $--px30 19px;
}
</style>
