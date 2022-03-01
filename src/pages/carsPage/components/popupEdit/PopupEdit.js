import { Dialog, DialogContent, Grid, TextField } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { openPopupEditCarState } from '../../../../store/openPopupEditCar/reducer'
import updateOpenPopupEditCar from '../../../../store/openPopupEditCar/action'
import { useFormik } from 'formik';
import validationSchemaCar from './validationSchemaCar'
import { ApiCalls } from '../../../../components/api/ApiCalls'
import updateCars from '../../../../store/cars/action'
import CustomButton from '../../../shared/components/customButton/CustomButton'
import { v4 as uuidv4 } from 'uuid';

const PopupEdit = ( { disableBackdropClick, updateOpenPopupEditCar, updateCars, openPopupEditCar, car } ) => {

  const formik = useFormik( {
    initialValues: {
      model: car?.model ?? '',
      brand: car?.brand ?? '',
      year: car?.year ?? '',
      domain: car?.domain ?? '',
      color: car?.color ?? '',
      kms: car?.kms ?? '',
      photo: car?.photo ?? ''
    },
    validationSchema: validationSchemaCar,
    onSubmit: ( values, { resetForm } ) => {
      if ( car ) {
        ApiCalls.updateCars( car.id, values )
          .then( () => {
            updateOpenPopupEditCar( false )
            ApiCalls.getCars()
              .then( ( res ) => {
                updateCars( res.data )
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
        values.ownerId = car.ownerId
        ApiCalls.addCar( values )
          .then( () => {
            updateOpenPopupEditCar( false )
            ApiCalls.getCars()
              .then( ( res ) => {
                updateCars( res.data )
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

  const formikTextfield = ( value, label ) => {
    return <TextField id={value} name={value} label={label} placeholder={label}
      value={formik.values[value]}
      onChange={formik.handleChange}
      error={formik.touched[value] && Boolean( formik.errors[value] )}
      helperText={formik.touched[value] && formik.errors[value]}
      style={{ paddingBottom: '20px', width: '100%', paddingRight:'5px' }} />

  }

  return (
    <>
      <Dialog
        style={{ textAlign: "center" }}
        maxWidth='md'
        fullWidth={true}
        open={openPopupEditCar}
        onClose={( event, reason ) => {
          if ( !disableBackdropClick ) {
            updateOpenPopupEditCar( false )
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '30px 0px' }} id="alert-dialog-title">
          {car ? 'Editar automotor' : 'Nuevo automotor'}
        </div>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction={'column'} style={{ padding: '0px 100px ' }} >
              {formikTextfield( 'brand', 'Marca' )}
              {formikTextfield( 'model', 'Modelo' )}
              {formikTextfield( 'photo', 'Foto' )}
              <Grid container>
                <Grid item xs={6}>
                  {formikTextfield( 'domain', 'Patente' )}
                </Grid>
                <Grid item xs={6}>
                  {formikTextfield( 'kms', 'Kilometros' )}
                </Grid>
                <Grid item xs={6}>
                  {formikTextfield( 'color', 'Color' )}
                </Grid>
                <Grid item xs={6}>
                  {formikTextfield( 'year', 'Año' )}
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={0} alignItems="center"
              justifyContent="center">
              <Grid item xs={3}>
                <CustomButton handleClick={() => updateOpenPopupEditCar( false )} text='Cancelar' />
              </Grid>
              <Grid item xs={3}>
                <CustomButton type='submit' isConfirm={true} handleClick={() => { }} text='Guardar' />
              </Grid>
            </Grid>
          </form>
        </DialogContent>

      </Dialog>
    </>
  )
}

const mapStateToProps = state => {
  return {
    openPopupEditCar: openPopupEditCarState( state ),
  }
}

export default connect( mapStateToProps, { updateOpenPopupEditCar, updateCars } )( PopupEdit )
