import React, { useRef, useState } from "react";
import { getLectureSummary } from "@/api";
import { Mic, Square } from "lucide-react";
import { toast } from "sonner";

type VoiceRecorderProps = {
  setMarkdownContent: (content: string) => void;
  setIsLoading: (loading: boolean) => void;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  setMarkdownContent,
  setIsLoading,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audio, setAudio] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudio(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    setIsLoading(true);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (audio instanceof Blob) {
        getLectureSummary(audio)
          .then((data) => {
            setMarkdownContent(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching lecture summary:", error);
            setIsLoading(false);
          });
      } else {
        console.error("Audio is not a Blob.");
        toast.error("Failed to record audio. Please try again.");
        setIsLoading(false);
      }

      toast.success("Audio has been recorded successfully.");
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="my-8 flex items-center justify-center space-x-10">
      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={toggleRecording}
          className={`rounded-full p-4 ${
            isRecording ? "bg-red-500" : "bg-blue-500"
          } text-white transition-opacity hover:opacity-80`}
        >
          {isRecording ? <Square size={24} /> : <Mic size={24} />}
        </button>
        <span className="text-xs">
          {isRecording ? "Stop recording" : "Start recording"}
        </span>
      </div>
      {audioUrl && <audio controls ref={audioRef} src={audioUrl} />}
    </div>
  );
};

export default VoiceRecorder;
