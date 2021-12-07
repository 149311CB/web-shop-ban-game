import { userTypes } from "./models/userModel";

interface IRegister {
  register: boolean;
}

declare global {
  namespace Express {
    interface User extends userTypes {}
    interface AuthInfo extends IRegister {}
    interface Request extends IRegister {}
  }
}
