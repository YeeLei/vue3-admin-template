import request from '@/utils/request'

/**
 * @method addUserLogin 登录
 * @param {*} data
 * @returns
 */
export function addUserLogin(data) {
  if (data.username === 'admin') {
    return request({
      url: '/user/login',
      method: 'post',
      data,
    })
  }
  return Promise.resolve({ data: { token: 'chaodan-token' } })
}

/**
 * @method addUserInfo 用户信息
 * @param {*} data
 * @returns
 */
export function addUserInfo(data) {
  if (data.token === 'yfl-token') {
    return request({
      url: '/user/info',
      data,
    })
  }
  return Promise.resolve({
    data: {
      roles: ['dev'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'dev',
    },
  })
}
