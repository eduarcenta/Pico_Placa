var moment = require('moment');

let blockTime = [{ start: "07:00", end: "09:30" }, { start: "16:00", end: "19:30" }];


isPermittedDrive = (plateNumber, date, time) =>{
    moment().weekday(0)
    let permitted = false
    try {
        if (validateFields(plateNumber, date, time)) {
            let lastDigit = getLastDigit(plateNumber);
            let blockDay = getBlockDay(lastDigit)
            
            let newDate = moment(date, "DD/MM/YYYY")
            timeMoment = moment(time, 'HH:mm');
            newDate.set({
                hour: timeMoment.get('hour'),
                minute: timeMoment.get('minute')
            })
            
            let dayNumber = newDate.day()
            if (dayNumber == blockDay){
                let restricted = false
                restricted = getBlockTime(newDate.hour(), newDate.minute())
                if (!restricted) {
                    //console.log("You can drive")
                    permitted = true;
                }
            }
            else{
                //console.log("You can drive")
                permitted = true;
            }
        }
        return permitted;

    } catch (e) {
        console.error(e.error);
    }
}

getBlockTime = (hour, minute) => {
    let restriction = false
    try {
        blockTime.map(time => {
                let startTime = moment(time.start, 'HH:mm');
                let endTime = moment(time.end, 'HH:mm');
                let startHour = startTime.hour()
                let startMinute = startTime.minute()
                let endHour = endTime.hour()
                let endMinute = endTime.minute()
                let hourRestriction = (hour < startHour || hour > endHour) ? false : true
                let minuteRestriction = false
                if (hourRestriction) {
                    if (hour === startHour) {
                        minuteRestriction = (minute >= startMinute) ? true : false
                    } else if (hour === endHour) {
                        minuteRestriction = (minute <= startMinute) ? true : false
                    }
                    else
                        minuteRestriction = true
                }
                if (minuteRestriction && hourRestriction)
                    restriction = true
            })
        return restriction;

    } catch (e) {
        console.error(e.error);
    }
}



getBlockDay = (lastDigit) => {

    try {
        let dayNumber;

        if (lastDigit == 1 || lastDigit == 2)
            dayNumber = 1;
        else if (lastDigit == 3 || lastDigit == 4)
            dayNumber = 2;
        else if (lastDigit == 5 || lastDigit == 6)
            dayNumber = 3;
        else if (lastDigit == 7 || lastDigit == 8)
            dayNumber = 4;
        else if (lastDigit == 9 || lastDigit == 0)
            dayNumber = 5;
        else
            dayNumber = null;
        return dayNumber;

    } catch (e) {
        console.error(e.error);
    }
}

getLastDigit = (plateNumber) => {
    try {
        let lastDigit = parseInt(plateNumber.slice(-1), 10);
        return lastDigit;
    } catch (e) {
        console.error(e.error);
    }
}

validateFields = (plateNumber, date, time) => {
    let timeRegEx = /^([01]\d|2[0-3]):?([0-5]\d)$/
    let plateRegEX = /^[A-Z]{3}-\d{4}$/;

    let validPlate = plateRegEX.test(plateNumber);
    let validDate = moment(date, "DD/MM/YYYY").isValid();

    let validTime = timeRegEx.test(time);
    return validPlate && validDate && validTime;
}
    

module.exports = {validateFields, getBlockDay, getLastDigit, getBlockTime, isPermittedDrive};
