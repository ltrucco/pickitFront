import { Card, CardContent } from '@mui/material'
import React from 'react'

const ServicesCard = ( { services, statementsWithItems } ) => {


    const sumItems = ( items ) => {
        let sum = 0
        items.forEach( ( i ) => {
            sum = sum + services.find( s => s.id === i.serviceId )?.price
        } )
        return '$' + sum
    }

    const drawItemsList = ( items ) => {
        
        return items.map( ( i ) =>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
                <span>
                    {services.find(s=> s.id === i.serviceId).description}
                </span>
                <span>
                    {'$' + services.find(s=> s.id === i.serviceId).price}
                </span>
            </div>
        )

    }

    const drawStatementsItems = () => {
        return statementsWithItems.map( ( swi ) =>
            <div style={{ margin: '20px ', border: '0.5px solid #cccccc', fontSize: '12px', padding: '12px 50px' }}>
                <div style={{ borderBottom: '0.5px solid #e6e6e6', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <span style={{ fontSize: '13px' }}>
                                2 Oct, 2021
                            </span>
                            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                                {'Medio de pago: ' + swi.paymentMethod}
                            </span>
                        </div>
                        <div item xs>
                            <span style={{ fontSize: '13px' }}>
                                Total
                            </span>
                            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                                {sumItems( swi.items )}
                            </span>
                        </div>
                    </div>

                </div>
                {drawItemsList( swi.items )}
            </div>
        )
    }

    return (
        <Card sx={{ width: '80%', marginTop: '20px' }}>

            <CardContent>
                <span className='title'>
                    Servicios anteriores
                </span>
                {drawStatementsItems()}
            </CardContent>
        </Card>
    )
}

export default ServicesCard