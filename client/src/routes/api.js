import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserById = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.get("/users", { headers });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserInfoById = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.get("/users/user-infos", { headers });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getInfoByUsername = async (username) => {
  try {
    const response = await axiosInstance.get(
      `/users/user-infos-by-username/${username}`
    );
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
export const authenticateUserRoutes = async (username) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.get(`/users/${username}`, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveUserInfos = async (userDatas) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.post("/users/saveInfos", userDatas, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
      "content-type": "multipart/form-data",
    };
    const response = await axiosInstance.get("/orders/", { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateButton = async (datas) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.put("/style/button", datas, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateHeader = async (datas) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.put("/style/header", datas, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateFooter = async (datas) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.put("/style/footer", datas, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateBody = async (datas) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.put("/style/body", datas, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateTexts = async (datas) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.put("/style/texts", datas, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const uploadImage = async (datas) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const headers = {
      "x-auth-token": token,
    };
    const response = await axiosInstance.post("/style/uploadImage", datas, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const populateStyle = async (ids) => {
  try {
    const response = await axiosInstance.post("/style/populate", ids);
    return response;
  } catch (error) {
    throw error;
  }
};
