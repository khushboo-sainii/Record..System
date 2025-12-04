import React from 'react'
import '../globals.css';

const InputField = ({ heading, name, value="", onChange, placeholder, readOnly }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-md font-semibold text-black">{heading}</label>
      <input 
        type="text" 
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={readOnly ? undefined : onChange}
        placeholder={placeholder}
        className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200" 
       
      />
    </div>
  )
}

export default InputField
