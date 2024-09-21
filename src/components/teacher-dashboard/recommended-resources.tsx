import { useState } from "react";
import MoreOptions from "@/components/teacher-dashboard/more-options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Resource } from "@/types";

const RecommendedResourcesCard = ({ resources }: { resources: Resource[] }) => {
  const [resourceType, setResourceType] = useState("all");

  const filteredResources =
    resourceType === "all"
      ? resources.filter((resource) => resource.tag === "youtube" || resource.tag === "pdf")
      : resources.filter((resource) => resource.tag === resourceType);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Recommended Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={resourceType} onValueChange={setResourceType}>
          <TabsList defaultValue="all">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="youtube">Youtube</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea>
              {filteredResources.map((resource) => (
                <div key={resource.id}>
                  <a
                    href={resource.url}
                    className="text-blue-600 hover:underline"
                  >
                    {resource.title}
                  </a>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({resource.tag})
                  </span>
                  <MoreOptions resource={resource} />
                </div>
              ))}
              <ScrollBar />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="youtube">
            <ScrollArea>
              {filteredResources.map((resource) => (
                <div key={resource.id}>
                  <a
                    href={resource.url}
                    className="text-blue-600 hover:underline"
                  >
                    {resource.title}
                  </a>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({resource.tag})
                  </span>
                  <MoreOptions resource={resource} />
                </div>
              ))}
              <ScrollBar />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="pdf">
            <ScrollArea>
              {filteredResources.map((resource) => (
                <div key={resource.id}>
                  <a
                    href={resource.url}
                    className="text-blue-600 hover:underline"
                  >
                    {resource.title}
                  </a>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({resource.tag})
                  </span>
                  <MoreOptions resource={resource} />
                </div>
              ))}
              <ScrollBar />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RecommendedResourcesCard;
