import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormControlLabel,
  Switch,
  MenuItem,
  Alert,
} from "@mui/material";

import BlogEditor from "../components/Blog/BlogEditor";

const backendURL =
  import.meta.env.VITE_BACKEND_URL;

const categories = [
  "Web Development",
  "E-Commerce",
  "Digital Marketing",
  "SEO",
  "Branding",
  "Graphic Design",
  "Mobile Apps",
  "Technology",
  "Business",
];

const AdminCreateBlog = () => {
  const [title, setTitle] = useState("");

  const [content, setContent] =
    useState("");

  const [excerpt, setExcerpt] =
    useState("");

  const [category, setCategory] =
    useState("Web Development");

  const [author, setAuthor] =
    useState("Cloudix Soft Team");

  const [seoTitle, setSeoTitle] =
    useState("");

  const [seoDescription, setSeoDescription] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [visible, setVisible] =
    useState(true);

  const [coverImage, setCoverImage] =
    useState(null);

  const [coverPreview, setCoverPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  /* ---------------------------------------
     Cover image
  --------------------------------------- */

  const handleCoverChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setCoverImage(file);

    setCoverPreview(
      URL.createObjectURL(file)
    );
  };

  /* ---------------------------------------
     Article image upload
  --------------------------------------- */

  const uploadArticleImage = async (
    file
  ) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await axios.post(
      `${backendURL}/api/blogs/upload-image`,
      formData
    );

    return response.data.url;
  };

  /* ---------------------------------------
     Submit
  --------------------------------------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a blog title.");
      return;
    }

    if (!content.trim()) {
      setMessage("Please write some content.");
      return;
    }

    if (!category) {
      setMessage("Please select a category.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "content",
        content
      );

      formData.append(
        "excerpt",
        excerpt
      );

      formData.append(
        "category",
        category
      );

      formData.append(
        "author",
        author
      );

      formData.append(
        "seoTitle",
        seoTitle
      );

      formData.append(
        "seoDescription",
        seoDescription
      );

      formData.append(
        "slug",
        slug
      );

      formData.append(
        "visible",
        visible
      );

      if (coverImage) {
        formData.append(
          "coverImage",
          coverImage
        );
      }

      const response =
        await axios.post(
          `${backendURL}/api/blogs`,
          formData
        );

      console.log(
        "Blog created:",
        response.data
      );

      setMessage(
        "Blog published successfully!"
      );

      /* Reset */

      setTitle("");
      setContent("");
      setExcerpt("");
      setSeoTitle("");
      setSeoDescription("");
      setSlug("");
      setCoverImage(null);
      setCoverPreview("");
    } catch (error) {
      console.error(
        "Create blog error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to publish blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={800}
        mb={1}
        color="#111E2C"
      >
        Create New Blog
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Create an SEO-friendly article for
        Cloudix Soft.
      </Typography>

      {message && (
        <Alert
          severity={
            message.includes(
              "successfully"
            )
              ? "success"
              : "error"
          }
          sx={{ mb: 3 }}
        >
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        {/* --------------------------------
            Basic information
        -------------------------------- */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            mb: 3,
            border: "1px solid #e5e5e5",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Blog Information
          </Typography>

          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                label="Blog Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                fullWidth
                required
                placeholder="How a Professional Website Helps Your Business Grow"
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                label="Category"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                fullWidth
                select
                required
              >
                {categories.map(
                  (item) => (
                    <MenuItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                label="Author"
                value={author}
                onChange={(e) =>
                  setAuthor(
                    e.target.value
                  )
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Short Excerpt"
                value={excerpt}
                onChange={(e) =>
                  setExcerpt(
                    e.target.value
                  )
                }
                fullWidth
                multiline
                rows={3}
                inputProps={{
                  maxLength: 300,
                }}
                helperText={`${excerpt.length}/300`}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="URL Slug"
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value
                  )
                }
                fullWidth
                placeholder="professional-website-benefits"
                helperText="Leave empty to generate automatically from the title."
              />
            </Grid>
          </Grid>
        </Paper>

        {/* --------------------------------
            Cover image
        -------------------------------- */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            mb: 3,
            border: "1px solid #e5e5e5",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Cover Image
          </Typography>

          <Button
            component="label"
            variant="outlined"
            sx={{
              borderColor: "#769914",
              color: "#769914",
              "&:hover": {
                borderColor: "#769914",
              },
            }}
          >
            Choose Cover Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={
                handleCoverChange
              }
            />
          </Button>

          {coverPreview && (
            <Box
              sx={{
                mt: 3,
                maxWidth: 700,
              }}
            >
              <Box
                component="img"
                src={coverPreview}
                alt="Cover preview"
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Box>
          )}
        </Paper>

        {/* --------------------------------
            Editor
        -------------------------------- */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            mb: 3,
            border: "1px solid #e5e5e5",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Article Content
          </Typography>

          <BlogEditor
            value={content}
            onChange={setContent}
            onImageUpload={
              uploadArticleImage
            }
          />
        </Paper>

        {/* --------------------------------
            SEO
        -------------------------------- */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            mb: 3,
            border: "1px solid #e5e5e5",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={1}
          >
            SEO Settings
          </Typography>

          <Typography
            color="text.secondary"
            mb={3}
          >
            Optimize how this article appears
            in search engines.
          </Typography>

          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                label="SEO Title"
                value={seoTitle}
                onChange={(e) =>
                  setSeoTitle(
                    e.target.value
                  )
                }
                fullWidth
                inputProps={{
                  maxLength: 60,
                }}
                helperText={`${seoTitle.length}/60 characters`}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="SEO Description"
                value={seoDescription}
                onChange={(e) =>
                  setSeoDescription(
                    e.target.value
                  )
                }
                fullWidth
                multiline
                rows={3}
                inputProps={{
                  maxLength: 160,
                }}
                helperText={`${seoDescription.length}/160 characters`}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* --------------------------------
            Publishing
        -------------------------------- */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            border: "1px solid #e5e5e5",
            borderRadius: 3,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={visible}
                onChange={(e) =>
                  setVisible(
                    e.target.checked
                  )
                }
              />
            }
            label="Publish / Visible"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent:
                "flex-end",
              mt: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor:
                  "#769914",
                px: 4,
                py: 1.3,
                fontWeight: 700,
                "&:hover": {
                  backgroundColor:
                    "#627f11",
                },
              }}
            >
              {loading
                ? "Publishing..."
                : "Publish Blog"}
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
  );
};

export default AdminCreateBlog;