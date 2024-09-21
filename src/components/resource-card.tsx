import React from "react";
import { MarkdownRenderer } from "@/components/markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Resource } from "@/types";
import { Calendar, File, FileAudio, Youtube } from "lucide-react";

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const extractVideoId = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const renderResourceContent = () => {
    switch (resource.tag) {
      case "audio":
        return (
          <audio controls src={resource.url} className="mb-4 w-full">
            Your browser does not support the audio element.
          </audio>
        );
      case "pdf":
        return (
          <div className="flex items-center justify-center p-4">
            <iframe
              src={resource.url}
              className="h-96 w-full rounded-lg border-2 border-gray-300 shadow-lg"
              title="PDF Viewer"
            />
          </div>
        );
      case "youtube":
        // @ts-ignore
        const videoId = extractVideoId(resource.url);
        return videoId ? (
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          </div>
        ) : null;
      default:
        return null;
    }
  };

  const getIcon = () => {
    switch (resource.tag) {
      case "audio":
        return <FileAudio className="mr-2 h-5 w-5 text-blue-500" />;
      case "pdf":
        return <File className="mr-2 h-5 w-5 text-red-500" />;
      case "youtube":
        return <Youtube className="mr-2 h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full overflow-hidden rounded-lg bg-background shadow-md">
      <ScrollArea className="h-[70vh] p-4">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center text-xl font-bold">
              {getIcon()}
              {resource.title}
            </h2>
            <span className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700">
              {resource.tag}
            </span>
          </div>
          <div className="mb-4 flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{resource.date}</span>
          </div>
          <div className="mb-6">{renderResourceContent()}</div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Summary</h3>
            <MarkdownRenderer>{String(resource.note)}</MarkdownRenderer>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResourceCard;
