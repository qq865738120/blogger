<template>
  <div class="works-card-list-root">
    <template v-for="(item, index) of list">
      <works-card class="card" :date="item.date" :title="item.title" :img="item.img"></works-card>
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

export default {
  components: {
    WorksCard
  },
  data() {
    return {
      list: [
        { id: '', date: '2019-01-29 13:54', title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？', img: 'http://www.haipic.com/icon/32d5903237.jpg' },
        { id: '', date: '2019-01-29 13:54', title: '区块链真的结束了', img: 'http://www.haipic.com/icon/32d5903237.jpg' },
        { id: '', date: '2019-01-29 13:54', title: '区块链真的结束了', img: 'http://www.haipic.com/icon/32d5903237.jpg' },
        { id: '', date: '2019-01-29 13:54', title: '区块链真的结束了', img: 'http://www.haipic.com/icon/32d5903237.jpg' },
        { id: '', date: '2019-01-29 13:54', title: '区块链真的结束了', img: 'http://www.haipic.com/icon/32d5903237.jpg' },
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

.works-card-list-root {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 0 17px $--px30 19px;
}
</style>
