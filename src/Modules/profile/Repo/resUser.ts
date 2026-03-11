import type { UserAPI, UserData } from "./User";
import type { ChangePasswordType } from "../Validations/ChangePassword";
import type {
  AddOrChangeUserImageType,
  UpdateUserType,
} from "../Validations/UpdateUserData";
import api from "@/Utils/axiosInstance";

const BASE_URL = `/api/users`;
export const resUser: UserAPI = {
  getById: async (id: string) => {
    const response = await api.get(`${BASE_URL}/${id}`);

    const data: UserData = response.data;
    return data;
  },
  getLoggedUserData: async () => {
    const response = await api.get(`${BASE_URL}/me`);

    const data: UserData = response.data;
    return data;
  },
  updatePassword: async (data: ChangePasswordType) => {
    await api.put(`${BASE_URL}/password/change-password`, data);
  },
  uploadImage: async (image: AddOrChangeUserImageType) => {
    const formData = new FormData();
    formData.append("image", image.image);

    const response = await api.post(`${BASE_URL}/photo-upload`, formData);
    return response.data;
  },
  updateUserprofile: async (data: UpdateUserType) => {
    const response = await api.put(`${BASE_URL}`, data);
    return response.data;
  },
};
