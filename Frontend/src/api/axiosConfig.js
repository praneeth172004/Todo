import axios from "axios";

const axiosInstance=axios.create({
    
    baceURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
})


export default axiosInstance;