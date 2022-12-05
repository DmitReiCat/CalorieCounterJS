const activityLevel = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.725,
    max: 1.9,
};

const state = {
    isMale: true,
    age: 0,
    height: 0,
    weight: 0,
    activity: activityLevel.min
}

const getCaloriesNorm = () => {
    let caloriesNorm;
    if (state.isMale) {
        caloriesNorm = (10 * state.weight + 6.25 * state.height - 5 * state.age + 5) * state.activity;
    } else {
        caloriesNorm = (10 * state.weight + 6.25 * state.height - 5 * state.age - 161) * state.activity;
    }
    return Math.round(caloriesNorm);
};

const looseWeight = () => {
    return Math.round(getCaloriesNorm(state) * 0.85);
};

const gainWeight = () => {
    return Math.round(getCaloriesNorm(state) * 1.15);
};

const getCalorieValue = (val) => {
    console.log(val)
    let calorie = val.toString().split('');
    calorie.splice(1, 0, ' ');
    calorie = calorie.join('');
    return calorie;
};

const getResultCalories = () => {
    return {
        norm: getCalorieValue(getCaloriesNorm()),
        gain: getCalorieValue(gainWeight()),
        loose: getCalorieValue(looseWeight())
    }
}

export {getResultCalories, activityLevel, state}
