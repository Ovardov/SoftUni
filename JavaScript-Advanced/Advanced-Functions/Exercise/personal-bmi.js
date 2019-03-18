function composeChart(name, age, weightInKg, heightInCm) {

    const calculateBMI = (weightInKg, heightInM) => {
        return Math.round(weightInKg / (heightInM ** 2));
    };

    const generateStatus = (bmi) => {
        if (bmi < 18.5) {
            return 'underweight';
        } else if (bmi < 25) {
            return 'normal';
        } else if (bmi < 30) {
            return 'overweight';
        } else {
            return 'obese';
        }
    };


    const bmi = calculateBMI(weightInKg, heightInCm / 100);
    const status = generateStatus(bmi);

    const chart = {
        name: name,
        personalInfo: {
            age: age,
            weight: weightInKg,
            height: heightInCm
        },
        BMI: bmi,
        status: status
    };

    if (chart.status === 'obese') {
        chart.recommendation = 'admission required'
    }

    return chart;
}

console.log(composeChart('Honey Boo Boo', 9, 57, 137));