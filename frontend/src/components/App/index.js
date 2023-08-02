import { React, useEffect, useState } from "react";

import "./App.css";
import Register from "../Register";
import Chatbox from "../Chatbox";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    connected: false,
  });

  //fetch saved messages from API

  const registerUser = () => {
    setUserData({ ...userData, connected: true });
  };

  const handleUser = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, name: value });
  };

  return userData.connected ? (
    <Chatbox userData={userData} />
  ) : (
    <Register handleUser={handleUser} handleSubmit={registerUser} />
  );
}

export default App;
