import React from 'react'
import { Link, useLocation } from 'react-router-dom' 
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import {Navbar, NavbarCollapse, NavbarLink,TextInput,NavbarToggle} from 'flowbite-react'

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar fluid rounded>

      <Link to ="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span>
      Blog
      </Link>
      <form>
        <TextInput type='text'
        placpeholder='Search...' 
        righticon={<AiOutlineSearch/>}
        className='hidden lg:inline'
        />
      </form>
      <button className='w-12 h10 lg:hidden' color='gray'>
        <AiOutlineSearch />
      </button>
      <div className='flex gap-2 md:order-2'>
        <button className='w-12 h-10 hidden sm:inline' color='gray'>
          <FaMoon />
        </button>
        <Link to='/signin'>
        <button>
        Sign In
        </button>
        </Link>
      </div>
      <NavbarToggle />
        <NavbarCollapse>
  <NavbarLink as={Link} to="/" active={path === "/"}>
    Home
  </NavbarLink>

  <NavbarLink as={Link} to="/about" active={path === "/about"}>
    About
  </NavbarLink>

  <NavbarLink as={Link} to="/projects" active={path === "/projects"}>
    Projects
  </NavbarLink>
  <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
</NavbarCollapse>

    </Navbar>

  )

}
