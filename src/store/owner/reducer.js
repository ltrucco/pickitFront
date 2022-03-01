const initialState = {owner: {}}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_OWNER'){
        return{
            ...state,
            owner: action.payload
        }
    }
    return state;
}

export const selectActiveOwner = state => state.ownerReducer.owner