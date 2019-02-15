<template>
  <div class="container">
    <div v-if="error.statusCode === 404">
      <img :src="img404">
    </div>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'main',
  data() {
    return {
      img404: 'https://static001.geekbang.org/static/infoq/www/img/404.ca54b9d.png'
    }
  },
  mounted() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="white";
    }
  },
}
</script>
