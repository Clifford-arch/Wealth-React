"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [redirect, setRedirect] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [loadin, setLoadin] = useState(true);

  const checkLogin = async () => {
    setLoadin(true);
    try {
      const response = await axios.get(
        "https://sandboxwealth-frapi.mojoinfinity.com/users/check-login",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.code === 200) {
        setIsLogin(response.data.data.is_login);
        setRedirect(response.data.data.redirect_url);
        setNextStep(response.data.data.next_step);
      }
    } catch (error) {
      console.log("Error checking login:", error);
    } finally {
      setLoadin(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);
  useEffect(() => {
    if (!loadin) {
      checkLogin();
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        redirect,
        nextStep,
        loadin,
        checkLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
