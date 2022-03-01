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

function getCars (  ) {
  return api.get( '/cars' )
}

export const ApiCalls = {
    getOwners,
    updateOwners,
    deleteOwners,
    addOwner,
    getCars
}