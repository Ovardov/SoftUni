function calculateDailyCalories(arr, weeklyActivity) {
    let [gender, weight, height, age] = arr;
    
    let calories = 0;
    let activeFactor = 0;
    let dailyCalories = 0;

    if (gender === 'm') {
        calories = 66 + 13.8 * weight + 5 * height - 6.8 * age;
    } else if (gender === 'f') {
        calories = 655 + 9.7 * weight + 1.85 * height - 4.7 * age;
    }

    if (weeklyActivity === 0) {
        activeFactor = 1.2;
    } else if (weeklyActivity >= 1 && weeklyActivity <= 2) {
        activeFactor = 1.375;
    } else if (weeklyActivity >= 3 && weeklyActivity <= 5) {
        activeFactor = 1.55;
    } else if (weeklyActivity >= 6 && weeklyActivity <= 7) {
        activeFactor = 1.725;
    } else if (weeklyActivity > 7) {
        activeFactor = 1.9;
    }

    dailyCalories = Math.round(calories * activeFactor);
    console.log(dailyCalories);
}

calculateDailyCalories(['f', 46, 157, 32], 5);