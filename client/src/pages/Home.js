import React, { useEffect } from "react";
import "./Home.css";
import axios from "../axios";
import { useHistory } from "react-router-dom";
import socket from "../socket/socket";
import "react-toastify/dist/ReactToastify.css";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { notificationActions } from "../store/notification";

//components
import Dashboard from './Dashboard';
export const Home = () => {
  const history = useHistory(); // history hook
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  // get chat function to get all data os user
  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await axios.get("/auth/chat", {
          withCredentials: true,
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        });

        const data = await res.data;

        dispatch(
          notificationActions.setNotification({
            type: "success",
            message: "Sign In succesfull",
          })
        );
        // check for validation or any other errors
        if (!res.status === 200) {
          throw new Error(res.error);
        }

        dispatch(authActions.login(data));
      } catch (err) {
        dispatch(
          notificationActions.setNotification({
            type: "error",
            message: "Credential Errors Try logging in Again",
          })
        );
        history.push("/login");
      }
    };

    getChat();
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    socket.connect();
    socket.emit("user", user);
  }, [user]);
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};

export default Home;
