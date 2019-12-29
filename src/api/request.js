import Taro from '@tarojs/taro'
import { getToken, clearUser } from '@/utils/auth'
import config from '@/config'
import util from '@/utils'

/**
 * 请求
 *
 * @param {*} method 请求方法，暂定 get/post
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 * @param {*} header 请求头
 * @returns {*} {code: 0/statusCode/1, data: any, message: String}
 */
const request = async function(method, url, data, header) {
  const token = await getToken()

  if (url.indexOf('http') !== 0) {
    url = config.baseServer + url
  }

  return Taro.request({
    url,
    data,
    method,
    header: {
      ...{
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'content-type': 'application/json'
      },
      ...header
    }
  }).then(res => {
    if (res.statusCode === 200) {
      return res
    }

    // 鉴权失败，清除本地已存在用户信息
    if (res.statusCode === 401) {
      clearUser()
    }

    return Promise.reject({ code: res.statusCode, message: util.getWithNil(res.data, 'message', '请求服务端异常') })
  }).catch(e => {
    return Promise.reject({ code: e.code || 1, message: e.message || e.errMsg })
  })
}

export default {
  get(url, params, header) {
    return request('GET', url, params, header)
  },

  post(url, data, header) {
    return request('POST', url, data, header)
  },

  del(url, params, header) {
    return request('DELETE', url, params, header)
  }
}
