import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  Dropdown,
  Avatar,
  TextInput,
} from 'flowbite-react';

import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = () => {
    console.log('Sign out clicked');
  };

  return (
    <Navbar fluid rounded>
      {/* Logo */}
      <NavbarBrand as={Link} to="/">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Sahand's
        </span>
        <span className="ml-2 text-xl font-semibold dark:text-white">
          Blog
        </span>
      </NavbarBrand>

      {/* Search */}
      <form className="hidden lg:inline">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
        />
      </form>

      {/* Right side */}
      <div className="flex gap-2 md:order-2">
        <Button color="gray" pill>
          <FaMoon />
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{currentUser.username}
              </span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>

            <Dropdown.Item as={Link} to="/dashboard?tab=profile">
              Profile
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item onClick={handleSignout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Button as={Link} to="/signin" gradientDuoTone="purpleToPink">
            Sign In
          </Button>
        )}

        <NavbarToggle />
      </div>

      {/* Navbar links */}
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === '/'}>
          Home
        </NavbarLink>

        <NavbarLink as={Link} to="/about" active={path === '/about'}>
          About
        </NavbarLink>

        <NavbarLink as={Link} to="/projects" active={path === '/projects'}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
