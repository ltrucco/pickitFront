import { Dialog, DialogContent, Grid, TextField } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { openPopupEditState } from '../../../../store/openPopupEdit/reducer'
import updateOpenPopupEdit from '../../../../store/openPopupEdit/action'
import { useFormik } from 'formik';
import validationSchemaOwner from './validationSchemaOwner'
import { ApiCalls } from '../../../../components/api/ApiCalls'
import updateOwners from '../../../../store/owners/action'
import CustomButton from '../../../shared/components/customButton/CustomButton'
import { v4 as uuidv4 } from 'uuid';

const PopupEdit = ( { disableBackdropClick, updateOpenPopupEdit, updateOwners, openPopupEdit, owner } ) => {

  const formik = useFormik( {
    initialValues: {
      name: owner?.name ?? '',
      surname: owner?.surname ?? '',
      mail: owner?.mail ?? '',
      phoneNumber: owner?.phoneNumber ?? '',
      photo: owner?.photo ?? ''
    },
    validationSchema: validationSchemaOwner,
    onSubmit: ( values, { resetForm } ) => {
      if ( owner ) {
        ApiCalls.updateOwners( owner.id, values )
          .then( ( ) => {
            updateOpenPopupEdit( false )
            ApiCalls.getOwners()
              .then( ( res ) => {
                updateOwners( res.data )
              } )
              .catch( ( err ) => {
                console.log( err )
              } )
          } )
          .catch( ( err ) => {
            console.log( err )
          } )
      } else {
        values.id = uuidv4()
        ApiCalls.addOwner( values )
          .then( () => {
            updateOpenPopupEdit( false )
            ApiCalls.getOwners()
              .then( ( res ) => {
                updateOwners( res.data )
              } )
              .catch( ( err ) => {
                console.log( err )
              } )
          } )
          .catch( ( err ) => {
            console.log( err )
          } )
      }
      resetForm()

    },
  } );

  return (
    <>
      {<Dialog
        style={{ textAlign: "center" }}
        maxWidth='md'
        fullWidth={true}
        open={openPopupEdit}
        onClose={( event, reason ) => {
          if ( !disableBackdropClick ) {
            updateOpenPopupEdit( false )
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '30px 0px' }} id="alert-dialog-title">
          {owner ? 'Editar propietario' : 'Nuevo propietario'}
        </div>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction={'column'} style={{ padding: '0px 100px ' }} >
              <TextField id='name' name='name' label='Nombre' placeholder='Nombre'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean( formik.errors.name )}
                helperText={formik.touched.name && formik.errors.name}
                style={{ paddingBottom: '20px' }} />
              <TextField id='surname' name='surname' label='Apellido' placeholder='Apellido'
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean( formik.errors.surname )}
                helperText={formik.touched.surname && formik.errors.surname}
                style={{ paddingBottom: '20px' }} />
              <TextField id='mail' name='mail' label='Mail' placeholder='Mail'
                value={formik.values.mail}
                onChange={formik.handleChange}
                error={formik.touched.mail && Boolean( formik.errors.mail )}
                helperText={formik.touched.mail && formik.errors.mail}
                style={{ paddingBottom: '20px' }} />
              <TextField id='phoneNumber' name='phoneNumber' label='Telefono' placeholder='Telefono'
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean( formik.errors.phoneNumber )}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                style={{ paddingBottom: '20px' }} />
              <TextField id='photo' name='photo' label='Foto' placeholder='Foto'
                value={formik.values.photo}
                onChange={formik.handleChange}
                error={formik.touched.photo && Boolean( formik.errors.photo )}
                helperText={formik.touched.photo && formik.errors.photo}
                style={{ paddingBottom: '20px' }} />

            </Grid>
            <Grid container spacing={0} alignItems="center"
              justifyContent="center">
              <Grid item xs={3}>
                <CustomButton handleClick={() => updateOpenPopupEdit( false )} text='Cancelar' />
              </Grid>
              <Grid item xs={3}>
                <CustomButton type='submit' isConfirm={true} handleClick={() => { }} text='Guardar' />
              </Grid>
            </Grid>
          </form>
        </DialogContent>

      </Dialog>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    openPopupEdit: openPopupEditState( state ),
  }
}

export default connect( mapStateToProps, { updateOpenPopupEdit, updateOwners } )( PopupEdit )
