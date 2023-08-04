import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import Register from "./Register";
import Chatbox from "./Chatbox";

import SockJS from "sockjs-client/dist/sockjs";

import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { Client, Stomp } from "@stomp/stompjs";

const App = () => {
  const [userData, setUserData] = useState({
    userId: null,
    name: "",
    connected: false,
  });

  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const clientInit = useRef(false);

  useEffect(() => {
    console.log("connecting to the server! should run once!");
    connect();

    return () => {
      console.log("cleaning up");
      if (stompClient) {
        stompClient.deactivate();
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
      (er: any) => {
        console.error(er);
      }
    );
  };

  const registerUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setUserData({ ...userData, connected: true });
  };

  const handleUser = (event: { target: { value: any } }) => {
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
};

export default App;
