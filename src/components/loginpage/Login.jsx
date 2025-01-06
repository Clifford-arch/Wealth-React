import React, { useState } from "react";
import ForgetPassword from "./../popup/ForgetPassword";
import useFetch from "../../api/useFetch";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const { execute: login, loading } = useFetch(
    "https://sandbox-frapi.mojowealth.in/users/login",
    "POST"
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const newErrors = {};

    // Validation
    if (!email) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid Email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await login({ email, password });
      // console.log("LoginSuccess", response);
      if (response?.data?.redirecturl) {
        window.location.href = response.data.redirecturl;
      }
    } catch (err) {
      // console.error("Login Failed:", err);
      if (err.response?.data?.error) {
        setErrors({
          ...newErrors,
          general: err.response.data.error,
        });
      } else if (err.message) {
        setErrors({
          ...newErrors,
          general: err.message,
        });
      } else {
        setErrors({
          ...newErrors,
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="join-mojo-text">Welcome Back!</div>
      <div className="login-text">Sign in to your account</div>
      <form onSubmit={handleSubmit}>
        <div className="email-field">
          <div className="icon-inside-input">
            <input
              // type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="username"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <img
                  alt=""
                  className="img-fluid"
                  src="https://sandbox-st.mojowealth.in/images/tickcheck.png"
                />
              </span>
            </div>
            {errors.email && (
              <p
                className="error-text"
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "4px",
                  marginBottom: "0",
                }}
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div className="char-filed">
          <div className="icon-inside-input">
            <input
              name="password"
              placeholder="Enter Password"
              className="form-control"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </span>
            </div>
            {errors.password && (
              <p
                className="error-text"
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "4px",
                  marginBottom: "0",
                }}
              >
                {errors.password}
              </p>
            )}
          </div>
        </div>
        <div className="remeber-check d-flex align-items-center justify-content-between">
          <div className="login-form">
            <input
              type="checkbox"
              name="remember"
              id="flexCheckDefault"
              className="form-check-input"
              checked={formData.remember}
              onChange={handleChange}
            />
            <span className="rename-me-text">Remember me</span>
          </div>
          <div
            className="forget-password-text"
            style={{ cursor: "pointer" }}
            onClick={togglePopup}
          >
            Forgot Password?
          </div>
        </div>
        {errors.general && (
          <p
            className="error-text"
            style={{
              color: "red",
              fontSize: "14px",
              marginTop: "4px",
              marginBottom: "0",
              textAlign: "center",
            }}
          >
            {errors.general}
          </p>
        )}
        <div className="register-button">
          <button
            type="submit"
            className="btn btn-lg btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
      {showPopup && <ForgetPassword closePopup={togglePopup} />}
    </>
  );
};

export default Login;
