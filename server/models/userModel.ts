import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

type userTypes = {
  _id: string;
  first_name: string;
  middle_name:string;
  last_name: string;
  active: boolean;
  email: string;
  phoneNumber: string;
  password: string;
};

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
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model<userTypes>("User", userSchema, "users");

export default User;
