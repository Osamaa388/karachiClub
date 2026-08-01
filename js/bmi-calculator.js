// Karachi Club GYM — BMI Calculator Logic

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('bmiForm');
    const heightInput = document.getElementById('bmiHeight');
    const weightInput = document.getElementById('bmiWeight');

    const resultBox = document.getElementById('bmiResult');
    const bmiValueEl = document.getElementById('bmiValue');
    const bmiCategoryEl = document.getElementById('bmiCategory');
    const bmiAdviceEl = document.getElementById('bmiAdvice');
    const errorEl = document.getElementById('bmiError');

    const tableRows = document.querySelectorAll('#bmiChartBody tr');

    if (!form) return;

    function getCategory(bmi) {
        if (bmi < 18.5) {
            return {
                key: 'underweight',
                label: 'Underweight',
                advice: 'Consider a structured strength program with a calorie surplus to build healthy weight.'
            };
        }
        if (bmi < 25) {
            return {
                key: 'healthy',
                label: 'Healthy',
                advice: "You're in a healthy range. Keep training consistently to maintain it."
            };
        }
        if (bmi < 30) {
            return {
                key: 'overweight',
                label: 'Overweight',
                advice: 'A combined strength and fat-burn program can help bring this down safely.'
            };
        }
        return {
            key: 'obese',
            label: 'Obese',
            advice: 'A structured, trainer-guided plan is recommended. Talk to our team to get started safely.'
        };
    }

    function highlightRow(key) {
        tableRows.forEach((row) => {
            if (row.dataset.range === key) {
                row.classList.add('bmi-row-active');
            } else {
                row.classList.remove('bmi-row-active');
            }
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const heightCm = parseFloat(heightInput.value);
        const weightKg = parseFloat(weightInput.value);

        const isValid =
            !isNaN(heightCm) && !isNaN(weightKg) &&
            heightCm > 0 && weightKg > 0;

        if (!isValid) {
            errorEl.classList.add('show');
            resultBox.classList.remove('show');
            return;
        }

        errorEl.classList.remove('show');

        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        const rounded = Math.round(bmi * 10) / 10;

        const category = getCategory(rounded);

        bmiValueEl.textContent = rounded.toFixed(1);
        bmiCategoryEl.textContent = category.label;
        bmiAdviceEl.textContent = category.advice;

        // Reset status color classes, then apply the matching one
        bmiCategoryEl.className = '';
        bmiCategoryEl.classList.add('bmi-status-' + category.key);

        resultBox.classList.add('show');
        highlightRow(category.key);

        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

});