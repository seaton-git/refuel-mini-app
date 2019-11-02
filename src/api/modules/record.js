import request from '@/api/request.js'
import util from '@/utils'

/**
 * 添加加油记录
 * @param {*} record 记录
 */
export const addRecord = function(record) {
  return request.post('/fuel/record', record).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}

/**
 * 获取加油记录
 */
export const getRecordList = function (params) {
  return request.get('/fuel/record', params).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}
