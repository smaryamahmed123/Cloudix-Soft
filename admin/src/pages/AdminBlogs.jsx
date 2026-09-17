import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  TextField,
  Box,
  Grid,
  Modal,
  Fade,
  Backdrop,
  Button,
  Switch,
  FormControlLabel,
  MenuItem,
  Divider,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";
import ImageUploadButton from "../components/ImageUploadButton";
import BlogCard from "../components/BlogCard";
import PrimaryButton from "../components/PrimaryButton";
import FloatingAddButton from "../components/FloatingAddButton";
import BlogEditor from "../components/Blog/BlogEditor";

const ADMIN_BLOG_URL =
  import.meta.env.VITE_ADMIN_BLOG_URL;

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

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  category: "Web Development",
  author: "Cloudix Soft Team",
  seoTitle: "",
  seoDescription: "",
  slug: "",
  imageFile: null,
  visible: true,
};

export default function AdminBlogs() {
  const theme = useTheme();

  const [blogs, setBlogs] = useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [uploading, setUploading] =
    useState(false);

  const [snackbar, setSnackbar] =
    useState({
      open: false,
      message: "",
      severity: "success",
    });

  const [openModal, setOpenModal] =
    useState(false);

  /* ---------------------------------------
     Fetch blogs
  --------------------------------------- */

  const fetchBlogs = async () => {
    try {
      const res =
        await axios.get(ADMIN_BLOG_URL);

      const sorted = [...res.data].sort(
        (a, b) =>
          (a.order ?? 0) -
          (b.order ?? 0)
      );

      setBlogs(sorted);
    } catch (error) {
      console.error(
        "Fetch blogs error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          "Failed to load blogs ❌",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ---------------------------------------
     Form helper
  --------------------------------------- */

  const updateForm = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ---------------------------------------
     Open modal
  --------------------------------------- */

  const handleOpenModal = () => {
    setForm(emptyForm);
    setOpenModal(true);
  };

  /* ---------------------------------------
     Close modal
  --------------------------------------- */

  const handleCloseModal = () => {
    if (uploading) return;

    setOpenModal(false);
    setForm(emptyForm);
  };

  /* ---------------------------------------
     Upload article image
  --------------------------------------- */

  const uploadArticleImage = async (
    file
  ) => {
    try {
      const formData = new FormData();

      formData.append(
        "image",
        file
      );

      const response =
        await axios.post(
          `${ADMIN_BLOG_URL}/upload-image`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setSnackbar({
        open: true,
        message:
          "Article image uploaded ✅",
        severity: "success",
      });

      return response.data.url;
    } catch (error) {
      console.error(
        "Article image upload error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          "Article image upload failed ❌",
        severity: "error",
      });

      throw error;
    }
  };

  /* ---------------------------------------
     Add blog
  --------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setSnackbar({
        open: true,
        message:
          "Please enter a blog title.",
        severity: "warning",
      });
      return;
    }

    if (!form.content.trim()) {
      setSnackbar({
        open: true,
        message:
          "Please write the article content.",
        severity: "warning",
      });
      return;
    }

    if (!form.category) {
      setSnackbar({
        open: true,
        message:
          "Please select a category.",
        severity: "warning",
      });
      return;
    }

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "content",
        form.content
      );

      formData.append(
        "excerpt",
        form.excerpt.trim()
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "author",
        form.author.trim()
      );

      formData.append(
        "seoTitle",
        form.seoTitle.trim()
      );

      formData.append(
        "seoDescription",
        form.seoDescription.trim()
      );

      formData.append(
        "slug",
        form.slug.trim()
      );

      formData.append(
        "visible",
        form.visible
      );

      if (form.imageFile) {
        formData.append(
          "coverImage",
          form.imageFile
        );
      }

      await axios.post(
        ADMIN_BLOG_URL,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      await fetchBlogs();

      handleCloseModal();

      setSnackbar({
        open: true,
        message:
          "Blog published successfully ✅",
        severity: "success",
      });
    } catch (error) {
      console.error(
        "Create blog error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to publish blog ❌",
        severity: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  /* ---------------------------------------
     Delete blog
  --------------------------------------- */

  const deleteBlog = async (id) => {
    try {
      await axios.delete(
        `${ADMIN_BLOG_URL}/${id}`
      );

      await fetchBlogs();

      setSnackbar({
        open: true,
        message:
          "Blog deleted 🗑️",
        severity: "success",
      });
    } catch (error) {
      console.error(
        "Delete blog error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          "Failed to delete blog ❌",
        severity: "error",
      });
    }
  };

  /* ---------------------------------------
     Drag & Drop
  --------------------------------------- */

  const handleDragEnd = async (
    result
  ) => {
    if (!result.destination) return;

    const reordered =
      Array.from(blogs);

    const [moved] =
      reordered.splice(
        result.source.index,
        1
      );

    reordered.splice(
      result.destination.index,
      0,
      moved
    );

    setBlogs(reordered);

    try {
      const ids = reordered.map(
        (item) => item._id
      );

      await axios.put(
        `${ADMIN_BLOG_URL}/reorder`,
        { ids }
      );

      setSnackbar({
        open: true,
        message:
          "Blog order updated ✅",
        severity: "success",
      });
    } catch (error) {
      console.error(
        "Reorder error:",
        error
      );

      await fetchBlogs();

      setSnackbar({
        open: true,
        message:
          "Failed to reorder blogs ❌",
        severity: "error",
      });
    }
  };

  /* ---------------------------------------
     Snackbar
  --------------------------------------- */

  const handleCloseSnackbar =
    () => {
      setSnackbar((prev) => ({
        ...prev,
        open: false,
      }));
    };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor:
          theme.palette.background
            .default,
        minHeight: "100vh",
        py: 4,
      }}
    >
      {/* --------------------------------
          Page heading
      -------------------------------- */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              color:
                theme.palette.primary
                  .main,
              fontWeight: "bold",
            }}
          >
            Admin Blogs
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage your Cloudix Soft
            articles
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleOpenModal}
          disabled={uploading}
          sx={{
            backgroundColor:
              "#769914",
            fontWeight: 700,
            px: 3,
            "&:hover": {
              backgroundColor:
                "#627f11",
            },
          }}
        >
          + Add Blog
        </Button>
      </Box>

      {/* --------------------------------
          Blog list
      -------------------------------- */}

      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <Droppable
          droppableId="blogs"
        >
          {(provided) => (
            <Grid
              container
              spacing={3}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {blogs.map(
                (blog, index) => (
                  <Draggable
                    key={blog._id}
                    draggableId={
                      blog._id
                    }
                    index={index}
                  >
                    {(provided) => (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        ref={
                          provided.innerRef
                        }
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BlogCard
                          blog={blog}
                          onDelete={
                            deleteBlog
                          }
                        />
                      </Grid>
                    )}
                  </Draggable>
                )
              )}

              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {/* --------------------------------
          Floating button
      -------------------------------- */}

      <FloatingAddButton
        onClick={
          handleOpenModal
        }
        disabled={uploading}
      />

      {/* --------------------------------
          Create Blog Modal
      -------------------------------- */}

      <Modal
        open={openModal}
        onClose={
          handleCloseModal
        }
        closeAfterTransition
        BackdropComponent={
          Backdrop
        }
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={openModal}>
          <Box
            component="form"
            onSubmit={
              handleSubmit
            }
            sx={{
              position:
                "absolute",
              top: "50%",
              left: "50%",
              transform:
                "translate(-50%, -50%)",

              width: {
                xs: "95%",
                sm: "90%",
                md: "850px",
              },

              maxHeight:
                "92vh",

              overflowY:
                "auto",

              backgroundColor:
                "#fff",

              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },

              borderRadius: 3,

              boxShadow: 24,
            }}
          >
            {/* Header */}

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#111E2C",
                mb: 1,
              }}
            >
              Create New Blog
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Publish a professional
              SEO-friendly article.
            </Typography>

            <Divider
              sx={{ mb: 3 }}
            />

            {/* --------------------------------
                Basic information
            -------------------------------- */}

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Blog Information
            </Typography>

            <TextField
              fullWidth
              label="Blog Title"
              value={form.title}
              onChange={(e) =>
                updateForm(
                  "title",
                  e.target.value
                )
              }
              required
              sx={{ mb: 2 }}
              placeholder="How a Professional Website Helps Your Business Grow"
            />

            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={
                    form.category
                  }
                  onChange={(e) =>
                    updateForm(
                      "category",
                      e.target.value
                    )
                  }
                  required
                >
                  {categories.map(
                    (category) => (
                      <MenuItem
                        key={
                          category
                        }
                        value={
                          category
                        }
                      >
                        {category}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  fullWidth
                  label="Author"
                  value={
                    form.author
                  }
                  onChange={(e) =>
                    updateForm(
                      "author",
                      e.target.value
                    )
                  }
                  required
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Short Excerpt"
              value={form.excerpt}
              onChange={(e) =>
                updateForm(
                  "excerpt",
                  e.target.value
                )
              }
              multiline
              rows={3}
              inputProps={{
                maxLength: 300,
              }}
              helperText={`${form.excerpt.length}/300`}
              sx={{ mt: 2 }}
            />

            {/* --------------------------------
                Slug
            -------------------------------- */}

            <TextField
              fullWidth
              label="URL Slug"
              value={form.slug}
              onChange={(e) =>
                updateForm(
                  "slug",
                  e.target.value
                )
              }
              placeholder="professional-website-benefits"
              helperText="Leave empty to generate automatically."
              sx={{ mt: 2 }}
            />

            {/* --------------------------------
                Cover image
            -------------------------------- */}

            <Box sx={{ mt: 3 }}>
              <Typography
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                Cover Image
              </Typography>

              <ImageUploadButton
                file={
                  form.imageFile
                }
                setFile={(file) =>
                  updateForm(
                    "imageFile",
                    file
                  )
                }
              />

              {form.imageFile && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Selected:{" "}
                  {
                    form
                      .imageFile
                      .name
                  }
                </Typography>
              )}
            </Box>

            {/* --------------------------------
                Article editor
            -------------------------------- */}

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                Article Content
              </Typography>

              <BlogEditor
                value={
                  form.content
                }
                onChange={(value) =>
                  updateForm(
                    "content",
                    value
                  )
                }
                onImageUpload={
                  uploadArticleImage
                }
              />
            </Box>

            {/* --------------------------------
                SEO
            -------------------------------- */}

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                SEO Settings
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                These fields control
                how the article appears
                in search engines.
              </Typography>

              <TextField
                fullWidth
                label="SEO Title"
                value={
                  form.seoTitle
                }
                onChange={(e) =>
                  updateForm(
                    "seoTitle",
                    e.target.value
                  )
                }
                inputProps={{
                  maxLength: 60,
                }}
                helperText={`${form.seoTitle.length}/60 characters`}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="SEO Description"
                value={
                  form.seoDescription
                }
                onChange={(e) =>
                  updateForm(
                    "seoDescription",
                    e.target.value
                  )
                }
                multiline
                rows={3}
                inputProps={{
                  maxLength: 160,
                }}
                helperText={`${form.seoDescription.length}/160 characters`}
              />
            </Box>

            {/* --------------------------------
                Visibility
            -------------------------------- */}

            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor:
                  "#f7f8f4",
                borderRadius: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      form.visible
                    }
                    onChange={(e) =>
                      updateForm(
                        "visible",
                        e.target
                          .checked
                      )
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked":
                        {
                          color:
                            "#769914",
                        },

                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor:
                            "#769914",
                        },
                    }}
                  />
                }
                label={
                  form.visible
                    ? "Published / Visible"
                    : "Draft / Hidden"
                }
              />
            </Box>

            {/* --------------------------------
                Actions
            -------------------------------- */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={
                  handleCloseModal
                }
                disabled={
                  uploading
                }
                sx={{
                  color: "#111E2C",
                  borderColor:
                    "#ccc",
                }}
              >
                Cancel
              </Button>

              <PrimaryButton
                type="submit"
                disabled={
                  uploading
                }
              >
                {uploading
                  ? "Publishing..."
                  : "Publish Blog"}
              </PrimaryButton>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* --------------------------------
          Snackbar
      -------------------------------- */}

      <SnackbarAlert
        open={
          snackbar.open
        }
        onClose={
          handleCloseSnackbar
        }
        severity={
          snackbar.severity
        }
        message={
          snackbar.message
        }
      />

      <LoadingBackdrop
        open={uploading}
      />
    </Container>
  );
}