<template>
  <div class="avatar-root flex-col-center">
    <img :src="src" />
    <p class="flex-col-center">
      <span class="font-extra-large color-base-black" v-if="name">{{ name }}</span>
      <span class="font-small color-base-black-2" v-if="signature">{{ signature }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: [ 'src', 'name', 'signature' ]
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.avatar-root>img {
  width: 120px;
  height: 120px;
  border-radius: 100%;
  box-shadow: 0 0 20px 4px rgba(106, 115, 123, 0.3);
}
.avatar-root>p {
  margin-block-start: $--px20;
  margin-block-end: $--px40;
}
.avatar-root>p>span:first-of-type {
  font-weight: 500;
  margin-bottom: $--px6;
}
</style>
