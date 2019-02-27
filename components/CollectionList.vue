<template>
  <div class="collection-list" v-loading="loading">
    <template v-for="(item, index) of list">
      <works-card class="list-item" v-if="item.type == 'works'" :id="item.id" :isShowButton="item.isShowButton" :status="item.status" :date="item.data.date" :title="item.data.title" :img="item.data.img"></works-card>
      <book class="list-item" v-if="item.type == 'book'" :id="item.id" :isShowButton="item.isShowButton" :title="item.data.title" :author="item.data.author" :startDate="item.data.startDate" :img="item.data.img"></book>
    </template>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="20"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination> -->
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
      list: [],
      currentPage: 3,
      loading: false
    }
  },

  async created() {
    if (process.client) {
      this.loading = true
      await this.$utils.waitUserInfo(this, async () => {
        let row = await this.$axios.get('/api/v1/user/collection', { params: { userId: this.$store.state.userInfo.id } })
        this.loading = false
        if (row.data.code == 200) {
          let list = []
          for (let item of row.data.data) {
            if (item.type == "works") {
              list.push({
                id: item.id,
                type: 'works',
                isShowButton: false,
                status: -1,
                data: {
                  date: this.$moment(item.last_date).format('YYYY-MM-DD hh:mm'),
                  title: item.title,
                  img: item.illustration
                }
              })
            } else if (item.type == "book") {
              list.push({
                id: item.id,
                type: 'book',
                isShowButton: false,
                data: {
                  title: item.title,
                  img: item.cover
                }
              })
            }
          }
          this.list = list
        }
      })
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
