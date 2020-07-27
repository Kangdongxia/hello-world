/* eslint-disable no-trailing-spaces */

import { asyncRouterMap, constantRouterMap } from "@/router";

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // return roles.some(role => route.meta.roles.includes(role))
    // return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    return route.meta.roles.indexOf(roles[0]) >= 0;
  } else {
    return true;
  }
}

export function filterAsyncRoutes(routes, roles) {
  // console.log('roles',roles);
  const res = [];
  routes.forEach(route => {
    //console.log('route',route);
    const tmp = { ...route };
    //console.log('tmp',tmp);
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      // console.log('routes', routes.length)
      state.routes = constantRouterMap.concat(routes);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRoutes;
        if (roles.includes("admin")) {
          accessedRoutes = asyncRouterMap;
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles);
        }
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    }
  }
};

/* const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      console.log('willaddRouters', state.addRouters.length)   
      state.routers = constantRouterMap.concat(routers)
      console.log('finalRouters', state.routers.length)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = asyncRouterMap.filter(v => {
          if (roles.indexOf('admin') >= 0) return true
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        }) 
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}*/

export default permission;
