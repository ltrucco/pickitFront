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
import ListItem from './components/listItem/ListItem'
import PopupEdit from './components/popupEdit/PopupEdit'
import PopupDelete from '../shared/components/popupDelete/PopupDelete'
import { openPopupDeleteState } from '../../store/openPopupDelete/reducer'
import CustomButton from '../shared/components/customButton/CustomButton'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Button } from '@mui/material'
import { ApiCalls } from '../../components/api/ApiCalls'
import ListItemCar from '../shared/components/listItemCar/ListItemCar'
import ListCar from '../shared/components/listCar/ListCar'
import updateOwners from '../../store/owners/action'

const OwnersPage = ( { owner, owners, cars, updateSidebar, updateOpenPopupEdit, updateCars, updateOpenPopupDelete, openPopupEdit, openPopupDelete, updateOwners } ) => {

  const [selectedOwner, setSelectedOwner] = useState( null )
  const [watchedOwner, setWatchedOwner] = useState( null )
  const [watchedCar, setWatchedCar] = useState( null )

  useEffect( () => {
    updateSidebar( 2 )
  }, [updateSidebar] )

  useEffect( () => {
    if ( owners.length < 1 ) {
      ApiCalls.getOwners()
        .then( ( res ) => {
          updateOwners( res.data )
        } )
        .catch( ( err ) => {
          console.log( err )
        } )
    }
  }, [updateOwners] )

  useEffect( () => {
    if ( watchedOwner ) {
      updateCars( [] )
      ApiCalls.getCars()
        .then( ( res ) => {
          updateCars( res.data )
        } )
        .catch( ( err ) => {
          console.log( err )
        } )
    }
  }, [watchedOwner, updateCars] )

  const openPopupOwner = () => {
    setSelectedOwner( null )
    updateOpenPopupEdit( true )
  }

  const ownerCars = () => {
    return cars.filter( c => c.ownerId === watchedOwner.id ) ?? []
  }

  return (
    <>
      {!watchedOwner ?
        <>
          <div>
            <span className='title'>
              Listado de propietarios
            </span>
            <ul style={{ listStyle: "none", marginTop: '20px' }}>
              {owners.map( o => <ListItem key={o.id} watchedOwner={() => setWatchedOwner( o )} owner={o} openPopupEdit={() => {
                setSelectedOwner( o )
                updateOpenPopupEdit( true )
              }}
                openPopupDelete={() => {
                  setSelectedOwner( o )
                  updateOpenPopupDelete( true )
                }}
              /> )}
            </ul>
          </div>
          <div style={{ float: 'right', margin: '20px' }}>
            <CustomButton isConfirm={true} handleClick={() => openPopupOwner()} text='+ Nuevo propietario' />
          </div>
          {openPopupEdit && <PopupEdit disableBackdropClick owner={selectedOwner} />}
          {openPopupDelete && <PopupDelete disableBackdropClick owner={selectedOwner} />}
        </> :
        <>
          <div>
            <span className='title'>
              Propietario/a
            </span>
            <Button variant="contained" style={{ backgroundColor: 'transparent', color: '#000', border: 'none', boxShadow: 'none', float: 'right' }}
              startIcon={<KeyboardArrowLeft />} onClick={() => setWatchedOwner( null )} >
              Regresar
            </Button>
            <div>
              <ul style={{ listStyle: "none", marginTop: '20px', width: '80%' }}>
                <ListItem key={watchedOwner.id} owner={watchedOwner} viewOnly={true} />
              </ul>
            </div>
            <div style={{ paddingTop: '50px' }}>
              <span className='title'>
                Automotores asignados
              </span>
              {ownerCars().length > 0 ? <ListCar cars={ownerCars()} /> :
                <div style={{ marginTop: '20px' }}>
                  <span className='title'>
                    No posee autos asociados
                  </span>
                </div>}

            </div>
          </div>
        </>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    owner: selectActiveOwner( state ),
    owners: ownersList( state ),
    openPopupEdit: openPopupEditState( state ),
    openPopupDelete: openPopupDeleteState( state ),
    cars: carsList( state )
  }
}

export default connect( mapStateToProps, { updateSidebar, updateOpenPopupEdit, updateOpenPopupDelete, updateCars, updateOwners } )( OwnersPage )