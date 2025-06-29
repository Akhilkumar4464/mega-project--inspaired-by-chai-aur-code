
 import { useState ,useEffect } from 'react'
 import {useDispatch} from 'react-redux'

import authService from './Appwrite/Auth'
import { login , logout} from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
function App() {
 const [loding , setLoding] = useState(true)
   const dispatch = useDispatch()

   useEffect(() =>
    {
      authService.getCurrentUser()
      .then(
        (userData) => {
        if (userData) {
          dispatch(login({ userData }))
          setLoding(false)
          } else {
              dispatch(logout())
            }
        }

      )
      .catch((error) =>
        console.error( " error in getting user data", error)
      )
      .finally (() =>
        {
          setLoding(false)
          })
        

    }
    ,[ dispatch])


  return ! loding ? (
  <div  className=' min-h-screen  flex flex-wrap content-between bg-gray-400 text-center justify-center' > 
  <div className='w-full block '>
    <Header/>
    <main>
      { /*< Outlet/> */} 
    </main>
    <Footer/>
    </div> 
    </div>
   
  ): null
}

export default App
