import Vue from "vue";
import Vuex from "vuex";
import app1 from './modules/app'
import user2 from './modules/user'
import permission3 from './modules/permission'
import tabledata from './modules/tabledata'
import getters from "./getters";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},//保存着所有的全局变量
  mutations: {},
  actions: {},
  getters,
  modules: {
    app:app1,
    user:user2,
    tabledata:tabledata,
    permission:permission3
  }
});
