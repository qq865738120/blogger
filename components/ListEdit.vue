<template>
  <div class="list-edit-root">
    <div v-for="(item, index) of list" :key="index">
      <el-input v-model="item.title" :placeholder="$t(placeholder)" class="margin-bottom-10" maxlength="30" @input="onChange">

        <el-select
          v-if="showSelect"
          style="width: 125px"
          slot="prepend"
          class="input-with-select"
          v-model="item.id"
          filterable
          remote
          placeholder="输入标题搜索"
          :remote-method="onRemote"
          @change="onSelectChange(index)"
          :loading="loading">
          <el-option
            v-for="item in selectList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <div slot="append">
          <el-tooltip effect="dark" :content="$t('editor.addChapter')" placement="left">
            <el-button icon="el-icon-plus" @click="onAdd(index)" class="button"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" :content="$t('editor.deleteChapter')" placement="right">
            <el-button icon="el-icon-close" @click="onRemove(index)" class="button"></el-button>
          </el-tooltip>
        </div>

      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wait: Boolean,
    stateName: String,
    methodName: String,
    placeholder: {
      type: String,
      default: 'editor.pleaseInputChapter'
    },
    showSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: '',
      selected: '',
      loading: false,
      selectList: []
    }
  },
  watch:{
    wait(val) {
      if (val) {
        this.list = JSON.parse(JSON.stringify(this.$store.state[this.stateName]));
      }
    }
  },
  mounted() {
    this.list = JSON.parse(JSON.stringify(this.$store.state[this.stateName]));
    if (this.showSelect) {
      this.loading = true;
      this.$axios.get('/api/v1/article/createtime', { params: { page: 1, row: 100, status: 1, authorId: this.$store.state.userInfo.id } }).then(res => {
        this.loading = false;
        if (res.data.code == 200) {
          this.selectList = res.data.data.map(item => {
            return { value: item.id, label: item.title }
          })
          this.list[0].id = this.selectList[0].value
          this.list[0].title = this.selectList[0].label
          this.$store.commit(this.methodName, JSON.parse(JSON.stringify(this.list)))
        }
      })
    }
  },

  methods: {
    onAdd(index) {
      this.list.splice(index + 1, 0, { title: '' })
      this.$store.commit(this.methodName, JSON.parse(JSON.stringify(this.list)))
    },
    onRemove(index) {
      if (this.list.length <= 1) {
        return
      }
      this.list.splice(index, 1)
      this.$store.commit(this.methodName, JSON.parse(JSON.stringify(this.list)))
    },
    onChange() {
      this.$nextTick(() => {
        this.$store.commit(this.methodName, JSON.parse(JSON.stringify(this.list)))
      })
    },
    onRemote(query) {
      console.log(query);
    },
    onSelectChange(index) {
      console.log('index', index);
      for (let item of this.selectList) {
        if (item.value == this.list[index].id) {
          console.log('item.lebel', item.label);
          this.list[index].title = item.label
        }
      }
      this.$store.commit(this.methodName, JSON.parse(JSON.stringify(this.list)))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.button:hover {
  color: $--secondary-color;
}
</style>
