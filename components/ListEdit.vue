<template>
  <div class="list-edit-root">
    <div v-for="(item, index) of list" :key="index">
      <el-input v-model="item.title" :placeholder="$t('editor.pleaseInputChapter')" class="margin-bottom-10" maxlength="30" @input="onChange">
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
  data() {
    return {
      list: ''
    }
  },

  mounted() {
    this.list = JSON.parse(JSON.stringify(this.$store.state.listEdit));
  },

  methods: {
    onAdd(index) {
      this.list.splice(index + 1, 0, { title: '' })
      this.$store.commit('SET_LIST_EDIT', JSON.parse(JSON.stringify(this.list)))
    },
    onRemove(index) {
      this.list.splice(index, 1)
      this.$store.commit('SET_LIST_EDIT', JSON.parse(JSON.stringify(this.list)))
    },
    onChange() {
      this.$store.commit('SET_LIST_EDIT', JSON.parse(JSON.stringify(this.list)))
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
