import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: string;
  comparePassword: (val: string) => Promise<Boolean>;
} 

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Don't return the password by default
  },
}, { timestamps: true });


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
UserSchema.methods.comparePassword = async function (password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.password);
}

const User = model<IUser>('User', UserSchema);
export default User;
