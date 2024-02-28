import React from 'react'
import { useSelector } from 'react-redux'
import { ADMIN_EMAIL } from '../envConfig'
import {AllProducts} from '../pages'
import { useNavigate } from 'react-router-dom'

function Protected({children}) {
    const isLogged = useSelector(state=>state.isLogged)
    const isAdmin = useSelector(state=>state.userData.email) === ADMIN_EMAIL
    const navigate = useNavigate()

  if(isAdmin)
    return <>{children}</>
  else if(!isLogged)
    return <>{children}</>
  else{
    return <AllProducts/>
  }
}

export default Protected