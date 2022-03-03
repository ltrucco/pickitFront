const updateOwner = owner => {
    return{
        type: 'UPDATE_OWNER',
        payload: owner
    }
}

export default updateOwner;