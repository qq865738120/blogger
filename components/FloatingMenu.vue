<template>
  <div class="floating-menu-root" :style="style">
    <div class="flex-col-center margin-top-8 hover-pointer" @click="onCollection">
      <div class="flex-center iconfont open-shoucang1" :class="$store.state.hasCollec ? 'collected' : ''"></div>
      <p>{{ $t('common.collection') }}</p>
    </div>
    <div class="flex-col-center margin-top-8 hover-pointer" @click="onEdit">
      <div class="flex-center iconfont open-bianjibi"></div>
      <p>{{ $t('common.edit') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isRow: Boolean,
    articleId: String
  },
  data() {
    return {
      style: {}
    }
  },
  async created() {
    if (this.$store.state.userInfo && process.client) {
      let res = await this.$axios.get('/api/v1/article/collection', { params: { userId: this.$store.state.userInfo.id, collectionId: this.articleId } })
      if (res.data.code == 200) {
        this.$store.commit('SET_HAS_COLLEC', true)
      }
    }
  },
  mounted() {
    if (this.isRow) {
      this.style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }
  },
  methods: {
    async onCollection() {
      if (!this.$store.state.userInfo) {
        this.$router.push('/signin');
        return
      }
      if (!this.$store.state.hasCollec) {
        let res = await this.$axios.post('/api/v1/article/collection', { userId: this.$store.state.userInfo.id, collectionId: this.articleId })
        if (res.data.code == 200) {
          this.$message({
            message: this.$t('common.collectionSuccess'),
            type: 'success'
          });
          this.$store.commit('SET_HAS_COLLEC', true)
        } else {
          this.$message({
            message: this.$t('common.collectionFail'),
            type: 'error'
          });
        }
      } else {
        let res = await this.$axios.post('/api/v1/article/collection/delete', { collectionId: this.articleId })
        this.$store.commit('SET_HAS_COLLEC', false)
      }
    },

    onEdit() {
      this.$router.push({name: 'editor', params: { id: this.articleId, type: 'subArticle' }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.floating-menu-root > div > div {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: $--color-main-light-9;
  border: 1px solid $--color-main-light-9;
  color: $--color-main-light-4;
  font-size: $--extra-large;
}
.floating-menu-root > div > p {
  color: $--color-main-light-4;
  font-size: $--extra-small;
}
.floating-menu-root > div > div:hover {
  background-color: rgba(0, 0, 0, 0);
  color: $--secondary-color;
  border: 1px solid $--secondary-color;
}
.collected {
  color: white !important;
  background-color: $--secondary-color !important;
  border-color: $--secondary-color !important;
}
</style>
