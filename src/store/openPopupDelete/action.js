const updateOpenPopupDelete = openPopupDelete => {
    console.log(openPopupDelete)
    return{
        type: 'UPDATE_OPEN_POPUP_DELETE',
        payload: openPopupDelete
    }
}

export default updateOpenPopupDelete;