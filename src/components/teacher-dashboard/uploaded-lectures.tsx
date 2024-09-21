import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Resource } from "@/types";
import { PauseIcon, PlayIcon, SearchIcon } from "lucide-react";
import DeleteButton from "./delete-button";

interface UploadedLecturesCardProps {
  lectures: Resource[];
  handlePlayPause: (id: number, url: string) => void;
  isPlaying: boolean;
  currentLectureId: number | null;
}

const UploadedLecturesCard: React.FC<UploadedLecturesCardProps> = ({
  lectures,
  handlePlayPause,
  isPlaying,
  currentLectureId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.note?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Uploaded Lectures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search lectures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <ScrollArea className="h-[30vh] md:h-[50vh]">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            //@ts-ignore
            value={expandedItem}
            onValueChange={setExpandedItem}
          >
            {filteredLectures
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .map((lecture) => (
                <AccordionItem value={`lecture-${lecture.id}`} key={lecture.id}>
                  <AccordionTrigger>
                    <div className="flex w-full items-center justify-between">
                      <span className="text-left">{lecture.title}</span>
                      <span className="pr-2 text-sm text-muted-foreground">
                        {new Date(lecture.date).toLocaleDateString()}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                  <p className="mb-4">{lecture.note}</p>

                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          // @ts-ignore
                          handlePlayPause(lecture.id, lecture.url);
                        }}
                      >
                        {isPlaying && currentLectureId === lecture.id ? (
                          <PauseIcon className="mr-2 h-4 w-4" />
                        ) : (
                          <PlayIcon className="mr-2 h-4 w-4" />
                        )}
                        {isPlaying && currentLectureId === lecture.id
                          ? "Pause"
                          : "Play"}
                      </Button>
                      <DeleteButton resource={lecture} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UploadedLecturesCard;
