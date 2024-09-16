import axios from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_API_URL;
if (!baseURL) {
  throw new Error("VITE_API_URL environment variable is not defined");
}

const myHeaders = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: baseURL,
  headers: myHeaders,
});

const handleApiCall = async (endpoint: string, data: any, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    toast.success("Data fetched successfully");
    return response.data.note;
  } catch (error) {
    toast.error("Error fetching data");
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

export default api;