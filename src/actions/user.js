/*
 * @description: 用户 action
 * @author: 王旭东
 * @date: 2019-11-02 14:09:39
*/
import { UPDATE } from '../constants/user'

export const update = (data) => {
  return {
    data,
    type: UPDATE
  }
}
