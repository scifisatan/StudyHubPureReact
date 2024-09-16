import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

const MIN_WIDTH = 300;
const MAX_WIDTH = 600;

const ChatSideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [width, setWidth] = useState(MIN_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    [],
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isTyping) {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      setIsTyping(true);

      // Simulate response after 2 seconds
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a simulated response.", sender: "bot" },
        ]);
        setIsTyping(false);
      }, 2000);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed right-0 top-0 flex h-full bg-secondary shadow-2xl transition-all duration-300 ease-in-out`}
      style={{ width: isExpanded ? `${width}px` : "0px" }}
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
          <h2 className="mb-4 text-xl font-bold">Chat</h2>

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
                        ? "bg-blue-500"
                        : "bg-black text-black"
                    }`}
                  >
                    {message.text}
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
              placeholder="Type a message..."
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

export default ChatSideBar;
