import { useEffect, useState } from "react";
import { dash } from "../Dashboard/dashboardPalette";

// Shared text-field styling (green focus ring, rounded corners)
export const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        "& fieldset": { borderColor: dash.border },
        "&:hover fieldset, &.Mui-focused fieldset": { borderColor: dash.green },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: dash.green },
};

// Gives you a URL to show for either a saved image (string) or a newly picked File
export const useFilePreview = (value) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        setUrl(typeof value === "string" ? value : "");
        return undefined;
    }, [value]);

    return url;
};