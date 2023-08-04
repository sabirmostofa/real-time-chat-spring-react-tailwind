import { React, useEffect, useState } from "react";

import "./App.css";
import Register from "../Register";
import Chatbox from "../Chatbox";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

function App() {
  const [userData, setUserData] = useState({
    userId: null,
    name: "",
    connected: false,
  });

  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const clientInit = useRef(false);

  useEffect(() => {
    console.count("connecting to the server!");
    connect();

    return () => {
      console.log("cleaning up");
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const connect = () => {
    clientInit.current = true;
    const socket = new SockJS("/chat");
    const tempstompClient = Stomp.over(socket);
    tempstompClient.connect(
      { "client-id": userData.userId },
      () => {
        setConnected(true);
        setStompClient(tempstompClient);
      },
      (er) => {
        console.error(er);
      }
    );
  };

  const registerUser = (e) => {
    e.preventDefault();
    setUserData({ ...userData, connected: true });
  };

  const handleUser = (event) => {
    const { value } = event.target;
    const uuid = uuidv4();
    setUserData({ ...userData, name: value, userId: uuid });
  };

  return userData.connected ? (
    <Chatbox
      userData={userData}
      stompClient={stompClient}
      connected={connected}
    />
  ) : (
    <Register handleUser={handleUser} handleSubmit={registerUser} />
  );
}

export default App;
