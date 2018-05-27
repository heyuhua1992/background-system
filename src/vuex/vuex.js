import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 操作状态集
const state = {

}
// 类似于计算属性的东西
const getters = {}

// 只能是调用mutations中的方法
// 使用dispatch进行触发
// 处理异步操作，不能直接操作mutations
const actions = {
}
// 操作状态变化
// 方法需要使用commit进行触发
// 非异步操作写在mutations中，可以对state中的数据进行操控
const mutations = {
}

const modules = {}

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: modules
})
