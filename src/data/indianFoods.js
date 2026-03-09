/**
 * Indian Food Database — FitPanda (Extended)
 * Nutritional values are per 1 unit/serving.
 * Sources: USDA / NIN (National Institute of Nutrition, India).
 */

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

export const INDIAN_FOODS = [
    // ── Breakfast ─────────────────────────────────────────────────────
    { id: 'idli', name: 'Idli', emoji: '🥟', category: 'Breakfast', serving: '1 piece', calories: 39, protein_g: 1.4, carbs_g: 7.9, fat_g: 0.2 },
    { id: 'dosa', name: 'Plain Dosa', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 133, protein_g: 2.4, carbs_g: 23.5, fat_g: 3.7 },
    { id: 'masala_dosa', name: 'Masala Dosa', emoji: '🌮', category: 'Breakfast', serving: '1 piece', calories: 230, protein_g: 4.5, carbs_g: 35.0, fat_g: 7.2 },
    { id: 'rava_dosa', name: 'Rava Dosa', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 155, protein_g: 3.5, carbs_g: 26.0, fat_g: 4.5 },
    { id: 'uttapam', name: 'Uttapam', emoji: '🥞', category: 'Breakfast', serving: '1 piece', calories: 120, protein_g: 3.8, carbs_g: 20.0, fat_g: 3.0 },
    { id: 'upma', name: 'Upma', emoji: '🍲', category: 'Breakfast', serving: '1 bowl', calories: 175, protein_g: 4.2, carbs_g: 28.5, fat_g: 5.1 },
    { id: 'poha', name: 'Poha', emoji: '🫕', category: 'Breakfast', serving: '1 bowl', calories: 190, protein_g: 3.8, carbs_g: 36.0, fat_g: 4.2 },
    { id: 'paratha', name: 'Aloo Paratha', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 260, protein_g: 5.7, carbs_g: 37.2, fat_g: 10.0 },
    { id: 'plain_paratha', name: 'Plain Paratha', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 168, protein_g: 3.8, carbs_g: 22.5, fat_g: 7.0 },
    { id: 'gobi_paratha', name: 'Gobi Paratha', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 200, protein_g: 4.5, carbs_g: 28.0, fat_g: 8.0 },
    { id: 'methi_paratha', name: 'Methi Paratha', emoji: '🌿', category: 'Breakfast', serving: '1 piece', calories: 175, protein_g: 4.2, carbs_g: 24.0, fat_g: 7.0 },
    { id: 'puri', name: 'Puri', emoji: '🧇', category: 'Breakfast', serving: '1 piece', calories: 93, protein_g: 1.7, carbs_g: 11.3, fat_g: 4.8 },
    { id: 'omelette', name: 'Egg Omelette', emoji: '🍳', category: 'Breakfast', serving: '1 omelette (2 eggs)', calories: 154, protein_g: 12.6, carbs_g: 0.8, fat_g: 11.0 },
    { id: 'boiled_egg', name: 'Boiled Egg', emoji: '🥚', category: 'Breakfast', serving: '1 egg', calories: 78, protein_g: 6.3, carbs_g: 0.6, fat_g: 5.3 },
    { id: 'scrambled_egg', name: 'Scrambled Egg', emoji: '🍳', category: 'Breakfast', serving: '1 egg', calories: 91, protein_g: 6.1, carbs_g: 1.0, fat_g: 6.7 },
    { id: 'bread_butter', name: 'Bread with Butter', emoji: '🍞', category: 'Breakfast', serving: '1 slice', calories: 102, protein_g: 2.6, carbs_g: 14.0, fat_g: 4.2 },
    { id: 'pesarattu', name: 'Pesarattu (Moong Dosa)', emoji: '🫓', category: 'Breakfast', serving: '1 piece', calories: 112, protein_g: 5.5, carbs_g: 18.0, fat_g: 2.5 },
    { id: 'appam', name: 'Appam', emoji: '⭕', category: 'Breakfast', serving: '1 piece', calories: 80, protein_g: 1.8, carbs_g: 15.5, fat_g: 1.5 },
    { id: 'sevai', name: 'Rice Sevai / Idiyappam', emoji: '🍜', category: 'Breakfast', serving: '1 bowl', calories: 110, protein_g: 2.5, carbs_g: 22.0, fat_g: 1.2 },
    { id: 'rava_idli', name: 'Rava Idli', emoji: '🥟', category: 'Breakfast', serving: '1 piece', calories: 65, protein_g: 2.0, carbs_g: 11.0, fat_g: 2.0 },

    // ── Roti / Bread ─────────────────────────────────────────────────
    { id: 'roti', name: 'Roti / Chapati', emoji: '🫓', category: 'Main', serving: '1 piece', calories: 92, protein_g: 3.0, carbs_g: 18.0, fat_g: 1.0 },
    { id: 'multigrain', name: 'Multigrain Roti', emoji: '🌾', category: 'Main', serving: '1 piece', calories: 87, protein_g: 3.5, carbs_g: 16.0, fat_g: 1.2 },
    { id: 'naan', name: 'Naan', emoji: '🫓', category: 'Main', serving: '1 piece', calories: 262, protein_g: 8.7, carbs_g: 45.0, fat_g: 5.1 },
    { id: 'garlic_naan', name: 'Garlic Naan', emoji: '🧄', category: 'Main', serving: '1 piece', calories: 285, protein_g: 8.5, carbs_g: 47.0, fat_g: 7.3 },
    { id: 'missi_roti', name: 'Missi Roti', emoji: '🫓', category: 'Main', serving: '1 piece', calories: 105, protein_g: 4.5, carbs_g: 16.0, fat_g: 2.5 },
    { id: 'bhatura', name: 'Bhatura', emoji: '🧇', category: 'Main', serving: '1 piece', calories: 250, protein_g: 6.0, carbs_g: 38.0, fat_g: 9.0 },
    { id: 'kulcha', name: 'Kulcha', emoji: '🫓', category: 'Main', serving: '1 piece', calories: 210, protein_g: 6.5, carbs_g: 35.0, fat_g: 5.5 },

    // ── Rice ─────────────────────────────────────────────────────────
    { id: 'steamed_rice', name: 'Steamed Rice', emoji: '🍚', category: 'Main', serving: '1 bowl (150g)', calories: 195, protein_g: 3.8, carbs_g: 43.0, fat_g: 0.4 },
    { id: 'veg_biryani', name: 'Veg Biryani', emoji: '🍛', category: 'Main', serving: '1 bowl', calories: 350, protein_g: 7.5, carbs_g: 60.0, fat_g: 9.0 },
    { id: 'chicken_biryani', name: 'Chicken Biryani', emoji: '🍗', category: 'Main', serving: '1 bowl', calories: 480, protein_g: 28.0, carbs_g: 55.0, fat_g: 14.0 },
    { id: 'mutton_biryani', name: 'Mutton Biryani', emoji: '🥩', category: 'Main', serving: '1 bowl', calories: 520, protein_g: 30.0, carbs_g: 54.0, fat_g: 17.0 },
    { id: 'prawns_biryani', name: 'Prawns Biryani', emoji: '🦐', category: 'Main', serving: '1 bowl', calories: 420, protein_g: 25.0, carbs_g: 52.0, fat_g: 11.0 },
    { id: 'curd_rice', name: 'Curd Rice', emoji: '🍚', category: 'Main', serving: '1 bowl', calories: 220, protein_g: 6.5, carbs_g: 38.0, fat_g: 4.5 },
    { id: 'jeera_rice', name: 'Jeera Rice', emoji: '🍚', category: 'Main', serving: '1 bowl', calories: 290, protein_g: 5.0, carbs_g: 55.0, fat_g: 6.0 },
    { id: 'lemon_rice', name: 'Lemon Rice', emoji: '🍋', category: 'Main', serving: '1 bowl', calories: 200, protein_g: 3.5, carbs_g: 40.0, fat_g: 4.0 },
    { id: 'pongal', name: 'Ven Pongal', emoji: '🍚', category: 'Main', serving: '1 bowl', calories: 200, protein_g: 5.5, carbs_g: 32.0, fat_g: 6.5 },
    { id: 'tamarind_rice', name: 'Tamarind Rice (Puliyogare)', emoji: '🍚', category: 'Main', serving: '1 bowl', calories: 240, protein_g: 4.5, carbs_g: 45.0, fat_g: 6.0 },
    { id: 'tomato_rice', name: 'Tomato Rice', emoji: '🍅', category: 'Main', serving: '1 bowl', calories: 210, protein_g: 4.2, carbs_g: 40.0, fat_g: 4.5 },
    { id: 'egg_fried_rice', name: 'Egg Fried Rice', emoji: '🍳', category: 'Main', serving: '1 bowl', calories: 310, protein_g: 11.0, carbs_g: 45.0, fat_g: 10.0 },
    { id: 'veg_fried_rice', name: 'Veg Fried Rice', emoji: '🍚', category: 'Main', serving: '1 bowl', calories: 260, protein_g: 6.0, carbs_g: 48.0, fat_g: 6.0 },

    // ── Dal ──────────────────────────────────────────────────────────
    { id: 'dal_tadka', name: 'Dal Tadka', emoji: '🫕', category: 'Dal', serving: '1 bowl', calories: 130, protein_g: 8.5, carbs_g: 18.0, fat_g: 3.0 },
    { id: 'dal_makhani', name: 'Dal Makhani', emoji: '🫕', category: 'Dal', serving: '1 bowl', calories: 210, protein_g: 9.0, carbs_g: 22.0, fat_g: 9.5 },
    { id: 'sambar', name: 'Sambar', emoji: '🍲', category: 'Dal', serving: '1 bowl', calories: 110, protein_g: 5.5, carbs_g: 15.0, fat_g: 2.8 },
    { id: 'rajma', name: 'Rajma Masala', emoji: '🫘', category: 'Dal', serving: '1 bowl', calories: 224, protein_g: 12.0, carbs_g: 34.0, fat_g: 5.2 },
    { id: 'chhole', name: 'Chhole / Chole', emoji: '🫘', category: 'Dal', serving: '1 bowl', calories: 250, protein_g: 12.5, carbs_g: 35.0, fat_g: 7.0 },
    { id: 'moong_dal', name: 'Moong Dal', emoji: '🫕', category: 'Dal', serving: '1 bowl', calories: 115, protein_g: 8.0, carbs_g: 16.0, fat_g: 2.0 },
    { id: 'masoor_dal', name: 'Masoor Dal', emoji: '🫕', category: 'Dal', serving: '1 bowl', calories: 125, protein_g: 9.0, carbs_g: 18.0, fat_g: 2.5 },
    { id: 'toor_dal', name: 'Toor Dal', emoji: '🫕', category: 'Dal', serving: '1 bowl', calories: 120, protein_g: 7.5, carbs_g: 18.5, fat_g: 2.0 },
    { id: 'kadhi', name: 'Kadhi Pakora', emoji: '🍲', category: 'Dal', serving: '1 bowl', calories: 160, protein_g: 5.5, carbs_g: 18.0, fat_g: 7.5 },

    // ── Veg Curries ──────────────────────────────────────────────────
    { id: 'paneer_butter', name: 'Paneer Butter Masala', emoji: '🧀', category: 'Curry', serving: '1 bowl', calories: 320, protein_g: 14.0, carbs_g: 18.0, fat_g: 22.0 },
    { id: 'palak_paneer', name: 'Palak Paneer', emoji: '🌿', category: 'Curry', serving: '1 bowl', calories: 240, protein_g: 12.5, carbs_g: 12.0, fat_g: 16.0 },
    { id: 'shahi_paneer', name: 'Shahi Paneer', emoji: '🧀', category: 'Curry', serving: '1 bowl', calories: 340, protein_g: 14.5, carbs_g: 16.0, fat_g: 24.0 },
    { id: 'matar_paneer', name: 'Matar Paneer', emoji: '🧀', category: 'Curry', serving: '1 bowl', calories: 280, protein_g: 12.0, carbs_g: 20.0, fat_g: 17.0 },
    { id: 'aloo_gobi', name: 'Aloo Gobi', emoji: '🥦', category: 'Curry', serving: '1 bowl', calories: 165, protein_g: 4.5, carbs_g: 22.0, fat_g: 7.0 },
    { id: 'aloo_matar', name: 'Aloo Matar', emoji: '🥔', category: 'Curry', serving: '1 bowl', calories: 180, protein_g: 5.0, carbs_g: 26.0, fat_g: 7.0 },
    { id: 'baingan_bharta', name: 'Baingan Bharta', emoji: '🍆', category: 'Curry', serving: '1 bowl', calories: 140, protein_g: 4.0, carbs_g: 14.0, fat_g: 7.5 },
    { id: 'bhindi_fry', name: 'Bhindi Fry', emoji: '🥒', category: 'Curry', serving: '1 bowl', calories: 132, protein_g: 3.5, carbs_g: 12.0, fat_g: 7.8 },
    { id: 'mixed_veg', name: 'Mixed Vegetable', emoji: '🥗', category: 'Curry', serving: '1 bowl', calories: 155, protein_g: 4.0, carbs_g: 18.0, fat_g: 7.0 },
    { id: 'lauki', name: 'Lauki Sabzi', emoji: '🥬', category: 'Curry', serving: '1 bowl', calories: 90, protein_g: 2.5, carbs_g: 12.0, fat_g: 4.0 },
    { id: 'jeera_aloo', name: 'Jeera Aloo', emoji: '🥔', category: 'Curry', serving: '1 bowl', calories: 165, protein_g: 3.0, carbs_g: 24.0, fat_g: 6.5 },
    { id: 'veg_kolhapuri', name: 'Veg Kolhapuri', emoji: '🌶️', category: 'Curry', serving: '1 bowl', calories: 195, protein_g: 5.0, carbs_g: 20.0, fat_g: 10.0 },
    { id: 'navratan_korma', name: 'Navratan Korma', emoji: '🍛', category: 'Curry', serving: '1 bowl', calories: 280, protein_g: 8.0, carbs_g: 22.0, fat_g: 18.0 },

    // ── Non-Veg Curries ──────────────────────────────────────────────
    { id: 'butter_chicken', name: 'Butter Chicken', emoji: '🍗', category: 'Non-Veg', serving: '1 bowl', calories: 290, protein_g: 22.0, carbs_g: 14.0, fat_g: 16.0 },
    { id: 'chicken_curry', name: 'Chicken Curry', emoji: '🍗', category: 'Non-Veg', serving: '1 bowl', calories: 265, protein_g: 24.0, carbs_g: 8.0, fat_g: 15.0 },
    { id: 'chicken_tikka_masala', name: 'Chicken Tikka Masala', emoji: '🍗', category: 'Non-Veg', serving: '1 bowl', calories: 300, protein_g: 26.0, carbs_g: 15.0, fat_g: 16.0 },
    { id: 'fish_curry', name: 'Fish Curry', emoji: '🐟', category: 'Non-Veg', serving: '1 bowl', calories: 220, protein_g: 22.0, carbs_g: 7.0, fat_g: 11.0 },
    { id: 'egg_curry', name: 'Egg Curry', emoji: '🥚', category: 'Non-Veg', serving: '1 bowl (2 eggs)', calories: 240, protein_g: 15.0, carbs_g: 10.0, fat_g: 16.0 },
    { id: 'mutton_curry', name: 'Mutton Curry', emoji: '🥩', category: 'Non-Veg', serving: '1 bowl', calories: 310, protein_g: 26.0, carbs_g: 7.0, fat_g: 20.0 },
    { id: 'keema_matar', name: 'Keema Matar', emoji: '🥩', category: 'Non-Veg', serving: '1 bowl', calories: 290, protein_g: 24.0, carbs_g: 12.0, fat_g: 17.0 },
    { id: 'chicken_rogan_josh', name: 'Rogan Josh', emoji: '🥩', category: 'Non-Veg', serving: '1 bowl', calories: 275, protein_g: 24.0, carbs_g: 9.0, fat_g: 16.0 },
    { id: 'prawn_masala', name: 'Prawn Masala', emoji: '🦐', category: 'Non-Veg', serving: '1 bowl', calories: 200, protein_g: 22.0, carbs_g: 8.0, fat_g: 10.0 },
    { id: 'crab_curry', name: 'Crab Curry', emoji: '🦀', category: 'Non-Veg', serving: '1 bowl', calories: 185, protein_g: 20.0, carbs_g: 6.0, fat_g: 9.0 },

    // ── Starters ─────────────────────────────────────────────────────
    { id: 'paneer_tikka', name: 'Paneer Tikka', emoji: '🧀', category: 'Starter', serving: '1 piece', calories: 45, protein_g: 2.7, carbs_g: 1.7, fat_g: 3.0 },
    { id: 'chicken_tikka', name: 'Chicken Tikka', emoji: '🍗', category: 'Starter', serving: '1 piece', calories: 55, protein_g: 7.5, carbs_g: 2.0, fat_g: 2.0 },
    { id: 'seekh_kebab', name: 'Seekh Kebab', emoji: '🍢', category: 'Starter', serving: '1 piece', calories: 80, protein_g: 9.0, carbs_g: 3.0, fat_g: 4.0 },
    { id: 'tandoori_chicken', name: 'Tandoori Chicken', emoji: '🍗', category: 'Starter', serving: '1 piece (leg)', calories: 180, protein_g: 22.0, carbs_g: 4.0, fat_g: 8.0 },
    { id: 'fish_fry', name: 'Masala Fish Fry', emoji: '🐟', category: 'Starter', serving: '1 piece', calories: 130, protein_g: 15.0, carbs_g: 4.0, fat_g: 6.0 },

    // ── Snacks ────────────────────────────────────────────────────────
    { id: 'samosa', name: 'Samosa', emoji: '🔺', category: 'Snack', serving: '1 piece', calories: 154, protein_g: 2.8, carbs_g: 20.0, fat_g: 7.0 },
    { id: 'vada', name: 'Medu Vada', emoji: '🍩', category: 'Snack', serving: '1 piece', calories: 97, protein_g: 3.5, carbs_g: 12.0, fat_g: 4.0 },
    { id: 'pakora', name: 'Onion Pakora', emoji: '🧅', category: 'Snack', serving: '4 pieces', calories: 175, protein_g: 3.8, carbs_g: 20.5, fat_g: 8.8 },
    { id: 'dhokla', name: 'Dhokla', emoji: '🟡', category: 'Snack', serving: '1 piece', calories: 50, protein_g: 2.4, carbs_g: 8.0, fat_g: 1.0 },
    { id: 'pani_puri', name: 'Pani Puri', emoji: '🫧', category: 'Snack', serving: '1 piece', calories: 35, protein_g: 0.8, carbs_g: 6.0, fat_g: 0.9 },
    { id: 'bhel_puri', name: 'Bhel Puri', emoji: '🍿', category: 'Snack', serving: '1 bowl', calories: 180, protein_g: 5.0, carbs_g: 31.0, fat_g: 4.5 },
    { id: 'aloo_chaat', name: 'Aloo Chaat', emoji: '🥔', category: 'Snack', serving: '1 bowl', calories: 195, protein_g: 4.0, carbs_g: 32.5, fat_g: 6.5 },
    { id: 'dahi_puri', name: 'Dahi Puri', emoji: '⚪', category: 'Snack', serving: '1 piece', calories: 55, protein_g: 1.5, carbs_g: 8.5, fat_g: 1.8 },
    { id: 'khandvi', name: 'Khandvi', emoji: '🟡', category: 'Snack', serving: '4 rolls', calories: 115, protein_g: 4.5, carbs_g: 16.5, fat_g: 3.8 },
    { id: 'murukku', name: 'Murukku', emoji: '🌀', category: 'Snack', serving: '30g', calories: 155, protein_g: 2.5, carbs_g: 20.0, fat_g: 7.5 },
    { id: 'chakli', name: 'Chakli', emoji: '🌀', category: 'Snack', serving: '30g', calories: 145, protein_g: 2.8, carbs_g: 19.0, fat_g: 7.0 },
    { id: 'mathri', name: 'Mathri', emoji: '🟤', category: 'Snack', serving: '2 pieces', calories: 120, protein_g: 2.0, carbs_g: 15.0, fat_g: 6.0 },
    { id: 'namak_para', name: 'Namak Para', emoji: '🟠', category: 'Snack', serving: '30g', calories: 140, protein_g: 2.5, carbs_g: 18.0, fat_g: 6.5 },
    { id: 'masala_popcorn', name: 'Masala Popcorn', emoji: '🍿', category: 'Snack', serving: '1 bowl (30g)', calories: 105, protein_g: 3.0, carbs_g: 18.0, fat_g: 3.5 },
    { id: 'corn_chaat', name: 'Corn Chaat', emoji: '🌽', category: 'Snack', serving: '1 bowl', calories: 145, protein_g: 4.0, carbs_g: 28.0, fat_g: 3.0 },
    { id: 'papdi_chaat', name: 'Papdi Chaat', emoji: '🥗', category: 'Snack', serving: '1 plate', calories: 250, protein_g: 6.5, carbs_g: 38.0, fat_g: 9.0 },
    { id: 'veg_roll', name: 'Veg Roll / Frankie', emoji: '🌯', category: 'Snack', serving: '1 roll', calories: 250, protein_g: 7.0, carbs_g: 38.0, fat_g: 8.0 },
    { id: 'chicken_roll', name: 'Chicken Roll', emoji: '🌯', category: 'Snack', serving: '1 roll', calories: 300, protein_g: 18.0, carbs_g: 35.0, fat_g: 10.0 },
    { id: 'vada_pav', name: 'Vada Pav', emoji: '🍔', category: 'Snack', serving: '1 piece', calories: 290, protein_g: 7.0, carbs_g: 44.0, fat_g: 10.0 },
    { id: 'pav_bhaji', name: 'Pav Bhaji', emoji: '🫓', category: 'Snack', serving: '1 plate', calories: 390, protein_g: 9.0, carbs_g: 60.0, fat_g: 13.0 },
    { id: 'misal_pav', name: 'Misal Pav', emoji: '🫓', category: 'Snack', serving: '1 plate', calories: 340, protein_g: 14.0, carbs_g: 50.0, fat_g: 10.0 },

    // ── Desserts ──────────────────────────────────────────────────────
    { id: 'gulab_jamun', name: 'Gulab Jamun', emoji: '🟤', category: 'Dessert', serving: '1 piece', calories: 117, protein_g: 1.8, carbs_g: 19.0, fat_g: 3.8 },
    { id: 'rasgulla', name: 'Rasgulla', emoji: '⚪', category: 'Dessert', serving: '1 piece', calories: 65, protein_g: 2.0, carbs_g: 14.0, fat_g: 0.3 },
    { id: 'kheer', name: 'Kheer (Rice Pudding)', emoji: '🍮', category: 'Dessert', serving: '1 bowl', calories: 200, protein_g: 5.5, carbs_g: 32.0, fat_g: 5.5 },
    { id: 'halwa', name: 'Sooji Halwa', emoji: '🟠', category: 'Dessert', serving: '1 bowl', calories: 280, protein_g: 4.0, carbs_g: 40.0, fat_g: 11.0 },
    { id: 'jalebi', name: 'Jalebi', emoji: '🌀', category: 'Dessert', serving: '1 piece', calories: 113, protein_g: 0.8, carbs_g: 24.0, fat_g: 2.0 },
    { id: 'barfi', name: 'Barfi (Milk Fudge)', emoji: '🟦', category: 'Dessert', serving: '1 piece', calories: 130, protein_g: 3.0, carbs_g: 20.0, fat_g: 4.5 },
    { id: 'ladoo', name: 'Besan Ladoo', emoji: '🟡', category: 'Dessert', serving: '1 piece', calories: 150, protein_g: 3.5, carbs_g: 18.0, fat_g: 7.0 },
    { id: 'motichur_ladoo', name: 'Motichur Ladoo', emoji: '🟠', category: 'Dessert', serving: '1 piece', calories: 160, protein_g: 2.5, carbs_g: 22.0, fat_g: 7.0 },
    { id: 'ice_cream', name: 'Vanilla Ice Cream', emoji: '🍦', category: 'Dessert', serving: '1 scoop (80g)', calories: 140, protein_g: 2.5, carbs_g: 17.0, fat_g: 7.0 },
    { id: 'payasam', name: 'Payasam', emoji: '🍮', category: 'Dessert', serving: '1 bowl', calories: 215, protein_g: 4.5, carbs_g: 36.0, fat_g: 6.0 },
    { id: 'malpua', name: 'Malpua', emoji: '🥞', category: 'Dessert', serving: '1 piece', calories: 170, protein_g: 3.0, carbs_g: 26.0, fat_g: 6.5 },

    // ── Drinks ────────────────────────────────────────────────────────
    { id: 'chai', name: 'Masala Chai', emoji: '☕', category: 'Drink', serving: '1 cup', calories: 55, protein_g: 2.0, carbs_g: 7.5, fat_g: 1.5 },
    { id: 'black_chai', name: 'Black Chai (no milk)', emoji: '🍵', category: 'Drink', serving: '1 cup', calories: 5, protein_g: 0.2, carbs_g: 1.0, fat_g: 0.0 },
    { id: 'filter_coffee', name: 'Filter Coffee', emoji: '☕', category: 'Drink', serving: '1 cup', calories: 60, protein_g: 2.2, carbs_g: 7.5, fat_g: 2.5 },
    { id: 'lassi_sweet', name: 'Sweet Lassi', emoji: '🥛', category: 'Drink', serving: '1 glass', calories: 210, protein_g: 6.5, carbs_g: 32.0, fat_g: 5.5 },
    { id: 'lassi_plain', name: 'Plain Lassi', emoji: '🥛', category: 'Drink', serving: '1 glass', calories: 130, protein_g: 6.0, carbs_g: 12.0, fat_g: 5.5 },
    { id: 'buttermilk', name: 'Buttermilk / Chaas', emoji: '🥛', category: 'Drink', serving: '1 glass', calories: 50, protein_g: 3.2, carbs_g: 5.0, fat_g: 1.0 },
    { id: 'mango_lassi', name: 'Mango Lassi', emoji: '🥭', category: 'Drink', serving: '1 glass', calories: 240, protein_g: 6.0, carbs_g: 40.0, fat_g: 5.0 },
    { id: 'aam_panna', name: 'Aam Panna', emoji: '🟡', category: 'Drink', serving: '1 glass', calories: 90, protein_g: 0.5, carbs_g: 22.0, fat_g: 0.2 },
    { id: 'coconut_water', name: 'Coconut Water', emoji: '🥥', category: 'Drink', serving: '1 glass', calories: 45, protein_g: 1.7, carbs_g: 8.5, fat_g: 0.5 },
    { id: 'nimbu_pani', name: 'Nimbu Pani (Lemonade)', emoji: '🍋', category: 'Drink', serving: '1 glass', calories: 60, protein_g: 0.3, carbs_g: 15.0, fat_g: 0.1 },

    // ── Dairy & Protein ───────────────────────────────────────────────
    { id: 'paneer_raw', name: 'Paneer (raw)', emoji: '🧀', category: 'Protein', serving: '50g', calories: 133, protein_g: 9.0, carbs_g: 1.5, fat_g: 10.0 },
    { id: 'curd', name: 'Curd / Dahi', emoji: '🥛', category: 'Dairy', serving: '1 bowl', calories: 98, protein_g: 5.5, carbs_g: 8.0, fat_g: 4.5 },
    { id: 'milk', name: 'Full-fat Milk', emoji: '🥛', category: 'Dairy', serving: '1 glass (200ml)', calories: 122, protein_g: 6.4, carbs_g: 9.6, fat_g: 6.4 },
    { id: 'skimmed_milk', name: 'Skimmed Milk', emoji: '🥛', category: 'Dairy', serving: '1 glass (200ml)', calories: 66, protein_g: 6.5, carbs_g: 9.5, fat_g: 0.4 },
    { id: 'protein_shake', name: 'Whey Protein Shake', emoji: '💪', category: 'Protein', serving: '1 scoop (30g)', calories: 120, protein_g: 25.0, carbs_g: 3.0, fat_g: 1.5 },
    { id: 'boiled_chicken', name: 'Boiled Chicken Breast', emoji: '🍗', category: 'Protein', serving: '100g', calories: 165, protein_g: 31.0, carbs_g: 0.0, fat_g: 3.6 },
    { id: 'tuna', name: 'Tuna (canned)', emoji: '🐟', category: 'Protein', serving: '100g', calories: 132, protein_g: 28.0, carbs_g: 0.0, fat_g: 1.0 },
    { id: 'sprouts', name: 'Mixed Sprouts', emoji: '🌱', category: 'Protein', serving: '1 bowl', calories: 75, protein_g: 6.0, carbs_g: 10.0, fat_g: 0.8 },

    // ── Fruits ────────────────────────────────────────────────────────
    { id: 'banana', name: 'Banana', emoji: '🍌', category: 'Fruit', serving: '1 medium', calories: 89, protein_g: 1.1, carbs_g: 23.0, fat_g: 0.3 },
    { id: 'mango', name: 'Mango', emoji: '🥭', category: 'Fruit', serving: '1 cup (165g)', calories: 99, protein_g: 1.4, carbs_g: 25.0, fat_g: 0.6 },
    { id: 'apple', name: 'Apple', emoji: '🍎', category: 'Fruit', serving: '1 medium', calories: 95, protein_g: 0.5, carbs_g: 25.0, fat_g: 0.3 },
    { id: 'guava', name: 'Guava', emoji: '🍐', category: 'Fruit', serving: '1 medium', calories: 68, protein_g: 2.6, carbs_g: 14.0, fat_g: 1.0 },
    { id: 'papaya', name: 'Papaya', emoji: '🧡', category: 'Fruit', serving: '1 cup (140g)', calories: 55, protein_g: 0.9, carbs_g: 14.0, fat_g: 0.2 },
    { id: 'watermelon', name: 'Watermelon', emoji: '🍉', category: 'Fruit', serving: '1 slice (200g)', calories: 60, protein_g: 1.2, carbs_g: 15.0, fat_g: 0.2 },
    { id: 'orange', name: 'Orange', emoji: '🍊', category: 'Fruit', serving: '1 medium', calories: 62, protein_g: 1.2, carbs_g: 15.0, fat_g: 0.2 },
    { id: 'grapes', name: 'Grapes', emoji: '🍇', category: 'Fruit', serving: '1 cup (100g)', calories: 69, protein_g: 0.7, carbs_g: 18.0, fat_g: 0.2 },
]
