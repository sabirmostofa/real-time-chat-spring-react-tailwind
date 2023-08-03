import { React, useState } from "react";

import "./App.css";
import Register from "../Register";
import Chatbox from "../Chatbox";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [userData, setUserData] = useState({
    userId: null,
    name: "",
    connected: false,
  });

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
    <Chatbox userData={userData} />
  ) : (
    <Register handleUser={handleUser} handleSubmit={registerUser} />
  );
}

export default App;
