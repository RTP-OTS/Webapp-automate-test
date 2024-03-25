const { queryDatabase } = require('../resources/utils/databaseUtils');

async fetchEmployeeFromDatabase(employeeID){
    const testdata = await queryDatabase(employeeID);
    //console.log(testdata);
    return testdata[0];
}