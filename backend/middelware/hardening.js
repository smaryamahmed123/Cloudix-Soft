// middelware/hardening.js
// npm i express-rate-limit
import rateLimit from "express-rate-limit";
import multer from "multer";

// ---------------------------------------------------------------
// Rate limits
// NOTE: on Vercel/serverless each function instance keeps its own counter, so this
// only slows casual abuse. For real protection also enable Vercel's firewall
// rate limiting (or a Redis store such as Upstash).
// Behind a proxy you also need, in server.js:  app.set("trust proxy", 1);
// ---------------------------------------------------------------
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many login attempts. Try again in 15 minutes." },
});

export const publicFormLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again later." },
});

// ---------------------------------------------------------------
// Image uploads with a size cap and a type filter
// ---------------------------------------------------------------
export const imageUpload = (maxMB = 5) =>
    multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: maxMB * 1024 * 1024 },
        fileFilter: (req, file, cb) =>
            file.mimetype.startsWith("image/")
                ? cb(null, true)
                : cb(new Error("Only image files are allowed")),
    });

// Register AFTER all routes in server.js:  app.use(uploadErrorHandler);
export const uploadErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            message: err.code === "LIMIT_FILE_SIZE" ? "File is too large" : err.message,
        });
    }
    if (err?.message === "Only image files are allowed") {
        return res.status(400).json({ message: err.message });
    }
    next(err);
};

/* ---------------- how to use ----------------

// routes/authRoutes.js
router.post("/login", loginLimiter, loginUser);

// routes/contactRoutes.js   (public form + the unprotected status route)
router.post("/", publicFormLimiter, createMessage);
router.patch("/:id/status", verifyAdmin, updateMessageStatus);   // <-- was missing verifyAdmin

// routes/subscriberRoutes.js
router.post("/subscribe", publicFormLimiter, subscribe);

// routes/logoRoutes.js, postRoutes.js, websiteRoutes.js, aboutRoutes.js
const upload = imageUpload(5);          // replaces multer({ storage })
// about uses upload.any() today -> prefer upload.fields([...]) or keep .any() with the limits above

---------------------------------------------- */