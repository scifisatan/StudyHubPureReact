import React, { useState } from "react";
import { toast } from "sonner";
import { getYoutubeSummary } from "../api";
import { MarkdownRenderer } from "../components/markdown-renderer";
import { PrivateRoute } from "./private";
import { Loader2 } from "lucide-react";
import ChatSideBar from "@/components/chatsidebar";

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
    "Your notes will appear here"
  );
  const [isLoading, setIsLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleYoutubeLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeLink(e.target.value);
    const extractedVideoId = extractVideoId(e.target.value);
    if (extractedVideoId) {
      setVideoId(extractedVideoId);
      setIsValidLink(true);
      toast.success("Video ID extracted successfully!");
    } else {
      setIsValidLink(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoId) {
      toast.error("Invalid YouTube link");
      return;
    }

    setIsLoading(true);
    try {
      const data = await getYoutubeSummary(youtubeLink);
      setMarkdownContent(data);
    } catch (error: any) {
      if (error.response && error.response.status === 503) {
        toast.error("No transcript available for this video.");
      } else {
      toast.error("Failed to fetch summary. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
          placeholder="Enter YouTube link"
          className="flex-grow rounded border bg-background px-4 py-2 text-foreground"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
          disabled={!isValidLink || isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Enter"
          )}
        </button>
      </form>
      {isValidLink && (
        <div className="mx-auto mt-4 max-w-md py-4">
          <YouTubeEmbed videoId={videoId} />
        </div>
      )}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <MarkdownRenderer content={markdownContent} />
      )}
      <ChatSideBar  context = {markdownContent} />
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