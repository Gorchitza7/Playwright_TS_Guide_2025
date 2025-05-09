import {test, expect} from '@playwright/test'

test.skip('Automating Form Submissions @githubAction', async({page}) => {
	await page.goto('https://demo.playwright.dev/todomvc/')

	const newTodo = await page.getByPlaceholder('What needs to be done?')
	await newTodo.fill('Andii Maslov')
	await newTodo.press('Enter')
	await newTodo.fill('Kateryna Muraviova')
	await newTodo.press('Enter')

	const firstTodo = await page.getByTestId('todo-item').nth(0)
	await firstTodo.getByRole('checkbox').check()
	const secondTodo = await page.getByTestId('todo-item').nth(1)
	await expect(firstTodo).toHaveClass('completed')
	await expect(secondTodo).not.toHaveClass('completed')
})

test.skip('Handling Form @githubAction', async({page}) => {
	await page.goto('https://demo.playwright.dev/todomvc/')
	await page.fill('[placeholder="What needs to be done?"]', 'Andrii Maslov')
	await page.locator('[placeholder="What needs to be done?"]').press('Enter')

	const checkbox = await page.locator('.toggle')
	await checkbox.check()
})