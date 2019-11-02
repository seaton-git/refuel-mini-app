import request from '@/api/request.js'
import util from '@/utils'

/**
 * 上传图片
 * @param {*} params { file: File }
 */
export const uploadFile = function (params) {
  return request.post('/common/file', params, { 'content-type': 'multipart/form-data' }).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}
