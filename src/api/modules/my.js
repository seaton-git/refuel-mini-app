import request from '@/api/request.js'
import util from '@/utils'

/**
 * 登录
 * @param {*} parmas { phoneNumber: String, password: String }
 */
export const login = function (parmas) {
  return request.post('/member/login', parmas).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}

/**
 * 更新用户昵称、头像
 * @param {*} params { nickName: String, headImage: String }
 */
export const updateMemberInfo = function (params) {
  return request.post('/member/nick_name', params).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}
