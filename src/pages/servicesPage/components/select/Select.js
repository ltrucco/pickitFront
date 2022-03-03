import { Autocomplete, TextField, Box } from '@mui/material'

const Select = ( { data, handleChangeSelectedOption, placeholder, field1, field2, value } ) => {
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: '90%' }}
            options={data}
            autoHighlight
            value={value}
            onChange={(e, v) => handleChangeSelectedOption(e,v)}
            getOptionLabel={( option ) => option[field1] + (field2 ? (' ' + option[field2]) : '')}
            renderOption={( props, option ) => (
                <Box component="li" style={{backgroundColor: '#fff'}} {...props}>
                    {option[field1] + (field2 ? (' ' + option[field2]) : '')} 
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