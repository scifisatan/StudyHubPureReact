import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Resource } from "@/types";
import { PauseIcon, PlayIcon } from "lucide-react";

interface NowPlayingProps {
  handlePlayPause: (id: number, audioUrl: string) => void;
  currentLecture: Resource;
  isPlaying: boolean;
  progress: number;
}

export function NowPlaying({
  handlePlayPause,
  currentLecture,
  isPlaying,
  progress,
}: NowPlayingProps) {
  return (
    <Card className="mx-auto mb-6 w-full max-w-4xl bg-primary/5">
      <CardHeader>
        <CardTitle >Now Playing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{currentLecture.title}</h3>
            <p className="text-sm text-muted-foreground">
              {currentLecture.date}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              // @ts-ignore
              handlePlayPause(currentLecture.id, currentLecture.url)
            }
          >
            {isPlaying ? (
              <PauseIcon className="mr-2 h-4 w-4" />
            ) : (
              <PlayIcon className="mr-2 h-4 w-4" />
            )}
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardContent>
    </Card>
  );
}
