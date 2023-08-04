import { useEffect, useRef, useState } from "react";
import Overlay from "../Overlay";

export default function Chatbox({ userData, stompClient, connected }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [realTimeMessages, setRealTimeMessages] = useState([]);
  const [errorText, setErrorText] = useState("");
  const endRef = useRef();
  const userSubsribed = useRef(false);

  const onMessageReceived = (payload) => {
    console.log("userID ", userData.userId);
    console.log(payload);
    let message = JSON.parse(payload.body);
    setRealTimeMessages((messages) => [...messages, message]);
  };

  const subscribeonConnected = () => {
    console.log("Connected! from the chatbox");
    stompClient.subscribe("/topic/messages", onMessageReceived, {
      id: userData.userId,
    });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    setErrorText("");

    try {
      if (msg) {
        stompClient.send(
          "/app/sendmessage",
          {},
          JSON.stringify({
            message: msg,
            sender: userData.name,
            senderId: userData.userId,
          })
        );
        setMsg("");
      }
    } catch (error) {
      setErrorText("couldn't send message. check console!");
      console.log(error);
    }
  };

  const fetchMessages = () => {
    fetch("/api/messages/recent?limit=20")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessages(data);
        console.log(data);
      });
  };

  let scrollToBottm = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (stompClient !== null && connected && !userSubsribed.current) {
      subscribeonConnected();
      userSubsribed.current = true;
    }
  });

  useEffect(() => scrollToBottm, [realTimeMessages, messages]);
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <Overlay connected={connected} />
      <div className="mx-auto  border rounded-md shadow-sm max-w-md mt5vh screen75">
        {errorText.length > 0 && (
          <div className="bg-error display">{errorText}</div>
        )}
        <div className="h-full overflow-y-auto mst">
          {messages.map((msg) => (
            <div className="chat chat-start" key={msg.id}>
              <div className="chat-header">{msg.sender}</div>
              <div className="chat-bubble">{msg.message}</div>

              <div className="chat-footer text-xs">{msg.timestamp}</div>
            </div>
          ))}
          {realTimeMessages.map((msg) => (
            <div className="chat chat-start" key={msg.id}>
              <div className="chat-header">
                {msg.senderId === userData.userId ? "You" : msg.sender}
              </div>
              <div
                className={
                  msg.senderId === userData.userId
                    ? "chat-bubble chat-bubble-primary"
                    : "chat-bubble"
                }
              >
                {msg.message}
              </div>

              <div className="chat-footer text-xs">{msg.timestamp}</div>
            </div>
          ))}

          <div ref={endRef}></div>
        </div>

        {/*  end of all chats  start of send*/}
        <div className="  bottom-0 shadow-lg py-5">
          <form
            className="flex mt-0 p-0 align-middle"
            onSubmit={sendMessage}
            method="POST"
            action="#"
          >
            <input
              type="text"
              onChange={(event) => setMsg(event.target.value)}
              value={msg}
              className="input input-md  w-full focus:outline-none bg-gray-100"
            />
            <button
              type="submit"
              disabled={!connected}
              className="text-white bg-gray-600 rounded-r-lg px-6 text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
