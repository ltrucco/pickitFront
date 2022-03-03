import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import updateCars from '../../store/cars/action'
import { ApiCalls } from '../../components/api/ApiCalls'
import ListCar from '../shared/components/listCar/ListCar'
import { carsList } from '../../store/cars/reducer'
import { useNavigate } from 'react-router-dom'


const CarsPage = ( { cars, updateCars } ) => {
    const navigate = useNavigate();
    const [watchedCar, setWatchedCar] = useState(null)

    useEffect(()=> {
        if (watchedCar)
            navigate("/propietarios",{state: {car:watchedCar}});
    }, [watchedCar ])

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
                <ListCar setWatchedCar={( c ) => setWatchedCar( c )} addNewCar cars={cars}/>
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