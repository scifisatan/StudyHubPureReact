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
  headers: myHeaders, // Set headers here if they apply to all requests
});

export const getYoutubeSummary = async (url: string) => {
  try {

    const response = await api.post("/youtube", { url });
    toast.success("Data fetched successfully");
    return response.data.note;

  } catch (error) {
    
    toast.error("Error fetching data");
    console.error(error);
  }
};

export const getPDFSummary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Correct usage of axios.post
    const response = await api.post("/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Data fetched successfully");
    return response.data.note;

  } catch (error) {

    toast.error("Error fetching data");
    console.error(error);
  }
};

export default api;
