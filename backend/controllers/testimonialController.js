import Testimonial from "../models/Testimonial.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

// =====================================================
// GET ALL TESTIMONIALS
// =====================================================

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({
            order: 1,
            createdAt: -1,
        });

        res.json(testimonials);
    } catch (error) {
        console.error("❌ getTestimonials error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// =====================================================
// GET PUBLISHED TESTIMONIALS
// =====================================================

export const getPublishedTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({
            isPublished: true,
        }).sort({
            order: 1,
            createdAt: -1,
        });

        res.json(testimonials);
    } catch (error) {
        console.error(
            "❌ getPublishedTestimonials error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

// =====================================================
// ADD TESTIMONIAL
// =====================================================

export const addTestimonial = async (req, res) => {
    try {
        const {
            type,
            clientName,
            companyName,
            position,
            text,
            rating,
            isPublished,
            isFeatured,
        } = req.body;

        if (!clientName) {
            return res.status(400).json({
                message: "Client name is required",
            });
        }

        if (type === "text" && !text) {
            return res.status(400).json({
                message: "Client feedback is required",
            });
        }

        if (type === "video" && !req.files?.video?.[0]) {
            return res.status(400).json({
                message: "Testimonial video is required",
            });
        }

        // ---------------------------------------------
        // Client image
        // ---------------------------------------------

        let clientImage = "";
        let clientImagePublicId = "";

        if (req.files?.clientImage?.[0]) {
            const imageResult = await new Promise(
                (resolve, reject) => {
                    const stream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: "testimonials/clients",
                                resource_type: "image",
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );

                    stream.end(
                        req.files.clientImage[0].buffer
                    );
                }
            );

            clientImage = imageResult.secure_url;
            clientImagePublicId = imageResult.public_id;
        }

        // ---------------------------------------------
        // Video
        // ---------------------------------------------

        let video = "";
        let videoPublicId = "";

        if (req.files?.video?.[0]) {
            const videoResult = await new Promise(
                (resolve, reject) => {
                    const stream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: "testimonials/videos",
                                resource_type: "video",
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );

                    stream.end(
                        req.files.video[0].buffer
                    );
                }
            );

            video = videoResult.secure_url;
            videoPublicId = videoResult.public_id;
        }

        // ---------------------------------------------
        // Order
        // ---------------------------------------------

        const count =
            await Testimonial.countDocuments();

        // ---------------------------------------------
        // Create
        // ---------------------------------------------

        const testimonial =
            await Testimonial.create({
                type: type || "text",

                clientName,
                companyName: companyName || "",
                position: position || "",

                // Text only for text testimonials
                text: type === "text" ? text : "",

                // Client image only for text testimonials
                clientImage: type === "text"
                    ? clientImage
                    : "",

                clientImagePublicId: type === "text"
                    ? clientImagePublicId
                    : "",

                // Video only for video testimonials
                video: type === "video"
                    ? video
                    : "",

                videoPublicId: type === "video"
                    ? videoPublicId
                    : "",

                // Rating only for text testimonials
                rating:
                    type === "text"
                        ? Number(rating) || 5
                        : 0,

                isPublished:
                    isPublished === "false"
                        ? false
                        : true,

                isFeatured:
                    isFeatured === "true",

                order: count,
            });

        res.status(201).json(testimonial);
    } catch (error) {
        console.error(
            "❌ addTestimonial error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

// =====================================================
// DELETE TESTIMONIAL
// =====================================================

export const deleteTestimonial = async (
    req,
    res
) => {
    try {
        const testimonial =
            await Testimonial.findById(
                req.params.id
            );

        if (!testimonial) {
            return res.status(404).json({
                message: "Testimonial not found",
            });
        }

        // Delete client image
        if (testimonial.clientImagePublicId) {
            await cloudinary.uploader.destroy(
                testimonial.clientImagePublicId
            );
        }

        // Delete video
        if (testimonial.videoPublicId) {
            await cloudinary.uploader.destroy(
                testimonial.videoPublicId,
                {
                    resource_type: "video",
                }
            );
        }

        await Testimonial.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Testimonial deleted",
        });
    } catch (error) {
        console.error(
            "❌ deleteTestimonial error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

// =====================================================
// REORDER TESTIMONIALS
// =====================================================

export const reorderTestimonials = async (
    req,
    res
) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids)) {
            return res.status(400).json({
                message: "Invalid IDs array",
            });
        }

        for (let i = 0; i < ids.length; i++) {
            if (!mongoose.Types.ObjectId.isValid(ids[i])) {
                continue;
            }

            await Testimonial.findByIdAndUpdate(
                ids[i],
                {
                    order: i,
                }
            );
        }

        res.json({
            success: true,
            message:
                "Testimonials reordered successfully",
        });
    } catch (error) {
        console.error(
            "❌ reorderTestimonials error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};