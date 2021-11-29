import { userTypes } from "./models/userModel";

declare global {
  namespace Express {
    interface User extends userTypes {}
  }
}
