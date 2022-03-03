import React, { useEffect } from 'react'
import './ServicesPage.css'
import Select from './components/select/Select.js'
import updateOwner from '../../store/owner/action'
import updateOwners from '../../store/owners/action'
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { ApiCalls } from '../../components/api/ApiCalls'
import { ownersList } from '../../store/owners/reducer'

const ServicesPage = ({updateOwner, updateOwners, owners}) => {
    const navigate = useNavigate();

    useEffect(() => {
        ApiCalls.getOwners()
        .then( ( res ) => {
            updateOwners(res.data)
        } )
        .catch( ( err ) => {
            console.log(err)
        } )
    }, [updateOwners])

    const selectOwner = (v) => {
        // updateOwner(v)
        navigate("/propietarios",{state: {owner:v}});
    }

    return (
        <div>
            <span className='title'>
                Servicios
            </span>
            <div className='select'>
                <Select data={owners} field1='name' field2='surname'  handleChangeSelectedOption={(e, v) => selectOwner(v)} placeholder='Busca un propietario'/>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
      owners: ownersList( state )
    }
  }

export default connect(mapStateToProps, {updateOwner, updateOwners})(ServicesPage)