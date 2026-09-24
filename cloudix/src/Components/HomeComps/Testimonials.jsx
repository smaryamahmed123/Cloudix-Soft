import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LIME = "#BBBF19";
const LIME_SOFT = "#A9B838";
const GREEN = "#769914";
const GAP = 24; // px, gap between carousel cards
const CARD_HEIGHT = 280;

/* ------------------------------------------------------------------
   Defined at module level on purpose. In the old file these lived
   inside Testimonials(), so every state change created a new component
   type and React remounted every card (a playing <video> restarted).
------------------------------------------------------------------ */

const ClientInfo = ({ t }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, minWidth: 0 }}>
    <Avatar
      src={t.clientImage || undefined}
      alt={t.clientName || "Client"}
      sx={{
        width: 40,
        height: 40,
        bgcolor: GREEN,
        color: "#fff",
        fontWeight: 800,
        fontSize: 14,
        flexShrink: 0,
        border: "2px solid rgba(169,184,56,0.35)",
      }}
    >
      {t.clientName?.charAt(0)}
    </Avatar>

    <Box sx={{ minWidth: 0 }}>
      <Typography
        noWrap
        sx={{ color: "#fff", fontWeight: 800, fontSize: 13, lineHeight: 1.3 }}
      >
        {t.clientName}
      </Typography>

      {(t.position || t.companyName) && (
        <Typography
          noWrap
          sx={{ color: "rgba(255,255,255,0.5)", fontSize: 11, mt: 0.2 }}
        >
          {[t.position, t.companyName].filter(Boolean).join(" • ")}
        </Typography>
      )}

      {t.rating > 0 && (
        <Rating
          value={t.rating}
          readOnly
          size="small"
          sx={{
            mt: 0.3,
            fontSize: 14,
            "& .MuiRating-iconFilled": { color: LIME },
            "& .MuiRating-iconEmpty": { color: "rgba(255,255,255,0.2)" },
          }}
        />
      )}
    </Box>
  </Box>
);

// Cloudinary serves the first frame of a video when the extension is .jpg.
// Used as the poster and as the blurred backdrop. Non-Cloudinary URLs get none.
const getVideoPoster = (url) =>
  url && url.includes("/video/upload/")
    ? url.replace(/\.[a-zA-Z0-9]+(\?.*)?$/, ".jpg")
    : undefined;

const FeaturedBadge = ({ sx }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 0.4,
      px: 1,
      py: 0.4,
      borderRadius: "999px",
      bgcolor: "rgba(7,21,31,0.88)",
      color: LIME,
      fontSize: 10,
      fontWeight: 800,
      pointerEvents: "none",
      ...sx,
    }}
  >
    <StarRoundedIcon sx={{ fontSize: 13 }} />
    Featured
  </Box>
);

const cardShellSx = {
  height: CARD_HEIGHT,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: 3,
  background: "linear-gradient(145deg, rgba(20,42,56,0.96), rgba(9,28,39,0.98))",
  border: "1px solid rgba(118,153,20,0.25)",
  transition: "border-color 0.25s ease",
  "&:hover": { borderColor: "rgba(169,184,56,0.6)" },
};

