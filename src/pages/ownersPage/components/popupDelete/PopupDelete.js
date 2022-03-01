import { Dialog, DialogContent, Grid } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import updateOpenPopupDelete from '../../../../store/openPopupDelete/action'
import { ApiCalls } from '../../../../components/api/ApiCalls'
import updateOwners from '../../../../store/owners/action'
import CustomButton from '../customButton/CustomButton'
import { openPopupDeleteState } from '../../../../store/openPopupDelete/reducer'
import warningIcon from '../../images/warningIcon.png'

const PopupDelete = ( { disableBackdropClick, updateOpenPopupDelete, updateOwners, openPopupDelete, owner } ) => {


    const deleteOwner = () => {
        ApiCalls.deleteOwners( owner.id )
            .then( ( res ) => {
                updateOpenPopupDelete( false )
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
        updateOpenPopupDelete( false )
    }

    return (
        <>
            {owner && <Dialog
                style={{ textAlign: "center" }}
                maxWidth='sm'
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
                <div style={{ margin: '30px 0px' }} id="alert-dialog-title">
                    <img alt='warning' src={warningIcon} />
                    <div>
                        <span style={{ fontSize: '28px', fontWeight: 'bold' }}>
                            ¿Seguro deseas eliminar este propietario?
                        </span>
                    </div>
                    <span style={{ fontSize: '19px', margin: '15px' }}>
                        Al eliminarlo se perderán los cambios realizados hasta el momento, de forma permanente.
                    </span>
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
