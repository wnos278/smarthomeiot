import React, { useState } from "react";
import "./Login.css";
//matrial Ui
import Input from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { notificationActions } from "../store/notification";

function SignUp() {
  const btnStyle = {
    display: "flex",
    marginTop: "20px",
    marginLeft: "20px",
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [avatar, setAvatar] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  let name, value;
  // user input handler
  const userStoreHandler = (e) => {
    console.log(e);
    name = e.target.name;

    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  //store image
  const imageHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  //store data
  const postData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}auth/register`,
        data: {
          "name": user.name,
          "email": user.email,
          "phone": user.phone,
          "password": user.password,
        },
      });

      const data = await res.data;
      console.log(data);

      dispatch(
        notificationActions.setNotification({
          type: "success",
          message: data.message,
        })
      );
    } catch (err) {
      console.log( err.response);
      dispatch(
        notificationActions.setNotification({
          type: "error",
          message: err.response.data.message,
        })
      );
    }
  };

  return (
    <div className="home">
      <ToastContainer />
      <div className="home__body">
        <form
          className="login__form"
          method="post"
          encType="multipart/form-data"
        >
          <div className="login__control">
            <Input
              fullWidth
              variant="outlined"
              type="text"
              label="Name"
              placeholder="enter Name"
              name="name"
              value={user.name}
              onChange={userStoreHandler}
            ></Input>
          </div>
          <div className="login__control">
            <Input
              fullWidth
              variant="outlined"
              type="text"
              label="Email"
              placeholder="enter email"
              name="email"
              value={user.email}
              onChange={userStoreHandler}
            ></Input>
          </div>
          <div className="login__control">
            <Input
              fullWidth
              type="password"
              variant="outlined"
              label="Password"
              placeholder="enter password"
              name="password"
              value={user.password}
              onChange={userStoreHandler}
            ></Input>
          </div>
          <div className="login__control">
            <Input
              fullWidth
              variant="outlined"
              type="number"
              label="Phone Number"
              placeholder="enter phone number"
              name="phone"
              value={user.phone}
              onChange={userStoreHandler}
            ></Input>
          </div>

          <div className="login__btn">
            <Button
              style={btnStyle}
              variant="contained"
              type="submit"
              color="primary"
              onClick={postData}
            >
              Sign Up
            </Button>
            <Button
              style={btnStyle}
              variant="contained"
              type="submit"
              color="primary"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
