import api from "../src/axiosConfig"




export const registerUser = async (userData) => {
    try {
        console.log('here')
        const response = await api.post("users/register/", userData);
        console.log('nott')
        return response.data;
    } catch (error) {
        console.error("Register Error:", error.response?.data || error);
        throw error;
    }
};


export const loginUser = async (credentials) => {
    try {
        const response = await api.post("users/login/", credentials);
        const { access } = response.data;
        localStorage.setItem("access_token", access);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error );
        throw error;
    }
};



export const logoutUser = () => {
    localStorage.removeItem("access_token");
};



export const refreshToken = async (refreshToken) => {
    try {
      const response = await api.post("users/token/refresh/", { refresh: refreshToken });
      const { access } = response.data;
      localStorage.setItem("access_token", access);
      return response.data;
    } catch (error) {
      console.error("Refresh Error:", error.response?.data || error);
      throw error;
    }
  };

