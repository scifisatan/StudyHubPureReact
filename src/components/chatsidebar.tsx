import { useEffect, useRef, useState } from "react";
import { getChatResponse } from "@/api";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { MarkdownRenderer } from "./markdown";

const MIN_WIDTH = 300;
const MAX_WIDTH = 600;

type ChatSideBarProps = {
  context: string;
};

export const ChatSideBar = ({ context }: ChatSideBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [width, setWidth] = useState(MIN_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    [],
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const userID = localStorage.getItem("userID");

  const sidebarRef = useRef(null);
  const dragHandleRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    (messagesEndRef.current as HTMLDivElement | null)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number }) => {
      if (isDragging) {
        const newWidth = document.body.clientWidth - e.clientX;
        setWidth(Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH));
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
  }, [isDragging]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDragStart = (e: { preventDefault: () => void }) => {
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
            "There has been an error regarding user. Please login again to fix this issue ",
          );
        }
        if (context === "Your notes will appear here") {
          throw new Error("First provide the resources to chat with the bot ");
        }
        if (!context) {
          throw new Error("Unfortunately, there's nothing to talk about");
        }
        const response = await getChatResponse(inputMessage, userID, context);
        console.log(response);
        setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
        setIsTyping(false);
      } catch (error: any) {
        setMessages((prev) => [
          ...prev,
          { text: error.message, sender: "bot" },
        ]);
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
          className="z-1 absolute -left-6 top-1/2 rounded-md bg-blue-500 p-2 text-white"
          style={{ transform: "translateY(-50%)" }}
        >
          {isExpanded ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      <div className="flex h-full flex-grow flex-col">
        <div
          ref={dragHandleRef}
          onMouseDown={handleDragStart}
          className="bg-muted-backgroun absolute left-0 top-0 h-full w-1 cursor-ew-resize hover:bg-gray-400"
        />

        <div className="flex h-full flex-col overflow-hidden p-4">
          <h2 className="mb-4 text-xl font-bold text-background">...</h2>

          <div
            className="mb-4 flex-grow overflow-y-auto pr-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`inline-block rounded-lg p-2 text-white ${
                      message.sender === "user"
                        ? "bg-primary"
                        : "bg-muted-foreground text-black"
                    }`}
                  >
                    <MarkdownRenderer>{message.text}</MarkdownRenderer>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex space-x-2 p-2">
                  <div className="h-3 w-3 animate-bounce rounded-full bg-gray-500"></div>
                  <div
                    className="h-3 w-3 animate-bounce rounded-full bg-gray-500"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-3 w-3 animate-bounce rounded-full bg-gray-500"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !isTyping && handleSendMessage()
              }
              className="flex-grow rounded-l-md border bg-background p-2"
              placeholder="Chat with your resource..."
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              className={`rounded-r-md p-2 text-white ${isTyping ? "cursor-not-allowed bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
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
