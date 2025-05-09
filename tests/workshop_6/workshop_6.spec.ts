import { expect, test } from '@playwright/test'

const selectors = {
	firstName: '#firstName',
	age: '#age',
	student: '#isStudent',
}

test.describe('Variable Declarations and Types', () => {
	test.skip('Declarations and Types', async ({ page }) => {
		
		let firstName: string = 'Andrii'
		let age: number = 30
		let isStudent: boolean = false

		await page.goto('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_6/index.html')

		await page.fill(selectors.firstName, firstName)
		await page.fill(selectors.age, age.toString())
		await page.check('#isStudent')
		await page.click('#applyData')

		expect(await page.textContent('#displayFirstName')).toBe(firstName)
		expect(await page.textContent('#displayAge')).toContain(age.toString())
		expect(await page.isChecked('#isStudent')).toBe(true)
	})
})

test.describe('Type Definitions and Interfeces', () => {

	type User = {
		firstName: string
		age: number
		isStudent: boolean
	}

	let user: User = {
		firstName: 'Andrii',
		age: 25,
		isStudent: true,
	}

	test.skip('Type Def and Interfaces', async ({ page }) => {
		await page.goto('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_6/index.html')

		await page.fill(selectors.firstName, user.firstName)
		await page.fill(selectors.age, user.age.toString())
		await page.click('#applyData')

		expect(await page.textContent('#displayFirstName')).toBe(user.firstName)
		expect(await page.textContent('#displayAge')).toContain(user.age.toString())
		expect(await page.isChecked('#isStudent')).not.toBe(user.isStudent)
	})
})
