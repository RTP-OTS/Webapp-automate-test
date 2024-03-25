import { test, expect } from '@playwright/test';
const { queryDatabase } = require('../Utils/databaseUtils');
const testData = require('../testdata/testData.json');

async function fetchDataFromDatabase(staffname) {
    const staffData = await queryDatabase(staffname); 
    return staffData[0]; 
}

test.only('Use database for testing', async ({page}) => {
    const staffname = testData.staffName;
    const userDetails = await fetchDataFromDatabase(staffname);
    console.log(userDetails)

    await page.goto('http://localhost:3000/login');
    await page.locator('#username').fill(userDetails.username); // Ensure 'userDetails' includes 'username'
    await page.locator('#password').fill(testData.password); // Assuming 'userDetails' includes 'password'
    await page.locator('#login-button').click();


    const getNameText = await page.locator('#fname').textContent();
    console.log(`${getNameText}`);
    expect(getNameText).toContain(userDetails.first_name);
});
