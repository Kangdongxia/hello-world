import { login, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    id: 0,
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_Id: (state, id) => {
      state.id = id;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            console.log('response',response);
            var status = parseInt(response.status);
            // eslint-disable-next-line eqeqeq
            if (status === 200) {
              var judge = parseInt(response.data);
              if (judge === 1) {
                var user = response.user;
                var role = parseInt(user.role);
                var userToken = "admin-token";
                if (role === 0) {
                  userToken = "editor-token";
                }
                // console.log('userToken', userToken)
                commit("SET_TOKEN", userToken);
                setToken(userToken);       
                var id = parseInt(user.id);
                commit("SET_Id", id);
                resolve();
              } else {
                var message = "";
                if (judge === 0) {
                  message = "该用户不存在，请更换用户名后再次尝试 ";
                } else if (judge === 2) {
                  message = "密码输入错误，请修改密码后再次尝试！";
                } else if (judge === 3) {
                  message = "该用户已受限，无法正常登录！";
                }
                resolve(message);
              }
            } else {
              reject("登录操作失败，请再次尝试！");
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            // console.log('response', response)
            // 由于mockjs 不支持自定义状态码只能这样hack
            var status = parseInt(response.status);
            // eslint-disable-next-line eqeqeq
            if (status === 200) {
              var result = parseInt(response.data);
              if (result === 0) {
                reject("该用户未登录，请登录！");
              } else {
                var user = response.user;
                var role = parseInt(user.role);
                var userRole = ['admin'];
                var userName = "Super Admin";
                var userImage = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
                if (role === 0) {
                  userRole = ['editor'];
                  userName = "Super Editor";
                  userImage = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
                }
                var data = {
                  'roles':userRole,
                  'name':userName,
                  'avatar':userImage
                }
                commit("SET_ROLES", userRole)
                commit("SET_NAME", userName)
                commit("SET_AVATAR", userImage)
                resolve(data);
              }
            } else {
              reject("验证失败，请重新登录");
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登录
    /*Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, password).then(response => {
          // resolve(response)
          console.log('response', response)
          var code = response.code
          if (code === 60204) {
            var message = response.message
            resolve(message)
          } else {
            const data = response.data
            commit('SET_TOKEN', data.token)
            setToken(response.data.token)
            resolve()
          }
        }).catch(error => {
          console.log('error', error)
          reject(error)
        })
      })
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          console.log('getInfoResponse',response);
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { roles, name, avatar } = data
          //roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          //commit('SET_INTRODUCTION', introduction)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },*/

    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resolve();
        /* logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })*/
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
