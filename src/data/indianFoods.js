/**
 * Indian Food Database — FitPanda Phase 3
 * Nutritional values are per standard serving size.
 * Sources: USDA / NIN (National Institute of Nutrition, India) estimates.
 */

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

export const INDIAN_FOODS = [
    // ── Breakfast Items ─────────────────────────────────────────────
    { id: 'idli', name: 'Idli', category: 'Breakfast', serving: '2 pieces (100g)', calories: 78, protein: 2.7, carbs: 15.8, fat: 0.4 },
    { id: 'dosa', name: 'Plain Dosa', category: 'Breakfast', serving: '1 piece (80g)', calories: 133, protein: 2.4, carbs: 23.5, fat: 3.7 },
    { id: 'masala_dosa', name: 'Masala Dosa', category: 'Breakfast', serving: '1 piece (150g)', calories: 230, protein: 4.5, carbs: 35.0, fat: 7.2 },
    { id: 'upma', name: 'Upma', category: 'Breakfast', serving: '1 bowl (150g)', calories: 175, protein: 4.2, carbs: 28.5, fat: 5.1 },
    { id: 'poha', name: 'Poha', category: 'Breakfast', serving: '1 bowl (150g)', calories: 190, protein: 3.8, carbs: 36.0, fat: 4.2 },
    { id: 'paratha', name: 'Aloo Paratha', category: 'Breakfast', serving: '1 piece (100g)', calories: 260, protein: 5.7, carbs: 37.2, fat: 10.0 },
    { id: 'plain_paratha', name: 'Plain Paratha', category: 'Breakfast', serving: '1 piece (60g)', calories: 168, protein: 3.8, carbs: 22.5, fat: 7.0 },
    { id: 'puri', name: 'Puri', category: 'Breakfast', serving: '2 pieces (60g)', calories: 186, protein: 3.3, carbs: 22.6, fat: 9.6 },
    { id: 'bread_butter', name: 'Bread with Butter', category: 'Breakfast', serving: '2 slices + butter', calories: 205, protein: 5.2, carbs: 28.0, fat: 8.3 },
    { id: 'omelette', name: 'Egg Omelette (2 egg)', category: 'Breakfast', serving: '1 omelette', calories: 154, protein: 12.6, carbs: 0.8, fat: 11.0 },
    { id: 'boiled_egg', name: 'Boiled Egg', category: 'Breakfast', serving: '1 egg (50g)', calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },

    // ── Roti / Bread ────────────────────────────────────────────────
    { id: 'roti', name: 'Roti / Chapati', category: 'Main', serving: '1 piece (35g)', calories: 92, protein: 3.0, carbs: 18.0, fat: 1.0 },
    { id: 'multigrain_roti', name: 'Multigrain Roti', category: 'Main', serving: '1 piece (35g)', calories: 87, protein: 3.5, carbs: 16.0, fat: 1.2 },
    { id: 'naan', name: 'Naan', category: 'Main', serving: '1 piece (90g)', calories: 262, protein: 8.7, carbs: 45.0, fat: 5.1 },
    { id: 'garlic_naan', name: 'Garlic Naan', category: 'Main', serving: '1 piece (95g)', calories: 285, protein: 8.5, carbs: 47.0, fat: 7.3 },

    // ── Rice Dishes ─────────────────────────────────────────────────
    { id: 'steamed_rice', name: 'Steamed Rice', category: 'Main', serving: '1 bowl (150g)', calories: 195, protein: 3.8, carbs: 43.0, fat: 0.4 },
    { id: 'veg_biryani', name: 'Veg Biryani', category: 'Main', serving: '1 bowl (250g)', calories: 350, protein: 7.5, carbs: 60.0, fat: 9.0 },
    { id: 'chicken_biryani', name: 'Chicken Biryani', category: 'Main', serving: '1 bowl (300g)', calories: 480, protein: 28.0, carbs: 55.0, fat: 14.0 },
    { id: 'mutton_biryani', name: 'Mutton Biryani', category: 'Main', serving: '1 bowl (300g)', calories: 520, protein: 30.0, carbs: 54.0, fat: 17.0 },
    { id: 'jeera_rice', name: 'Jeera Rice', category: 'Main', serving: '1 bowl (200g)', calories: 290, protein: 5.0, carbs: 55.0, fat: 6.0 },
    { id: 'curd_rice', name: 'Curd Rice', category: 'Main', serving: '1 bowl (200g)', calories: 220, protein: 6.5, carbs: 38.0, fat: 4.5 },

    // ── Dal / Lentils ────────────────────────────────────────────────
    { id: 'dal_tadka', name: 'Dal Tadka', category: 'Dal', serving: '1 bowl (200ml)', calories: 130, protein: 8.5, carbs: 18.0, fat: 3.0 },
    { id: 'dal_makhani', name: 'Dal Makhani', category: 'Dal', serving: '1 bowl (200ml)', calories: 210, protein: 9.0, carbs: 22.0, fat: 9.5 },
    { id: 'sambar', name: 'Sambar', category: 'Dal', serving: '1 bowl (200ml)', calories: 110, protein: 5.5, carbs: 15.0, fat: 2.8 },
    { id: 'rajma', name: 'Rajma Masala', category: 'Dal', serving: '1 bowl (200g)', calories: 224, protein: 12.0, carbs: 34.0, fat: 5.2 },
    { id: 'chhole', name: 'Chhole / Chole', category: 'Dal', serving: '1 bowl (200g)', calories: 250, protein: 12.5, carbs: 35.0, fat: 7.0 },

    // ── Vegetable Curries ────────────────────────────────────────────
    { id: 'paneer_butter', name: 'Paneer Butter Masala', category: 'Curry', serving: '1 bowl (200g)', calories: 320, protein: 14.0, carbs: 18.0, fat: 22.0 },
    { id: 'paneer_tikka', name: 'Paneer Tikka', category: 'Starter', serving: '6 pieces (150g)', calories: 270, protein: 16.0, carbs: 10.0, fat: 18.0 },
    { id: 'palak_paneer', name: 'Palak Paneer', category: 'Curry', serving: '1 bowl (200g)', calories: 240, protein: 12.5, carbs: 12.0, fat: 16.0 },
    { id: 'aloo_gobi', name: 'Aloo Gobi', category: 'Curry', serving: '1 bowl (200g)', calories: 165, protein: 4.5, carbs: 22.0, fat: 7.0 },
    { id: 'baingan_bharta', name: 'Baingan Bharta', category: 'Curry', serving: '1 bowl (200g)', calories: 140, protein: 4.0, carbs: 14.0, fat: 7.5 },
    { id: 'bhindi_fry', name: 'Bhindi Fry', category: 'Curry', serving: '1 bowl (150g)', calories: 132, protein: 3.5, carbs: 12.0, fat: 7.8 },
    { id: 'mixed_veg', name: 'Mixed Vegetable Curry', category: 'Curry', serving: '1 bowl (200g)', calories: 155, protein: 4.0, carbs: 18.0, fat: 7.0 },

    // ── Non-Veg Curries ──────────────────────────────────────────────
    { id: 'butter_chicken', name: 'Butter Chicken', category: 'Curry', serving: '1 bowl (200g)', calories: 290, protein: 22.0, carbs: 14.0, fat: 16.0 },
    { id: 'chicken_curry', name: 'Chicken Curry', category: 'Curry', serving: '1 bowl (200g)', calories: 265, protein: 24.0, carbs: 8.0, fat: 15.0 },
    { id: 'fish_curry', name: 'Fish Curry', category: 'Curry', serving: '1 bowl (200g)', calories: 220, protein: 22.0, carbs: 7.0, fat: 11.0 },
    { id: 'egg_curry', name: 'Egg Curry', category: 'Curry', serving: '1 bowl (2 eggs)', calories: 240, protein: 15.0, carbs: 10.0, fat: 16.0 },
    { id: 'mutton_curry', name: 'Mutton Curry', category: 'Curry', serving: '1 bowl (200g)', calories: 310, protein: 26.0, carbs: 7.0, fat: 20.0 },

    // ── Snacks & Street Food ─────────────────────────────────────────
    { id: 'samosa', name: 'Samosa', category: 'Snack', serving: '1 piece (75g)', calories: 154, protein: 2.8, carbs: 20.0, fat: 7.0 },
    { id: 'vada', name: 'Medu Vada', category: 'Snack', serving: '1 piece (50g)', calories: 97, protein: 3.5, carbs: 12.0, fat: 4.0 },
    { id: 'pakora', name: 'Onion Pakora', category: 'Snack', serving: '4 pieces (80g)', calories: 175, protein: 3.8, carbs: 20.5, fat: 8.8 },
    { id: 'bhel_puri', name: 'Bhel Puri', category: 'Snack', serving: '1 bowl (150g)', calories: 180, protein: 5.0, carbs: 31.0, fat: 4.5 },
    { id: 'pani_puri', name: 'Pani Puri (6 pcs)', category: 'Snack', serving: '6 pieces', calories: 210, protein: 4.5, carbs: 36.0, fat: 5.5 },
    { id: 'aloo_chaat', name: 'Aloo Chaat', category: 'Snack', serving: '1 bowl (150g)', calories: 195, protein: 4.0, carbs: 32.5, fat: 6.5 },
    { id: 'dhokla', name: 'Dhokla', category: 'Snack', serving: '2 pieces (80g)', calories: 100, protein: 4.8, carbs: 16.0, fat: 2.0 },
    { id: 'khandvi', name: 'Khandvi', category: 'Snack', serving: '4 rolls (80g)', calories: 115, protein: 4.5, carbs: 16.5, fat: 3.8 },
    { id: 'murukku', name: 'Murukku', category: 'Snack', serving: '30g', calories: 155, protein: 2.5, carbs: 20.0, fat: 7.5 },

    // ── Sweets & Desserts ────────────────────────────────────────────
    { id: 'gulab_jamun', name: 'Gulab Jamun', category: 'Dessert', serving: '2 pieces (80g)', calories: 233, protein: 3.5, carbs: 38.0, fat: 7.5 },
    { id: 'rasgulla', name: 'Rasgulla', category: 'Dessert', serving: '2 pieces (120g)', calories: 130, protein: 4.0, carbs: 28.0, fat: 0.5 },
    { id: 'kheer', name: 'Kheer (Rice Pudding)', category: 'Dessert', serving: '1 bowl (150ml)', calories: 200, protein: 5.5, carbs: 32.0, fat: 5.5 },
    { id: 'halwa', name: 'Sooji Halwa', category: 'Dessert', serving: '1 bowl (100g)', calories: 280, protein: 4.0, carbs: 40.0, fat: 11.0 },
    { id: 'jalebi', name: 'Jalebi', category: 'Dessert', serving: '2 pieces (60g)', calories: 225, protein: 1.5, carbs: 48.0, fat: 4.0 },

    // ── Drinks ──────────────────────────────────────────────────────
    { id: 'chai', name: 'Masala Chai (with milk)', category: 'Drink', serving: '1 cup (150ml)', calories: 55, protein: 2.0, carbs: 7.5, fat: 1.5 },
    { id: 'lassi_sweet', name: 'Sweet Lassi', category: 'Drink', serving: '1 glass (250ml)', calories: 210, protein: 6.5, carbs: 32.0, fat: 5.5 },
    { id: 'lassi_plain', name: 'Plain Lassi', category: 'Drink', serving: '1 glass (250ml)', calories: 130, protein: 6.0, carbs: 12.0, fat: 5.5 },
    { id: 'buttermilk', name: 'Buttermilk / Chaas', category: 'Drink', serving: '1 glass (250ml)', calories: 50, protein: 3.2, carbs: 5.0, fat: 1.0 },

    // ── Dairy / Extras ───────────────────────────────────────────────
    { id: 'paneer_raw', name: 'Paneer (raw)', category: 'Protein', serving: '50g', calories: 133, protein: 9.0, carbs: 1.5, fat: 10.0 },
    { id: 'curd', name: 'Curd / Dahi', category: 'Dairy', serving: '1 bowl (150ml)', calories: 98, protein: 5.5, carbs: 8.0, fat: 4.5 },
    { id: 'raita', name: 'Raita', category: 'Side', serving: '1 bowl (150ml)', calories: 80, protein: 4.0, carbs: 8.5, fat: 2.5 },
    { id: 'coconut_chutney', name: 'Coconut Chutney', category: 'Side', serving: '2 tbsp (30g)', calories: 65, protein: 0.8, carbs: 3.5, fat: 5.5 },
]
