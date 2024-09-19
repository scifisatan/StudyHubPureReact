import { useState } from "react";
import { getYoutubeSummary } from "@/api";
import { ChatSideBar } from "@/components/chatsidebar/chatsidebar";
import { Notes } from "@/components/notes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Youtube = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
    const extractedId = extractVideoId(e.target.value);
    if (extractedId) {
      setVideoId(extractedId);
    }
  };

  const handleRequestSummary = async () => {
    // Simulating API call to get summary
    if (!videoId) {
      toast.error("Invalid YouTube link");
      return;
    }

    setIsLoading(true);
    try {
      const data = await getYoutubeSummary(youtubeUrl);
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
    <div className="container mx-auto max-w-3xl p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            YouTube Video Summarizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {videoId && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <form className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                value={youtubeUrl}
                onChange={handleUrlChange}
                placeholder="Enter YouTube URL"
                className="flex-grow"
              />
              {
                <Button
                  onClick={handleRequestSummary}
                  disabled={!videoId || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Summary...
                    </>
                  ) : (
                    "Request Summary"
                  )}
                </Button>
              }
            </div>
          </form>
        </CardContent>
      </Card>

      {markdownContent != "" && <Notes notes={markdownContent} />}
      <ChatSideBar context={markdownContent} />
    </div>
  );
};
