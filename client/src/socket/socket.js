import io from "socket.io-client";

const socket = io(process.env.REACT_APP_URL, { autoConnect: false });
console.log("scoket");
export default socket;
