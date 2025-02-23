import API from "./API";

export const login = async (formData) => {
  try {
    const response = await API.post(`/login`, formData);

    const data = response.data;

    return {
      success: true,
      user: data.user,
      token: data.token,
      message: data.message,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const registration = async (formData) => {
  try {
    const response = await http.post(`/register`, formData);
    const data = response.data;
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const loginStatus = async (formData) => {
  try {
    const response = await API.get(`/login-status`);

    const data = response.data;

    return { auth: data.auth, user: data.user };
  } catch (error) {
    return { auth: false };
  }
};

export const logout = async () => {
  try {
    const response = await API.post(`/logout`);

    const data = response.data;

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false };
  }
};
