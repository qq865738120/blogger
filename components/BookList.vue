<template>
  <div class="book-list-root" v-loading="loading">
    <div>
      <el-tooltip effect="dark" :content="$t('personal.addBook')" placement="top">
        <section @click="onAdd">
          <el-card
            class="hover-pointer book add-book"
            :body-style="{ padding: '0px', width: '180px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }"
            :style="{ height: '256px' }"
            shadow="never"
            :hidden="currentPage != 1">
            <i class="el-icon-plus plus"></i>
          </el-card>
        </section>
      </el-tooltip>
      <template v-for="(item, index) of bookList">
        <book class="book" :id="item.id" :title="item.title" :author="item.author" :startDate="item.startDate" :img="item.img"></book>
      </template>
    </div>
    <el-pagination
      class="flex-center margin-top-20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="12"
      layout="prev, pager, next, jumper"
      :total="total">
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
      currentPage: 1,
      total: 0,
      loading: false
    }
  },

  async created() {
    if (process.client) {
      await this.$utils.waitUserInfo(this, async () => {
        let res = await this.$axios.get('/api/v1/book/count', { params: { authorId: this.$store.state.userInfo.id } })
        if (res.data.code == 200) {
          this.total = res.data.data.count
        }
        this.loadList();
      })
    }
  },

  methods: {
    handleSizeChange(e) {
      console.log('handleSizeChange', e);
    },
    handleCurrentChange(e) {
      console.log('handleCurrentChange', e);
      this.currentPage = e
      this.loadList(e);
    },

    onAdd() {
      let loading = this.$utils.loading(this)
      this.$axios.get('/api/v1/uuid').then(res => {
        this.$router.push({name: 'editor', params: { id: res.data.data, type: 'book' }})
        loading.close()
      })
    },

    async loadList(page) {
      this.loading = true;
      let res = await this.$axios.get(
        '/api/v1/book',
        { params: {
          page: page ? page : this.currentPage,
          row: this.currentPage == 1 ? 11 : 12,
          authorId: this.$store.state.userInfo.id
        } })
      this.loading = false;
      if (res.data.code == 200) {
        let list = []
        for (let item of res.data.data) {
          list.push({
            id: item.id,
            title: item.title,
            img: item.cover
          })
        }
        this.bookList = list
      } else {
        // this.$router.push({name: 'error', params: { statusCode: 500 }})
      }
    }

  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.book-list-root > div {
  display: flex;
  flex-wrap: wrap;
}
.book {
  margin: 0 17px $--px30 19px;
}
.add-book {
  border: 1px dashed #d9d9d9;
}
.plus {
  font-size: 30px;
  color: #8c939d;
}
</style>
