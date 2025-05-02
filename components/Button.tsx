import React from 'react'

const Button = ({label} : {label: string}) => {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
      {label}
    </button>
  )
}

export default Button