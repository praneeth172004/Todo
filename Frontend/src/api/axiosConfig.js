import axios from "axios";

const axiosInstance=axios.create({
    
    baceURL:"http://localhost:3000",
    withCredentials:true,
})


export default axiosInstance;