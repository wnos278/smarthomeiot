import { createSlice } from "@reduxjs/toolkit";

// auth slice
const initialHomeInfoState = {
  homeinfos: [{
    temperature: 0,
    humidity: 0,
    time: 0,
  }]
};

const homeInfoSlice = createSlice({
  name: "homeInfo",
  initialState: initialHomeInfoState,
  reducers: {
    setHomeInfo(state, action) {
      if (state.homeinfos !== undefined)
      {
        if (state.homeinfos.length > 10) {
          let homeinfo = {
            time: action.payload.time,
            temperature: action.payload.temperature,
            humidity: action.payload.humidity
          }
          state.homeinfos = state.homeinfos.slice(-9);
          state.homeinfos.push(homeinfo);
        } else {
          let homeinfo = {
            time: action.payload.time,
            temperature: action.payload.temperature,
            humidity: action.payload.humidity
          }
          state.homeinfos.push(homeinfo);
        }
      }
    },
  },
});

export const homeInfoAction = homeInfoSlice.actions;
export default homeInfoSlice;
