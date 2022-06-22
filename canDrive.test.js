const  {validateFields, getBlockDay, getLastDigit, getBlockTime, isPermittedDrive}  = require ('./canDriveValidations');

test('Invalid time', () =>{
    expect(validateFields('PDI-3528','02/02/2019', '21m00')).toBe(false);
});

test('Invalid plate number', () =>{
    expect(validateFields('FJDKSADF','12/09/2019', '15:00')).toBe(false);
});

test('Invalid date', () =>{
    expect(validateFields('PDI-3528','21/21/2019', '15:00')).toBe(false);
});

test('Valid fields', () =>{
    expect(validateFields('PDI-3528','02/02/2019', '13:00')).toBe(true);
});

test('Restriction day for last digit plate 5 is 3', () =>{
    expect(getLastDigit('PDT-3528')).toBe(8);
});

test('Restriction day for last digit plate 5 is 3', () =>{
    expect(getBlockDay(5)).toBe(3);
});


test('For time 8:27 it should return true (restricted time)', () =>{
    expect(getBlockTime(8,27)).toBe(true);
});

test('For time 14:51 it should return false (not restricted time)', () =>{
    expect(getBlockTime(14,51)).toBe(false);
});

test('Can drive test', () =>{
    expect(isPermittedDrive('PDI-3515','22/06/2022', '10:00')).toBe(true);
});

test('can not drive test', () =>{
    expect(isPermittedDrive('PDI-3515','22/06/2022', '08:25')).toBe(false);
});




