import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Card, CardContent, CardMedia,
  Container, Grid, Box, Avatar, Paper, Rating, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import RestaurantDetail from './RestaurantDetail';
import MakeRecipe from './MakeRecipe'; 
import ChickenTikka from './ChickenTikka'; 
import Hummus from './Hummus'; 
import ChickenShawarma from './ChickenShawarma';
import Maqlouba from './Maqlouba';
import ZaatarPie from './ZaatarPie';
import FishAndChips from './FishAndChips';    
import CreateRecipe from './CreateRecipe';
import Login from './Login';
import Signup from './Signup';

const initialRestaurants = [
  {
    name: "AL-Baik",
    description: "Fried Chicken · $$ · 0.6 miles away",
    details: "Best Muslim restaurant in Jeddah",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Al_Baik_Logo.svg/1200px-Al_Baik_Logo.svg.png",
    rating: 4.5,
    userRatings: 100,
    isFavorite: false
  },
  {
    name: "Uncle Kebab",
    description: "BBQ · $$ · 1.2 miles away",
    details: "Best halal kebab",
    image: "https://kebabuncle.com/wp-content/uploads/2020/02/KebabUncle-logo.jpg",
    rating: 4.0,
    userRatings: 50,
    isFavorite: false
  }
];

const App = () => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(
    initialRestaurants.map((restaurant) => restaurant.isFavorite)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [userRating, setUserRating] = useState(restaurants.map(() => null));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = (index) => {
    const updatedFavorites = [...favoriteRestaurants];
    updatedFavorites[index] = !updatedFavorites[index];
    setFavoriteRestaurants(updatedFavorites);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRatingChange = (newRating, index) => {
    const updatedRestaurants = [...restaurants];
    const totalRatings = updatedRestaurants[index].userRatings + 1;
    const newAverageRating =
      (updatedRestaurants[index].rating * updatedRestaurants[index].userRatings + newRating) /
      totalRatings;

    updatedRestaurants[index].rating = parseFloat(newAverageRating.toFixed(1));
    updatedRestaurants[index].userRatings = totalRatings;
    setRestaurants(updatedRestaurants);

    const updatedUserRating = [...userRating];
    updatedUserRating[index] = newRating;
    setUserRating(updatedUserRating);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: 70, sm: 80 },
            height: '100vh',
            backgroundColor: '#f3e5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4,
            position: 'fixed',
            top: 0,
            left: 0,
          }}
        >
          <IconButton color="primary" sx={{ mb: 3, mt: 9 }}>
            <StarIcon fontSize="large" />
          </IconButton>
          <Typography variant="caption" sx={{ mb: 2 }}> 
            Label
          </Typography>
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 2, sm: 3 },
            py: 4,
            marginLeft: { xs: '70px', sm: '80px' },
            mt: 8,
          }}
        >
          {/* Top Navigation Bar */}
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              backgroundColor: '#f8e4f4',
              borderBottom: '1px solid #e0e0e0',
              width: '100%',
              top: 0,
              zIndex: 1000,
              height: '64px',
              px: { xs: 1, sm: 3 },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
              <IconButton edge="start" aria-label="menu">
                <MenuIcon sx={{ color: 'black' }} />
              </IconButton>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1, color: 'black', cursor: 'pointer' }}>
                  www.Halal-Restaurant.com
                </Typography>
              </Link>

              <Link to="/make-recipe" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'black' }}>Make a Recipe</Button>
              </Link>

              <Link to="/create-recipe" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'black'
                    },
                    textTransform: 'none'
                  }}
                >
                  CREATE A RECIPE FOR ME
                </Button>
              </Link>

              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ mr: 2, width: 200 }}
              />
              <IconButton color="inherit">
                <TuneIcon />
              </IconButton>

              {/* Show login/logout buttons based on user state */}
              {currentUser ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body1">Welcome, {currentUser.email}</Typography>
                  <Button variant="outlined" color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button variant="contained" color="primary" component={Link} to="/signup">
                    Sign Up
                  </Button>
                </Box>
              )}
            </Toolbar>
          </AppBar>

          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
                  {/* Main Banner Section */}
                  <Card elevation={1} sx={{ borderRadius: 4, overflow: 'hidden', mb: 4 }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image="https://source.unsplash.com/random/restaurant"
                      alt="Halal Restaurants"
                    />
                    <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
                      <Typography variant="h3" fontWeight="bold">
                        Halal Restaurants
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 1 }} /> 20 restaurants nearby
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Restaurant List */}
                  <Grid container spacing={3}>
                    {filteredRestaurants.map((restaurant, index) => (
                      <Grid item xs={12} key={index}>
                        <Link to={`/restaurant/${index}`} style={{ textDecoration: 'none' }}>
                          <Paper
                            elevation={3}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              borderRadius: 4,
                              transition: '0.3s',
                              '&:hover': { boxShadow: 6 },
                            }}
                          >
                            <Avatar
                              variant="square"
                              sx={{ width: 80, height: 80, marginRight: 2 }}
                              src={restaurant.image}
                              alt={restaurant.name}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" fontWeight="bold">
                                {restaurant.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {restaurant.description}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {restaurant.details}
                              </Typography>

                              <Rating
                                name={`read-only-${index}`}
                                value={restaurant.rating}
                                precision={0.1}
                                readOnly
                                sx={{ mt: 1 }}
                              />

                              <Rating
                                name={`user-rating-${index}`}
                                value={userRating[index]}
                                onChange={(event, newValue) => handleRatingChange(newValue, index)}
                                sx={{ mt: 1 }}
                              />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                onClick={() => toggleFavorite(index)}
                                color="primary"
                              >
                                {favoriteRestaurants[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                              </IconButton>
                            </Box>
                          </Paper>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              }
            />
            {/* Restaurant Detail Page */}
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />

            {/* Other Pages */}
            <Route path="/make-recipe" element={<MakeRecipe />} />
            <Route path="/chicken-tikka" element={<ChickenTikka />} />
            <Route path="/hummus" element={<Hummus />} />
            <Route path="/chicken-shawarma" element={<ChickenShawarma />} />
            <Route path="/maqlouba" element={<Maqlouba />} />
            <Route path="/zaatar-pie" element={<ZaatarPie />} />
            <Route path="/fish-and-chips" element={<FishAndChips />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
