import { Resource } from "@/types";
import axios from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error("VITE_API_URL environment variable is not defined");
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiCall = async (endpoint: string, data: any, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    toast.success("Data fetched successfully");
    return response.data.note;
  } catch (error) {
    console.error(error);
  }
};

export const getYoutubeSummary = async (url: string) => {
  return handleApiCall("/youtube", { url });
};

export const getPDFSummary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return handleApiCall("/file_student", formData, {
    "Content-Type": "multipart/form-data",
  });
};

export const getLectureSummary = async (blob: Blob) => {
  const formData = new FormData();
  formData.append("file", blob);
  return handleApiCall("/audio_student", formData, {
    "Content-Type": "multipart/form-data",
  });
};

export const getChatResponse = async (
  message: string,
  senderID: string,
  context: string,
) => {
  try {
    const response = await api.post("/chat", {
      message,
      sender: senderID,
      context,
    });
    return response.data[0];
  } catch (error) {
    console.error(error);
    toast.error("Error fetching chat response");
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};


export const getMemoryResponse = async (memory: string, user_id: string) => {
  try {
    const response = await api.post("/remember", {
      user_id,
      memory,
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching chat response");
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};
export const getForgetResponse = async (user_id: string) => {
  try {
    const response = await api.post("/forget", {
      user_id,
      memory: "all",
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching chat response");
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};

export const getResource = async () => {
  try {
    const response = await api.get("/resources");
    return response.data;
  } catch (error) {
    console.error("Error fetching resources:", error);
    toast.error("Failed to fetch resources. Please try again.");
    throw error;
  }
};

export const addResourceToServer = async (resource: Resource) => {
  try {
    const response = await api.post("/resources", resource);
    console.log(response);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding resource:", error);
    throw error;
  }
};

export const deleteResource = async (id: number) => {
  try {
    const response = await api.delete(`/resources/${id}`);
    console.log(response)
  } catch (error) {
    console.error("Error deleting resource:", error);
    toast.error("Failed to delete resource. Please try again.");
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await api.post("/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const uploadAudio = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await api.post("/audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default api;
