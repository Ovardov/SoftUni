function calculatePrice(day, service, time) {
    let price = 0;

    if (service === 'Fitness') {
        if (time >= 8.00 && time <= 15.00) {

            if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday') {
                price = 5;
            } else if (day === 'Saturday' || day === 'Sunday') {
                price = 8;
            }

        } else if (time > 15.00 && time <= 22.00) {

            if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday') {
                price = 7.50;
            } else if (day === 'Saturday' || day === 'Sunday') {
                price = 8;
            }
        }

    } else if (service === 'Sauna') {
        if (time >= 8.00 && time <= 15.00) {

            if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday') {
                price = 4;
            } else if (day === 'Saturday' || day === 'Sunday') {
                price = 7;
            }

        } else if (time > 15.00 && time <= 22.00) {

            if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday') {
                price = 6.50;
            } else if (day === 'Saturday' || day === 'Sunday') {
                price = 7;
            }
        }

    } else if (service === 'Instructor') {
        if (time >= 8.00 && time <= 15.00) {

            if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday') {
                price = 10;
            } else if (day === 'Saturday' || day === 'Sunday') {
                price = 15;
            }

        } else if (time > 15.00 && time <= 22.00) {

            if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday') {
                price = 12.50;
            } else if (day === 'Saturday' || day === 'Sunday') {
                price = 15;
            }
        }
    }

    console.log(price);
}

calculatePrice('Sunday', 'Fitness', 22.00);