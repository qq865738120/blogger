<template>
  <div class="cus-tabs-root" >
    <div class="content">
      <span :id="index" :style="{ color: index == current ? '#FF9C00' : '#141414' }" v-for="(item, index) of items" :key="index" @click="onItemClick(index)">{{ item }}</span>
      <div class="button-line" :style="{ left: left, width: width }"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["文章", "连载书"],
      width: '',
      left: '',
      current: 0
    }
  },

  mounted() {
    if (process.client) {
      let dom = document.getElementById('0')
      this.width = dom.offsetWidth + 'px';
      this.left = dom.offsetLeft + 'px';
      console.log('offsetWidth', dom.offsetWidth);
      console.log('offsetLeft', dom.offsetLeft);
    }
  },

  methods: {
    onItemClick(index) {
      let dom = document.getElementById(`${index}`)
      this.width = dom.offsetWidth + 'px';
      this.left = dom.offsetLeft + 'px';
      this.current = index;
      this.$emit('onItem', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.cus-tabs-root {
  border-bottom: 1px solid #eaeeef;
}
.content {
  position: relative;
  width: 760px;
  margin: 0 auto;
  height: 30px;
}
.content > span {
  margin-right: 90px;
  line-height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: $--color-base-black;
  cursor: pointer;
  transition: all .3s ease;
}
.content > span:hover {
  color: $--secondary-color !important;
}
.button-line {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10px;
  height: 2px;
  background: $--secondary-color;
  transition: all .3s ease;
}
</style>
