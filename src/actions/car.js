/*
 * @description: 车辆 action
 * @author: 王旭东
 * @date: 2019-11-02 14:04:30
*/
import { UPDATE_CAR } from '../constants/car'

export const update = (data) => {
  return {
    data,
    type: UPDATE_CAR
  }
}
