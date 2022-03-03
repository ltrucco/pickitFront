import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { openPopupEditState } from '../../store/openPopupEdit/reducer'
import { selectActiveOwner } from '../../store/owner/reducer'
import { ownersList } from '../../store/owners/reducer'
import { carsList } from '../../store/cars/reducer'
import { servicesList } from '../../store/services/reducer'
import updateSidebar from '../../store/sidebarMenu/action'
import updateCars from '../../store/cars/action'
import updateServices from '../../store/services/action'
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
import ListCar from '../shared/components/listCar/ListCar'
import updateOwners from '../../store/owners/action'
import { useLocation } from 'react-router-dom'
import Select from '../servicesPage/components/select/Select'
import OwnerCard from './components/ownerCard/OwnerCard'
import CarCard from './components/carCard/CarCard'
import ServicesCard from './components/servicesCard/ServicesCard'

const OwnersPage = ( { owner, owners, cars, services, updateSidebar, updateOpenPopupEdit, updateCars, updateOpenPopupDelete, openPopupEdit, openPopupDelete, updateOwners, updateServices } ) => {

  const [selectedOwner, setSelectedOwner] = useState( null )
  const [watchedOwner, setWatchedOwner] = useState( null )
  const [watchedCar, setWatchedCar] = useState( null )
  const [carToAssociate, setCarToAssociate] = useState( null )
  const [statements, setStatements] = useState( [] )
  const [statementsWithItems, setStatementsWithItems] = useState( [] )
  const location = useLocation();

  useEffect( () => {
    if ( location.state?.owner ) {
      setWatchedOwner( location.state.owner )
    }
    if ( location.state?.car ) {
      setWatchedCar( location.state.car )
      let ownerAux = owners.find( o => o.id === location.state.car.ownerId )
      setWatchedOwner( ownerAux )
    }
  }, [] )

  useEffect( () => {
    if ( watchedCar ) {
      if ( services.length === 0 ) {
        getServices()
      }
      getStatements()

    }
  }, [watchedCar] )

  useEffect( () => {
    if ( statements.length > 0 ) {
      ApiCalls.getStatementsItems()
        .then( ( res ) => {
          let statamentsAux = [...statements]
          statamentsAux.forEach( s => {
            let statementItemsAux = []
            res.data.forEach( si => {
              if ( si.statementId == s.id ) {
                statementItemsAux.push( si )
              }
            } )
            s.items = statementItemsAux
          } )
          setStatementsWithItems( statamentsAux )
        } )

        .catch( ( err ) => {
          console.log( err )
        } )
    }
  }, [statements] )

  useEffect( () => {
    updateSidebar( 2 )
  }, [updateSidebar] )

  useEffect( () => {
    if ( owners.length < 1 ) {
      getOwners()
    }
  }, [updateOwners] )

  useEffect( () => {
    updateOpenPopupDelete( true )
  }, [carToAssociate] )

  useEffect( () => {
    if ( watchedOwner ) {
      updateCars( [] )
      getCars()
    }
  }, [watchedOwner, updateCars] )

  const getOwners = () => {
    ApiCalls.getOwners()
      .then( ( res ) => {
        updateOwners( res.data )
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
  }

  const getCars = () => {
    ApiCalls.getCars()
      .then( ( res ) => {
        updateCars( res.data )
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
  }

  const getServices = () => {
    ApiCalls.getServices()
      .then( ( res ) => {
        updateServices( res.data )
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
  }

  const getStatements = () => {
    ApiCalls.getStatements()
      .then( ( res ) => {
        setStatements( res.data.filter( s => s.carId === watchedCar.id ) )
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
  }

  const openPopupOwner = () => {
    setSelectedOwner( null )
    updateOpenPopupEdit( true )
  }

  const ownerCars = () => {
    return cars.filter( c => c.ownerId === watchedOwner.id ) ?? []
  }

  const deleteOwner = ( ow ) => {
    ApiCalls.deleteOwners( ow.id )
      .then( ( res ) => {
        updateOpenPopupDelete( false )
        getOwners()
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
  }

  const associateCar = ( obj ) => {
    obj.ownerId = watchedOwner.id
    ApiCalls.updateCars( obj.id, obj )
      .then( () => {
        getCars()
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
    setCarToAssociate( null )
  }

  const drawOwnersSection = () => {
    return (
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
      </>
    )
  }

  const returnButton = ( type ) => {
    return (
      <Button variant="contained" style={{ backgroundColor: 'transparent', color: '#000', border: 'none', boxShadow: 'none', float: 'right' }}
        startIcon={<KeyboardArrowLeft />} onClick={() => { type == 'owner' ? setWatchedOwner( null ) : setWatchedCar( null ) }} >
        Regresar
      </Button>
    )
  }

  const drawOwnerCarsSection = () => {
    return (
      <>
        <div>
          <span className='title'>
            Propietario/a
          </span>
          {returnButton( 'owner' )}
          <div>
            <ul style={{ listStyle: "none", marginTop: '20px', width: '80%' }}>
              <ListItem key={'owner' + watchedOwner.id} owner={watchedOwner} viewOnly={true} />
            </ul>
          </div>
          <div style={{ paddingTop: '50px' }}>
            <span className='title'>
              Automotores asignados
            </span>
            {ownerCars().length > 0 ? <ListCar setWatchedCar={( c ) => setWatchedCar( c )} cars={ownerCars()} /> :
              <div style={{ marginTop: '20px' }}>
                <span className='title'>
                  No posee autos asociados
                </span>
              </div>}

          </div>
          <div style={{ paddingTop: '50px' }}>
            <span className='title'>
              Asociar nuevo automotor
            </span>
            <div style={{ paddingTop: '20px' }}>
              <Select data={cars.filter( c => !c.ownerId )} value={carToAssociate} field1='domain' handleChangeSelectedOption={( e, v ) => setCarToAssociate( v )} placeholder='Ingrese un dominio' />
            </div>
          </div>
        </div>
      </>
    )
  }

  const drawCarSection = () => {
    return (
      <>
        {returnButton( 'car' )}
        <span className='title'>
          Propietario/a
        </span>
        <OwnerCard owner={watchedOwner} />
        <CarCard car={watchedCar} />
        <ServicesCard services={services} statementsWithItems={statementsWithItems}/>
      </>
    )
  }

  return (
    <>
      {!watchedOwner ? drawOwnersSection() : ( watchedCar ? drawCarSection() : drawOwnerCarsSection() )}
      {openPopupEdit && <PopupEdit disableBackdropClick owner={selectedOwner} />}
      {openPopupDelete && <PopupDelete title={`¿Seguro deseas ${carToAssociate ? 'asociar este automotor' : 'eliminar este propietario'}?`}
        subtitle={`${carToAssociate ? 'Esta accion puede revertirse luego' : 'Al eliminarlo se perderán los cambios realizados hasta el momento, de forma permanente.'}`}
        confirmAction={( ow ) => carToAssociate ? associateCar( ow ) : deleteOwner( ow )} disableBackdropClick owner={selectedOwner} car={carToAssociate} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    owner: selectActiveOwner( state ),
    owners: ownersList( state ),
    openPopupEdit: openPopupEditState( state ),
    openPopupDelete: openPopupDeleteState( state ),
    cars: carsList( state ),
    services: servicesList( state )
  }
}

export default connect( mapStateToProps, { updateSidebar, updateOpenPopupEdit, updateOpenPopupDelete, updateCars, updateOwners, updateServices } )( OwnersPage )