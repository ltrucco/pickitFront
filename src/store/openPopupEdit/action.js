const updateOpenPopupEdit = openPopupEdit => {
    console.log(openPopupEdit)
    return{
        type: 'UPDATE_OPEN_POPUP_EDIT',
        payload: openPopupEdit
    }
}

export default updateOpenPopupEdit;