import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { openPopupEditState } from '../../store/openPopupEdit/reducer'
import { selectActiveOwner } from '../../store/owner/reducer'
import { ownersList } from '../../store/owners/reducer'
import { carsList } from '../../store/cars/reducer'
import updateSidebar from '../../store/sidebarMenu/action'
import updateCars from '../../store/cars/action'
import updateOpenPopupEdit from '../../store/openPopupEdit/action'
import updateOpenPopupDelete from '../../store/openPopupDelete/action'
import ListItem from '../ownersPage//components/listItem/ListItem'
import PopupEdit from '../ownersPage//components/popupEdit/PopupEdit'
import PopupDelete from '../ownersPage//components/popupDelete/PopupDelete'
import { openPopupDeleteState } from '../../store/openPopupDelete/reducer'
import CustomButton from '../ownersPage//components/customButton/CustomButton'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Button } from '@mui/material'
import ListItemCar from '../ownersPage/components/listItemCar/ListItemCar'
import { ApiCalls } from '../../components/api/ApiCalls'


const CarsPage = ( { owner, owners, cars, updateSidebar, updateOpenPopupEdit, updateCars, updateOpenPopupDelete, openPopupEdit, openPopupDelete } ) => {

    const [watchedCar, setWatchedCar] = useState( null )

    useEffect(() => {
        ApiCalls.getCars()
        .then( ( res ) => {
          updateCars( res.data )
        } )
        .catch( ( err ) => {
          console.log( err )
        } )
    }, [])

    return (
        <div>
            <div>
                <span className='title'>
                    Listado de automotores
                </span>
                <ul style={{ listStyle: "none", marginTop: '20px' }}>
                    {cars && cars.map( c => <ListItemCar key={c.id} watchedCar={() => setWatchedCar( c )} car={c}
                    // openPopupEdit={() => {
                    //   setSelectedOwner( o )
                    //   updateOpenPopupEdit( true )
                    // }}
                    //   openPopupDelete={() => {
                    //     setSelectedOwner( o )
                    //     updateOpenPopupDelete( true )
                    //   }}
                    /> )}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        owners: ownersList( state ),
        openPopupEdit: openPopupEditState( state ),
        openPopupDelete: openPopupDeleteState( state ),
        cars: carsList( state )
    }
}

export default connect( mapStateToProps, { updateSidebar, updateOpenPopupEdit, updateOpenPopupDelete, updateCars } )( CarsPage )