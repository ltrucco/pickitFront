import { Link } from 'react-router-dom'
import './Sidebar.css'
import updateSidebar from '../../store/sidebarMenu/action'
import { connect } from 'react-redux'
import { selectedSidebarOption } from '../../store/sidebarMenu/reducer'

const sidebarNavItems = [
    {
        display: 'Servicios',
        icon: <i className='bx bx-wrench'></i>,
        to: '/servicios',
        section: 'servicios'
    },
    {
        display: 'Automotores',
        icon: <i className='bx bx-car'></i>,
        to: '/automotores',
        section: 'automotores'
    },
    {
        display: 'Propietarios',
        icon: <i className='bx bx-user'></i>,
        to: '/propietarios',
        section: 'propietarios'
    },
]

const Sidebar = ({updateSidebar, sidebarOption}) => {

    return (
        <div className='sidebar'>
            <div className='sidebarLogo'>
                <img alt='pickit' src='https://pickit.com.ar/assets/PICKIT_NARANJA.svg'/>
            </div>
            <div className='sidebarMenu'>
                {sidebarNavItems.map( ( item, index ) => (
                    <Link to={item.to} key={index} onClick={() => updateSidebar(index)}>
                        <div className={`sidebarMenuItem ${sidebarOption === index ? 'active': ''}`}>
                            <div className='sidebarMenuItemIcon'>
                                {item.icon}
                            </div>                        
                            <div className='sidebarMenuItemText'>
                            {item.display}
                        </div>
                            </div>
                       
                    </Link>
                 ) )}
            </div>
        </div>
    )
}


const mapStateToProps = state =>{
    return{
        sidebarOption: selectedSidebarOption(state)
    }
}

export default connect(mapStateToProps, {updateSidebar})(Sidebar)