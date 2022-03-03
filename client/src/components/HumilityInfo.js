import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Title from './UI/Title';
import { useDispatch, useSelector } from "react-redux";

function createHumData(homeInfo) {
  if (homeInfo != undefined) {
    return homeInfo.homeinfos.slice(-1)[0].humidity;
  }
  return 0;
}
export default function HumilityInfo() {
  var homeInfo = useSelector((state) => state.homeInfo);

  return (
    <React.Fragment>
      <Title>Độ ẩm hiện tại</Title>
      <Typography component="p" variant="h4">
        {createHumData(homeInfo)}
      </Typography>
    </React.Fragment>
  );
}
