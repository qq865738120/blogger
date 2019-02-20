<template>
  <div class="works-card-list-root" v-loading="loading">
    <div>
      <el-tooltip effect="dark" :content="$t('personal.addArtical')" placement="top-start">
        <section @click="onAdd">
          <el-card
            class="hover-pointer card add-card"
            :body-style="{ padding: '0px', width: '180px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }"
            :style="{ height: '250px' }"
            shadow="never"
            :hidden="currentPage != 1"
            >
            <i class="el-icon-plus plus"></i>
          </el-card>
        </section>
      </el-tooltip>
      <template v-for="(item, index) of list">
        <works-card class="card" :id="item.id" :date="item.date" :title="item.title" :img="item.img"></works-card>
      </template>
    </div>
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
import WorksCard from '~/components/WorksCard.vue'

export default {
  components: {
    WorksCard
  },

  data() {
    return {
      list: [],
      currentPage: 1,
      total: 0,
      loading: false
    }
  },

  async created() {
    if (process.client) {

      await this.$utils.waitUserInfo(this, async () => {
        this.$axios.get('/api/v1/article/count', { params: { authorId: this.$store.state.userInfo.id } }).then(res => {
          if (res.data.code == 200) {
            this.total = res.data.data.count
          }
        })
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
        this.$router.push({name: 'editor', params: { id: res.data.data, type: 'article' }})
        loading.close()
      })
    },
    async loadList(page) {
      this.loading = true;
      let res = await this.$axios.get(
        '/api/v1/article/createtime',
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
            date: this.$moment(item.created_date).format("YYYY-MM-DD hh:mm"),
            title: item.title,
            img: item.illustration
          })
        }
        this.list = list
      } else {
        // this.$router.push({name: 'error', params: { statusCode: 500 }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.works-card-list-root > div {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 0 17px $--px30 19px;
}
.add-card {
  border: 1px dashed #d9d9d9;
}
.plus {
  font-size: 30px;
  color: #8c939d;
}
</style>
