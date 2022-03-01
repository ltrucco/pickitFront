import { ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';

const CustomPopOver = ( { anchorEl, handleClose, handleClickOption, openPopupEdit, openPopupDelete } ) => {
    const open = Boolean( anchorEl );
    
    return (
        <Popover
            id='simple-popover'
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <ListItem  disablePadding>
                <ListItemButton>
                    <ListItemText primaryTypographyProps={{ style: { color: '#707070' }, noWrap: true }} primary={'Editar'} onClick={() => openPopupEdit()}/>
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
                <ListItemButton>
                    <ListItemText primaryTypographyProps={{ style: { color: '#707070' }, noWrap: true }} primary={'Eliminar'} onClick={() => openPopupDelete()}/>
                </ListItemButton>
            </ListItem>
        </Popover>
    )
}


export default connect( null )( CustomPopOver )
