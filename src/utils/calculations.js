/**
 * FitPanda Fitness Calculations
 * All pure math functions — no side effects.
 */

/**
 * Mifflin-St Jeor BMR formula
 * @param {number} weight_kg
 * @param {number} height_cm
 * @param {number} age
 * @param {'male'|'female'} gender
 * @returns {number} BMR in kcal/day
 */
export function calcBMR(weight_kg, height_cm, age, gender) {
    const base = 10 * weight_kg + 6.25 * height_cm - 5 * age;
    return gender === 'female' ? base - 161 : base + 5;
}

const ACTIVITY_MULTIPLIERS = {
    sedentary: 1.2,    // little or no exercise
    light: 1.375,  // 1-3 days/week
    moderate: 1.55,   // 3-5 days/week
    active: 1.725,  // 6-7 days/week
    very_active: 1.9,    // hard exercise + physical job
};

/**
 * Total Daily Energy Expenditure
 * @param {number} bmr
 * @param {string} activityLevel
 * @returns {number} TDEE in kcal/day
 */
export function calcTDEE(bmr, activityLevel) {
    const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.55;
    return bmr * multiplier;
}

/**
 * Calculate daily calorie limit and protein target.
 * @param {number} tdee           kcal/day
 * @param {number} currentWeight  kg
 * @param {number} targetWeight   kg
 * @param {string} targetDate     ISO date string (YYYY-MM-DD)
 * @returns {{ dailyCalories: number, dailyProtein: number, dailyDeficit: number, daysUntilGoal: number, weightDelta: number, isGain: boolean }}
 */
export function calcDailyPlan(tdee, currentWeight, targetWeight, targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const goal = new Date(targetDate);
    goal.setHours(0, 0, 0, 0);

    const daysUntilGoal = Math.max(1, Math.round((goal - today) / (1000 * 60 * 60 * 24)));
    const weightDelta = currentWeight - targetWeight;          // positive = cutting, negative = bulking
    const isGain = weightDelta < 0;

    // 1 kg of body fat ≈ 7700 kcal
    const totalCalories = Math.abs(weightDelta) * 7700;
    const dailyDelta = totalCalories / daysUntilGoal;        // deficit (cut) or surplus (gain)

    // Floor cutting at 1200 kcal, cap surplus at TDEE + 500
    const dailyCalories = isGain
        ? Math.min(Math.round(tdee + dailyDelta), Math.round(tdee + 500))
        : Math.max(Math.round(tdee - dailyDelta), 1200);

    // Protein: 2.0 g per kg of current body weight to preserve muscle during cut
    const dailyProtein = Math.round(currentWeight * 2.0);

    return {
        dailyCalories,
        dailyProtein,
        dailyDeficit: Math.round(isGain ? -dailyDelta : dailyDelta),
        daysUntilGoal,
        weightDelta: Math.abs(weightDelta),
        isGain,
    };
}
