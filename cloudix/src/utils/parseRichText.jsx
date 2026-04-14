// utils/parseRichText.jsx
// Parses a string with **bold** and [link text](url) markdown into React elements.
// No external library needed.

import React from "react";
import { Link } from "@mui/material";

/**
 * Splits a string into plain text, **bold**, and [text](url) segments.
 * Returns an array of React nodes safe to render inline.
 *
 * Supported syntax:
 *   **some bold text**
 *   [link label](https://example.com)
 */
export function parseRichText(text) {
  if (!text) return null;

  // Combined regex: matches **bold** OR [label](url)
  // const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g;

  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    // Push plain text before this match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      // **bold**
      nodes.push(
        <strong key={key++} style={{ fontWeight: 700 }}>
          {match[1]}
        </strong>
      );
    } else if (match[2] && match[3]) {
      // [label](url)
      nodes.push(
        // <Link
        //   key={key++}
        //   href={match[3]}
        //   target="_blank"
        //   rel="noopener noreferrer"
        //   underline="hover"
        //   sx={{ fontWeight: 500 }}
        // >
        //   {match[2]}
        // </Link>
           <Link
             key={key++}
             href={match[3]}
             target={match[3].startsWith("http") ? "_blank" : undefined}
             rel="noopener noreferrer"
             underline="hover"
             sx={{ fontWeight: 500 }}
           >
             {match[2]}
           </Link>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  // Push any remaining plain text after last match
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
