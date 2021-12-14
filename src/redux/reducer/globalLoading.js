/* eslint-disable default-param-last */
import { ISLOADING } from '../actionType'

const initState = { isLoading: false }
export default function loading(pre = initState, action) {
  const { type, data } = action

  switch (type) {
    case ISLOADING:
      return { ...pre, isLoading: data }

    default:
      return pre
  }
}
