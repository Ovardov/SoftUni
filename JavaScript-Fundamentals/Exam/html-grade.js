function calculateGrade(examPoints, homeworkCompleted, totalHomework) {
    examPoints = Number(examPoints);
    homeworkCompleted = Number(homeworkCompleted);
    totalHomework = Number(totalHomework);

    let grade = 0;
    let totalStudentPoints = 0;

    if (examPoints === 400) {
        grade = 6;

        console.log(grade.toFixed(2));
        return;

    } else if (examPoints >= 0 && examPoints < 400) {
        totalStudentPoints += examPoints / 400 * 90;

        let pointsFromHomework = homeworkCompleted / totalHomework * 10;
        totalStudentPoints += pointsFromHomework;


        if (totalStudentPoints >= 0 && totalStudentPoints <= 100) {

            grade = 3 + 2 * (totalStudentPoints - (100 / 5)) / (100 / 2);
            if (examPoints < 400 && grade > 6) {
                grade = 6;
            }

            if (grade < 3) {
                grade = 2;
            }

            if (grade >= 2 && grade <= 6) {
                console.log(grade.toFixed(2));
            }
        }
    }
}

calculateGrade(380, 10, 10);