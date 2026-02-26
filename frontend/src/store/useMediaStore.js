import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";

export const useMediaStore = create((set, get) => ({
  isUploading: false,
  uploadedMediaUrl: null,

  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      set({ isUploading: true });

      const res = await axiosInstance.post("/media/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;
      set({ uploadedMediaUrl: imageUrl });

      // Update profile in Auth Store
      await useAuthStore.getState().updateProfile({ profileImage: imageUrl });

      toast.success("Profile image updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      set({ isUploading: false });
    }
  },

  sendMediaMessage: async (file, type = "image") => {
    const { selectedUser, messages } = useChatStore.getState();
    if (!selectedUser) return toast.error("No user selected");

    const formData = new FormData();
    formData.append("media", file);
    formData.append("type", type); // type: image or video

    try {
      set({ isUploading: true });

      const res = await axiosInstance.post(
        `/media/send/${selectedUser._id}/media`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newMessage = res.data;
      useChatStore.setState({ messages: [...messages, newMessage] });

      toast.success(`${type === "image" ? "Image" : "Video"} sent`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send media");
    } finally {
      set({ isUploading: false });
    }
  },

  clearUploadedMedia: () => {
    set({ uploadedMediaUrl: null });
  },
}));
