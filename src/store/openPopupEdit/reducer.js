const initialState = {openPopupEdit: false}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_OPEN_POPUP_EDIT'){
        return{
            ...state,
            openPopupEdit: action.payload
        }
    }
    return state;
}

export const openPopupEditState = state => state.openPopupEditReducer.openPopupEdit