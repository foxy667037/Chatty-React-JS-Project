import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  allUsers: null,
  authUserActivity: null,

  isSigningUp: false,

  isLoggining: false,
  isLogginingOut: false,

  isUpdatingProfile: false,

  isDeletingUser: false,

  isRequestingReset: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-user");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-users");
      set({ allUsers: res.data.users });
    } catch (error) {
      console.log("Error in all Users: ", error);
      set({ allUsers: null });
    }
  },

  signUpUser: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ authUser: res.data.user });

      const { getAllUsers, getUserActivities } = useAuthStore.getState();
      await getAllUsers();
      await getUserActivities();

      toast.success("Account created successfully.");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isSigningUp: false });
    }
  },

  loginInUser: async (formData) => {
    set({ isLoggining: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data.user });

      const { getAllUsers, getUserActivities } = useAuthStore.getState();
      await getAllUsers();
      await getUserActivities();

      toast.success("Login successfully.");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLoggining: false });
    }
  },

  logoutUser: async () => {
    set({ isLogginingOut: true });
    try {
      const res = await axiosInstance.get("/auth/logout");
      if (res) {
        toast.success("Logout successfully.");
        set({ authUser: null, allUsers: null, authUserActivity: null });
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLogginingOut: false });
    }
  },

  updateUser: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        set({ isUpdatingProfile: false });
        const { logoutUser } = useAuthStore.getState();
        logoutUser();
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  updateSecurity: async (formData) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-privacy", formData);
      if (res) {
        set({ authUser: res.data.user, isUpdatingProfile: false });
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  deleteUser: async () => {
    set({ isDeletingUser: true });
    try {
      const res = await axiosInstance.delete("/auth/delete-user");
      if (res) {
        set({ isDeletingUser: false });
        toast.success("Account Deleted. Proceeding to logout.");
        set({ authUser: null, allUsers: null, authUserActivity: null });
        const { logoutUser } = useAuthStore.getState();
        logoutUser();
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isDeletingUser: false });
    }
  },

  getUserActivities: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-activity");
      set({ authUserActivity: res.data.logs });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  },

  requestPasswordReset: async (formData) => {
    set({ isRequestingReset: true });
    try {
      const res = await axiosInstance.post("/password/reset", formData);
      console.log(res);
      toast.success("Reset code sent to your email.");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isRequestingReset: false });
    }
  },
}));
