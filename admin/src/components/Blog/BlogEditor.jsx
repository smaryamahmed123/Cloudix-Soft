import React from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

const BlogEditor = ({
  value,
  onChange,
  onImageUpload,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: "blog-editor-content",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const previousUrl =
      editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter URL",
      previousUrl || "https://"
    );

    if (url === null) {
      return;
    }

    if (url === "") {
      editor
        .chain()
        .focus()
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: url,
      })
      .run();
  };

  const uploadImage = async (
    event
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl =
        await onImageUpload(file);

      if (imageUrl) {
        editor
          .chain()
          .focus()
          .setImage({
            src: imageUrl,
          })
          .run();
      }
    } catch (error) {
      console.error(
        "Article image upload failed:",
        error
      );
    }

    event.target.value = "";
  };

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* Toolbar */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 0.5,
          p: 1,
          backgroundColor: "#f7f7f7",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Tooltip title="Heading 1">
          <Button
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 1,
                })
                .run()
            }
            variant={
              editor.isActive("heading", {
                level: 1,
              })
                ? "contained"
                : "text"
            }
          >
            H1
          </Button>
        </Tooltip>

        <Tooltip title="Heading 2">
          <Button
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
            variant={
              editor.isActive("heading", {
                level: 2,
              })
                ? "contained"
                : "text"
            }
          >
            H2
          </Button>
        </Tooltip>

        <Tooltip title="Heading 3">
          <Button
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 3,
                })
                .run()
            }
            variant={
              editor.isActive("heading", {
                level: 3,
              })
                ? "contained"
                : "text"
            }
          >
            H3
          </Button>
        </Tooltip>

        <Divider
          orientation="vertical"
          flexItem
        />

        <Tooltip title="Bold">
          <IconButton
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            color={
              editor.isActive("bold")
                ? "primary"
                : "default"
            }
          >
            <FormatBoldIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italic">
          <IconButton
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            color={
              editor.isActive("italic")
                ? "primary"
                : "default"
            }
          >
            <FormatItalicIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Underline">
          <IconButton
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
            color={
              editor.isActive("underline")
                ? "primary"
                : "default"
            }
          >
            <FormatUnderlinedIcon />
          </IconButton>
        </Tooltip>

        <Divider
          orientation="vertical"
          flexItem
        />

        <Tooltip title="Bullet list">
          <IconButton
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
            color={
              editor.isActive("bulletList")
                ? "primary"
                : "default"
            }
          >
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Numbered list">
          <IconButton
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
            color={
              editor.isActive("orderedList")
                ? "primary"
                : "default"
            }
          >
            <FormatListNumberedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Quote">
          <IconButton
            size="small"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
            color={
              editor.isActive("blockquote")
                ? "primary"
                : "default"
            }
          >
            <FormatQuoteIcon />
          </IconButton>
        </Tooltip>

        <Divider
          orientation="vertical"
          flexItem
        />

        <Tooltip title="Add link">
          <IconButton
            size="small"
            onClick={addLink}
            color={
              editor.isActive("link")
                ? "primary"
                : "default"
            }
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert image">
          <IconButton
            component="label"
            size="small"
          >
            <ImageIcon />

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={uploadImage}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Editor */}

      <EditorContent editor={editor} />

      <style>
        {`
          .blog-editor-content {
            min-height: 400px;
            padding: 20px;
            outline: none;
            font-family: Roboto, Arial, sans-serif;
            color: #222;
            line-height: 1.8;
          }

          .blog-editor-content h1 {
            font-size: 2.2rem;
            line-height: 1.2;
            margin: 1.5rem 0 1rem;
          }

          .blog-editor-content h2 {
            font-size: 1.7rem;
            line-height: 1.3;
            margin: 1.5rem 0 1rem;
          }

          .blog-editor-content h3 {
            font-size: 1.35rem;
            line-height: 1.4;
            margin: 1.3rem 0 0.8rem;
          }

          .blog-editor-content p {
            margin: 0 0 1rem;
          }

          .blog-editor-content ul,
          .blog-editor-content ol {
            padding-left: 2rem;
            margin-bottom: 1rem;
          }

          .blog-editor-content blockquote {
            border-left: 4px solid #769914;
            margin: 1.5rem 0;
            padding: 1rem 1.5rem;
            background: #f5f7ef;
            font-style: italic;
          }

          .blog-editor-content a {
            color: #769914;
            text-decoration: underline;
          }

          .blog-editor-content img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            margin: 1rem 0;
          }
        `}
      </style>
    </Box>
  );
};

export default BlogEditor;