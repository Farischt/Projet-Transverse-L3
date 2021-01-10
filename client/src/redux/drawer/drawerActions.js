import { SET_DRAWER_VISIBLE, SET_DRAWER_HIDDEN } from "./drawerTypes"

export const setVisible = (visible) => {
  return {
    type: SET_DRAWER_VISIBLE,
    payload: visible,
  }
}

export const setHidden = (hidden) => {
  return {
    type: SET_DRAWER_HIDDEN,
    payload: hidden,
  }
}
