import { Card, CardContent } from '@mui/material'
import React from 'react'

const OwnerCard = ({owner}) => {
    return (
        <Card sx={{ width: '40%', marginTop: '20px' }}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img alt='user' style={{ borderRadius: '50%', height: '40px' }} src={owner.photo} />
                    <span className='title' style={{marginLeft: '10px'}}>
                        {owner.name + ' ' + owner.surname}
                    </span>
                </div>

            </CardContent>
        </Card>
    )
}

export default OwnerCard