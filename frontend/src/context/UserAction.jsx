import API from "./API";

export const getUsers = async () => {
  try {
    const response = await API.get("/get-users", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return { users: data.users };
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (formData) => {
  try {
    const response = await API.post("/store-user", formData);

    const data = response.data;

    return {
      success: true,
      message: data.message,
      user: data.user,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const getSingleUser = async (id) => {
  try {
    const response = await API.get(`/get-user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return {
      user: data.user,
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await API.put(`/update-user/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return {
      success: true,
      message: data.message,
      user: data.user,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/delete-user/${id}`);

    const data = response.data;

    return { message: data.message, id: id };
  } catch (error) {
    console.log(error);
  }
};
