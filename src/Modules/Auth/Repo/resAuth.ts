import { API_DOMAIN } from "../../../Utils/domain";
import type { IAuthAPI } from "./Auth";
import { type loginValidationType } from "../Validations/Login";
import { type registerSchemaInputsType } from "../Validations/Register";
import type {
  forgotPasswordValidationType,
  resetPasswordValidationType,
} from "../Validations/Password";

const URL = `${API_DOMAIN}/users/auth`;

export const resAuth: IAuthAPI = {
  login: async (data: loginValidationType) => {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error login");
    }
    const loginDataResponse: { message: string; user: { id: string } } =
      await response.json();
    localStorage.setItem("userId", loginDataResponse.user.id);
  },
  register: async (data: registerSchemaInputsType) => {
    const response = await fetch(`${URL}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error register");
    }
  },
  logOut: async () => {
    const response = await fetch(`${URL}/logout`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error logout");
    }
  },
  forgotPassword: async (data: forgotPasswordValidationType) => {
    const response = await fetch(`${URL}/forgot-password`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error forgot password");
    }
  },
  resetPassword: async (data: resetPasswordValidationType) => {
    const response = await fetch(`${URL}/reset-password`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error reset password");
    }
  },
};
