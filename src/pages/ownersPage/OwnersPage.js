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
import PopupDelete from './components/popupDelete/PopupDelete'
import { openPopupDeleteState } from '../../store/openPopupDelete/reducer'
import CustomButton from './components/customButton/CustomButton'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Button } from '@mui/material'
import { ApiCalls } from '../../components/api/ApiCalls'
import ListItemCar from './components/listItemCar/ListItemCar'

const OwnersPage = ( { owner, owners, cars,  updateSidebar, updateOpenPopupEdit, updateCars, updateOpenPopupDelete, openPopupEdit, openPopupDelete } ) => {

  const [selectedOwner, setSelectedOwner] = useState( null )
  const [watchedOwner, setWatchedOwner] = useState( null )
  const [watchedCar, setWatchedCar] = useState( null )

  useEffect( () => {
    updateSidebar( 2 )
  }, [updateSidebar] )

  useEffect( () => {
    if ( watchedOwner ) {
      updateCars([])
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
              <ul style={{ listStyle: "none", marginTop: '20px' }}>
                {cars &&  cars.map( c => <ListItemCar key={c.id} watchedCar={() => setWatchedCar( c )} car={c} 
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
    cars: carsList(state)
  }
}

export default connect( mapStateToProps, { updateSidebar, updateOpenPopupEdit, updateOpenPopupDelete, updateCars } )( OwnersPage )