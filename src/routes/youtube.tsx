import { useState } from "react";
import { MarkdownRenderer } from "../components/markdown-renderer";
import { PrivateRoute } from "./private";
import { toast } from "sonner";
function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="h-full w-full"
      />
    </div>
  );
}

function YoutubePage() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isValidLink, setIsValidLink] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(
    "Your notes will appear here",
  );

  const extractVideoId = (url: string) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleYoutubeLinkChange = (e: React.FormEvent) => {
    setYoutubeLink((e.target as HTMLInputElement).value);
    const extractedVideoId = extractVideoId((e.target as HTMLInputElement).value);
    if (extractedVideoId) {
      setVideoId(extractedVideoId);
      setIsValidLink(true);
      toast.success("Video ID extracted successfully!");
     
    } 
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMarkdownContent(`like share and subscribe guys`);
    if (!videoId) {
      toast.error("Invalid YouTube link");
      return;
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
          placeholder="Enter YouTube link"
          className="flex-grow rounded border px-4 py-2 bg-background text-foreground"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Enter
        </button>
      </form>
      {isValidLink && (
        <div className="mx-auto mt-4 max-w-md py-4">
          <YouTubeEmbed videoId={videoId} />
        </div>
      )}
      <MarkdownRenderer content={markdownContent} />
    </div>
  );
}

export function Youtube() {
  return (
    <PrivateRoute>
      <YoutubePage />
    </PrivateRoute>
  );
}
