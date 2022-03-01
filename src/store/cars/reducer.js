const initialState = {cars: []}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_CARS'){
        return{
            ...state,
            cars: action.payload
        }
    }
    return state;
}

export const carsList = state => state.carsReducer.cars