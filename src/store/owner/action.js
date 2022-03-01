const updateOwner = owner => {
    console.log(owner)
    return{
        type: 'UPDATE_OWNER',
        payload: owner
    }
}

export default updateOwner;