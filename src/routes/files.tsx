import { useState } from "react";
import { MarkdownRenderer } from "../components/markdown-renderer";
import { PrivateRoute } from "./private";
import { Dropzone } from "../components/dropzone";

function FilesPage() {
  const [markdownContent, setMarkdownContent] = useState(
    "Your notes will appear here",
  );

  const handleFileChange = (file: File) => {
    if (file) {
      setMarkdownContent("Kati ramro notes wow");
      console.log(file)
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Dropzone onFileChange={handleFileChange} />
      </div>
      <MarkdownRenderer content={markdownContent} />
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
