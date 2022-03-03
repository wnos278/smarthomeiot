import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// auth slice
const initialNotificationState = {
  notification: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotificationState,
  reducers: {
    setNotification(state, action) {
      const data = action.payload;

      console.log(data.message);
      if (data.type === "error") {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } else {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
        });
      }

      state.notification = true;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
