const initialState = {sidebarOption: 0}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_SIDEBAR_OPTION'){
        return{
            ...state,
            sidebarOption: action.payload
        }
    }
    return state;
}

export const selectedSidebarOption = state => state.sidebarReducer.sidebarOption