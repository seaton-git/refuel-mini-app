/**
 * 当前用户登录信息
 */
import Taro from '@tarojs/taro'

const token = 'token'
const userInfo = 'userInfo'
const lastCarIndex = 'lastCarIndex'

export const getToken = async function() {
  return await Taro.getStorage({ key: token })
    .then(res => {
      return res.data
    })
    .catch(() => {
      return ''
    })
}

export const setToken = async function(data) {
  return await Taro.setStorage({ key: token, data })
}

export const getUserInfo = async function() {
  return await Taro.getStorage({ key: userInfo })
    .then(res => {
      return res.data
    })
    .catch(() => {
      return ''
    })
}

export const setUserInfo = async function(data = {}) {
  return await Taro.setStorage({ key: userInfo, data })
}

export const getLastCarIndex = function () {
  return Taro.getStorageSync(lastCarIndex)
}

export const setLastCarIndex = function (data) {
  return Taro.setStorageSync(lastCarIndex, data)
}
