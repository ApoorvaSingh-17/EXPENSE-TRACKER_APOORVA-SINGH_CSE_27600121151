import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true,"Name is required"] },
        username: { type: String, required: [true,"Username is required and should be unique"], unique: true },
        email: { type: String, required: [true,"Username is required and should be unique"] , unique: true },
        password: { type: String, required: [true, "Password is required" ]}
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;