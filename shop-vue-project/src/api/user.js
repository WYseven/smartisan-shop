import Axios from 'axios'

const instance = Axios.create({
  baseURL: `http://127.0.0.1:7001/api/v1`,
  withCredentials: true
})

/**
 * 用户注册
 * @param {Number} username 用户名
 * @param {Number} password      密码
 */

export function register(params = { username:'', password:'' }) {
  return instance.post('/register', params)
}