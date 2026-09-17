import cloudinary from "../config/cloudinary.js";

export const uploadBlogImage = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image provided",
      });
    }

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "blogs/content",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error(
              "Cloudinary error:",
              error
            );

            return res.status(500).json({
              message: "Image upload failed",
            });
          }

          res.json({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error(
      "Blog image upload error:",
      error
    );

    res.status(500).json({
      message: "Image upload failed",
    });
  }
};