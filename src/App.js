import "./App.css";
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "error 404",
    },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    let newChatLog = [...chatLog, { user: "me", message: `${input}` }];
    await setInput("");

    // fetch response from API
    const messages = newChatLog.map((message) => message.message).join("/n");
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // message: chatLog.map((message) => message.message).join(""),
        message: messages,
      }),
    });
    const data = await response.json();
    setChatLog([...newChatLog, { user: "GPT", message: `${data.message}` }]);
    console.log(data.message);
  }

  return (
    <div>
      <div id="ChatLog">
        {chatLog.map((message, index) => {
          return <ChatMessage message={message} key={index} />;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input id="ChatInputText" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div id="ChatMessage">
      <div id="Avatar">-</div>
      <div id="Message">{message.message}</div>
    </div>
  );
};

export default App;
