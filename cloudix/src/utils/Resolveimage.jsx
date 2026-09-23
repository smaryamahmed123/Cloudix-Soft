export const resolveImage = (src) => {
  if (!src) return "";
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  return `${import.meta.env.VITE_BACKEND_URL || ""}${src}`;
};