const TestimonialCard = ({ t, onReadMore }) => {
  // Video testimonials: video + client info. The `text` field is never shown.
  if (t.type === "video" && t.video) {
    return (
      <Box sx={cardShellSx}>
        <Box
          sx={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            bgcolor: "#07151f",
            overflow: "hidden",
          }}
        >
          {/* Blurred backdrop fills the horizontal card behind a vertical video */}
          {getVideoPoster(t.video) && (
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("${getVideoPoster(t.video)}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(22px) brightness(0.6)",
                transform: "scale(1.25)",
              }}
            />
          )}
          <video
            src={t.video}
            poster={getVideoPoster(t.video)}
            controls
            playsInline
            preload="metadata"
            aria-label={`Video testimonial from ${t.clientName}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "transparent",
            }}
          />
          {t.isFeatured && (
            <FeaturedBadge sx={{ position: "absolute", top: 10, left: 10 }} />
          )}
        </Box>
        <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <ClientInfo t={t} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ ...cardShellSx, p: 2.5 }}>
      <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
          <FormatQuoteRoundedIcon sx={{ color: LIME, fontSize: 26, transform: "scaleX(-1)" }} />
          {t.isFeatured && <FeaturedBadge sx={{ bgcolor: "rgba(187,191,25,0.12)" }} />}
        </Box>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.82)",
            fontSize: 13.5,
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {t.text}
        </Typography>
        <Box
          component="button"
          type="button"
          onClick={() => onReadMore(t)}
          sx={{
            mt: 0.8,
            p: 0,
            border: 0,
            background: "transparent",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 800,
            color: LIME_SOFT,
            "&:hover": { color: LIME },
          }}
        >
          Read full feedback
        </Box>
      </Box>

      <Box sx={{ pt: 2, mt: 1.5, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <ClientInfo t={t} />
      </Box>
    </Box>
  );
};

const arrowBtnSx = (disabled) => ({
  width: 40,
  height: 40,
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.18)",
  opacity: disabled ? 0.3 : 1,
  "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
});

const Testimonials = () => {
  const [rawTestimonials, setTestimonials] = useState([]);
  const [selected, setSelected] = useState(null);
  const [allOpen, setAllOpen] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await axios.get(`${backendURL}/api/testimonials/published`);
        if (active) setTestimonials(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
        if (active) setTestimonials([]);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Featured first, then admin-defined `order`, then newest.
  const testimonials = useMemo(
    () =>
      rawTestimonials
        .filter((t) => t.isPublished !== false)
        .sort(
          (a, b) =>
            Number(!!b.isFeatured) - Number(!!a.isFeatured) ||
            (a.order ?? 0) - (b.order ?? 0) ||
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        ),
    [rawTestimonials]
  );

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [testimonials, updateArrows]);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth + GAP), behavior: "smooth" });
  };

  if (!testimonials.length) return null;

  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        background: "linear-gradient(135deg, #07151f 0%, #0b1d29 50%, #081923 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER + ARROWS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 2,
            mb: { xs: 4, md: 5 },
          }}
        >
          <Box>
            <Typography
              sx={{
                color: LIME,
                fontWeight: 800,
                fontSize: { xs: 11, md: 12 },
                letterSpacing: 1.8,
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              Client Feedback
            </Typography>
            <Typography
              component="h2"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
                lineHeight: 1.08,
                letterSpacing: "-1px",
              }}
            >
              What Our Clients
              <Box component="span" sx={{ display: "block", color: LIME }}>
                Say About Us.
              </Box>
            </Typography>
            <Typography
              sx={{
                mt: 1.5,
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Hear directly from the people and businesses we've worked with.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.2, flexShrink: 0 }}>
            <IconButton
              aria-label="Previous testimonials"
              disabled={!canPrev}
              onClick={() => scrollByPage(-1)}
              sx={arrowBtnSx(!canPrev)}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <IconButton
              aria-label="Next testimonials"
              disabled={!canNext}
              onClick={() => scrollByPage(1)}
              sx={arrowBtnSx(!canNext)}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Box>
        </Box>

        {/* CAROUSEL */}
        <Box
          ref={trackRef}
          onScroll={updateArrows}
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {testimonials.map((t) => (
            <Box
              key={t._id}
              sx={{
                flex: {
                  xs: "0 0 100%",
                  sm: `0 0 calc((100% - ${GAP}px) / 2)`,
                  lg: `0 0 calc((100% - ${GAP * 2}px) / 3)`,
                },
                scrollSnapAlign: "start",
                minWidth: 0,
              }}
            >
              <TestimonialCard t={t} onReadMore={setSelected} />
            </Box>
          ))}
        </Box>

        {/* VIEW ALL */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 4, md: 5 } }}>
          <Box
            component="button"
            type="button"
            onClick={() => setAllOpen(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              pl: 3,
              pr: 0.8,
              py: 0.8,
              border: 0,
              borderRadius: "999px",
              backgroundColor: LIME,
              color: "#0b1d29",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 800,
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": { backgroundColor: LIME_SOFT },
            }}
          >
            View All Testimonials
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                bgcolor: "#0b1d29",
                color: LIME,
                display: "grid",
                placeItems: "center",
              }}
            >
              <ArrowForwardRoundedIcon sx={{ fontSize: 17 }} />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* FULL FEEDBACK DIALOG (text testimonials only) */}
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        {selected && (
          <>
            <DialogTitle
              sx={{ bgcolor: "#111E2C", color: "#fff", pr: 7, fontWeight: 800 }}
            >
              Client Feedback
              <IconButton
                aria-label="Close"
                onClick={() => setSelected(null)}
                sx={{ position: "absolute", right: 10, top: 10, color: "#fff" }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, mt: 2 }}>
                <Avatar
                  src={selected.clientImage || undefined}
                  alt={selected.clientName || "Client"}
                  sx={{ width: 60, height: 60, bgcolor: GREEN, fontWeight: 800 }}
                >
                  {selected.clientName?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 800, color: "#111E2C", fontSize: 16 }}>
                    {selected.clientName}
                  </Typography>
                  {(selected.position || selected.companyName) && (
                    <Typography variant="body2" color="text.secondary">
                      {[selected.position, selected.companyName]
                        .filter(Boolean)
                        .join(" • ")}
                    </Typography>
                  )}
                </Box>
              </Box>

              {selected.rating > 0 && (
                <Rating
                  value={selected.rating}
                  readOnly
                  sx={{ mb: 2, "& .MuiRating-iconFilled": { color: LIME } }}
                />
              )}

              {selected.createdAt && (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                  {new Date(selected.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              )}

              <FormatQuoteRoundedIcon sx={{ fontSize: 44, color: GREEN, display: "block", mb: -1 }} />
              <Typography sx={{ color: "#444", lineHeight: 1.9, fontSize: 15, whiteSpace: "pre-line" }}>
                {selected.text}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* ALL TESTIMONIALS DIALOG */}
      <Dialog
        open={allOpen}
        onClose={() => setAllOpen(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, md: 4 },
            height: { xs: "100vh", md: "auto" },
            maxHeight: { xs: "100vh", md: "90vh" },
            bgcolor: "#07151f",
            color: "#fff",
          },
        }}
      >
        <DialogTitle
          sx={{
            position: "relative",
            background: "linear-gradient(135deg, #111E2C, #0b1d29)",
            px: { xs: 2.5, md: 4 },
            py: { xs: 2.5, md: 3 },
            borderBottom: "1px solid rgba(118,153,20,0.25)",
          }}
        >
          <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800 }}>
            All Client Stories
          </Typography>
          <Typography sx={{ mt: 0.6, color: "rgba(255,255,255,0.58)", fontSize: { xs: 12, md: 14 } }}>
            Every published client testimonial, text and video.
          </Typography>
          <IconButton
            aria-label="Close"
            onClick={() => setAllOpen(false)}
            sx={{ position: "absolute", right: { xs: 8, md: 18 }, top: { xs: 8, md: 15 }, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            p: { xs: 2, md: 4 },
            background: "linear-gradient(135deg, #07151f, #0b1d29)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 2.5,
              pt: 1,
            }}
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t._id} t={t} onReadMore={setSelected} />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Testimonials;