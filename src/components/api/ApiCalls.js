import api from './api'

function getOwners (  ) {
  return api.get( '/owners' )
}

function updateOwners ( ownerId, params ) {
  return api.put( '/owners/' + ownerId, params )
}

function deleteOwners ( ownerId ) {
  return api.delete( '/owners/' + ownerId )
}

function addOwner ( params ) {
  return api.post( '/owners', params )
}


function addCar ( params ) {
  return api.post( '/cars', params )
}


function getCars ( ) {
  return api.get( '/cars' )
}

function updateCars ( carId, params ) {
  return api.put( '/cars/' + carId, params )
}

function deleteCars ( carId ) {
  return api.delete( '/cars/' + carId )
}

export const ApiCalls = {
    getOwners,
    updateOwners,
    deleteOwners,
    addOwner,
    getCars,
    updateCars,
    deleteCars,
    addCar
}