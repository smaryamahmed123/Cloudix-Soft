import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Box,
  TextField,
  Chip,
} from '@mui/material';
import { styled } from '@mui/system';
import bgImg from '../assets/blog-bg.png';

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Styled Components
const RootContainer = styled(Container)({
  minHeight: '100vh',
  paddingTop: '40px',
  paddingBottom: '80px',
});

const HeaderContainer = styled(Box)({
  textAlign: 'center',
  padding: '40px 0 20px 0',
});

const BlogTitle = styled(Typography)({
  color: '#212121',
  fontWeight: 700,
  marginBottom: '16px',
});

const BlogSubtitle = styled(Typography)({
  color: '#5a5a5a',
  maxWidth: '620px',
  margin: '0 auto',
  lineHeight: 1.6,
});

const BlogCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CardFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
});

const SidebarCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  padding: '24px',
});

// Category List
const categories = [
  'Design Inspiration',
  'Marketing',
  'UX/UI Design',
  'Content Marketing',
  'Web Design',
  'Industry Spotlight',
  'Graphic Design',
  'Branding',
  'Data-Driven Marketing',
  'Social Media',
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendURL}/api/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(17,30,44,0.8), rgba(17,30,44,0) 70%), url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          height: { xs: '60vh', md: '80vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
          px: { xs: 2, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0 0 40px 40px',
          mb: 6,
        }}
      >
        {/* Header Text */}
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'white' }}>
            Our Blog
          </Typography>
          <Typography variant="h6" sx={{ color: '#fafafa', maxWidth: 500, mt: 1 }}>
            Stay inspired with our latest design, development, and marketing insights.
          </Typography>
        </Box>
      </Box>

      {/* Blog Section */}
      <RootContainer maxWidth="lg">
        <HeaderContainer>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
            Blog & Insights
          </Typography>
          <BlogTitle variant="h3">
            Exploring creativity, innovation, and digital excellence
          </BlogTitle>
          <BlogSubtitle variant="body1">
            Discover strategies, tips, and stories that help you grow your brand and build meaningful user experiences.
          </BlogSubtitle>
        </HeaderContainer>

        <Grid container spacing={4}>
          {/* Main Blog Section */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {blogs.slice(0, 6).map((blog) => (
                <Grid item xs={12} sm={6} key={blog._id}>
                  <BlogCard>
                    <CardMedia
                      component="img"
                      height="200"
                      image={blog.image}
                      alt={blog.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {blog.category}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {truncateText(blog.content, 110)}
                      </Typography>
                      <CardFooter>
                        <Typography variant="caption" color="text.secondary">
                          {blog.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </Typography>
                      </CardFooter>
                    </CardContent>
                  </BlogCard>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sidebar Section */}
          <Grid item xs={12} md={4}>
            <SidebarCard>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', mb: 4 }}>
                {categories.map((category) => (
                  <Chip key={category} label={category} variant="outlined" />
                ))}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Sign up for our newsletter
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter your email address"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#111E2C',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#1e3447' },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </SidebarCard>
          </Grid>
        </Grid>
      </RootContainer>
    </>
  );
};

export default BlogPage;
