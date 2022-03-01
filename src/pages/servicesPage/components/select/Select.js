import { Autocomplete, TextField, Box } from '@mui/material'

const Select = ( { data, handleChangeSelectedOption, placeholder } ) => {
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={data}
            autoHighlight
            onChange={(e, v) => handleChangeSelectedOption(e,v)}
            getOptionLabel={( option ) => option['name'] + ' ' + option['surname']}
            renderOption={( props, option ) => (
                <Box component="li" {...props}>
                    {option['name'] +  ' ' + option['surname']} 
                </Box>
            )}
            renderInput={( params ) => (
                <TextField
                    {...params}
                    label={placeholder}
                />
            )}
        />
    )
}

export default Select