import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useResourceStore } from "@/stores/resourceStore";
import { Resource } from "@/types";
import {MarkdownRenderer} from "@/components/markdown";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { resources, fetchResources } = useResourceStore();
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "audio" | "youtube" | "pdf"
  >("all");

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    const filtered = resources.filter((resource) => {
      const matchesSearch = resource.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        activeFilter === "all" || resource.tag === activeFilter;
      return matchesSearch && matchesFilter;
    });
    setFilteredResources(filtered);
  }, [resources, searchTerm, activeFilter]);

  const handleResourceClick = (resourceId: number) => {
    navigate(`/dashboard/${resourceId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Student Dashboard</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <Input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex gap-2">
          {["all", "audio", "youtube", "pdf"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter as typeof activeFilter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card
            key={resource.id}
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => resource.id && handleResourceClick(resource.id)}
          >
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-gray-500">Type: {resource.tag}</p>
              {/* @ts-ignore */}
              <MarkdownRenderer>{`${resource.note.substring(0, 100)}...`}</MarkdownRenderer>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <p className="mt-6 text-center text-gray-500">No resources found.</p>
      )}
    </div>
  );
}
