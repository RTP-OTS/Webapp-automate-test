import { test, expect } from '@playwright/test';
const { queryDatabase } = require('../Utils/databaseUtils');

async function fetchDataFromDatabase(staffname) {
    const staffData = await queryDatabase(staffname); 
    return staffData[0]; 
}

test('Use database for testing', async ({page}) => {
    const userDetails = await fetchDataFromDatabase('Bob');
    console.log(userDetails)

    await page.goto('http://localhost:3000/login');
    await page.pause();
    await page.locator('#username').fill(userDetails.username);
    await page.locator('#password').fill('123456');
    await page.locator('#login-button').click();


    const getNameText = await page.locator('#fname').textContent();
    console.log(`Firstname staff is : ${getNameText}`);
    expect(getNameText).toContain(userDetails.first_name);
});
