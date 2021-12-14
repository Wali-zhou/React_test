import {
  ADDSHOPCAR,
  ADDCOUNT,
  ODDCOUNT,
  DELETE,
  SELECTED,
  ALLSELECTED,
  LOGIN,
  ISLOADING,
  LOGOUT,
} from '../actionType'

export const addShopCarAction = (data) => ({ type: ADDSHOPCAR, data })
export const addCountAction = (data) => ({ type: ADDCOUNT, data })
export const oddCountAction = (data) => ({ type: ODDCOUNT, data })
export const deleteFromShopCarAction = (data) => ({ type: DELETE, data })
export const changeSelectedAction = (data, selected) => ({ type: SELECTED, data, selected })
export const changeAllSelectedAction = (selected) => ({ type: ALLSELECTED, selected })
export const loginAction = (username) => ({ type: LOGIN, username })
export const isloadingAction = (data) => ({ type: ISLOADING, data })
export const logoutAction = () => ({ type: LOGOUT })
