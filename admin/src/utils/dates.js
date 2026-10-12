// src/utils/dates.js
// A MongoDB ObjectId starts with a 4-byte creation timestamp, so every document has a
// creation date even when its schema has no `timestamps` option (Service, Logo, ...).
// withCreatedAt() fills in `createdAt` from the _id when the document doesn't have one.

export const objectIdDate = (id) => {
    if (typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) return null;
    return new Date(parseInt(id.slice(0, 8), 16) * 1000);
};

export const withCreatedAt = (items) =>
    (Array.isArray(items) ? items : []).map((item) => {
        if (item?.createdAt) return item;
        const date = objectIdDate(item?._id);
        return date ? { ...item, createdAt: date.toISOString() } : item;
    });