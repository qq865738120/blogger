export const state = () => ({
  locales: ['en', 'zh'],
  locale: 'zh',
  isLogin: false, //是否处于登陆状态
  userInfo: '', //用户信息
  oldIllustration: '', //旧的插图路径
  oldCover: '', //旧的封面路径
  classList: [], //分类列表
  hasCollec: false, //是否已经收藏
  listEdit: [{ title: '' }], //ListEdit组件属性
  chapterEdit: [{ chapterId: '', title: '' }], //listEdit组件章节编辑属性
  treeData: [], //TableContents章节列表组件数据
})
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_LOGIN(state, value) {
    state.isLogin = value
  },
  SET_USER_INFO(state, value) {
    state.userInfo = value
  },
  SET_OLD_ILLUSTRATION(state, value) {
    state.oldIllustration = value
  },
  SET_OLD_COVER(state, value) {
    state.oldCover = value
  },
  SET_CLASSIFY(state, value) {
    state.classList = value
  },
  SET_HAS_COLLEC(state, value) {
    state.hasCollec = value
  },
  SET_LIST_EDIT(state, value) {
    state.listEdit = value
  },
  SET_CHAPTER_EDIT(state, value) {
    state.chapterEdit = value
  },
  SET_TREE_DATA(state, value) {
    state.treeData = value
  }
}
