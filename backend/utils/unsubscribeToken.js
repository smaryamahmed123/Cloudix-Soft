import jwt from "jsonwebtoken";

const PURPOSE = "newsletter-unsubscribe";

export const createUnsubscribeToken = (email) => {
    return jwt.sign({ email, purpose: PURPOSE }, process.env.JWT_SECRET, {
        expiresIn: "90d",
    });
};

export const verifyUnsubscribeToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.purpose !== PURPOSE || !decoded.email) {
        throw new Error("Invalid token purpose");
    }
    return decoded.email;
};