import type { IAuthAPI } from "./Auth";
import { type loginValidationType } from "../Validations/Login";
import { type registerSchemaInputsType } from "../Validations/Register";
import type {
  forgotPasswordValidationType,
  resetPasswordValidationType,
} from "../Validations/Password";
import api from "@/Utils/axiosInstance";

const BASE_URL = "/api/users/auth";
export const resAuth: IAuthAPI = {
  login: async (data: loginValidationType) => {
    const response = await api.post(`${BASE_URL}/login`, data);
    return response.data;
  },
  register: async (data: registerSchemaInputsType) => {
    const response = await api.post(`${BASE_URL}/register`, data);
    return response.data;
  },
  logOut: async () => {
    const response = await api.get(`${BASE_URL}/logout`);
    return response.data;
  },
  forgotPassword: async (data: forgotPasswordValidationType) => {
    const response = await api.post(
      `${BASE_URL}/password/forgot-password`,
      data,
    );
    return response.data;
  },
  resetPassword: async (
    data: resetPasswordValidationType,
    id: string,
    token: string,
  ) => {
    const response = await api.post(
      `${BASE_URL}/password/reset-password/${id}/${token}`,
      data,
    );
    return response.data;
  },
};
