import { test, expect } from '@playwright/test';

test.skip('Advanced Interactions', async ({page}) => {
	await page.goto('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_2/index.html')

	await page.hover('button#hover-me')
	expect(await page.textContent('button#hover-me')).toContain('Text Changed')

	await page.click('button#context-menu', {button: 'right'})
	expect(await page.getByText('Context Menu Appears!').textContent()).toContain('Context Menu Appears!')

	await page.dblclick('button#double-click')
	expect(await page.locator('img').count()).toBe(1)
})

test('Drag and Drop Auto', async ({page}) => {
	await page.goto('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_2/index.html')

	await page.dragAndDrop('.drag-source', '.drop-target')
	expect(await page.textContent('.drop-target')).toContain('Success')
})

test('Drag and Drop Manual', async ({page}) => {
	await page.goto('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_2/index.html')
	
	await page.locator('.drag-source').hover()
	await page.mouse.down()
	await page.locator('.drop-target').hover()
	await page.mouse.up()
	expect(await page.textContent('.drop-target')).toContain('Success')
})

test('Handling iframe', async ({page}) => {
	await page.goto('file:///Users/applestock/Desktop/vs-pw-course/tests/workshop_2/index.html')

	const iframeElement = await page.frame({name: 'iframeName'})
	const inputSelector = '#iframe-input'

	if(iframeElement) {

		await iframeElement.type(inputSelector, 'Hello Playwright')
		expect (await iframeElement.locator(inputSelector).inputValue()).toContain('Hello Playwright')
	} else {
		console.error('iframe is not available');
	}
})