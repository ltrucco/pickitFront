const initialState = {openPopupEditCar: false}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_OPEN_POPUP_EDIT_CAR'){
        return{
            ...state,
            openPopupEditCar: action.payload
        }
    }
    return state;
}

export const openPopupEditCarState = state => state.openPopupEditCarReducer.openPopupEditCar