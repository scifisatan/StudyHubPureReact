import React, { useState } from "react";
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

export default function UploadResourceForm() {
  const [resourceType, setResourceType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Resource Title</Label>
        <Input id="title" required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" required />
      </div>
      <div>
        <Label htmlFor="type">Resource Type</Label>
        <Select onValueChange={setResourceType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select resource type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {resourceType === "audio" && (
        <div>
          <Label htmlFor="audio">Audio File</Label>
          <Input id="audio" type="file" accept="audio/*" required />
        </div>
      )}
      {resourceType === "youtube" && (
        <div>
          <Label htmlFor="youtube">YouTube Link</Label>
          <Input id="youtube" type="url" required />
        </div>
      )}
      {resourceType === "pdf" && (
        <div>
          <Label htmlFor="pdf">PDF File</Label>
          <Input id="pdf" type="file" accept=".pdf" required />
        </div>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
}
