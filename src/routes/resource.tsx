import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chat } from "@/components/chat";
import ResourceCard from "@/components/resource-card"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useResourceStore } from "@/stores/resourceStore";
import { Resource } from "@/types";

interface LayoutProps {
  LeftComponent: React.ComponentType<{ resource: Resource }>;
  RightComponent: React.ComponentType<{ resource: Resource }>;
}

export default function ResourcePage() {
  const { id } = useParams<{ id: string }>(); // Extract 'id' from the URL using react-router's useParams
  const { resources, fetchResources } = useResourceStore();
  const [resource, setResource] = useState<Resource | null>(null);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    const resource = id ? resources.find((r) => r.id === parseInt(id)) : null;

    if (resource) {
      setResource(resource);
    }
  }, [resources, id]);

  if (!resource) {
    return null;
  }

  const LeftPanel = ({ resource }: { resource: Resource }) => {
    return <ResourceCard resource={resource} />;
  };

  const Layout = ({ LeftComponent, RightComponent }: LayoutProps) => {
    return (
      <div className="flex h-[75vh] rounded-md border">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full items-center justify-center p-6">
              <LeftComponent resource={resource} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30}>
            <div className="flex h-full items-center justify-center p-6">
              <RightComponent resource={resource} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  };

  const RightPanel = ({ resource }: { resource: Resource }) => {
    return (
      <div className="h-full">
        <Chat context={resource.note || ""} />
      </div>
    );
  };

  return <Layout LeftComponent={LeftPanel} RightComponent={RightPanel} />;
}
