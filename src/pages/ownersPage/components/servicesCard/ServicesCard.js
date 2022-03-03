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
        
        return items.map( ( i, index ) =>
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
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
        return statementsWithItems.map( ( swi, index ) =>
            <div key={index} style={{ margin: '20px ', border: '0.5px solid #cccccc', fontSize: '12px', padding: '12px 50px' }}>
                <div style={{ borderBottom: '0.5px solid #e6e6e6', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <span style={{ fontSize: '13px' }}>
                                {new Date(swi.date).toLocaleString('es-AR', {  year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                                {'Medio de pago: ' + swi.paymentMethod}
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '13px' }}>
                                Total
                            </span>
                            <span style={{ marginLeft: '10px', fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '3px' }}>
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
                {statementsWithItems.length > 0 ? drawStatementsItems() :
                <div style={{paddingTop: '20px'}}>
                    <span>
                    No cuenta con servicios registrados
                    </span>
                </div>}
            </CardContent>
        </Card>
    )
}

export default ServicesCard