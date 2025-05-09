import { test, expect } from '@playwright/test'

test.skip('Interact with elements', async({page}) => {
	await page.goto('https://demo.playwright.dev/todomvc/')
	await page.goto('https://demo.playwright.dev/todomvc/')
	// /html/body/section/div/section/ul/li[2]/div/label
	// .todo-list > li:nth-child(2) > div:nth-child(1) > label:nth-child(2)
})

// Screenshot
test.skip('Screenshot', async({page}) => {
	await page.goto('https://demo.playwright.dev/todomvc/')
	await page.screenshot({ path: 'fail.png' })
	await page.goto('https://demo.playwright.dev/todomvc/')
})

test.skip('Flaky', async({page}) => {
	await page.goto('https://demo.playwright.dev/todomvc/')

	// page.on('response', (response) => {
  //   console.log(`Received from :${response.url()}`)    
	// })

	const flaky = Math.random() < 0.5
	if (flaky) {
		await page.waitForTimeout(1000)
		await page.click('.non-existing-selector')
	}
})