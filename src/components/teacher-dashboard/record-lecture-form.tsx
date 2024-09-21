import React, { useRef, useState } from "react";
import { uploadAudio } from "@/api";
import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResourceStore } from "@/stores/resourceStore";
import { Resource } from "@/types";
import { Loader2, MicIcon, Square } from "lucide-react";
import { toast } from "sonner";

export default function RecordLectureForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const addResource = useResourceStore((state) => state.addResource);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("date", date ?? "");
    formData.append("file", audioBlob as Blob);

    const newResource: Resource = {
      title: (e.target as any).title.value,
      date: new Date(date).toISOString(),
      tag: "audio",
      url: "",
    };

    try {
      const response = await uploadAudio(
        new File([audioBlob as Blob], "audio.wav"),
      );
      newResource.url = response.url;

      addResource(newResource);
      toast.success("Lecture is recorded successfully");
      closeDialog();
    } catch (err) {
      console.error("Error adding resource:", err);
      toast.error("Failed to add resource");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Lecture Title</Label>
        <Input id="title" required />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="date">Date</Label>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div className="flex flex-col space-y-2">
        <Label>Audio</Label>
        {!isRecording && !audioBlob && (
          <Button type="button" onClick={startRecording}>
            <MicIcon className="mr-2 h-4 w-4" /> Start Recording
          </Button>
        )}
        {isRecording && (
          <Button type="button" onClick={stopRecording} variant="destructive">
            <Square className="mr-2 h-4 w-4" /> Stop Recording
          </Button>
        )}
        {audioBlob && (
          <audio
            src={URL.createObjectURL(audioBlob)}
            controls
            className="mt-2 w-full"
          />
        )}
      </div>
      <Button type="submit" disabled={!audioBlob || loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
