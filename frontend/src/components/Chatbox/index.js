import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;
export default function Chatbox({ userData }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [realTimeMessages, setRealTimeMessages] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [connected, setConnected] = useState(false);
  const endRef = useRef();

  const connect = () => {
    let socket = new SockJS("/chat");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = (connetion) => {
    console.log("Connected!");
    console.log(connetion);
    setConnected(true);
    stompClient.subscribe("/topic/messages", onMessageReceived);
  };

  const onError = (err) => {
    console.log("Could not connect:", err);
    setErrorText("couldn't connect to the chat websocket, check console!");
  };

  const onMessageReceived = (payload) => {
    console.log(payload);
    let message = JSON.parse(payload.body);
    setRealTimeMessages((messages) => [...messages, message]);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    setErrorText("");

    try {
      if (msg) {
        stompClient.send(
          "/app/sendmessage",
          {},
          JSON.stringify({ message: msg, sender: userData.name })
        );
        setMsg("");
      }
    } catch (error) {
      setErrorText("couldn't send message. check console!");
      console.log(error);
    }
  };

  const fetchMessages = () => {
    fetch("/api/messages/recent?limit=10")
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

  useEffect(() => scrollToBottm, [realTimeMessages, messages]);
  useEffect(() => {
    fetchMessages();
    connect();
  }, []);

  return (
    <div className="mx-auto border rounded-md shadow-sm max-w-md mt-4 h-screen">
      {errorText.length > 0 && (
        <div className="bg-error display">{errorText}</div>
      )}
      <div className="h-3/4 overflow-y-auto">
        {messages.map((msg) => (
          <div className="chat chat-start">
            <div className="chat-header">{msg.sender}</div>
            <div className="chat-bubble">{msg.message}</div>

            <div className="chat-footer text-xs">{msg.timestamp}</div>
          </div>
        ))}
        {realTimeMessages.map((msg) => (
          <div className="chat chat-start">
            <div className="chat-header">{msg.sender}</div>
            <div className="chat-bubble">{msg.message}</div>

            <div className="chat-footer text-xs">{msg.timestamp}</div>
          </div>
        ))}

        <div ref={endRef}></div>
      </div>

      {/*  end of all chats  start of send*/}
      <div className="bg-gray-200  bottom-0 shadow-lg py-10">
        <form className="flex" onSubmit={sendMessage} method="POST" action="#">
          <input
            type="text"
            onChange={(event) => setMsg(event.target.value)}
            value={msg}
            className="input w-full focus:outline-none bg-gray-100"
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
  );
}
