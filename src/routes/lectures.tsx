import { useState } from "react";
import { ChatSideBar } from "@/components/chatsidebar/chatsidebar";
import { Notes } from "@/components/notes";
import { Loader2 } from "lucide-react";
import VoiceRecorder from "../components/voice-recorder";
import { PrivateRoute } from "./private";

function QueryLectures() {
  const [isLoading, setIsLoading] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="space-y-4">
        <VoiceRecorder
          isProcessing={isLoading}
          setIsProcessing={setIsLoading}
          setMarkdownContent={setMarkdownContent}
        />

        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Processing audio...</span>
          </div>
        )}

        {markdownContent != "" && <Notes notes={markdownContent} />}
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
