import { test, expect } from '@playwright/test'

test.describe('User Registration Tests', () => {

	const registrationTestData = {
		firstName: 'Andrii',
		lastName: 'Maslov',
		address: 'Osvity 6a',
		number: '+389379992',
	}

	test.beforeEach(async ({page}) => {
		await page.goto('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_5/index.html')
	})

	test.skip('Register with valid data', async ({ page }) => {

		await page.fill('#firstName', registrationTestData.firstName)
		await page.fill('#lastName', registrationTestData.lastName)
		await page.fill('#address', registrationTestData.address)
		await page.fill('#number', registrationTestData.number)
		await page.click('#register') //button

		const firstNameText = await page.locator('#displayFirstName').textContent()
		const lastNameText = await page.locator('#displayLastName').textContent()
		const addressText = await page.locator('#displayAddress').textContent()
		const numberText = await page.locator('#displayNumber').textContent()
		// await page.waitForTimeout(3000)

		await expect(firstNameText).toEqual(registrationTestData.firstName)
		await expect(lastNameText).toEqual(registrationTestData.lastName)
		await expect(addressText).toEqual(registrationTestData.address)
		await expect(numberText).toEqual(registrationTestData.number)
	})
	test.skip('Register with empty fields', async ({page}) => {
		await page.fill('#firstName', registrationTestData.firstName)
		await page.fill('#lastName', registrationTestData.lastName)
		await page.click('#register')

		const error = await page.locator('#error p').textContent()
		expect(error).toBe('Please fill in all fields.')

		// Метод trim() - убирает пробелы в тесте из-за которых он падает
		// expect(error?.trim()).toBe('Please fill in all fields.')
	})
	test.skip('Register with all empty fields', async ({ page }) => {
		await page.click('#register')
		const error = await page.locator('#error p').textContent()
		expect(error).toBe('Please fill in all fields.')
	})
})