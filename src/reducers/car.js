import { UPDATE_CAR } from '../constants/car'

const INITIAL_STATE = {}

export default function car (state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_CAR:
    return {
      ...state,
      ...action.data
    }
  default:
    return state
  }
}
