import { test, expect } from '@playwright/test'
import { PageObject } from './page/Page'
import * as testData from './testData.json'

test.describe('Simple test', () => {
	let pageObject: PageObject

	test.beforeEach(async ({ browser }) => {
		const page = await browser.newPage()
		pageObject = new PageObject(page)
		await pageObject.open('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_7/index.html')
	})

	// Object.values() нужен, если testData — это объект с ключами
	for (const data of Object.values(testData)) {
		if (
			data.testName === 'Test 1 - Fill Input' ||
			data.testName === 'Test 1 - Negative test'
		) {
			test.skip(data.testName, async () => {
				await pageObject.fillFirstName(data.firstName)
				await pageObject.fillAge(data.age)
				if (data.isStudent) {
					await pageObject.checkIsStudent()
				}
				await pageObject.applyData()

				expect(await pageObject.text(pageObject.displayFirstName)).toBe(data.expectedFirstName)
				expect(await pageObject.text(pageObject.displayAge)).toBe(data.expectedAge)
				console.log(data.expectedIsStudent);
				expect(await pageObject.text(pageObject.displayIsStudent)).toBe(data.expectedIsStudent)
			})
		}
	}
})
