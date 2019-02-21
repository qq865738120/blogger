<template>
  <div class="book-list-root">
    <el-tooltip effect="dark" :content="$t('personal.addArtical')" placement="top-start">
      <section @click="onAdd">
        <el-card
          class="hover-pointer book add-book"
          :body-style="{ padding: '0px', width: '180px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }"
          :style="{ height: '256px' }"
          shadow="never">
          <i class="el-icon-plus plus"></i>
        </el-card>
      </section>
    </el-tooltip>
    <template v-for="(item, index) of bookList">
      <book class="book" :id="item.id" :title="item.title" :author="item.author" :startDate="item.startDate" :img="item.img"></book>
    </template>
    <el-pagination
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
      total: 0
    }
  },

  async created() {
    if (process.client) {
      await this.$utils.waitUserInfo(this, async () => {
        let res = await this.$axios.get('/api/v1/book/count', { params: { authorId: this.$store.state.userInfo.id } })
        if (res.data.code == 200) {
          this.total = res.data.data.count
        }
        // this.loadList();
      })
    }
  },

  methods: {
    handleSizeChange(e) {
      console.log('handleSizeChange', e);
    },
    handleCurrentChange(e) {
      console.log('handleCurrentChange', e);
    },
    onAdd() {
      let loading = this.$utils.loading(this)
      this.$axios.get('/api/v1/uuid').then(res => {
        this.$router.push({name: 'editor', params: { id: res.data.data, type: 'book' }})
        loading.close()
      })
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
.add-book {
  border: 1px dashed #d9d9d9;
}
.plus {
  font-size: 30px;
  color: #8c939d;
}
</style>
