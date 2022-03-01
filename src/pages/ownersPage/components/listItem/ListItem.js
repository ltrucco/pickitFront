import { Box, Grid} from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './ListItem.css'
import CustomPopOver from '../customPopOver/CustomPopOver';


const useStyles = makeStyles(theme => ({
    root: {
        color: "#000",
      "&:hover": {
        color: '#ff6c0e',
        cursor: 'pointer'
      }
    }
  }));

const ListItem = ( { owner, openPopupEdit, openPopupDelete, watchedOwner, viewOnly } ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState( null )

    const handleClick = ( event ) => {
        setAnchorEl( event.currentTarget )
    }

    const handleClose = () => {
        setAnchorEl( null );
    };

    const handleClickOption = ( option ) => {
        console.log( option )
    }

    return (
        <>
            <li>
                <Grid container spacing={3} style={{ minHeight: '80px', borderBottom: "1px solid #000", backgroundColor: '#fff', marginTop: '0px' }}>
                    <Grid item xs={4} style={{ paddingLeft: '30px' }}>
                        <Box display="flex" >
                            <Grid container spacing={3} style={{ alignContent: 'center', justifyContent: 'center' }}>
                                {!viewOnly && <Grid item xs={1} style={{ alignSelf: 'center' }}>
                                    <VisibilityIcon className={classes.root} onClick={() => watchedOwner()}/>
                                </Grid>}
                                <Grid item xs={1}>
                                    <img alt='user' style={{ borderRadius: '50%', height: '40px' }} src={owner.photo} />
                                </Grid>
                                <Grid item xs style={{ marginLeft: '20px' }}>
                                    <Grid container direction={'column'}>
                                        <Grid item xs >
                                            <span className='title'>
                                                {owner.surname}
                                            </span>
                                        </Grid>
                                        <Grid item xs >
                                            <span className='subtitle'>
                                                {owner.name}
                                            </span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                    <Grid item xs={4}>
                        <Grid container direction={'column'}>
                            <Grid item xs >
                                <span className='subtitle'>
                                    Correo electrónico
                                </span>
                            </Grid>
                            <Grid item xs >
                                <span className='subtitle'>
                                    {owner.mail}
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={viewOnly ? 4 : 3}>
                        <Grid container direction={'column'}>
                            <Grid item xs >
                                <span className='subtitle'>
                                    Teléfono
                                </span>
                            </Grid>
                            <Grid item xs >
                                <span className='subtitle'>
                                    {owner.phoneNumber}
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                    {!viewOnly && <Grid item xs={1} justifyContent={'flex-end'}>
                        <i className='bx bx-dots-vertical-rounded cursorHover' style={{ fontSize: '40px', float:'right' }} onClick={handleClick}></i>
                        <CustomPopOver anchorEl={anchorEl} handleClose={handleClose} openPopupEdit={()=> openPopupEdit()} handleClickOption={( option ) => handleClickOption( option )} openPopupDelete={()=> openPopupDelete()}/>
                    </Grid>}
                </Grid>
            </li>
        </>
    )
}

export default ListItem