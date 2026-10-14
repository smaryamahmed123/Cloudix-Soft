import React, { Suspense, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

export default function Defer({ children, minHeight = 600 }) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setShow(true);
                    io.disconnect();
                }
            },
            { rootMargin: "500px" }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return (
        <Box ref={ref} sx={{ minHeight: show ? undefined : minHeight }}>
            {show && (
                <Suspense fallback={<Box sx={{ minHeight }} />}>{children}</Suspense>
            )}
        </Box>
    );
}