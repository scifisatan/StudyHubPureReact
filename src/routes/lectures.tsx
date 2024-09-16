import { useState } from "react";
import { ChatSideBar } from "@/components/chatsidebar";
import { Loader2 } from "lucide-react";
import { MarkdownRenderer } from "../components/markdown-renderer";
import VoiceRecorder from "../components/voice-recorder";
import { PrivateRoute } from "./private";

function QueryLectures() {
  const [markdownContent, setMarkdownContent] = useState(
    "Your notes will appear here",
  );
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <VoiceRecorder
          setIsLoading={setIsLoading}
          setMarkdownContent={setMarkdownContent}
        />
        {!isLoading ? (
          <MarkdownRenderer content={markdownContent} />
        ) : (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
        <ChatSideBar context={markdownContent} />
      </div>
    </div>
  );
}

export function Lectures() {
  return (
    <PrivateRoute>
      <QueryLectures />
    </PrivateRoute>
  );
}
