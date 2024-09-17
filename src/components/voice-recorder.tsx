import React, { useRef, useState } from "react";
import { getLectureSummary } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square } from "lucide-react";
import { toast } from "sonner";

type VoiceRecorderProps = {
  setMarkdownContent: (content: string) => void;
  isProcessing: boolean;
  setIsProcessing: (loading: boolean) => void;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  setMarkdownContent,
  isProcessing,
  setIsProcessing,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) =>
        chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = handleRecordingStop;

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast.error("Failed to access microphone. Please try again.");
    }
  };

  const stopRecording = () => {
    setIsProcessing(true);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Audio has been recorded successfully.");
    }
  };

  const handleRecordingStop = async () => {
    const blob = new Blob(chunksRef.current, { type: "audio/wav" });
    setAudioUrl(URL.createObjectURL(blob));

    try {
      const data = await getLectureSummary(blob);
      setMarkdownContent(data);
    } catch (error) {
      console.error("Error fetching lecture summary:", error);
      toast.error("Failed to process the audio. Please try again.");
    } finally {
      setIsProcessing(false);
      chunksRef.current = []; // Clear chunks to free up memory
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Record Your Lectures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            {audioUrl && (
              <audio controls src={audioUrl} className="mb-4">
                Your browser does not support the audio element.
              </audio>
            )}

            <button
              onClick={toggleRecording}
              className={`rounded-full px-4 py-3 ${
                isRecording ? "bg-red-500" : "bg-green-500"
              } flex items-center justify-center text-white`}
              disabled={isProcessing}
            >
              {isRecording ? (
                <Square className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
              <span className="ml-2">
                {isRecording ? "Stop recording" : "Start recording"}
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceRecorder;
