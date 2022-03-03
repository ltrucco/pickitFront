const updateSidebarOption = sidebarOption => {
    return{
        type: 'UPDATE_SIDEBAR_OPTION',
        payload: sidebarOption
    }
}

export default updateSidebarOption;