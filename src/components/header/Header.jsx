import React from 'react'
import { Container , Logo , LogoutBtn} from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'



function Header() {
  const authStatus = useSelector((state) =>
    state.auth.status
  );
  const navigate = useNavigate();

   const navitems = [
     { name: 'Home', slug: '/'  , active: true },
     { name: 'Login', slug: '/login',  active :!authStatus },
     { name: 'Signup', slug: '/signup' , active :!authStatus },
     { name: 'All-posts', slug: '/all-posts' , active :authStatus },
     { name :'Add-Post', slug: '/add-post' , active :authStatus },
     ];

      
     


  return (
    <header className="py-4 shadow bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center mr-8">
            <Link to="/">
              <Logo width="50px" />
            </Link>
            <span className="ml-3 text-2xl font-bold text-white tracking-wide">Mega Project</span>
          </div>
          <ul className="flex items-center space-x-4">
            {navitems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="transition-colors duration-200 bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
