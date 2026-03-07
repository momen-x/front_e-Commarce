import type { ChangePasswordType } from '../Validations/ChangePassword';
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
  updatePassword: (data: ChangePasswordType
  ) => Promise<void>;
}
