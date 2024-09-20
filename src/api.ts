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
  return handleApiCall("/file", formData, {
    "Content-Type": "multipart/form-data",
  });
};

export const getLectureSummary = async (blob: Blob) => {
  const formData = new FormData();
  formData.append("file", blob);
  return handleApiCall("/audio", formData, {
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
    return response.data[0].text;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching chat response");
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};

export const getSearchResponse = async (query: string) => {
  try {
    const response = await api.post("/search", {
      query,
      mode: "web",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching chat response");
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};

export const getMemoryResponse = async (memory: string, user_id:string) => {
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

  export const getForgetResponse = async (user_id:string) => {
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

export default api;
