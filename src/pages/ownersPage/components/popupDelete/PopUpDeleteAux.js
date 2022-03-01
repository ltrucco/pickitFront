import { Dialog, DialogContent, Grid } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { openPopupDeleteState } from '../../../../store/openPopupDelete/reducer'
import updateOpenPopupDelete from '../../../../store/openPopupDelete/action'
import { ApiCalls } from '../../../../components/api/ApiCalls'
import updateOwners from '../../../../store/owners/action'
import CustomButton from '../customButton/CustomButton'

const PopupDelete = ( { disableBackdropClick, updateOpenPopupDelete, openPopupDelete, owner } ) => {

  const deleteOwner = () => {
    ApiCalls.deleteOwners( owner.id )
      .then( ( res ) => {
        getOwners()
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
  }

  const getOwners = () => {
    ApiCalls.getOwners()
      .then( ( res ) => {
        updateOwners( res.data )
      } )
      .catch( ( err ) => {
        console.log( err )
      } )
  }

  return (
    <>
      {owner && <Dialog
        style={{ textAlign: "center" }}
        maxWidth='md'
        fullWidth={true}
        open={openPopupDelete}
        onClose={( event, reason ) => {
          if ( !disableBackdropClick ) {
            updateOpenPopupDelete( false )
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '30px 0px' }} id="alert-dialog-title">
          Seguro deseas eliminar este propietario?
        </div>
        <DialogContent>
          <Grid container spacing={0} alignItems="center"
            justifyContent="center">
            <Grid item xs={3}>
              <CustomButton handleClick={() => updateOpenPopupDelete( false )} text='Cancelar' />
            </Grid>
            <Grid item xs={3}>
              <CustomButton isConfirm={true} handleClick={() => deleteOwner()} text='Si, eliminar' />
            </Grid>
          </Grid>

        </DialogContent>

      </Dialog>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    openPopupDelete: openPopupDeleteState( state ),
  }
}

export default connect( mapStateToProps, { updateOpenPopupDelete, updateOwners } )( PopupDelete )
