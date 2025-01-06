import React, { useEffect, useRef } from "react";

const ForgetPassword = ({ closePopup }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClose = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [closePopup]);
  return (
    <div className="modal-content">
      <div className="popup-wrapper p-3">
        <form className="popup">
          <div className="row">
            <div className="col-12">
              <div className="icon-div">
                <i className="bi bi-x-lg" onClick={closePopup}></i>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="forget-password"> Forgot Password? </div>
              <div className="reg-email">
                {" "}
                Enter your registered Email ID and we will mail you the password
                reset link{" "}
              </div>
              <div className="email-fielpopup">
                <input
                  type="email"
                  formcontrolname="femail"
                  autocomplete="username"
                  placeholder="Enter Email"
                  className="form-control ng-pristine ng-valid ng-touched"
                  fdprocessedid="5nmc6"
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center popup-buttons">
            <div className="col-4">
              <button
                type="button"
                className="btn btn-lg btn-primary login-btn w-100"
              >
                Send
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn btn-lg btn-outline-primary w-100"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
