/* eslint-disable default-param-last */
/* eslint-disable no-case-declarations */
import {
  ADDSHOPCAR,
  ADDCOUNT,
  ODDCOUNT,
  DELETE,
  SELECTED,
  ALLSELECTED,
} from '../actionType'

const carList = []
export default function countReducer(pre = carList, action) {
  // console.log(pre,action);
  const { type, selected: isSelect, data = {} } = action
  const {
    key, name, price, selected,
  } = data
  switch (type) {
    case ADDSHOPCAR:
      const newState = [...pre]
      if (newState.find((item) => item.key === key) === undefined) {
        newState.push({
          key, name, count: 1, price, selected,
        })
      } else {
        newState.find((item) => item.key === key).count += 1
      }
      return newState

    case ADDCOUNT:
      const addCount = pre.map((item) => {
        if (item.key === key) {
          item.count += 1
        }
        return item
      })
      return addCount

    case ODDCOUNT:
      const oddCount = pre.map((item) => {
        if (item.key === key) {
          item.count = item.count > 1 ? item.count - 1 : 1
        }
        return item
      })
      return oddCount

    case DELETE:
      const deletedShopCar = pre.filter((item) => item.key !== key)
      return deletedShopCar

    case SELECTED:
      const newState2 = [...pre]
      newState2.find((item) => item.key === key).selected = isSelect
      return newState2

    case ALLSELECTED:
      const newState3 = pre.map((item) => {
        item.selected = isSelect
        return item
      })
      return newState3

    default:
      return pre
  }
}
