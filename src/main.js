import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import echarts from 'echarts'
import VueTinymce from '@packy-tang/vue-tinymce'
import 'echarts-gl'
import '@/styles/index.scss' // global css
import './plugins/element.js'
import "@/icons"; // icon
import '@/permission' // permission control
import '../element-variables.scss'
import './mock'
//import '../public/tinymce/langs/zh_CN.js' //加上这句项目运行出现空白界面,报tinymce is not defined的错
Vue.use(VueTinymce)  //全局使用插件
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
//全局注册router和store组件
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
/*import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。
Vue.use(VueAwesomeSwiper,*/