const updateOpenPopupEditCar = openPopupEditCar => {
    console.log(openPopupEditCar)
    return{
        type: 'UPDATE_OPEN_POPUP_EDIT_CAR',
        payload: openPopupEditCar
    }
}

export default updateOpenPopupEditCar;