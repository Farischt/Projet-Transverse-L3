import { SET_DRAWER_VISIBLE, SET_DRAWER_HIDDEN } from "./drawerTypes"

const initialState = {
  visibility: true,
}

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRAWER_VISIBLE:
      return {
        visibility: action.payload,
      }
    case SET_DRAWER_HIDDEN:
      return {
        visibility: action.payload,
      }
    default: {
      return state
    }
  }
}
