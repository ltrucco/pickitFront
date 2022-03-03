const initialState = {openPopupService: false}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_OPEN_POPUP_SERVICE'){
        return{
            ...state,
            openPopupService: action.payload
        }
    }
    return state;
}

export const openPopupServiceState = state => state.openPopupServiceReducer.openPopupService