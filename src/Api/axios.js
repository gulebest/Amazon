import axios from "axios";

const axiosInstance = axios.create({
    //Local instance of firebase function
    // baseURL: "http://127.0.0.1:5001/clone-3e733/us-central1/api",
    // deployed version of amazon server render.com
    baseURL: "https://amazon-api-deploy-dz97.onrender.com/",
});

export { axiosInstance };