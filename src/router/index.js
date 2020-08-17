import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import middle from '../views/layout/middle.vue'
export const constantRouterMap = [
  { 
    path: '/login', 
    component: () => import('@/views/login/index'), 
    hidden: true 
  },
  { 
    path: '/404', 
    component: () => import('@/views/404'), 
    hidden: true 
  },
  {
    // path:'/',
    // component:middle,
    // children:[
    //  {
      path:'/data',
      name:'样例页',
      component:Layout,
      meta: {title: '样例页',icon: 'dashboard'},
      children:[
        {
           path:'dashboard',
           name:'首页',
           component: () => import('@/views/dashboard/index'),
           meta: {title: '首页',icon: 'dashboard'},
        },
        {
          path: 'tinymce2',
          name: '自己封装Tinymce例子',
          meta: { title: '自己封装的Tinymce例子', icon: 'form'},
          component: () => import('@/components//Tinymce/index_selfPacking')
        },
        {
            path: 'timePicker',
            name: '时间选择器8956',
            component: () => import('@/components/timePicker/index'),
            meta: { title: '时间选择器', icon: 'edit'}
        },
        {
            path: 'timeLine',
            name:'横向时间轴',
            component: () => import('@/components/timeLine/horizontalSwiper'),
            meta: { title: '横向时间轴', icon: 'form'}
        },
        {
            path:'bubble',
            name:'气泡框',
            component:() => import('@/views/bubble/index'),
            meta:{ title: '气泡框',icon: 'list'}
        },
        {
            path: 'test',
            component: middle,
            name: '练习样例',
            meta: { title: '练习样例',icon: 'list' },
            children: [
              {
                path: 'jigsaw',
                name:'拼图游戏',
                component: () => import('@/views/test/jigsaw'),
                meta: { title: '拼图游戏', icon: 'nested'}
              },
              {
                path: 'formValidate',
                name:'表单校验',
                component: () => import('@/views/test/formValidate'),
                meta: { title: '表单校验', icon: 'form'}
              },
              {
                path: 'collapseList',
                name:'折叠卡片',
                component: () => import('@/views/test/collapseList'),
                meta: { title: '折叠卡片', icon: 'list'}
              },
              {
                path: 'd3Demo',
                name:'d3样例',
                component: () => import('@/views/test/d3Demo'),
                meta: { title: 'd3样例', icon: 'list'}
              }
            ]
        }
      ],
    //  } 
    // ],   
    //设置刚进入系统时的首个路由（/jump）
    beforeEnter: (to, from, next) => {
      //console.log('to11',to);
      if (to.path === '/') next('/data/dashboard')
      else next()
    }
  }
]

export default new Router({
  mode: 'history', //默认值为hash, 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。 设为history则是利用history.pushState API 来完成 URL 跳转而无须重新加载页面。
  scrollBehavior: () => ({ y: 0 }), // 切换到新路由时，页面滚动到纵坐标为0的位置
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: 'treeStructure',
    component: Layout,
    name: 'treeStructure',
    meta: { title: '树形结构', roles: ['admin','editor'], icon: 'link' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/tree/index'),
        meta: { title: '树形结构', icon: 'tree' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    name: '链接',
    meta: { title: '链接', roles: ['admin','editor'], icon: 'link' },
    children: [
      {
        path: 'https://www.baidu.com',
        meta: { title: '链接', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

/*import Vue from "vue";
import VueRouter from "vue-router";
import Login from "components/HelloWorld.vue";
import Home from "views/Home.vue";
import About from "views/About.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/home",
    name: "home",
    //route level code-splitting
    //this generates a separate chunk (about.[hash].js) for this route
    //which is lazy-loaded when the route is visited.
    component: Home
  }
];

const router = new VueRouter({
  routes
});

export default router;*/
