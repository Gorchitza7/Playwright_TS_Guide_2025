import { test, expect } from '@playwright/test'
import { PageObject } from './page/Page';

test.describe('Simple test', () => {
	let pageObject: PageObject;

	test.beforeEach(async ({browser}) => {
		const page = await browser.newPage()
		pageObject = new PageObject(page);
		await pageObject.open('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_7/index.html')
	})
	test.skip('Test 1: Fill all inputs', async () => {
		await pageObject.fillFirstName('Andrii')
		await pageObject.fillAge('30')
		await pageObject.checkIsStudent()
		await pageObject.applyData()

		expect(await pageObject.text(pageObject.displayFirstName)).toBe('Andrii')
		expect(await pageObject.text(pageObject.displayAge)).toBe('30')
		expect(await pageObject.text(pageObject.displayIsStudent)).toBe('Yes')
	})
})