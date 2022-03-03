import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Title from './UI/Title';
import { useDispatch, useSelector } from "react-redux";

function createTempData(homeInfo) {
  if (homeInfo != undefined) {
    return homeInfo.homeinfos.slice(-1)[0];
  }
  return 0;
}
export default function HumilityInfo() {
  var homeInfo = useSelector((state) => state.homeInfo);

  return (
    <React.Fragment>
      <Title>Nhiệt độ hiện tại</Title>
      <Typography component="p" variant="h4">
        {createTempData(homeInfo).temperature}
      </Typography>
      <Title>đo vào lúc:</Title>
      <Typography component="p" variant="h4">
        {createTempData(homeInfo).time}
      </Typography>
    </React.Fragment>
  );
}