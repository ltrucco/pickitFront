import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({handleClick, isConfirm, text, type}) => {
  return (
    <Button type={type} uppercase={false} variant='contained' style={{color:`${isConfirm ? '#fff' : '#000' }`, backgroundColor: `${isConfirm ? '#ff6c0e' : '#f0f0f0' }`, textTransform:'capitalize', fontWeight: 500, fontSize: '16px'}} onClick={() => handleClick()}>{text}</Button>
  )
}

export default CustomButton