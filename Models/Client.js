const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const clienSchema = new Schema(
    {
        fullName: {
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
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        isUser: {
            type: Boolean,
            default: false,
        }

    }, {
    timestamps: true
}
)

module.exports = mongoose.model("Client", clienSchema);