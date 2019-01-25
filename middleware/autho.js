export default function({ app, req, redirect, store }) {
  if (process.client) {
    app.$axios.get('/api/v1/check').then(res => {
      console.log('登录检验', res.data);
      if (res.data.code != 200) {
        store.commit('SET_LOGIN', false)
        redirect('/signin')
      } else {
        store.commit('SET_LOGIN', true)
      }
    })
  } else if (!req.session.user) { //验证失败
    store.commit('SET_LOGIN', false)
    redirect('/signin')
  } else {
    store.commit('SET_LOGIN', true)
  }
}
