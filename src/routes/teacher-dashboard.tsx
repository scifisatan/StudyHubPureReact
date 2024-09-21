import { useEffect, useRef, useState } from "react";
import AddResourceButton from "@/components/teacher-dashboard/add-resource";
import { NowPlaying } from "@/components/teacher-dashboard/now-playing";
import RecommendedResourcesCard from "@/components/teacher-dashboard/recommended-resources";
import UploadedLecturesCard from "@/components/teacher-dashboard/uploaded-lectures";
import { useResourceStore } from "@/stores/resourceStore";
import { Resource } from "@/types";

export function TeacherDashboard() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [lectures, setLectures] = useState<Resource[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { resources, fetchResources } = useResourceStore();

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    const filteredLectures = resources.filter(
      (resource) => resource.tag === "audio",
    );
    setLectures(filteredLectures);
  }, [resources]);
  {console.log(lectures)}
  {console.log(resources)}
  const handlePlayPause = (id: number, audioUrl: string) => {
    if (currentLectureId === id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(audioUrl);
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);
      setCurrentLectureId(id);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentLectureId(null);
        setCurrentAudio(null);
        setProgress(0);
      };

      audio.ontimeupdate = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const currentLecture = lectures?.find(
    (lecture) => lecture.id === currentLectureId,
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Teacher's Dashboard</h1>

      {currentLecture && (
        <NowPlaying
          progress={progress}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          currentLecture={currentLecture}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <UploadedLecturesCard
          lectures={lectures}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          currentLectureId={currentLectureId}
        />
        <RecommendedResourcesCard resources={resources} />
      </div>

      <div className="fixed bottom-6 right-6">
        <AddResourceButton />
      </div>
    </div>
  );
}
