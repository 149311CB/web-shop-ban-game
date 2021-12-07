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

// const sessionSchema = new Schema({
//   refresh_token: {
//     type: String,
//     default: "",
//   },
// });

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
      "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=XyWt8Z2JeBcAX894iLG&_nc_ht=scontent.fsgn5-3.fna&edm=AP4hL3IEAAAA&oh=15811581152ebb890135bfd3201e3439&oe=61D27B38",
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
