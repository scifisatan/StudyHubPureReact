import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PauseIcon, PlayIcon, PlusIcon } from "lucide-react";
import RecordLectureForm from "@/components/record-lecture-form";
import UploadResourceForm from "@/components/upload-resource-form";

// Mock data for lectures and resources
const lectures = [
  {
    id: 1,
    title: "Introduction to React",
    date: "2023-06-15",
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav",
    description:
      "This lecture provides an introduction to React, covering its core concepts and basic usage.",
  },
  {
    id: 2,
    title: "State Management in React",
    date: "2023-06-10",
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav",
    description:
      "Learn about different state management techniques in React, including useState, useReducer, and Context API.",
  },
  {
    id: 3,
    title: "React Hooks Deep Dive",
    date: "2023-06-05",
    audioUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav",
    description:
      "An in-depth exploration of React Hooks, including custom hooks and best practices.",
  },
];

const resources = [
  { id: 1, title: "React Documentation", type: "pdf", url: "#" },
  { id: 2, title: "React Tutorial for Beginners", type: "youtube", url: "#" },
  { id: 3, title: "Advanced React Patterns", type: "pdf", url: "#" },
];

export function TeacherDashboard() {
  const [resourceType, setResourceType] = useState("all");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const filteredResources = resources.filter(
    (resource) => resourceType === "all" || resource.type === resourceType,
  );

  const handlePlayPause = (lectureId: number, audioUrl: string) => {
    if (currentAudio) {
      currentAudio.pause();
      if (currentLectureId === lectureId) {
        setIsPlaying(false);
        setCurrentLectureId(null);
        setCurrentAudio(null);
        return;
      }
    }

    const audio = new Audio(audioUrl);
    audio.play();
    setCurrentAudio(audio);
    setIsPlaying(true);
    setCurrentLectureId(lectureId);

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentLectureId(null);
      setCurrentAudio(null);
      setProgress(0);
    };

    audio.ontimeupdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
  };

  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Learning Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Lectures</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {lectures
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .map((lecture) => (
                  <AccordionItem
                    value={`lecture-${lecture.id}`}
                    key={lecture.id}
                  >
                    <AccordionTrigger>
                      <div className="flex w-full items-center justify-between">
                        <span>{lecture.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {lecture.date}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">{lecture.description}</p>
                      <div className="flex items-center gap-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handlePlayPause(lecture.id, lecture.audioUrl)
                          }
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
                        {currentLectureId === lecture.id && (
                          <Progress value={progress} className="w-full" />
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setResourceType("all")}>
                  All
                </TabsTrigger>
                <TabsTrigger value="pdf" onClick={() => setResourceType("pdf")}>
                  PDF
                </TabsTrigger>
                <TabsTrigger
                  value="youtube"
                  onClick={() => setResourceType("youtube")}
                >
                  YouTube
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <ul className="space-y-2">
                  {filteredResources.map((resource) => (
                    <li key={resource.id}>
                      <a
                        href={resource.url}
                        className="text-blue-600 hover:underline"
                      >
                        {resource.title}
                      </a>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({resource.type})
                      </span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-6 right-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" className="rounded-full shadow-lg">
              <PlusIcon className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Tabs defaultValue="record">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="record">Record Lecture</TabsTrigger>
                <TabsTrigger value="upload">Upload Resource</TabsTrigger>
              </TabsList>
              <TabsContent value="record">
                <RecordLectureForm />
              </TabsContent>
              <TabsContent value="upload">
                <UploadResourceForm />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
