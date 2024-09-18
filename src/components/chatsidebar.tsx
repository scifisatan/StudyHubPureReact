import React, { useEffect, useRef, useState } from "react";
import { getChatResponse } from "@/api";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { MarkdownRenderer } from "./markdown";

type ChatSideBarProps = {
  context: string;
};

export const ChatSideBar: React.FC<ChatSideBarProps> = ({ context }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [width, setWidth] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    [],
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [minWidth, setMinWidth] = useState(300);
  const [maxWidth, setMaxWidth] = useState(600);

  const userID = localStorage.getItem("userID");

  const sidebarRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateWidthConstraints = () => {
    const screenWidth = window.innerWidth;
    const newMinWidth = Math.min(300, screenWidth * 0.3);
    const newMaxWidth = Math.min(600, screenWidth * 0.8);
    setMinWidth(newMinWidth);
    setMaxWidth(newMaxWidth);
    setWidth((prevWidth) =>
      Math.min(Math.max(prevWidth, newMinWidth), newMaxWidth),
    );
  };

  useEffect(() => {
    updateWidthConstraints();
    window.addEventListener("resize", updateWidthConstraints);
    return () => window.removeEventListener("resize", updateWidthConstraints);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && sidebarRef.current) {
        const newWidth = document.body.clientWidth - e.clientX;
        setWidth(Math.min(Math.max(newWidth, minWidth), maxWidth));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, minWidth, maxWidth]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isTyping) {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      setIsTyping(true);
      try {
        if (!userID) {
          throw new Error(
            "There has been an error regarding user. Please login again to fix this issue",
          );
        }
        if (context === "Your notes will appear here") {
          throw new Error("First provide the resources to chat with the bot");
        }
        if (!context) {
          throw new Error("Unfortunately, there's nothing to talk about");
        }
        const response = await getChatResponse(inputMessage, userID, context);
        setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
      } catch (error: any) {
        setMessages((prev) => [
          ...prev,
          { text: error.message, sender: "bot" },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed bottom-0 right-0 flex h-full bg-secondary shadow-2xl transition-all duration-300 ease-in-out`}
      style={{
        width: isExpanded ? `${width}px` : "0px",
      }}
    >
      <div className="relative">
        <button
          onClick={handleExpand}
          className="z-1 absolute -left-6 top-1/2 rounded-l-md bg-blue-500 p-2 text-white"
          style={{ transform: "translateY(-50%)" }}
        >
          {isExpanded ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      <div className="flex h-full w-full flex-col">
        <div
          ref={dragHandleRef}
          onMouseDown={handleDragStart}
          className="absolute left-0 top-0 h-full w-1 cursor-ew-resize hover:bg-gray-400"
        />

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
                    <MarkdownRenderer>{message.text}</MarkdownRenderer>
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
      </div>
    </div>
  );
};
