import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Box } from "@mui/material";

export default function WebsiteCard({ site, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={site.image}
        alt={site.title}
      />

      {/* Content */}
      <CardContent>
        {/* Name / Title */}
        <Typography variant="h6" gutterBottom>
          {site.title}
        </Typography>

        {/* Category */}
        <Chip
          label={site.category}
          size="small"
          color="primary"
          sx={{ mb: 1 }}
        />

        {/* Link */}
        <Typography
          variant="body2"
          color="primary"
          component="a"
          href={site.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.link}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions>
        <Button color="error" onClick={() => onDelete(site._id)}>
          Delete
        </Button>
        <Button href={site.link} target="_blank">
          Visit
        </Button>
      </CardActions>
    </Card>
  );
}
