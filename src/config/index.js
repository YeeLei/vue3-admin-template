/**
 * 环境配置
 */

// 环境变量
const env = import.meta.env.MODE || 'production'

console.log(env, 'env')

// 配置
const envConfig = {
  // 开发环境
  dev: {
    baseApi: '/dev-api',
    mockApi: 'https://www.fastmock.site/mock/21de672fe9d25fcefb061ea8ca878037/api',
  },
  // 生产环境
  production: {
    baseApi: '/prod-api',
    mockApi: 'https://www.fastmock.site/mock/21de672fe9d25fcefb061ea8ca878037/api',
  },
}
export default {
  env,
  mock: true, // 是否开启fastmock接口
  namespace: 'module-system',
  ...envConfig[env],
}
