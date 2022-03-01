const initialState = {owners: []}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_OWNERS'){
        return{
            ...state,
            owners: action.payload
        }
    }
    return state;
}

export const ownersList = state => state.ownersReducer.owners