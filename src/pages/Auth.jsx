import React, { useEffect, useState } from "react";
import Login from "../components/loginpage/Login";
import Register from "../components/loginpage/Register";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../api/AuthContext";

const Auth = () => {
  const { isLogin, redirect, loadin } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  const handleToggle = (type) => {
    setIsLoginView(type === "login");
  };
  useEffect(() => {
    if (!loadin && isLogin) {
      navigate(redirect || "/invest-strategy/invest");
    }
  }, [isLogin, loadin, redirect, navigate]);

  return (
    <section id="loginform" className="spacing-top loginform-section">
      <div className="container-fluid p-0">
        <div className="row login-register-page-wrapper">
          <div className="col-md-6 col-12 text-center">
            <div className="login-left">
              <div className="login-left-logo">
                <img
                  className="mb-5"
                  src="https://sandbox-st.mojowealth.in/images/mm-infinity-logo.svg"
                  alt="Logo"
                />
              </div>
              <h6>A launchpad for every investor to become a</h6>
              <h4>High Net worth Investor</h4>
            </div>
          </div>
          <div className="col-md-6 col-12 register-form">
            <div className="loginpage">
              <div className="form-warpper-parent">
                <div className="form-wrapper">
                  <div className="fixed-btn-login-reg-wrapper">
                    <ul className="floating-menu-user">
                      <li>
                        <a
                          className={!isLoginView ? "active" : ""}
                          onClick={() => handleToggle("register")}
                        >
                          New User
                        </a>
                      </li>
                      <li>
                        <a
                          className={isLoginView ? "active" : ""}
                          onClick={() => handleToggle("login")}
                        >
                          Existing User
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <div className="col-12 inner-form-content">
                      {isLoginView ? <Login /> : <Register />}
                      <div className="or-text"> OR </div>
                      <div className="socialbtns">
                        <ul>
                          <li>
                            <a className="bi bi-google"></a>
                          </li>
                          <li>
                            <a className="bi bi-facebook"></a>
                          </li>
                          <li>
                            <a href="/user/mm-login" className="bi">
                              <img
                                src="https://sandbox-st.mojowealth.in/images/mm-icon-white.png"
                                alt="MarketsMojo"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      {isLoginView ? (
                        <>
                          <div className="sign-up-text">
                            {" "}
                            By signing up, you have read and agreed to Mojo
                            Wealth{" "}
                          </div>
                          <div className="privacy-text">
                            <a className="privacy-text-color">Privacy Policy</a>{" "}
                            and{" "}
                            <a className="privacy-text-color">Disclaimers </a>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="login-text-style">
                        <a>Facing any issue logging in?</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
