import React, { useState } from 'react';
import { Box, Typography, Grid, Avatar, Paper, Rating, Button, Card, CardContent, CardMedia, Divider } from '@mui/material';

const restaurantData = {
  name: "Al-Baik",
  image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Al_Baik_Logo.svg/1200px-Al_Baik_Logo.svg.png", // Restaurant banner image
  rating: 4.8,
  reviews: "20k+ ratings",
  categories: ["New", "Combos", "Chicken", "Seafood", "Side", "Desserts", "Beverages"],
  menuItems: [
    {
      category: "Chicken",
      items: [
        { name: "4 pcs chicken broasted - spicy", image: "https://example.com/image1.png" },
        { name: "10 pcs chicken nuggets meal - spicy", image: "https://example.com/image2.png" },
        { name: "Big Baik with Cheese - regular", image: "https://example.com/image3.png" },
        { name: "Bbq Baik", image: "https://example.com/image4.png" }
      ]
    }
  ],
  reviewsData: [
    {
      reviewer: "Mohammad Alam",
      rating: 5,
      review: "The meal was enjoyable, a feast for delight.",
      date: "2 months ago",
      photos: 382
    },
    {
      reviewer: "Danial Southern",
      rating: 4.5,
      review: "Personally, I liked fish sandwich, fried chicken, and nuggets sauce.",
      date: "1 year ago",
      photos: 1452
    }
  ]
};

const RestaurantDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState("Chicken");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const selectedMenuItems = restaurantData.menuItems.find(
    (menu) => menu.category === selectedCategory
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Banner Section */}
      <Box sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="350"
          image={restaurantData.image}
          alt={restaurantData.name}
          sx={{ borderRadius: 2 }}
        />
      </Box>

      {/* Restaurant Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          src={restaurantData.image}
          alt={restaurantData.name}
          sx={{ width: 100, height: 100, mr: 3, boxShadow: 3 }}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {restaurantData.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 0.5 }}>
            {`${restaurantData.rating} ★ - ${restaurantData.reviews}`}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Fried Chicken · $$ · Popular
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Categories Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Menu Categories
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {restaurantData.categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "contained" : "outlined"}
                onClick={() => handleCategoryClick(category)}
                sx={{
                  justifyContent: 'flex-start',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  textTransform: 'capitalize',
                  fontWeight: selectedCategory === category ? 'bold' : 'normal'
                }}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Grid>

        {/* Menu Items Section */}
        <Grid item xs={12} sm={9}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            {selectedCategory}
          </Typography>
          <Grid container spacing={3}>
            {selectedMenuItems &&
              selectedMenuItems.items.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="body1" fontWeight="bold" sx={{ textAlign: 'center' }}>
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 5 }} />

      {/* Reviews Section */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Customer Reviews
        </Typography>
        <Grid container spacing={3}>
          {restaurantData.reviewsData.map((review, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                  {review.reviewer}
                </Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {review.date} · {review.photos} photos
                </Typography>
                <Typography variant="body1">{review.review}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RestaurantDetail;
