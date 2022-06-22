var moment = require('moment');
const { isPermittedDrive } = require('./canDriveValidations');



//validatePlateNumber('PDI-3528','12/09/2019', '15:00')
module.exports= function checkAllowDrive(plateNumber, date, time) {
    moment().weekday(0)
    try {
        if (isPermittedDrive(plateNumber, date, time)) {
            return "You can drive"    
        }
        else{
            return "You can't drive"
        }    
    } catch (e) {
        console.error(e.error);
    }
}

