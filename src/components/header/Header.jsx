import React from 'react'
import { Container , Logo , LogoutBtn} from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'



function Header() {
  const authStatus = useSelector((state) =>
    state.auth.Status
  );
  const navigate = useNavigate();

   const navitems = [
     { name: 'Home', slug: '/'  , active: true },
     { name: 'Login', slug: '/login',  active :!authStatus },
     { name: 'Signup', slug: '/signup' , active :!authStatus },
     { name: 'All-posts', slug: '/all-posts' , active :!authStatus },
     { name :'Add-Post', slug: '/add-post' , active :!authStatus },
     ];

      
     


  return (
   <header className=' py-3 shadow bg-gray-500 '>
      <Container>
        <nav className=' flex'>
          <div className=' mr-4'> 
            <Link to={'/'}>
            <Logo width ='50px'/>
            </Link>
          </div>
           <ul>
            {navitems.map((item)=>(
                    item.active ?(
                           <li key={item.name}>
                                 <button
                                 className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2'
                                  onClick={()=>navigate (item.slug) }
                                 >
                                  {item.name}
                                 </button>
                           </li>
                    ): null
             
             ))} 
             { authStatus && (
                  
                  <li className=' '>
                      <LogoutBtn/>
                  </li>
               
             )}
           </ul>
        </nav>
        </Container>
   </header>
  )
}

export default Header
