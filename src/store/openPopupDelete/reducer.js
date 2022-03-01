const initialState = {openPopupDelete: false}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_OPEN_POPUP_DELETE'){
        return{
            ...state,
            openPopupDelete: action.payload
        }
    }
    return state;
}

export const openPopupDeleteState = state => state.openPopupDeleteReducer.openPopupDelete