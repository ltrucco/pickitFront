const updateOwners = owners => {
    console.log(owners)
    return{
        type: 'UPDATE_OWNERS',
        payload: owners
    }
}

export default updateOwners;