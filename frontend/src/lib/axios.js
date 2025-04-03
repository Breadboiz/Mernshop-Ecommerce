import axios, { Axios } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true // Quan trọng nếu dùng cookies
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        
        originalRequest._retry = true;
  
        try {
            console.log("Token expired, refreshing...");
            const user = JSON.parse(localStorage.getItem("user"));
            const clientId = user._id;
            const resp = await axiosInstance.post("/auth/refreshtoken", {} , {
                headers: {
                    "x-client-id": clientId,
                },
            }).catch((error) => {
                     
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                    
                    return Promise.reject(error);
            })
            
          return axiosInstance(originalRequest); // Gửi lại request ban đầu
        } catch (refreshError) {
          console.error("Refresh Token failed, logging out...");
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
export default axiosInstance;





// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://your-api.com/api",
//   withCredentials: true, // Cho phép gửi cookie
// });

// let isRefreshing = false;
// let refreshPromise = null;

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Nếu Access Token hết hạn (401) → Thử refresh token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return refreshPromise.then(() => API(originalRequest)); // Đợi refresh xong rồi gửi lại request
//       }

//       isRefreshing = true;
//       refreshPromise = API.post("/auth/refreshtoken", {}, { withCredentials: true })
//         .then((resp) => {
//           isRefreshing = false;
//           return resp;
//         })
//         .catch((refreshError) => {
//           isRefreshing = false;
//           console.error("Refresh Token failed, logging out...");
//           localStorage.removeItem("user");
//           window.location.href = "/login"; // Redirect người dùng
//           return Promise.reject(refreshError);
//         });

//       return refreshPromise.then(() => API(originalRequest)); // Gửi lại request ban đầu sau khi refresh thành công
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;
