import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: Types.ObjectId
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: string;
  comparePassword: (val: string) => Promise<Boolean>;
  omitPassword: () => void;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

// Mongoose Middleware (Pre-save hook for password hashing)
UserSchema.pre<IUser>("save", async function (next) {
  // Only hash the password if it's new or has been modified
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Creating Mongoose method for password comparison
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
}

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
