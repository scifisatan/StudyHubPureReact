import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useResourceStore } from "../stores/resourceStore";

export default function UploadResourceForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [resourceType, setResourceType] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [resourceName, setResourceName] = useState("");
  const [description, setDescription] = useState("");
  const addResourceOptimistically = useResourceStore(
    (state) => state.addResourceOptimistically,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Construct the new resource object
    const newResource = {
      title: resourceName,
      type: resourceType,
      date: date.toISOString(),
    };

    // Optimistically update the state with the new resource
    await addResourceOptimistically(newResource);
    closeDialog();
    toast.success("Resource is added successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Resource Title</Label>
        <Input
          id="title"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="resourceType">Resource Type</Label>
        <Input
          id="resourceType"
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
