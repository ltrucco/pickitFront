const initialState = {services: []}
//eslint-disable-next-line
export default (state = initialState, action) => {
    if (action.type === 'UPDATE_SERVICES'){
        return{
            ...state,
            services: action.payload
        }
    }
    return state;
}

export const servicesList = state => state.servicesReducer.services