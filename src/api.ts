import axios from "axios";
import { toast } from "sonner";


const myHeaders = {
  "Content-Type": "application/json",
};
const baseURL = import.meta.env.VITE_API_URL;
if (!baseURL) {
  throw new Error('VITE_API_URL environment variable is not defined');
}

const api = axios.create({
  baseURL: baseURL,
  headers: myHeaders,
});


export const getYoutubeSummary = async (url: string) => {
  try {
    const response = await api.post("/youtube", JSON.stringify({ url: url }))
    toast.success("Data fetched successfully");
    console.log(response.data.note);
    return response.data.note;
  } catch (error) {
    toast.error("Error fetching data");
    console.error(error);
  }
 
}

export default api;