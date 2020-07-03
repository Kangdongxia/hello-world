import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {title: '首页',icon: 'dashboard'},
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  // {
  //   path: '/eChartsBar',
  //   component: Layout,
  //   redirect: '/eCharts/bar',
  //   name: '柱状图',
  //   meta: { title: '柱状图'},
  //   children: [
  //     {
  //       //path: '/eCharts/bar/:name',
  //       path: '/eCharts/bar',
  //       name: '柱状图995462',
  //       component: () => import('@/components/eCharts/bar'),
  //       meta: { title: '柱状图', icon: 'form'}
  //     }
  //   ]
  // },
  // {
  //   path: '/tinymce',
  //   component: Layout,
  //   redirect: '/Tinymce/index',
  //   name: '没用插件tinymce例子',
  //   meta: { title: '没用插件tinymce例子'},
  //   children: [
  //     {
  //       path: '/Tinymce/index',
  //       component: () => import('@/components//Tinymce/index'),
  //       meta: { title: '没用插件tinymce例子', icon: 'form'}
  //     }
  //   ]
  // },
  {
    path: '/tinymce2',
    component: Layout,
    redirect: '/Tinymce/index3',
    name: '自己封装Tinymce例子',
    meta: { title: '自己封装Tinymce例子'},
    children: [
      {
        path: '/Tinymce/index3',
        component: () => import('@/components//Tinymce/index_selfPacking'),
        meta: { title: '自己封装的Tinymce例子', icon: 'form'}
      }
    ]
  },
  // {
  //   path: '/brotherNodePassValue',
  //   component: Layout,
  //   redirect: '/brotherNodePassValue/index',
  //   name: 'brotherNodePassValue',
  //   meta: { title: '兄弟节点传值'},
  //   children: [
  //     {
  //       path: '/brotherNodePassValue/index',
  //       component: () => import('@/components/brotherNodePassValue/index'),
  //       meta: { title: '兄弟节点传值', icon: 'form'}
  //     }
  //   ]
  // },
  {
    path: '/timePicker',
    component: Layout,
    redirect: '/timePicker/index',
    name: 'timePicker',
    meta: { title: '时间选择器'},
    children: [
      {
        path: '/timePicker/index',
        name: '时间选择器8956', //配置了name属性this.$route.name 和 this.$router.history.current.name才有值
        component: () => import('@/components/timePicker/index'),
        meta: { title: '时间选择器', icon: 'edit'}
      }
    ]
  },
  // {
  //   path: '/verticalTimeLine',
  //   component: Layout,
  //   redirect: '/timeLine/vertical',
  //   name: 'verticalTimeLine',
  //   meta: { title: '纵向时间轴'},
  //   children: [
  //     {
  //       path: '/timeLine/vertical',
  //       component: () => import('@/components/timeLine/vertical'),
  //       meta: { title: '纵向时间轴', icon: 'form'}
  //     }
  //   ]
  // },
  {
    path: '/horizontalTimeLine',
    component: Layout,
    redirect: '/timeLine/horizontal',
    name: 'horizontalTimeLine',
    meta: { title: '横向时间轴'},
    children: [
      {
        path: '/timeLine/horizontal',
        component: () => import('@/components/timeLine/horizontalSwiper'),
        meta: { title: '横向时间轴', icon: 'form'}
      }
    ]
  }, 
  // {
  //   path: '/swiperDemo',
  //   component: Layout,
  //   redirect: '/timeLine/swiperDemo',
  //   name: 'swiperDemo',
  //   meta: { title: 'swiperDemo'},
  //   children: [
  //     {
  //       path: '/timeLine/swiperDemo',
  //       component: () => import('@/components/timeLine/swiperDemo'),
  //       meta: { title: 'swiper例子', icon: 'form'}
  //     }
  //   ]
  // },
  {
    path:'/BubbleBox',
    component:Layout,
    name:'bubbleBoxDemo',
    meta:{ title: 'bubbleBoxDemo'},
    children:[
      {
        path:'/bubble/index',
        component:() => import('@/views/bubble/index'),
        meta:{ title: '气泡框',icon: 'list'}
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    name: '练习样例',
    meta: { title: '练习样例',icon: 'list' },
    children: [
      {
        path: '/test/jigsaw',
        component: () => import('@/views/test/jigsaw'),
        meta: { title: '拼图游戏', icon: 'nested'}
      },
      {
        path: '/test/formValidate',
        component: () => import('@/views/test/formValidate'),
        meta: { title: '表单校验', icon: 'form'}
      },
      {
        path: '/test/collapseList',
        component: () => import('@/views/test/collapseList'),
        meta: { title: '折叠卡片', icon: 'list'}
      }
    ]
  }
]

export default new Router({
  mode: 'history', //默认值为hash, 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。 设为history则是利用history.pushState API 来完成 URL 跳转而无须重新加载页面。
  scrollBehavior: () => ({ y: 0 }), // 切换到新路由时，页面滚动到纵坐标为0的位置
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/treeStructure',
    component: Layout,
    redirect: '/treeNode/index',
    name: 'treeStructure',
    meta: { title: '树形结构', roles: ['admin'], icon: 'link' },
    children: [
      {
        path: '/treeNode/index',
        component: () => import('@/views/tree/index'),
        meta: { title: '树形结构', icon: 'tree' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    name: '链接',
    meta: { title: '链接', roles: ['admin'], icon: 'link' },
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
