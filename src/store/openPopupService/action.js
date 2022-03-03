const updateOpenPopupService = openPopupService => { 
    console.log(openPopupService)
    return{
        type: 'UPDATE_OPEN_POPUP_SERVICE',
        payload: openPopupService
    }
}

export default updateOpenPopupService;