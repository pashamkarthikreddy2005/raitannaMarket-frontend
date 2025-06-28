import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import {
  FaUserCircle,
  FaShoppingCart,
  FaBoxOpen,
  FaUserEdit,
  FaSignOutAlt,
} from 'react-icons/fa';
import UserService from './service/UserService';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = UserService.isAuthenticated();
  const isUser = UserService.isUser();

  const userNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
  ];

  const adminNavLinks = [
    { name: 'Baskets', path: '/admin/baskets' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
  ];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleScroll = () => setDropdownOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
  <Link to="/">
    <img src="logo.jpg" alt="Logo" />
  </Link>
</div>
        <div className="nav-wrapper">
          <nav className="nav-menu">
            {(isAuthenticated
              ? isUser
                ? userNavLinks
                : adminNavLinks
              : userNavLinks
            ).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={location.pathname === link.path ? 'nav-link active' : 'nav-link'}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {isAuthenticated ? (
          <div className="profile-menu" ref={dropdownRef}>
            <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
            {dropdownOpen && (
              <div className="dropdown" onMouseLeave={closeDropdown}>
                {isUser && (
                  <>
                    <Link to="/user/cart" className="dropdown-item">
                      <FaShoppingCart className="dropdown-icon" />
                      Cart
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      <FaBoxOpen className="dropdown-icon" />
                      Orders
                    </Link>
                  </>
                )}
                <Link to="/user/profile" className="dropdown-item">
                  <FaUserEdit className="dropdown-icon" />
                  My Details
                </Link>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    UserService.logout();
                    navigate('/login');
                  }}
                >
                  <FaSignOutAlt className="dropdown-icon" />
                  Logout
                </div>

              </div>
            )}
          </div>
        ) : (
          <div className="login-button">
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
