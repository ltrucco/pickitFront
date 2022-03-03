import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import './CarCard.css'

const CarCard = ( { car } ) => {


    const gridItemCard = ( value, isTitle ) => {
        return (
            <Grid item xs={6}>
                <span className={`carData ${isTitle ? 'carTitle' : ''}`}>
                    {value}
                </span>
            </Grid>
        )
    }

    return (
        <Card sx={{ width: '80%', marginTop: '20px' }}>

            <CardContent>
                <span className='title'>
                    Ficha tecnica del automotor
                </span>
                <Grid container direction='row' style={{ marginTop: '20px' }}>
                    <Grid item xs={9}>
                        <img alt='car' style={{ height: '300px', width: '95%' }} src={car.photo} />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container direction='column'>
                            <div style={{ display: 'flex' }}>
                                <span className='carBrand'>
                                    {car.brand}
                                </span>
                                <span className='carModel' style={{ marginLeft: '10px' }}>
                                    {car.model}
                                </span>
                            </div>
                            <div style={{ paddingTop: '20px' }}>
                                <Grid container >
                                    {gridItemCard('Patente', true)}
                                    {gridItemCard('Caja', true)}
                                    {gridItemCard(car.domain)}
                                    {gridItemCard('Automatica')}
                                </Grid>
                            </div>
                            <div style={{ paddingTop: '20px' }}>
                                <Grid container >
                                    {gridItemCard('Km', true)}
                                    {gridItemCard('Año', true)}
                                    {gridItemCard(car.kms)}
                                    {gridItemCard(car.year)}
                                </Grid>
                            </div>
                            <div style={{ paddingTop: '20px' }}>
                                <Grid container >
                                    {gridItemCard()}
                                    {gridItemCard('Color', true)}
                                    {gridItemCard()}
                                    {gridItemCard(car.color)}
                                </Grid>
                            </div>
                        </Grid>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CarCard