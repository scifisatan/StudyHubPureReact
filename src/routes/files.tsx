import { useState } from "react";
import { getPDFSummary } from "@/api";
import { ChatSideBar } from "@/components/chatsidebar";
import { Dropzone } from "@/components/dropzone";
import { Notes } from "@/components/notes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrivateRoute } from "@/routes/private";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function FilesPage() {
  const [markdownContent, setMarkdownContent] = useState("");
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
    <div className="container mx-auto max-w-3xl space-y-6 p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">PDF Summarizer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Dropzone onFileChange={handleFileChange} />
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <span>Processing the file...</span>
        </div>
      )}

      {markdownContent != "" && <Notes notes={markdownContent} />}
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
