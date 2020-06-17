import { getTableInfo } from "@/api/tableData";

const tableData = {
  /*mutations: {
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
  },*/

  actions: {
    // 获取用户信息
    GetTableInfo({ commit }, tableInfo) {
      return new Promise((resolve, reject) => {
        let currentPage = tableInfo.params.currentPage;
        let currentPerNumber = tableInfo.params.currentPerNum; 
        getTableInfo(currentPage,currentPerNumber)
          .then(response => {
            // 由于mockjs 不支持自定义状态码只能这样hack
            let status = parseInt(response.status);
            let loginFlag = parseInt(response.data);
            // eslint-disable-next-line eqeqeq
            if ((status === 100)&&(loginFlag===1)) {
                let tableList = response.userList;  
                resolve(tableList);       
            } else {
              reject(0);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }  
  }
};

export default tableData;
