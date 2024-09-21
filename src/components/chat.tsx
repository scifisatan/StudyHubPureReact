import { useEffect, useRef, useState } from "react";
import { getChatResponse, getMemoryResponse, getForgetResponse } from "@/api";
import { Send } from "lucide-react";
import "@/searchResults.css";
import React from "react";
import CarouselCards from "@/components/chatsidebar/search-results";
import ImageCarousel from "@/components/chatsidebar/image-search-results";

type Message = {
  content: string | JSX.Element; // Changed from text to content to handle HTML
  sender: string;
};

export const Chat = ({ context }: { context: string }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Welcome! I’m Gurukul Bot. I’m here to help with any questions you have about your study material. Just ask, and I’ll guide you through it!",
      sender: "bot",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const userID = localStorage.getItem("userID");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isTyping) {
      setMessages([...messages, { content: inputMessage, sender: "user" }]);
      setInputMessage("");
      setIsTyping(true);
      try {
        if (!userID) {
          throw new Error(
            "There has been an error regarding user. Please login again to fix this issue",
          );
        }

        if (inputMessage.trim().toLowerCase().startsWith("/remember")) {
          const memory = inputMessage.trim().slice(9);
          const response = await getMemoryResponse(memory, userID);
          setMessages((prev) => [
            ...prev,
            { content: response, sender: "bot" }, // Use content instead of text
          ]);
          return;
        }
        if (inputMessage.trim().toLowerCase().startsWith("/forget")) {
          const response = await getForgetResponse(userID);
          setMessages((prev) => [
            ...prev,
            { content: response, sender: "bot" }, // Use content instead of text
          ]);
          return;
        }

        if (context === "Your notes will appear here") {
          throw new Error("First provide the resources to chat with the bot");
        }
        if (!context) {
          throw new Error("Unfortunately, there's nothing to talk about");
        }

        const response = await getChatResponse(inputMessage, userID, context);
        console.log(response);
        if (response.mode == "text") {
          setMessages((prev) => [
            ...prev,
            { content: response.reply, sender: "bot" }, // Use content instead of text
          ]);
          return;
        }
        if (response.mode == "web") {
          setMessages((prev) => [
            ...prev,
            {
              content: <CarouselCards results={response.search_results} />,
              sender: "bot",
            }, // Use content instead of text
          ]);
          return;
        } else {
          setMessages((prev) => [
            ...prev,
            { content: response.reply, sender: "bot" }, // Use content instead of text
          ]);
          setMessages((prev) => [
            ...prev,
            {
              content: <ImageCarousel results={response.search_results} />,
              sender: "bot",
            },
          ]);
          return;
        }

        // if (response.trim().startsWith("<p>search_handover")) {
        //   const searchQuery = response.trim().slice(17);
        //   const results = await getSearchResponse(searchQuery);
        //   setMessages((prev) => [
        //     ...prev,
        //     { content: <CarouselCards results={results} />, sender: "bot" }, // Use content instead of text
        //   ]);
        //   return;
        // }
      } catch (error: any) {
        setMessages((prev) => [
          ...prev,
          { content: `<p>${error.message}</p>`, sender: "bot" }, // Use content instead of text
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="flex h-full flex-col p-4">
      {/* //This is here only to offset the topbar height */}
      <h2 className="mb-6 text-xl font-bold text-secondary">.</h2>

      <div
        className="scrollbar-hide mb-4 flex-grow overflow-y-auto pr-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex-1 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {React.isValidElement(message.content) ? (
                  message.content
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-gray-100 p-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !isTyping) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-grow rounded-l-md border bg-background p-2"
          placeholder="Chat with your resource..."
          disabled={isTyping}
        />
        <button
          onClick={handleSendMessage}
          className={`rounded-r-md p-2 text-white ${
            isTyping
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isTyping}
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
