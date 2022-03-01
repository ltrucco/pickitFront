import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import updateCars from '../../store/cars/action'
import { ApiCalls } from '../../components/api/ApiCalls'
import ListCar from '../shared/components/listCar/ListCar'
import { carsList } from '../../store/cars/reducer'


const CarsPage = ( { cars, updateCars } ) => {


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
                <ListCar addNewCar cars={cars}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
  return {
      cars: carsList( state ),

  }
}

export default connect( mapStateToProps, {updateCars } )( CarsPage )