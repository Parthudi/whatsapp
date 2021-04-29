import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    company: string;
    role: string;
    password: string;
    created_at: Date;
    modified_at: Date;
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: [true, "Please enter username"], unique: true },
    password: { type: String, required: [true, "Please enter password name"] },
    email: { type: String, required: [true, "Please enter email name"], unique: true },
    company: {type: String},
    role: {type: String, required: [true, "Please select role"], enum: ["user", "admin"]},
    created_at: { type: Date, default: Date() },
    modified_at: { type: Date, default: Date() },
});

export interface IUserSchema extends IUser, mongoose.Document { }
export default mongoose.model<IUserSchema>("users", userSchema);