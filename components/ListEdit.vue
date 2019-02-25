<template>
  <div class="list-edit-root">
    <div v-for="(item, index) of list" :key="index">
      <el-input v-model="item.title" :placeholder="$t(placeholder)" class="margin-bottom-10" maxlength="30" @input="onChange">

        <el-select
          slot="prepend"
          class="input-with-select"
          v-model="selected"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="onRemote"
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
    }
  },
  data() {
    return {
      list: '',
      selected: '',
      loading: false,
      selectList: [
        { value: '1', label: '11' }
      ]
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
    console.log('this.$store.state[this.stateName]', this.$store.state[this.stateName]);
    this.list = JSON.parse(JSON.stringify(this.$store.state[this.stateName]));
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
      this.$store.commit(this.methodName, JSON.parse(JSON.stringify(this.list)))
    },
    onRemote() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.button:hover {
  color: $--secondary-color;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
