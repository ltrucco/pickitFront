import { Dialog, DialogContent, Grid } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import updateOpenPopupDelete from '../../../../store/openPopupDelete/action'
import CustomButton from '../customButton/CustomButton'
import { openPopupDeleteState } from '../../../../store/openPopupDelete/reducer'
import warningIcon from '../../images/warningIcon.png'

const PopupDelete = ( { disableBackdropClick, updateOpenPopupDelete,   openPopupDelete, owner, car, title, subtitle, confirmAction } ) => {


    const confirm = () => {
        confirmAction(owner || car)
        updateOpenPopupDelete( false )
    }

    return (
        <>
            {(owner || car) && <Dialog
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
                            {title}
                        </span>
                    </div>
                    <span style={{ fontSize: '19px', margin: '15px' }}>
                        {subtitle}
                    </span>
                </div>
                <DialogContent>

                    <Grid container spacing={0} alignItems="center"
                        justifyContent="center">
                        <Grid item xs={3}>
                            <CustomButton handleClick={() => updateOpenPopupDelete( false )} text='Cancelar' />
                        </Grid>
                        <Grid item xs={3}>
                            <CustomButton isConfirm={true} handleClick={() => confirm()} text='Confirmar' />
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

export default connect( mapStateToProps, { updateOpenPopupDelete } )( PopupDelete )
