const updateServices = services => {
    return{
        type: 'UPDATE_SERVICES',
        payload: services
    }
}

export default updateServices;