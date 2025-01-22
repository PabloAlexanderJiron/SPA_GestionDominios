import { useAutenticacionStore } from "@/stores";
import axios from "axios";

export const axiosAPI =  axios.create({
  baseURL: `${import.meta.env.VITE_API}/api/`
})

axiosAPI.interceptors.request.use((config)=>{
  const {JWT} = useAutenticacionStore();
  if (JWT) {
    config.headers.Authorization = `Bearer ${JWT}`;
  }
  return config;
})