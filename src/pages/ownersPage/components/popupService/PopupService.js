import React, { useEffect, useState } from 'react'
import { openPopupServiceState } from '../../../../store/openPopupService/reducer'
import { servicesList } from '../../../../store/services/reducer'
import updateOpenPopupService from '../../../../store/openPopupService/action'
import { Checkbox, Dialog, DialogContent, FormControlLabel, Grid } from '@mui/material'
import { connect } from 'react-redux'
import CustomButton from '../../../shared/components/customButton/CustomButton'
import { SettingsInputComponent } from '@mui/icons-material'
import { ApiCalls } from '../../../../components/api/ApiCalls'
import { v4 as uuidv4 } from 'uuid';
import Select from '../../../servicesPage/components/select/Select'

const PopupService = ( { watchedCar, updatePopupService, openPopupService, disableBackdropClick, services, updateOpenPopupService, loadStatements} ) => {

    const [servicesChecked, setServicesChecked] = useState( [] )
    const [total, setTotal] = useState( 0 )
    const [selectedMethod, setSelectedMethod] = useState( { description: 'Debito' } )

    useEffect( () => {
        if ( services ) {
            let servicesCheckedaux = {}
            services.forEach( ( s ) => {
                servicesCheckedaux[s.description] = false
            } )
        }
    }, [services] )

    useEffect( () => {
        if ( services ) {
            getTotalSum()
        }
    }, [servicesChecked] )

    const handleChange = ( event ) => {
        let servicesCheckedAux = { ...servicesChecked }
        servicesCheckedAux[event.target.name] = !servicesCheckedAux[event.target.name]
        setServicesChecked( servicesCheckedAux )
    }

    const saveNewService = () => {
        console.log( watchedCar )
        console.log( servicesChecked )
        let statementId = uuidv4()
        let valuesStatements = {
            id: statementId,
            carId: watchedCar.id,
            paymentMethod: selectedMethod.description,
            date: new Date()
        }

        ApiCalls.addStatements( valuesStatements )
            .then( () => {
                for ( const property in servicesChecked ) {
                    if ( servicesChecked[property] ) {
                        let valuesStatementsItems = {
                            id: uuidv4(),
                            serviceId: services.find( ser => ser.description === property ).id,
                            statementId: statementId
                        }
                        ApiCalls.addStatementsItems( valuesStatementsItems )
                            .catch( ( err ) => {
                                console.log( err )
                            } )
                    }
                }
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
            .finally(() => {
                loadStatements()
            })
        updateOpenPopupService( false )
    }

    const drawServices = () => {
        return services.map( ( s, i ) =>
            <div key={'service' + i} style={{ padding: '20px 0px', display: 'flex', borderBottom: '0.5px solid #e6e6e6', justifyContent: 'space-between' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            id={"checkbox" + i}
                            name={s.description}
                            style={{ padding: 0 }}
                            checked={servicesChecked[s.description]}
                            onChange={( event ) => handleChange( event )}
                            value={servicesChecked[s.description]}
                        />
                    }
                    label={s.description}
                />
                <span style={{ color: '#989898' }}>
                    {'$' + s.price}
                </span>
            </div>
        )
    }


    const getTotalSum = () => {
        let sum = 0
        services.forEach( s => {
            if ( servicesChecked[s.description] ) {
                sum = sum + s.price
            }
        } )
        setTotal( sum )
    }

    return (
        <Dialog
            style={{ textAlign: "center" }}
            maxWidth='sm'
            fullWidth={true}
            open={openPopupService}
            onClose={( event, reason ) => {
                if ( !disableBackdropClick ) {
                    updatePopupService( false )
                }
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '30px 0px' }} id="alert-dialog-title">
                Nuevo servicio
            </div>
            <DialogContent>
                <div style={{ textAlign: 'left', padding: '10px 40px' }}>
                    <span >
                        Selecciona el o los servicios que desea sumar
                    </span>
                    <div style={{ textAlign: 'left', }}>
                        {drawServices()}
                    </div>
                    <div style={{ padding: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                            Total
                        </span>
                        <span>
                            {total}
                        </span>
                    </div>
                    <div style={{ padding: '20px 0px' }}>
                        <Select value={selectedMethod} data={[{ description: 'Debito' }, { description: 'Efectivo' }]} field1='description' handleChangeSelectedOption={( e, v ) => setSelectedMethod( v )}
                            placeholder='Medio de pago' />

                    </div>
                </div>


                <Grid container spacing={0} alignItems="center"
                    justifyContent="center">
                    <Grid item xs={3}>
                        <CustomButton handleClick={() => updateOpenPopupService( false )} text='Cancelar' />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomButton isConfirm={true} handleClick={() => saveNewService()} text='Guardar' />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = state => {
    return {
        openPopupService: openPopupServiceState( state ),
        services: servicesList( state )
    }
}

export default connect( mapStateToProps, { updateOpenPopupService } )( PopupService )