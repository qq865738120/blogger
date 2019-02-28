<template>
  <div class="classify-page-root">
    <div class="head">
      <div class="class-item flex-col-center hover-pointer" v-for="(item, index) of classList" @click="onClassClick(item)">
        <img v-lazy="item.image" />
        <span>{{ item.classification }}</span>
      </div>
    </div>
    <cus-tabs class="tabs" @onItem="onItemTap" />
    <p class="font-large color-sub-black">{{ label }}</p>
    <div style="min-height: 300px;" v-loading="loading" v-show="currentIndex == 0">
      <div
        v-for="(item, index) of baseDisplay"
        :key="index"
        class="margin-bottom-20"
        >
        <base-display :data="item" />
      </div>
    </div>
    <div class="book-list" v-loading="loading" v-show="currentIndex == 1">
      <template v-for="(item, index) of bookList">
        <book
          class="book"
          :id="item.id"
          :title="item.title"
          :author="item.author"
          :startDate="item.startDate"
          :img="item.img"
          :isShowBottom="item.isShowBottom"></book>
      </template>
    </div>
    <el-row type="flex" justify="center" style="margin: 30px 0">
      <el-button
        round
        style="width: 120px;"
        :loading="isLoadingMore"
        @click="onLoadingMore(++page)"
        v-if="!isShowNotMore">
        {{ $t('common.loadingMore') }}
      </el-button>
      <div v-else class="tip flex-center">
        <div></div>
        <span class="font-extra-small color-sub-black">{{ $t('common.bottomLine') }}</span>
        <div></div>
      </div>
    </el-row>
  </div>
</template>

<script>
import CusTabs from '~/components/CusTabs.vue'
import BaseDisplay from '~/components/BaseDisplay.vue'
import Book from '~/components/Book.vue'

export default {
  layout: 'main',
  components: {
    CusTabs,
    BaseDisplay,
    Book
  },
  data() {
    return {
      classList: [],
      baseDisplay: [],
      bookList: [],
      currentIndex: 0,
      id: '',
      label: '',
      loading: false,
      isLoadingMore: false,
      isShowNotMore: false,
      page: 1
    }
  },

  async asyncData({ app, store }) {
    // if (process.client) {
      if (store.state.classList.length == 0) {
        let row = await app.$axios.get('/api/v1/classify')
        if (row.data.code == 200) {
          store.commit('SET_CLASSIFY', row.data.data)
          return {
            classList: row.data.data
          }
        } else {
          this.$router.push({name: 'error', params: { statusCode: 500 }})
        }
      } else {
        return {
          classList: store.state.classList
        }
      }
    // }
  },

  async created() {
    if (process.client) {
      this.id = localStorage.getItem('class_id') ? localStorage.getItem('class_id') : '001';
      this.label = localStorage.getItem('class_label') ? localStorage.getItem('class_label') : 'java';
      await this.loadArticleList(this.page)
    }
  },

  mounted() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="white";
    }
  },

  methods: {
    initLoad() {
      this.baseDisplay = [];
      this.bookList = [];
      this.page = 1
      this.isLoadingMore = false;
      this.isShowNotMore = false;
      if (this.currentIndex == 0) {
        this.loadArticleList(this.page)
      } else if (this.currentIndex == 1) {
        this.loadBookList(this.page)
      }
    },

    onItemTap(index) {
      this.currentIndex = index
      this.initLoad()
    },

    onClassClick(item) {
      if (item.id == this.id) {
        return
      }
      this.id = item.id
      this.label = item.classification
      localStorage.setItem('class_id', item.id);
      localStorage.setItem('class_label', item.classification);
      this.initLoad()
    },

    async onLoadingMore(page) {
      this.isLoadingMore = true;
      if (this.currentIndex == 0) {
        let data = await this.loadArticleList(this.page)
        if (data) {

        } else {
          this.isShowNotMore = true
        }
      } else {
        let data = await this.loadBookList(this.page)
        if (data) {

        } else {
          this.isShowNotMore = true
        }
      }
      this.isLoadingMore = false;
    },

    async loadArticleList(page) {
      this.loading = true
      let row = await this.$axios.get('/api/v1/article/createtime', { params: { page: page, row: 20, status: 1, showAuthor: true, classId: this.id } })
      let baseDisplay = []
      if (row.data.code == 200) {
        for (let item of row.data.data) {
          let tags = item.keywords.split('##')
          tags.pop()
          baseDisplay.push({
            author: item.authorStr,
            describe: item.description,
            id: item.id,
            imgSrc: item.illustration,
            tag: tags,
            title: item.title,
          })
        }
        this.baseDisplay = this.baseDisplay.concat(baseDisplay)
        this.loading = false
        return true
      } else if (row.data.code == 201) {
        this.loading = false
        this.isShowNotMore = true;
        return false
      } else {
        this.$router.push({name: 'error', params: { statusCode: 500 }})
      }
    },

    async loadBookList(page) {
      this.loading = true
      let row = await this.$axios.get('/api/v1/book', { params: { page: page, row: 20, status: 1, classId: this.id } })
      let bookList = []
      if (row.data.code == 200) {
        for (let item of row.data.data) {
          bookList.push({
            id: item.id,
            title: item.title,
            img: item.cover,
            startDate: this.$moment(item.created_date).format('YYYY-MM-DD'),
            isShowBottom: false
          })
        }
        this.bookList = this.bookList.concat(bookList)
        this.loading = false
        return true
      } else if (row.data.code == 201) {
        this.loading = false
        this.isShowNotMore = true;
        return false
      } else {
        this.$router.push({name: 'error', params: { statusCode: 500 }})
      }
    }

  }

}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.classify-page-root {
  width: 760px;
}
.head {
  display: flex;
  flex-wrap: wrap;
}
.class-item {
  margin: 30px 30px 0 0;
}
.head > div:nth-of-type(7) {
  margin-right: 0;
}
.class-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(199,209,215,.75);
  margin-bottom: 14px;
  filter: grayscale(50%);
  transition: all 200ms;
  overflow: hidden;
}
.class-item img:hover {
  filter: contrast(140%);
  border-radius: 20px;
}
.tabs {
  margin-top: 60px;
  margin-bottom: 30px;
}
.book-list {
  display: flex;
  flex-wrap: wrap;
  min-height: 300px;
}
.book {
  margin: 0 36px $--px30 37px;
}
</style>
