import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar } from "reactstrap";
import Logo from "./img/logo.png";
import { FaDollarSign } from "react-icons/fa";
import PropTypes from "prop-types";
import Sidebar2 from "./SideBar2"
import SideBar from "./navbarSlide";
import "./style.css";
import './Navbar.css';

import { connect } from "react-redux";

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  onClick = () => {
    localStorage.clear();
    window.location.reload(false)
  }
  render() {
    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <div
          color="white"
          style={{ height: 100 }}
          className="fixed-top"
          id="App"
        >
          <Link to="/cart">
            <center>
              <img src={Logo} alt="..." style={{ width: 30, paddingTop: 20 }} />
            </center>
          </Link>
          <div>
          {this.props.auth.isAuthenticated !== true ? (
            <SideBar />
          ) : (
            <Sidebar2/>
          )}
            
          </div>
        </div>
      );
    } else {
      return (
        <Navbar
          color="white"
          className="fixed-top"
          style={{
            position: " ",
            width: "100%",
            boxShadow: "0 2px 6px 0 rgba(0,0,0,.2)",
          }}
          light
          expand="md"
        >
          <NavLink className="navbar-brand" to="/">
            <div className="trishop">
              <img src={require("./img/trishop.png")} />
            </div>
          </NavLink>
          <ul
            className="ml-auto navbar-nav"
            style={{
              padding: 5,
            }}
          >
            <li
              className="nav-item"
              style={{
                padding: 0,
              }}
            >
              <NavLink className="nav-link" to="/cart">
                <img src={Logo} width={50} alt="..." />
              </NavLink>
            </li>
            <li
              className="nav-item"
              style={{
                padding: 10,
              }}
            ></li>
            <li
              className="nav-item"
              style={{
                padding: 10,
                backgroundColor: "rgb(31, 43, 82)",
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <NavLink
                style={{ color: "white" }}
                className="nav-link"
                to="/sell"
              >
                Sell
              </NavLink>
            </li>
            {this.props.auth.isAuthenticated !== true ? (
              <>
                <li
                  className="nav-item"
                  style={{
                    padding: 10,
                    backgroundColor: "rgb(31, 43, 82)",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <NavLink
                    style={{ color: "white" }}
                    className="nav-link"
                    to="/signin"
                  >
                    Signin
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  style={{
                    padding: 10,
                    backgroundColor: "rgb(31, 43, 82)",
                    borderRadius: 10,
                  }}
                >
                  <NavLink
                    style={{ color: "white" }}
                    className="nav-link"
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
            {this.props.auth.isAuthenticated === true ? (
              <>
                <li
                  className="nav-item"
                  style={{
                    padding: 10,
                    backgroundColor: "rgb(31, 43, 82)",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                >
                  <NavLink
                    style={{ color: "white" }}
                    className="nav-link"
                    to="/"
                    href="/"
                    onClick={this.onClick}
                    
                  >
                    Log out
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </Navbar>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(NavMenu);
