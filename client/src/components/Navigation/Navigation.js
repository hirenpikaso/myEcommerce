import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Cart from "../../assets/images/cart.png";
import Sidebar from "../Cart/Sidebar";
import "./Navigation.scss";
import { cartTotalItemsSelect } from "../../Selectors/Cart.selector";
import { logoutAction } from "../../Action";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const cartStore = (state) => state.cartItems.cartItems;

function Navigation() {
  const history = useHistory();
  // const cartSelect = useSelector(cartStore);
  const cartTotalItems = useSelector(cartTotalItemsSelect);
  const auth = useSelector((state) => state.auth);
  const [openSidebar, setOpenSidebar] = useState(false);
  console.log("Nav auth", auth);
  const cartRef = useRef();
  const dispatch = useDispatch();
  function toggleSidebar() {
    setOpenSidebar(!openSidebar);
    document.getElementsByTagName("BODY")[0].style.overflow = openSidebar
      ? "auto"
      : "hidden";
  }
  function logout() {
    dispatch(logoutAction());
    history.push("/signin");
  }

  return (
    <div className="navigation">
      <div className="container">
        <div className="main-nav d-flex w-100">
          <Link className="Logo" to="/">
            <img src={Logo} alt="Sabka bazaar logo" />
          </Link>
          <div className="menu">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </div>
          <div className="ms-auto d-flex flex-column">
            {auth.token ? (
              <div className="mt-1">
                WelCome, {auth.user.firstname} {auth.user.lastname}
                <button
                  onClick={logout}
                  style={{ color: "blue", marginLeft: "10px" }}
                >
                  <span> Logout</span>
                </button>
              </div>
            ) : (
              <div className="signup-login">
                <Link to="/signin">Signin</Link>
                <Link to="/signup">Register</Link>
              </div>
            )}
            <div
              className="cart mt-2 align-self-start"
              ref={cartRef}
              onClick={toggleSidebar}
            >
              <img src={Cart} alt="cart" />{" "}
              <span>
                {cartTotalItems} {cartTotalItems <= 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>
        </div>
        <Sidebar
          classes={"sidebar " + (openSidebar ? "open" : "")}
          closeSidebar={toggleSidebar}
        />
        <div
          className={"backdrop " + (openSidebar ? "open" : "")}
          onClick={toggleSidebar}
        ></div>
      </div>
    </div>
  );
}

export default Navigation;
