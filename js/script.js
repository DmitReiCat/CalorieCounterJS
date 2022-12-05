import { getResultCalories, activityLevel, state} from "./viewmodel.js";
import { isNotBlank} from "./utils.js";


const activityInput = document.querySelector('.radios-group')
const genderMaleInput = document.querySelector('#gender-male')

const inputsGroup = document.querySelector('.inputs-group')
const ageField =  inputsGroup.querySelector('#age');
const heightField = inputsGroup.querySelector('#height');
const weightField = inputsGroup.querySelector('#weight');

const form = document.querySelector('.form');
const bnReset = form.querySelector('.form__reset-button');
const bnSubmit = form.querySelector('.form__submit-button');

const resultBlock = document.querySelector('.counter__result');
const caloriesNorm = resultBlock.querySelector('#calories-norm');
const caloriesMinimal = resultBlock.querySelector('#calories-minimal');
const caloriesMaximal = resultBlock.querySelector('#calories-maximal');

inputsGroup.addEventListener('input', () => {
    bnSubmit.disabled = !(isNotBlank(ageField.value) && isNotBlank(heightField.value) && isNotBlank(weightField.value));
    bnReset.disabled = !(isNotBlank(ageField.value) || isNotBlank(heightField.value) || isNotBlank(weightField.value))
});

activityInput.addEventListener('change', (evt) => {
    switch (evt.target.id) {
        case 'activity-minimal':
            state.activity = activityLevel.min;
            break;
        case 'activity-low':
            state.activity = activityLevel.low;
            break;
        case 'activity-medium':
            state.activity = activityLevel.medium;
            break;
        case 'activity-high':
            state.activity = activityLevel.high;
            break;
        case 'activity-maximal':
            state.activity = activityLevel.max;
            break;
    }
});

bnSubmit.addEventListener('click', (evt) => {
    evt.preventDefault();
    state.isMale = genderMaleInput.checked;
    state.age = ageField.value;
    state.height = heightField.value;
    state.weight = weightField.value;

    resultBlock.classList.remove('counter__result--hidden');
    const resultCalories = getResultCalories(state)
    caloriesNorm.textContent = String(resultCalories.norm);
    caloriesMinimal.textContent = String(resultCalories.loose);
    caloriesMaximal.textContent = String(resultCalories.gain);
});

form.addEventListener('reset', () => {
    state.activity = activityLevel.min;
    resultBlock.classList.add('counter__result--hidden');
    bnSubmit.disabled = true;
    bnReset.disabled = true;
});
