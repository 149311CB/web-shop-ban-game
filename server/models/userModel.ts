import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface userTypes {
  _id?: string;
  first_name: string;
  middle_name: string;
  birthday: string;
  last_name: string;
  active: boolean;
  email: string;
  phone_number: string;
  password: string;
  refresh_token?: string;
  facebook_id?: string;
  avatar?: string;
  google_id?: string;
  email_verification: boolean;
}

const userSchema = new Schema<userTypes>({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  email_verification: {
    type: Boolean,
    default: false,
  },
  phone_number: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  refresh_token: {
    type: String,
    default: "",
  },
  facebook_id: {
    type: String,
    required: false,
  },
  google_id: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/images-b3099.appspot.com/o/avatar.svg?alt=media&token=ba3ea983-3133-41d9-88c4-002deffd991a",
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = model<userTypes>("User", userSchema, "users");

export default User;
