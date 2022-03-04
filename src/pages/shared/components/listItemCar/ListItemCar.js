import { Alert, Box, Grid, Snackbar } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './ListItemCar.css'
import CustomPopOver from '../../../ownersPage/components/customPopOver/CustomPopOver';


const useStyles = makeStyles( theme => ( {
    root: {
        color: "#000",
        "&:hover": {
            color: '#ff6c0e',
            cursor: 'pointer'
        }
    }
} ) );

const ListItemCar = ( { car, openPopupEdit, openPopupDelete, watchedCar, viewOnly } ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState( null )
    const [openSnackbar, setOpenSnackbar] = React.useState( false )

    const handleClick = ( event ) => {
        setAnchorEl( event.currentTarget )
    }

    const handleClose = () => {
        setAnchorEl( null );
    };

    const checkCarOwner = () => {
        if ( car.ownerId )
            watchedCar()
        else
            setOpenSnackbar( true )
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
      };

    return (
        <>
            <li>
                <Grid container spacing={3} style={{ minHeight: '80px', borderBottom: "1px solid #000", backgroundColor: '#fff', marginTop: '0px' }}>
                    <Grid item xs={4} style={{ paddingLeft: '30px' }}>
                        <Box display="flex" >
                            <Grid container spacing={3} style={{ alignContent: 'center', justifyContent: 'center' }}>
                                <Grid item xs={1} style={{ alignSelf: 'center' }}>
                                    <VisibilityIcon className={classes.root} onClick={() => checkCarOwner()} />
                                </Grid>
                                <Grid item xs={1}>
                                    <img alt='user' style={{ borderRadius: '50%', height: '40px', width: '40px' }} src={car.photo} />
                                </Grid>
                                <Grid item xs style={{ marginLeft: '20px' }}>
                                    <Grid container direction={'column'}>
                                        <Grid item xs >
                                            <span className='title'>
                                                {car.model}
                                            </span>
                                        </Grid>
                                        <Grid item xs >
                                            <span className='subtitle'>
                                                {car.brand}
                                            </span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container direction={'column'}>
                            <Grid item xs >
                                <span className='subtitle'>
                                    Patente
                                </span>
                            </Grid>
                            <Grid item xs >
                                <span className='subtitle'>
                                    {car.domain}
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <span className='carYear'>
                            {car.year}
                        </span>
                    </Grid>
                    <Grid item xs={viewOnly ? 4 : 3}>

                        <Grid container direction={'column'}>
                            <Grid item xs >
                                <span className='subtitle'>
                                    KM
                                </span>
                            </Grid>
                            <Grid item xs >
                                <span className='subtitle'>
                                    {car.kms}
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                    {!viewOnly && <Grid item xs={1} justifyContent={'flex-end'}>
                        <i className='bx bx-dots-vertical-rounded cursorHover' style={{ fontSize: '40px', float: 'right' }} onClick={handleClick}></i>
                        <CustomPopOver anchorEl={anchorEl} handleClose={handleClose} openPopupEdit={() => openPopupEdit()} openPopupDelete={() => openPopupDelete()} />
                    </Grid>}
                </Grid>
            </li>
            {<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    No se puede visualizar el automotor porque no posee un dueño asociado
                </Alert>
            </Snackbar>}

        </>
    )
}

export default ListItemCar