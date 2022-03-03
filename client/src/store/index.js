import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import notificationSlice from "./notification";
import homeInfoSlice from "./homeInfo";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    homeInfo: homeInfoSlice.reducer,
  },
});

export default store;
