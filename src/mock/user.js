//import { param2Obj } from './utils'

const tokens = {
  'admin': {
    token: 'admin-token'
  },
  'editor': {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    role:1,
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    role:0,
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  login: res => {
    console.log('res', res)
    const { username } = { 'username': res.body.substring(9,15)+'-token'}
    const data = users[username]
    console.log('data', data)
    if (data) {
      return {
        status: 200,
        data:1,
        user: data
      }
    } else {
      return {
        code: 60204,
        message: 'Account and password are incorrect.'
      }
    }
  },
  getInfo: res => {
    const { token } = {'token':res.body.substring(6)};
    console.log('token-accept', token);
    const info = users[token]
    if (info) {
      return {
        status: 200,
        data:1,
        user: info
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  logout: () => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}
