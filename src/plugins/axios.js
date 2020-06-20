import axios from "axios";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    window.localStorage.removeItem("token");
    window.location = "/auth";
    window.alert("Срок атворизации кончился, выполните вход");
  }
  return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
  if (config.secured) {
    config.headers.Authorization = "JWT " + window.localStorage.getItem("token");
  }
  return config;
});

export default axios;
