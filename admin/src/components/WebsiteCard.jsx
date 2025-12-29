import { Card, CardMedia, CardActions, Button } from "@mui/material";

export default function WebsiteCard({ site, onDelete }) {
  return (
    <Card>
      <CardMedia component="img" height="200" image={site.image} />
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
