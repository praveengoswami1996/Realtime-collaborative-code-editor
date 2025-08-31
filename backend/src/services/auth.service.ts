import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants/env";

type CreateAccountParams = {
    name: string;
    email: string;
    password: string;
}

type LoginUserParams = {
    email: string;
    password: string;
}

export const createAccount = async (data: CreateAccountParams) => {
    // Step 1: Check if the email already exists
    const existingUser = await UserModel.findOne({ email: data.email });
    appAssert(!existingUser, CONFLICT, "A user with this email already exists");

    // Step 2: Create user
    const user = await UserModel.create({
        name: data.name,
        email: data.email,
        password: data.password
    })

    // Step 3: Return created user
    return {
        user: user.omitPassword(),
    }
}

export const loginUser = async (data: LoginUserParams) => {
    // 1. Check if the user exists
    const user = await UserModel.findOne({ email: data.email });
    appAssert(user, UNAUTHORIZED, "Invalid email or password");

    // 2. User exists, now validate the password
    const isValidPassword = await user.comparePassword(data.password);
    appAssert(isValidPassword, UNAUTHORIZED, "Invalid email or password");

    // 3. User is genuine, now generate an jwt accessToken
    const accessToken = jwt.sign(
        { userId: user._id },
        JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );

    // 4. Return user and token
    return {
        user: user.omitPassword(),
        accessToken
    };
}