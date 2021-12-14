/* eslint-disable default-param-last */
import {
  LOGIN,
  LOGOUT,
} from '../actionType'

const sessionStorageIsLogin = JSON.parse(window.sessionStorage.getItem('isLogin'))
const sessionStorageUsername = window.sessionStorage.getItem('username')
const initState = {
  username: sessionStorageUsername || '',
  isLogin: sessionStorageIsLogin || false,
}

export default function loginReducer(pre = initState, action) {
  // console.log(pre)
  const { type, username } = action
  switch (type) {
    case LOGIN:
      return { ...pre, username, isLogin: true }

    case LOGOUT:
      return { ...pre, username: '', isLogin: false }

    default:
      return pre
  }
}
