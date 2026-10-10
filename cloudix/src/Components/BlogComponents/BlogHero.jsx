import HeroSection from "../HeroSection";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import blogBg from "../../assets/blog-bg.webp";

const BlogHero = ({ search, setSearch }) => (
  <HeroSection
    image={blogBg}
    eyebrow="OUR BLOG"
    title={
      <>
        Ideas That Help Your
        <Box component="span" sx={{ display: "block", color: "secondary.main" }}>
          Business Grow.
        </Box>
      </>
    }
    description="Actionable insights, creative ideas and expert tips to help you build a stronger brand, attract more customers and grow faster."
  >
    <Box
      sx={{
        mt: 4,
        maxWidth: 560,
        display: "flex",
        alignItems: "center",
        gap: 1,
        pl: 2,
        pr: 0.7,
        py: 0.7,
        bgcolor: "#fff",
        borderRadius: "999px",
        color: "primary.dark",
      }}
    >
      <SearchIcon sx={{ color: "text.secondary" }} />
      <InputBase
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search articles, topics, or keywords..."
        inputProps={{ "aria-label": "Search articles" }}
        sx={{ fontSize: "0.9rem" }}
      />
      <Box sx={{ width: 38, height: 38, borderRadius: "50%", bgcolor: "primary.main", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <ArrowForwardIcon fontSize="small" />
      </Box>
    </Box>
  </HeroSection>
);

export default BlogHero;