/**
 * Indian Food Database — FitPanda
 * Nutritional values are per 1 unit (serving).
 * Sources: USDA / NIN (National Institute of Nutrition, India) estimates.
 */

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

export const INDIAN_FOODS = [
    // ── Breakfast ─────────────────────────────────────────────
    { id: 'idli', name: 'Idli', emoji: '🥟', category: 'Breakfast', serving: '1 piece', calories: 39, protein_g: 1.4, carbs_g: 7.9, fat_g: 0.2 },
    { id: 'dosa', name: 'Plain Dosa', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 133, protein_g: 2.4, carbs_g: 23.5, fat_g: 3.7 },
    { id: 'masala_dosa', name: 'Masala Dosa', emoji: '🌮', category: 'Breakfast', serving: '1 piece', calories: 230, protein_g: 4.5, carbs_g: 35.0, fat_g: 7.2 },
    { id: 'upma', name: 'Upma', emoji: '🍲', category: 'Breakfast', serving: '1 bowl', calories: 175, protein_g: 4.2, carbs_g: 28.5, fat_g: 5.1 },
    { id: 'poha', name: 'Poha', emoji: '🫕', category: 'Breakfast', serving: '1 bowl', calories: 190, protein_g: 3.8, carbs_g: 36.0, fat_g: 4.2 },
    { id: 'paratha', name: 'Aloo Paratha', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 260, protein_g: 5.7, carbs_g: 37.2, fat_g: 10.0 },
    { id: 'plain_paratha', name: 'Plain Paratha', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 168, protein_g: 3.8, carbs_g: 22.5, fat_g: 7.0 },
    { id: 'puri', name: 'Puri', emoji: '🧇', category: 'Breakfast', serving: '1 piece', calories: 93, protein_g: 1.7, carbs_g: 11.3, fat_g: 4.8 },
    { id: 'omelette', name: 'Egg Omelette', emoji: '🍳', category: 'Breakfast', serving: '1 omelette (2 eggs)', calories: 154, protein_g: 12.6, carbs_g: 0.8, fat_g: 11.0 },
    { id: 'boiled_egg', name: 'Boiled Egg', emoji: '🥚', category: 'Breakfast', serving: '1 egg', calories: 78, protein_g: 6.3, carbs_g: 0.6, fat_g: 5.3 },

    // ── Roti / Bread ─────────────────────────────────────────
    { id: 'roti', name: 'Roti / Chapati', emoji: '🫓', category: 'Main', serving: '1 piece', calories: 92, protein_g: 3.0, carbs_g: 18.0, fat_g: 1.0 },
    { id: 'multigrain', name: 'Multigrain Roti', emoji: '🌾', category: 'Main', serving: '1 piece', calories: 87, protein_g: 3.5, carbs_g: 16.0, fat_g: 1.2 },
    { id: 'naan', name: 'Naan', emoji: '🫓', category: 'Main', serving: '1 piece', calories: 262, protein_g: 8.7, carbs_g: 45.0, fat_g: 5.1 },

    // ── Rice ──────────────────────────────────────────────────
    { id: 'steamed_rice', name: 'Steamed Rice', emoji: '🍚', category: 'Main', serving: '1 bowl (150g)', calories: 195, protein_g: 3.8, carbs_g: 43.0, fat_g: 0.4 },
    { id: 'veg_biryani', name: 'Veg Biryani', emoji: '🍛', category: 'Main', serving: '1 bowl', calories: 350, protein_g: 7.5, carbs_g: 60.0, fat_g: 9.0 },
    { id: 'chicken_biryani', name: 'Chicken Biryani', emoji: '🍗', category: 'Main', serving: '1 bowl', calories: 480, protein_g: 28.0, carbs_g: 55.0, fat_g: 14.0 },
    { id: 'curd_rice', name: 'Curd Rice', emoji: '🍚', category: 'Main', serving: '1 bowl', calories: 220, protein_g: 6.5, carbs_g: 38.0, fat_g: 4.5 },

    // ── Dal ───────────────────────────────────────────────────
    { id: 'dal_tadka', name: 'Dal Tadka', emoji: '🫕', category: 'Dal', serving: '1 bowl', calories: 130, protein_g: 8.5, carbs_g: 18.0, fat_g: 3.0 },
    { id: 'dal_makhani', name: 'Dal Makhani', emoji: '🫕', category: 'Dal', serving: '1 bowl', calories: 210, protein_g: 9.0, carbs_g: 22.0, fat_g: 9.5 },
    { id: 'sambar', name: 'Sambar', emoji: '🍲', category: 'Dal', serving: '1 bowl', calories: 110, protein_g: 5.5, carbs_g: 15.0, fat_g: 2.8 },
    { id: 'rajma', name: 'Rajma Masala', emoji: '🫘', category: 'Dal', serving: '1 bowl', calories: 224, protein_g: 12.0, carbs_g: 34.0, fat_g: 5.2 },
    { id: 'chhole', name: 'Chhole / Chole', emoji: '🫘', category: 'Dal', serving: '1 bowl', calories: 250, protein_g: 12.5, carbs_g: 35.0, fat_g: 7.0 },

    // ── Curries ───────────────────────────────────────────────
    { id: 'paneer_butter', name: 'Paneer Butter Masala', emoji: '🧀', category: 'Curry', serving: '1 bowl', calories: 320, protein_g: 14.0, carbs_g: 18.0, fat_g: 22.0 },
    { id: 'paneer_tikka', name: 'Paneer Tikka', emoji: '🧀', category: 'Starter', serving: '1 piece', calories: 45, protein_g: 2.7, carbs_g: 1.7, fat_g: 3.0 },
    { id: 'palak_paneer', name: 'Palak Paneer', emoji: '🌿', category: 'Curry', serving: '1 bowl', calories: 240, protein_g: 12.5, carbs_g: 12.0, fat_g: 16.0 },
    { id: 'butter_chicken', name: 'Butter Chicken', emoji: '🍗', category: 'Curry', serving: '1 bowl', calories: 290, protein_g: 22.0, carbs_g: 14.0, fat_g: 16.0 },
    { id: 'chicken_curry', name: 'Chicken Curry', emoji: '🍗', category: 'Curry', serving: '1 bowl', calories: 265, protein_g: 24.0, carbs_g: 8.0, fat_g: 15.0 },
    { id: 'fish_curry', name: 'Fish Curry', emoji: '🐟', category: 'Curry', serving: '1 bowl', calories: 220, protein_g: 22.0, carbs_g: 7.0, fat_g: 11.0 },
    { id: 'aloo_gobi', name: 'Aloo Gobi', emoji: '🥦', category: 'Curry', serving: '1 bowl', calories: 165, protein_g: 4.5, carbs_g: 22.0, fat_g: 7.0 },

    // ── Snacks ────────────────────────────────────────────────
    { id: 'samosa', name: 'Samosa', emoji: '🔺', category: 'Snack', serving: '1 piece', calories: 154, protein_g: 2.8, carbs_g: 20.0, fat_g: 7.0 },
    { id: 'vada', name: 'Medu Vada', emoji: '🍩', category: 'Snack', serving: '1 piece', calories: 97, protein_g: 3.5, carbs_g: 12.0, fat_g: 4.0 },
    { id: 'pakora', name: 'Onion Pakora', emoji: '🧅', category: 'Snack', serving: '4 pieces', calories: 175, protein_g: 3.8, carbs_g: 20.5, fat_g: 8.8 },
    { id: 'dhokla', name: 'Dhokla', emoji: '🟡', category: 'Snack', serving: '1 piece', calories: 50, protein_g: 2.4, carbs_g: 8.0, fat_g: 1.0 },
    { id: 'pani_puri', name: 'Pani Puri', emoji: '🫧', category: 'Snack', serving: '1 piece', calories: 35, protein_g: 0.8, carbs_g: 6.0, fat_g: 0.9 },

    // ── Desserts ──────────────────────────────────────────────
    { id: 'gulab_jamun', name: 'Gulab Jamun', emoji: '🟤', category: 'Dessert', serving: '1 piece', calories: 117, protein_g: 1.8, carbs_g: 19.0, fat_g: 3.8 },
    { id: 'rasgulla', name: 'Rasgulla', emoji: '⚪', category: 'Dessert', serving: '1 piece', calories: 65, protein_g: 2.0, carbs_g: 14.0, fat_g: 0.3 },
    { id: 'jalebi', name: 'Jalebi', emoji: '🌀', category: 'Dessert', serving: '1 piece', calories: 113, protein_g: 0.8, carbs_g: 24.0, fat_g: 2.0 },

    // ── Drinks ────────────────────────────────────────────────
    { id: 'chai', name: 'Masala Chai', emoji: '☕', category: 'Drink', serving: '1 cup', calories: 55, protein_g: 2.0, carbs_g: 7.5, fat_g: 1.5 },
    { id: 'lassi_sweet', name: 'Sweet Lassi', emoji: '🥛', category: 'Drink', serving: '1 glass', calories: 210, protein_g: 6.5, carbs_g: 32.0, fat_g: 5.5 },
    { id: 'buttermilk', name: 'Buttermilk / Chaas', emoji: '🥛', category: 'Drink', serving: '1 glass', calories: 50, protein_g: 3.2, carbs_g: 5.0, fat_g: 1.0 },

    // ── Dairy ─────────────────────────────────────────────────
    { id: 'paneer_raw', name: 'Paneer (raw)', emoji: '🧀', category: 'Protein', serving: '50g', calories: 133, protein_g: 9.0, carbs_g: 1.5, fat_g: 10.0 },
    { id: 'curd', name: 'Curd / Dahi', emoji: '🥛', category: 'Dairy', serving: '1 bowl', calories: 98, protein_g: 5.5, carbs_g: 8.0, fat_g: 4.5 },
]
