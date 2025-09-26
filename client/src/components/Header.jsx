import React from 'react'
import { Link, useLocation } from 'react-router-dom' 
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

export default function Header() {
  const path = useLocation().pathname;
  return (
    <nav className='border-b-2'>

      <Link to ="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span>
      </Link>
      <form>
        <textinput type='text'
        placpeholder='Search...' 
        righticon={<AiOutlineSearch/>}
        className='hidden lg:inline'
        />
      </form>
      <button className='w-12 h10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </button>
      <div className='flex gap-2 md:order-2'>
        <button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </button>
        <Link to='/signin'>
        <button gradientDuoTone='purpleToBlue' outline>
        Sign In
        </button>
        </Link>
        <navbar.toggle />
        </div>
        <navbar.collapse>
          <navbar.link active={path === '/'} as={div}>
          <Link to='/'>Home</Link> 
          </navbar.link >
          <navbar.link active={path === "/about"} as={div}>
          <Link to='/about'>
            About
          </Link >
          </navbar.link> 
          <navbar.link active={path === "/projects"} as={div}>
            <Link to='projects'>
             Projects
            </Link>
            
          </navbar.link>
        </navbar.collapse>
    </nav>

  )

}
