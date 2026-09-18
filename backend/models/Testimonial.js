import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["text", "video"],
            default: "text",
            required: true,
        },

        clientName: {
            type: String,
            required: true,
            trim: true,
        },

        companyName: {
            type: String,
            trim: true,
            default: "",
        },

        position: {
            type: String,
            trim: true,
            default: "",
        },

        text: {
            type: String,
            default: "",
            trim: true,
        },

        clientImage: {
            type: String,
            default: "",
        },

        clientImagePublicId: {
            type: String,
            default: "",
        },

        video: {
            type: String,
            default: "",
        },

        videoPublicId: {
            type: String,
            default: "",
        },

        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Testimonial", testimonialSchema);