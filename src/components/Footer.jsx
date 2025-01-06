import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid p-0">
      <footer className="text-center text-white">
        <div
          className="container-fluid"
          style={{ backgroundColor: " rgba(0, 0, 0, 0.2)" }}
        >
          <section className="py-4">
            <div className="row text-center">
              <p>
                <b>Name:</b> InfinHub Market Technologies FZ-LLC​
              </p>
              <p>
                <b>Address:</b> InfinHub Market Technologies FZ-LLC, Building-2,
                Unit 112, Dubai Internet City, Dubai, United Arab Emiratesd
              </p>
              <p>
                <b>E-mail:</b>
                <a href="mailto:compliance@marketsmojo.com">
                  compliance@marketsmojo.com​
                </a>{" "}
                ​
              </p>
              <p>
                <b>Email:</b>
                <a href="mailto:support@marketsmojo.com">
                  support@marketsmojo.com
                </a>
                ​
              </p>
              <p>
                {" "}
                “Investment in securities market are subject to market risks.
                Read all the related documents carefully before investing.”
              </p>
            </div>
          </section>
        </div>
        <div className="footer-menu-wrapper">
          <div>
            <div className="footer-menu">
              <ul>
                <li>
                  <a href="#"> Contact Us</a>
                </li>
                <li>
                  <a href="#"> Privacy Policy</a>
                </li>
                <li>
                  <a href="#"> Refund Policy</a>
                </li>
                <li>
                  <a href="#">Disclaimers</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="#">Regulatory Information</a>
                </li>
              </ul>
            </div>
          </div>
          <div> All Rights reserved | © Markets Mojo 2024 </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
