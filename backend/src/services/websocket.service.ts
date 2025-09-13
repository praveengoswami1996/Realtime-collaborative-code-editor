import UserModel from "../models/user.model";

export async function fetchUserById(userId: string) {   
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
      console.log(`Error fetching user : ${error}`);
      // Re-throw the error to bubble it up to the WebSocket handler.
      throw new Error("Internal server error : Failed to fetch the user");
    }
}