import Testimonial from "../models/Testimonial.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

// =====================================================
// GET ALL TESTIMONIALS
// =====================================================

export const getTestimonials = async (req, res) => {
    try {
        const testimonials =
            await Testimonial.find().sort({
                order: 1,
                createdAt: -1,
            });

        res.json(testimonials);
    } catch (error) {
        console.error(
            "❌ getTestimonials error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

// =====================================================
// GET PUBLISHED TESTIMONIALS
// =====================================================

export const getPublishedTestimonials = async (
    req,
    res
) => {
    try {
        const testimonials =
            await Testimonial.find({
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
            clientImage,
            clientImagePublicId,
            video,
            videoPublicId,
            rating,
            isPublished,
            isFeatured,
        } = req.body;

        // =================================================
        // BASIC VALIDATION
        // =================================================

        if (!clientName?.trim()) {
            return res.status(400).json({
                message:
                    "Client name is required",
            });
        }

        // =================================================
        // TEXT VALIDATION
        // =================================================

        if (
            type === "text" &&
            !text?.trim()
        ) {
            return res.status(400).json({
                message:
                    "Client feedback is required",
            });
        }

        // =================================================
        // VIDEO VALIDATION
        // =================================================

        if (
            type === "video" &&
            !video
        ) {
            return res.status(400).json({
                message:
                    "Testimonial video is required",
            });
        }

        if (
            type === "video" &&
            !videoPublicId
        ) {
            return res.status(400).json({
                message:
                    "Testimonial video public ID is required",
            });
        }

        // =================================================
        // ORDER
        // =================================================

        const count =
            await Testimonial.countDocuments();

        // =================================================
        // CREATE
        // =================================================

        const testimonial =
            await Testimonial.create({
                type:
                    type || "text",

                clientName:
                    clientName.trim(),

                companyName:
                    companyName?.trim() || "",

                position:
                    position?.trim() || "",

                // -----------------------------------------
                // TEXT
                // -----------------------------------------

                text:
                    type === "text"
                        ? text?.trim() || ""
                        : "",

                // -----------------------------------------
                // CLIENT IMAGE
                // -----------------------------------------

                clientImage:
                    type === "text"
                        ? clientImage || ""
                        : "",

                clientImagePublicId:
                    type === "text"
                        ? clientImagePublicId || ""
                        : "",

                // -----------------------------------------
                // VIDEO
                // -----------------------------------------

                video:
                    type === "video"
                        ? video
                        : "",

                videoPublicId:
                    type === "video"
                        ? videoPublicId
                        : "",

                // -----------------------------------------
                // RATING
                // -----------------------------------------

                rating:
                    type === "text"
                        ? Number(rating) || 5
                        : 0,

                // -----------------------------------------
                // PUBLISHED
                // -----------------------------------------

                isPublished:
                    isPublished === false ||
                    isPublished === "false"
                        ? false
                        : true,

                // -----------------------------------------
                // FEATURED
                // -----------------------------------------

                isFeatured:
                    isFeatured === true ||
                    isFeatured === "true",

                // -----------------------------------------
                // ORDER
                // -----------------------------------------

                order: count,
            });

        res.status(201).json(
            testimonial
        );
    } catch (error) {
        console.error(
            "❌ addTestimonial error:",
            error
        );

        res.status(500).json({
            message:
                error.message ||
                "Failed to add testimonial",
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
                message:
                    "Testimonial not found",
            });
        }

        // =================================================
        // DELETE CLIENT IMAGE
        // =================================================

        if (
            testimonial.clientImagePublicId
        ) {
            await cloudinary.uploader.destroy(
                testimonial.clientImagePublicId
            );
        }

        // =================================================
        // DELETE VIDEO
        // =================================================

        if (
            testimonial.videoPublicId
        ) {
            await cloudinary.uploader.destroy(
                testimonial.videoPublicId,
                {
                    resource_type: "video",
                }
            );
        }

        // =================================================
        // DELETE DATABASE RECORD
        // =================================================

        await Testimonial.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
                "Testimonial deleted",
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
                message:
                    "Invalid IDs array",
            });
        }

        for (
            let i = 0;
            i < ids.length;
            i++
        ) {
            if (
                !mongoose.Types.ObjectId.isValid(
                    ids[i]
                )
            ) {
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