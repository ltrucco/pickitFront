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
import { ApiCalls } from '../../../../components/api/ApiCalls'

const ListCar = ( { cars, updateSidebar, updateOpenPopupEditCar, updateOpenPopupDelete, updateCars, openPopupEditCar, openPopupDelete, addNewCar, setWatchedCar } ) => {
    const [selectedCar, setSelectedCar] = useState( null )


    const openPopupCar = () => {
        setSelectedCar( null )
        updateOpenPopupEditCar( true )
    }

    const deleteCar = ( ca ) => {
        ApiCalls.deleteCars( ca.id )
            .then( ( res ) => {
                ApiCalls.getCars()
                    .then( ( res ) => {
                        updateCars( res.data )
                    } )
                    .catch( ( err ) => {
                        console.log( err )
                    } )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
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
            {openPopupDelete && <PopupDelete title={'¿Seguro deseas eliminar este automotor?'}
                subtitle={'Al eliminarlo se perderán los cambios realizados hasta el momento, de forma permanente.'}
                confirmAction={( ca ) => deleteCar( ca )}
                disableBackdropClick car={selectedCar} />}

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