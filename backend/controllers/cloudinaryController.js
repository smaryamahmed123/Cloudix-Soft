import cloudinary from "../config/cloudinary.js";

// =====================================================
// GENERATE SIGNED TESTIMONIAL UPLOAD
// =====================================================

export const getTestimonialUploadSignature = async (
    req,
    res
) => {
    try {
        const {
            resourceType = "image",
        } = req.query;

        const timestamp = Math.round(
            Date.now() / 1000
        );

        let folder = "";

        if (resourceType === "video") {
            folder = "testimonials/videos";
        } else {
            folder = "testimonials/clients";
        }

        const signature =
            cloudinary.utils.api_sign_request(
                {
                    timestamp,
                    folder,
                },
                process.env.CLOUDINARY_API_SECRET
            );

        res.json({
            success: true,

            timestamp,

            folder,

            signature,

            cloudName:
                process.env.CLOUDINARY_CLOUD_NAME,

            apiKey:
                process.env.CLOUDINARY_API_KEY,

            resourceType,
        });
    } catch (error) {
        console.error(
            "❌ Cloudinary signature error:",
            error
        );

        res.status(500).json({
            success: false,

            message:
                "Could not generate Cloudinary upload signature",
        });
    }
};