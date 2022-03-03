const updateOwners = owners => {
    return{
        type: 'UPDATE_OWNERS',
        payload: owners
    }
}

export default updateOwners;