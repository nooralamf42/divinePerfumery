import React from 'react'
import { Link } from 'react-router-dom'

function Button({
    className,
    name,
    link = null,
    onClick = null
}) {
  return (
    link? <Link to={link}>
        <button onClick={onClick} className={`bg-white rounded-full px-4 py-1 border text-xl hover:shadow-xl ${className}`}>{name}</button>
    </Link> : <button onClick={onClick} className={`bg-white rounded-full px-4 py-1 border text-xl hover:shadow-xl ${className}`}>{name}</button>
  )
}

export default Button