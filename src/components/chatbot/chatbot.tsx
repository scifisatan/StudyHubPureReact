import React, { useState } from "react";
import "./khwopaChatStyles.css";
import { Send } from 'lucide-react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";

const ChatbotInterface = () => {
  const [userId, setUserId] = useState(uuidv4());
  const [isChatBoxOpened, setIsChatBoxOpened] = useState(false);
  const [chatBoxVisible, setChatBoxVisible] = useState(false);
  const [messages, setMessages] = useState<{ id: string; sender: string; content: string }[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");


  const toggleChatBox = () => {
    setChatBoxVisible(!chatBoxVisible);
    if (!isChatBoxOpened) {
      appendMessage(
        "Hi, I am KhCE Chatbot. How can I assist you today?",
        "bot",
      );
      setIsChatBoxOpened(true);
    }
  };

  const appendMessage = (message: string, sender: string) => {
    const newMessage = {
      id: uuidv4(),
      sender,
      content: message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sendQuery = () => {
    if (inputValue.trim() !== "") {
      appendMessage(inputValue, "user");
      requestServerForAnswer(inputValue);
      setInputValue("");
    }
  };

  const requestServerForAnswer = (userInput: string) => {
    const url = "https://chat.khwopa.edu.np/webhooks/rest/webhook";
    const data = { message: userInput, sender: userId };

    setTyping(true);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setTyping(false);
        addBotResponseToChatBox(response);
        if (!userId) {
          setUserId(response.user);
        }
      })
      .catch((error) => {
        setTyping(false);
        const errorMessage =
          "I am facing some issues, Please try again later!<br>Email: <a href='mailto:info@khwopa.edu.np'>info@khwopa.edu.np</a><br>Phone: (+977) 1-5122094, 5122098";
        addBotResponseToChatBox([{ text: errorMessage }]);
        console.log(error)
      });
  };



const addBotResponseToChatBox = (response: { text: string }[]) => {
    appendMessage(response[0].text, "bot");
};

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: { which: number; }) => {
    if (e.which === 13) {
      sendQuery();
    }
  };



  // const clearMessageForms = () => {
  //   const messageForms = document.getElementsByClassName("messageForm");
  //   for (let i = 0; i < messageForms.length; i++) {
  //     messageForms[i].innerHTML = "";
  //   }
  // };


  return (
    <div id="Arun_chat_ui" className="chat-theme">
      <div id="chat-icon" className="ripple" onClick={toggleChatBox}>
      {chatBoxVisible ? <X size={24} className="text-white"/> : <img src="/bot.png" alt="Bot Icon" />}
      </div>
      {chatBoxVisible && (
        <div id="chat-box" className={chatBoxVisible ? "open" : ""}>
          <div id="chat-box-header">
            Khwopa Chat
            <br />
            <span style={{ fontSize: "smaller" }}>
              <span style={{ color: "red" }}>*</span> May produce incorrect
              responses.
            </span>
          </div>
          <div id="chat-box-body" className="bg-secondary">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <img src="/bot.png" alt="bot image" />
                )}
                <div
                  className="message-content bg-secondary text-black"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                ></div>
              </div>
            ))}
            {typing && (
              <div className="chat-message bot typing-indicator-container">
                <img src="/bot.png" alt="bot image" />
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div id="chat-box-footer" className="bg-secondary text-black">
            <input
              type="text"
              id="chat-input"
              placeholder="Type your message..."
              maxLength={100}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button id="send-button" onClick={sendQuery}>
              <Send />
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotInterface;
