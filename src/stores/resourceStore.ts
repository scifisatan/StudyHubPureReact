import { addResourceToServer, deleteResource, getResource } from "@/api";
import { Resource } from "@/types";
import { create } from "zustand";

type ResourceState = {
  resources: Resource[];
  fetchResources: () => Promise<void>;
  addResource: (resource: Resource) => Promise<void>;
  removeResource: (id: number) => Promise<void>;
};

export const useResourceStore = create<ResourceState>((set) => ({
  resources: [],
  fetchResources: async () => {
    try {
      const resources = await getResource();
      console.log(resources);
      set({ resources });
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    }
  },
  addResource: async (resource: Resource) => {
    try {
      const addedResource = await addResourceToServer(resource);

      set((state) => ({
        resources: [...state.resources, addedResource],
      }));
    } catch (error) {
      console.error("Adding resource to state failed", error);
      throw error;
    }
  },
  removeResource: async (id: number) => {
    await deleteResource(id);
    set((state) => ({
      resources: state.resources.filter((resource) => resource.id !== id),
    }));
  },
}));
