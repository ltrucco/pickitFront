import React, { useState } from 'react'
import { connect } from 'react-redux'
import { openPopupDeleteState } from '../../../../store/openPopupDelete/reducer'
import { openPopupEditCarState } from '../../../../store/openPopupEditCar/reducer'
import ListItemCar from '../listItemCar/ListItemCar'
import updateSidebar from '../../../../store/sidebarMenu/action'
import updateCars from '../../../../store/cars/action'
import updateOpenPopupEditCar from '../../../../store/openPopupEditCar/action'
import updateOpenPopupDelete from '../../../../store/openPopupDelete/action'
import CustomButton from '../customButton/CustomButton'
import PopupEdit from '../../../carsPage/components/popupEdit/PopupEdit'
import PopupDelete from '../popupDelete/PopupDelete'

const ListCar = ( { cars, updateSidebar, updateOpenPopupEditCar, updateOpenPopupDelete, updateCars, openPopupEditCar, openPopupDelete, addNewCar } ) => {
    const [selectedCar, setSelectedCar] = useState( null )
    const [watchedCar, setWatchedCar] = useState( null )


    const openPopupCar = () => {
        setSelectedCar( null )
        updateOpenPopupEditCar( true )
    }


    return (
        <div>
            <ul style={{ listStyle: "none", marginTop: '20px' }}>
                {cars && cars.map( c => <ListItemCar key={c.id} watchedCar={() => setWatchedCar( c )} car={c}
                    openPopupEdit={() => {
                        setSelectedCar( c )
                        updateOpenPopupEditCar( true )
                    }}
                    openPopupDelete={() => {
                        setSelectedCar( c )
                        updateOpenPopupDelete( true )
                    }}
                /> )}
            </ul>
            {addNewCar && <div style={{ float: 'right', margin: '20px' }}>
                <CustomButton isConfirm={true} handleClick={() => openPopupCar()} text='+ Nuevo automotor' />
            </div>}
            {openPopupEditCar && <PopupEdit disableBackdropClick car={selectedCar} />}
            {openPopupDelete && <PopupDelete disableBackdropClick car={selectedCar} />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        openPopupEditCar: openPopupEditCarState( state ),
        openPopupDelete: openPopupDeleteState( state ),
    }
}

export default connect( mapStateToProps, { updateSidebar, updateOpenPopupEditCar, updateOpenPopupDelete, updateCars } )( ListCar )