export const state = () => ({
  locales: ['en', 'zh'],
  locale: 'zh',
  isLogin: false,
})
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_LOGIN(state, value) {
    state.isLogin = value
  }
}
