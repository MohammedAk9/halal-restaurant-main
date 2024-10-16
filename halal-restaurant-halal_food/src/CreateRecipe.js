import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Paper } from '@mui/material';

const ingredientsData = [
  { id: 1, name: 'Apple', category: 'Fruits' },
  { id: 2, name: 'Banana', category: 'Fruits' },
  { id: 3, name: 'Orange', category: 'Fruits' },
  { id: 4, name: 'Strawberries', category: 'Fruits' },
  { id: 5, name: 'Grapes', category: 'Fruits' },
  { id: 6, name: 'Broccoli', category: 'Vegetables' },
  { id: 7, name: 'Carrots', category: 'Vegetables' },
  { id: 8, name: 'Spinach', category: 'Vegetables' },
  { id: 9, name: 'Bell Peppers', category: 'Vegetables' },
  { id: 10, name: 'Onions', category: 'Vegetables' },
  { id: 11, name: 'Chicken', category: 'Protein' },
  { id: 12, name: 'Beef', category: 'Protein' },
  { id: 13, name: 'Tofu', category: 'Protein' },
  { id: 14, name: 'Eggs', category: 'Protein' },
  { id: 15, name: 'Salmon', category: 'Protein' },
  { id: 16, name: 'Rice', category: 'Carbs' },
  { id: 17, name: 'Pasta', category: 'Carbs' },
  { id: 18, name: 'Bread', category: 'Carbs' },
  { id: 19, name: 'Quinoa', category: 'Carbs' },
  { id: 20, name: 'Potatoes', category: 'Carbs' },
  { id: 21, name: 'Basil', category: 'Herbs & Spices' },
  { id: 22, name: 'Oregano', category: 'Herbs & Spices' },
  { id: 23, name: 'Garlic', category: 'Herbs & Spices' },
  { id: 24, name: 'Ginger', category: 'Herbs & Spices' },
  { id: 25, name: 'Chili Powder', category: 'Herbs & Spices' },
  { id: 26, name: 'Milk', category: 'Dairy' },
  { id: 27, name: 'Cheese', category: 'Dairy' },
  { id: 28, name: 'Yogurt', category: 'Dairy' },
  { id: 29, name: 'Butter', category: 'Dairy' },
  { id: 30, name: 'Cream', category: 'Dairy' },
  { id: 31, name: 'Avocado Oil', category: 'Oils' },
  { id: 32, name: 'Vegetable Oil', category: 'Oils' },
  { id: 33, name: 'Olive Oil', category: 'Oils' },
  { id: 34, name: 'Mustard Oil', category: 'Oils' },
  { id: 35, name: 'Salt', category: 'Seasoning' },
  { id: 36, name: 'Black Pepper', category: 'Seasoning' },
  { id: 37, name: 'Garlic Powder', category: 'Seasoning' },
  { id: 38, name: 'Onion Powder', category: 'Seasoning' },
  { id: 39, name: 'Paprika', category: 'Seasoning' },
  { id: 40, name: 'Cumin', category: 'Seasoning' },
  { id: 41, name: 'Turmeric', category: 'Seasoning' },
];

const categories = ['All', 'Fruits', 'Vegetables', 'Protein', 'Carbs', 'Oils', 'Dairy', 'Seasoning'];

const CreateRecipe = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  const filteredIngredients = selectedCategory === 'All'
    ? ingredientsData
    : ingredientsData.filter((ingredient) => ingredient.category === selectedCategory);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Select Ingredients
      </Typography>

      {/* Category Filters */}
      <Box sx={{ mb: 2 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange(category)}
            sx={{ mr: 1, mb: 1, color: 'black' }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Ingredients Grid */}
      <Grid container spacing={3}>
        {filteredIngredients.map((ingredient) => (
          <Grid item xs={6} sm={4} md={3} key={ingredient.id}>
            <Paper
              sx={{
                textAlign: 'center',
                padding: 2,
                cursor: 'pointer',
                backgroundColor: selectedIngredients.includes(ingredient.name) ? 'lightgreen' : 'white',
              }}
              onClick={() => handleIngredientToggle(ingredient.name)}
            >
              <Typography variant="h6">{ingredient.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Selected Ingredients */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Selected Ingredients:</Typography>
        <Typography>
          {selectedIngredients.length > 0 ? selectedIngredients.join(', ') : 'No ingredients selected.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateRecipe;
