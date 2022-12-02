const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        bookName: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },
        bookAuthor: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },
        bookReleseYear: {
            type: String,
            required: true,
            trim: true,
        },
        aboutBook: {
            type: String,
            required: true,
            trim: true,
        },
        bookCategory:
        {
            type: String,
            trim: true,
            default: "Ganeral",
            uppercase: true

        },
        bookFormat:
        {
            type: String,
            required: true,
            trim: true,
        },
        bookUser: {
            type: String,
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model("Book", bookSchema);