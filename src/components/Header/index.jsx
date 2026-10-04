import React, { useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useOutsideClick  from '@utils/useOutsideClick';
import Icon from '@components/shared/Icon';
import icons from '@icons/';
import images from '@images/';

const Header = () => {
  const dropdownRef = useRef();
  const menuRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuLinks = [
    { name: 'UX/UI Kits', href: '/uiux' },
    { name: 'Illustrations', href: '/illustrations' },
    { name: '3D Assets', href: '/3d_assets' },
  ];
  const toggledLinks = [
    { name: 'Freebies', href: '/freebies' },
  ];

  const toggleMenu = () => {
    if (document.body.clientWidth <= 1024) {
      if (menuOpen) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
      setMenuOpen(!menuOpen);
    }
  };

  const renderToggleLinks = (className) => {
    return toggledLinks.map((link, idx) => {
      return (
        <NavLink
          to={link.href}
          key={`header_link_${idx}`}
          tabIndex="0"
          className={className}
          onClick={toggleMenu}
        >
          {link.name}
        </NavLink>
      );
    });
  };

  const currentUrl = useLocation().pathname;

  const openSupport = () => {
    $crisp.push(['do', 'chat:open'])
  }

  useOutsideClick(dropdownRef, () => setDropdownOpen(false))

  return (
    <header className="header">
      <div className="header__container page__container">
        <div className="header__row">
          <div className="header__col">
            {currentUrl !== '/' ? (
              <NavLink to="/">
                <img
                  src={images.logoDark}
                  alt="the18design"
                  className="header__logo page__logo"
                />
              </NavLink>
            ) : (
              <img
                src={images.logoDark}
                alt="the18design"
                className="header__logo page__logo"
              />
            )
          }
          </div>
          <div
            ref={menuRef}
            className={`header__group ${
              menuOpen ? 'header__group--active' : null
            }`}
          >
            <div className="header__col header__col--menu">
              <nav className="header__menu">
                {menuLinks.map((link, idx) => {
                  return (
                    <NavLink
                      to={link.href}
                      key={`header_link_${idx}`}
                      tabIndex="0"
                      className="header__menu-item button button--link"
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </NavLink>
                  );
                })}
                {document.body.clientWidth >= 1280 ||
                document.body.clientWidth < 1024
                  ? renderToggleLinks('header__menu-item button button--link')
                  : null}
                <div ref={dropdownRef} className="header__dropdown">
                  <button
                    className="header__dropdown-button button button--icon"
                    onClick={() => setDropdownOpen((oldState) => !oldState)}
                  >
                    <Icon
                      wrapperClassName="button__icon"
                      icon={icons.more}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="header__dropdown-content">
                      <NavLink 
                        to="/license"
                        className="header__dropdown-item"
                        tabIndex="0"
                        onClick={() => {
                          setDropdownOpen(false);
                          toggleMenu();
                        }}
                      >
                        License
                      </NavLink>
                      <NavLink 
                        to="/order"
                        className="header__dropdown-item"
                        tabIndex="0"
                        onClick={() => {
                          setDropdownOpen(false);
                          toggleMenu();
                        }}
                      >
                        Custom Order
                      </NavLink>
                      <button onClick={() => {
                        openSupport();
                        toggleMenu();
                      }} className="header__dropdown-item">
                        Support
                      </button>
                      <a href="mailto:info@the18.design" className="header__dropdown-item">
                        Contact Us
                      </a>
                      {document.body.clientWidth < 1440 &&
                      document.body.clientWidth >= 1024 &&
                        renderToggleLinks('header__dropdown-item')
                      }
                    </div>
                  )}
                </div>
              </nav>
            </div>
            <div className="header__col header__col--actions">
              {/* <button
                className="header__button header__button--search button button--icon"
                tabIndex="0"
              >
                <Icon
                  wrapperClassName="button__icon"
                  icon={icons.search}
                />
              </button> */}
              <NavLink
                className="header__button header__button--access button"
                tabIndex="0"
                to="/order"
              >
                Custom Order
              </NavLink>
              {/* <button
                className="header__button header__button--login button button--link"
                tabIndex="0"
              >
                Log In
              </button> */}
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className={`header__toggle ${
              menuOpen ? 'header__toggle--active' : null
            }`}
          ></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
