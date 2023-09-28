import React, { useState } from "react";
// import './Signup.style.js'
import { ButtonPink } from "../Products/Product.style";
import { SignPages } from "../Signup/Signup.style.js";
import { Alert, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { signinAction } from "../../Action";

function Signin() {
  const history = useHistory();
  const [validPassword, setValidPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const SubmitSignin = (e) => {
    e.preventDefault();
    const form = document.querySelector("#signinForm");
    const formData = new FormData(form);
    // console.log("e.target",e);
    const obj = Object.fromEntries(formData.entries());
    console.log("obj", obj);
    dispatch(signinAction(obj));
    if (auth.token) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 4000);
    }
    history.push("/");
  };
  function validatePassword(e) {
    const password = e.target.value;
    const name = e.target.name;

    const form = document.querySelector("#signupForm");
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());
    if (
      password.match(/[a-z]/g) &&
      // password.match(/[A-Z]/g) &&
      password.match(/[0-9]/g) &&
      // password.match(/[^a-zA-Z\d]/g) &&
      password.length >= 6
    ) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  }
  return (
    <SignPages className="signin">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>Login</h2>
            <p>Get access to your Orders. Wishlist and Recommendations</p>
          </div>
          <div className="col-md-6">
            {showSuccessMessage ? (
              <Alert className="alert auth" key={"success"} variant={"success"}>
                {auth.msg}
              </Alert>
            ) : null}
            {/* {showErrorMessage ? (
              <Alert className="alert auth" key={"danger"} variant={"danger"}>
                {authError}
              </Alert>
            ) : null} */}
            <Form id="signinForm" onSubmit={SubmitSignin}>
              <Form.Group
                className="form-group mb-4"
                controlId="formBasicEmail"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                />
                <Form.Label>
                  <span>Email</span>
                </Form.Label>
                {validPassword ? (
                  <Form.Text className="text-muted">
                    Password is not Valid.
                  </Form.Text>
                ) : null}
              </Form.Group>

              <Form.Group
                className="form-group mb-4"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  placeholder=""
                  name="password"
                  onBlur={validatePassword}
                  required
                />
                <Form.Label>
                  <span>Password</span>
                </Form.Label>
              </Form.Group>
              {/* <Form.Group className="form-group mb-4" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
              <ButtonPink className="sign-button">Sign In</ButtonPink>
              {/* <Button variant="primary" type="submit"> */}
              {/* Sign Up
            </Button> */}
            </Form>
          </div>
        </div>
      </div>
    </SignPages>
  );
}

export default Signin;
