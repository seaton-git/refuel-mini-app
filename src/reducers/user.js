import { UPDATE } from '../constants/user'

const INITIAL_STATE = {
  id: ''
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE:
    return {
      ...state,
      ...action.data
    }
  default:
    return state
  }
}
