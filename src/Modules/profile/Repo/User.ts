import type { ChangePasswordType } from '../Validations/ChangePassword';
import type { AddOrChangeUserImageType, UpdateUserType } from '../Validations/UpdateUserData';
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  userImage: {
    public_id: string;
    url: string;
  };
  isAdmin: boolean;
}

export interface UserAPI {
  getById: (id: string) => Promise<UserData>;
  updatePassword: (data: ChangePasswordType) => Promise<void>;
  getLoggedUserData: () => Promise<UserData>;
  uploadImage:(image:AddOrChangeUserImageType)=>Promise<void>,
  updateUserprofile:(data:UpdateUserType)=>Promise<void>
}
