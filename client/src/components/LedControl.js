import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button } from '@material-ui/core';
import { Avatar } from '@mui/material';
import axios from 'axios';
import Title from './UI/Title';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

function sendTurnOnLedMessage() {
    axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}messages/turn-on-led`,
        headers: {
        "content-type": "multipart/form-data",
        authorization: sessionStorage.getItem("token"),
      }})
        .then(function (response) {
            if (response.data["response"]["result"] === 1) {
                // alert("Done!")
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function sendTurnOffLedMessage() {
    axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}messages/turn-off-led`,
        headers: {
        "content-type": "multipart/form-data",
        authorization: sessionStorage.getItem("token"),
      }})
        .then(function (response) {
            if (response.data["response"]["result"] === 1) {
                // alert("Done!")
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

export default function LedControl() {
    const theme = useTheme();
    var isTurnOn = true;
    // Đầu tiên phải lấy trạng thái của đèn led

    // set giá trị cho biến trạng thái isTurnOn 

    const handleClickOff = () => {
        sendTurnOffLedMessage();
    };

    const handleClickOn = () => {
        sendTurnOnLedMessage();
    }

    var ledIcon = 'http://www.wpsimplesponsorships.com/wp-content/uploads/2019/05/cropped-icon-256x256.png';

    return (
        <React.Fragment>
            <Title>Điều khiển đèn LED</Title>
            <br />
            <Grid container spacing={3}
                direction="row"
                justifyContent="center"
            >
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Avatar src={ledIcon} />}
                    onClick={() => handleClickOn()} >
                    Turn On Led
                </Button>
                <Divider />
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Avatar src={ledIcon} />}
                    onClick={() => handleClickOff()} >
                    Turn Off Led
                </Button>
            </Grid>
        </React.Fragment>
    );
}
