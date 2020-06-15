import request from "@/utils/request";

export function login(username, password) {
  //console.log('logining');
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  //console.log('token',token);
  return request({
    url: '/user/getInfo',
    method: 'get',
    data: { token }
  })
}

// export function getInfo(userId) {
//   console.log("userId", userId);
//   return request({
//     url: "/getUserById.do",
//     method: "post",
//     data: {
//       id: userId
//     }
//   });
// }

// export function login(username, password) {
//   console.log("username", username);
//   console.log("password", password);
//   return request({
//     url: "/login.do",
//     method: "post",
//     data: {
//       name: username,
//       password: password
//     }
//   });
// }



export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}
