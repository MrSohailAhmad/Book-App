const mongoose = require("mongoose")

const Schema = mongoose.Schema
const adminSchema = new Schema(
    {
        fName: {
            type: String,
            required: true,
            trim: true,
        },
        lName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    });

export default mongoose.model("User", adminSchema)