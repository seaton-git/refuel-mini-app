import request from '@/api/request.js'
import util from '@/utils'

/**
 * 获取车辆列表
 */
export const getCarList = function ({ userId }) {
  return request.get(`/fuel/car?userId=${userId}`).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}

/**
 * 获取车辆信息
 * @param {*} id 车辆id
 */
export const getCaretail = function(id) {
  return request.get(`/fuel/car/${id}`).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}

/**
 * 添加车辆信息
 * @param {*} car 车辆信息
 */
export const addCar = function(car) {
  return request.post('/fuel/car', car).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}

/**
 * 删除车辆
 * @param {*} id 车辆id
 */
export const delCar = function(id) {
  return request.del(`/fuel/car/${id}`).then(res => {
    return util.getWithNil(res, 'data', {})
  })
}
