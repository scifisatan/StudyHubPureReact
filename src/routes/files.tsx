import { useState } from "react";
import { MarkdownRenderer } from "../components/markdown-renderer";
import { PrivateRoute } from "./private";
import { Dropzone } from "../components/dropzone";
import { getPDFSummary } from "../api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ChatSideBar from "@/components/chatsidebar";

function FilesPage() {
  const [markdownContent, setMarkdownContent] = useState(
    "Your notes will appear here",
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (file: File) => {

    setIsLoading(true);
    try {

      const data = await getPDFSummary(file);
      setMarkdownContent(data);
      
    } catch (error) {
      toast.error("Failed to fetch summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Dropzone onFileChange={handleFileChange} />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <MarkdownRenderer content={markdownContent} />
      )}
      <ChatSideBar context={markdownContent} />
    </div>
  );
}

export function Files() {
  return (
    <PrivateRoute>
      <FilesPage />
    </PrivateRoute>
  );
}
