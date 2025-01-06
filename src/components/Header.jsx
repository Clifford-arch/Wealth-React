import React from "react";

const Header = () => {
  return (
    <header id="mm-header" className="sticky-top">
      <div className="header-wrapper">
        <a className="openbtnleft">
          <img
            alt="hamburger"
            src="https://sandbox-st.mojowealth.in/images/mobile-hamburger.svg"
          />
        </a>
        <h1>
          <a className="mm-logo" href="/landing">
            <img
              alt="logo"
              src="https://sandbox-st.mojowealth.in/images/mm-infinity-logo.svg"
            />
          </a>
        </h1>
        <nav className="links">
          <ul className="main-nav">
            <li className="top-level-link">
              <a href="/invest-strategy/invest" className="mega-menu">
                <span>Home</span>
              </a>
            </li>
            <li className="top-level-link current">
              <a href="/invest-strategy/summary" className="mega-menu">
                <span>My Portfolio</span>
              </a>
            </li>
          </ul>
        </nav>
        <nav className="main">
          <ul>
            <li className="user-login user-login-web">
              <div className="dropdown"></div>
            </li>
            <li className="user-login user-login-mobile">
              <div className="dropdown"></div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
