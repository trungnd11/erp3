import React from 'react'
import { Input } from 'reactstrap'

function InputText(props) {
  return (
    <div className='border-bottom'>
        <Input  {...props} style={{border: 'none'}} />
    </div>
  )
}

export default InputText