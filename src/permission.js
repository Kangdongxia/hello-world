import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.includes('admin')) return true // admin permission passed directly
  if (!permissionRoles) return true //如果要到达的目的页面没有权限规定（默认任何角色都可以）
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login'] // 不重定向白名单
//在跳转之前执行
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  //console.log('token-data',getToken());
  if (getToken()) {
    // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetInfo')
          .then(res => {
            // 拉取user_info
            const roles = store.getters.roles // note: roles must be a object array! such as: [{id: '1', name: 'editor'}, {id: '2', name: 'developer'}]
            // console.log('roles', roles)
            store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
              // 根据roles权限生成可访问的路由表
              // var length = accessRoutes.length
              // for (var i = 0; i < length; i++) {  
              //   console.log('data',accessRoutes[i])                 
              //     router.options.routes.push(accessRoutes[i])               
              // }
              // router.addRoutes(accessRoutes) // 动态添加可访问路由表
              console.log('to',to)
              //next({ ...to, replace: true })
              next({ path:'/data/dashboard', replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err)
              next({ path: '/login' })
            })
          })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

//在跳转之后执行
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
