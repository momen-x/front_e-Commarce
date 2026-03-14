import { type loginValidationType } from "../Validations/Login";
import type {
  forgotPasswordValidationType,
  resetPasswordValidationType,
} from "../Validations/Password";
import type { registerSchemaInputsType } from "../Validations/Register";
export interface IAuthAPI {
  login: (data: loginValidationType) => Promise<void>;
  register: (data: registerSchemaInputsType) => Promise<void>;
  logOut: () => Promise<void>;
  forgotPassword: (data: forgotPasswordValidationType) => Promise<void>;
  resetPassword: (data: resetPasswordValidationType,id:string,token:string) => Promise<void>;
}
