<template>
  <div class="works-card-list-root">
    <template v-for="(item, index) of list">
      <works-card class="card" :date="item.date" :title="item.title"></works-card>
    </template>
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
        { date: '2019-01-29 13:54', title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？' },
        { date: '2019-01-29 13:54', title: '区块链真的结束了' },
        { date: '2019-01-29 13:54', title: '区块链真的结束了' },
        { date: '2019-01-29 13:54', title: '区块链真的结束了' },
        { date: '2019-01-29 13:54', title: '区块链真的结束了' },
      ]
    }
  },
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
