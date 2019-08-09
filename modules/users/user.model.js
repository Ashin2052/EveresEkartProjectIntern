const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userschema = mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        age: { type: Number },
        imgUrl: {
            type: String
        },
        file:
        {
            type: String
        },
        gender: { type: String },
        is_active: { type: Boolean, default: true },
    },
    {
        collection: "users",
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model("user", userschema);
