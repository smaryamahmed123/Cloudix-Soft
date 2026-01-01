import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from "@mui/material";

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
        <Typography variant="h6" gutterBottom>
          {site.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Category: {site.category}
        </Typography>
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
