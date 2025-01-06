import React, { useState } from "react";
import useFetch from "../../api/useFetch";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });
  const { execute: register, loading } = useFetch(
    "https://sandbox-frapi.mojowealth.in/users/signup",
    "POST"
  );

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
    const { email, password, termsAccepted } = formData;
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

    if (!termsAccepted) {
      newErrors.terms = "Kindly accept terms and condition to proceed.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await register({ email, password });
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

  return (
    <div>
      <div className="join-mojo-text">Join Mojo Wealth</div>
      <div className="login-text">
        You can also join with your MarketsMojo login credentials
      </div>
      <form onSubmit={handleSubmit}>
        <div className="email-field">
          <div className="icon-inside-input">
            <input
              name="email"
              placeholder="Email Address"
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
              placeholder="Atleast 8 Character"
              className="form-control"
              type={showPassword ? "text" : "password"}
              name="password"
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
        <div className="remeber-check d-flex">
          <div className="checkbox-field">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              className="form-check-input"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-text-register">
            By signing up, you have read and agreed to Mojo Wealth{" "}
            <a href="/user/privacy-policy" className="privacy-text-color">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/user/disclaimer" className="privacy-text-color">
              Disclaimers
            </a>
          </div>
        </div>
        {errors.terms && (
          <p
            className="error-text"
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
              marginTop: "4px",
              marginBottom: "0",
            }}
          >
            {errors.terms}
          </p>
        )}
        {errors.general && (
          <p
            className="error-text"
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
              marginTop: "4px",
              marginBottom: "0",
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
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
      {/* {responseData && (
        <p style={{ color: "green" }}>Registration Successful!</p>
      )} */}
    </div>
  );
};

export default Register;
