import React, { useState } from "react";
import { uploadFile, uploadAudio } from "@/api";
import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useResourceStore } from "@/stores/resourceStore";
import { Resource } from "@/types";
import { Loader2 } from "lucide-react"; // Assuming you have a Spinner component
import { toast } from "sonner";

export default function UploadResourceForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [resourceType, setResourceType] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [file, setFile] = useState<File | null>(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [loading, setLoading] = useState(false);

  const { addResource } = useResourceStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newResource: Resource = {
      title,
      date: new Date(date).toISOString(),
      tag: resourceType == "lecture" ? "audio" : resourceType,
    };

    if (resourceType === "lecture" && file) {
      newResource.file = file;
    } else if (resourceType === "youtube") {
      newResource.url = youtubeLink;
    } else if (resourceType === "pdf" && file) {
      newResource.file = file;
    }

    try {
      if (resourceType === "lecture" && file) {
        const response = await uploadAudio(file);
        newResource.url = response.url;
      } else if (resourceType === "pdf" && file) {
        const response = await uploadFile(file);
        console.log(response.url);
        newResource.url = response.url;
      }

      await addResource(newResource);
      setTitle("");
      setDate(new Date().toISOString());
      setResourceType("");
      setFile(null);
      setYoutubeLink("");
      closeDialog();
      toast.success("Resource added successfully");
    } catch (err) {
      console.error("Error adding resource:", err);
      toast.error("Failed to add resource");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Resource Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div>
        <Label htmlFor="type">Resource Type</Label>
        <Select onValueChange={setResourceType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select resource type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lecture">Lecture</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {resourceType === "lecture" && (
        <div>
          <Label htmlFor="lecture">Lecture</Label>
          <Input
            id="lecture"
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>
      )}
      {resourceType === "youtube" && (
        <div>
          <Label htmlFor="youtube">YouTube Link</Label>
          <Input
            id="youtube"
            type="text"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            required
          />
        </div>
      )}
      {resourceType === "pdf" && (
        <div>
          <Label htmlFor="pdf">PDF File</Label>
          <Input
            id="pdf"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 /> Submitting
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
