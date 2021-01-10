import { setVisible, setHidden } from "./drawerActions"

// ? Set drawer visible : true means visibilty: true
export const setDrawerVisible = () => {
  return (dispatch) => {
    dispatch(setVisible(true))
  }
}

// ? Set drawer hidden : false means visibility: false
export const setDrawerHidden = () => {
  return (dispatch) => {
    dispatch(setHidden(false))
  }
}
