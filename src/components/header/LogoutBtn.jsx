 import React from 'react'
 import {useDispatch} from 'react-redux'
import AuthService from "../../appwrite/auth";
import {logout} from '../../store/authSlice'

 
 function LogoutBtn() {
    const dispatch = useDispatch()
    const handleLogout = () =>
        {
            AuthService.logout()
            .then(() =>
                {
                    dispatch(logout())
                    window.location.reload()
                    })
                    .catch((error) =>
                        {
                            console.error(error)
                            })
                            }

   return (
     <button  onClick={ handleLogout }  className=' inline-block px-6 duration-200 hover:bg-blue-100 rounded-full '> 
        Logout
     </button>
     
   )
 }
 
 export default LogoutBtn
 