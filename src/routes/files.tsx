import { useState } from "react";
import { getPDFSummary } from "@/api";
import { ChatSideBar } from "@/components/chatsidebar/chatsidebar";
import { Dropzone } from "@/components/dropzone";
import { Notes } from "@/components/notes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrivateRoute } from "@/routes/private";
import {  Loader2 } from "lucide-react";
import { toast } from "sonner";

function FilesPage() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const submitFile = async (file: File) => {
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
          {file && (
            //preview of pdf file
            <div className="flex items-center justify-center p-4">
              <iframe
                src={URL.createObjectURL(file)}
                className="h-96 w-full rounded-lg border-2 border-gray-300 shadow-lg"
              />
            </div>
          )}
          <Dropzone onFileChange={handleFileChange} />
          <div className="flex justify-end">
            <Button
              onClick={() => file && submitFile(file)}
              disabled={isLoading || !file}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 animate-spin" size={24} />
                  Generating Summary...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

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
