import { API_DOMAIN } from "@/Utils/domain";
import type { UserAPI, UserData } from "./User";
import type { ChangePasswordType } from "../Validations/ChangePassword";

const BASE_URL = `${API_DOMAIN}/users`;
//to do , fix the update user password . 
export const resUser: UserAPI = {
  getById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error fetching user");
    }
    const data: UserData = await response.json();
    return data;
  },
  updatePassword:async (data :ChangePasswordType) => {
    const response = await fetch(`${BASE_URL}/change-password`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error updating password");
    }}

};
