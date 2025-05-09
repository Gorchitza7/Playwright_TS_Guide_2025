import {test} from '@playwright/test'

test.skip('Basic Navigation', async({page}) => {
	await page.goto('https://gitlab.com/')
	await page.waitForTimeout(3000)
	await page.reload()
})

test.skip('Interacting with Web Element on Gitlab', async({page}) => {
	await page.goto('https://gitlab.com/')
  await page.locator('#be-navigation-desktop').getByRole('link', {name: 'Get free trial'}).click();

	// await page.locator('[data-testid="new-user-first-name-field"]').fill('Andrii')
	// await page.locator('[data-testid="new-user-first-name-field"]').fill('Maslov')

	await page.getByTestId('new-user-first-name-field').fill('John')
	await page.getByTestId('new-user-last-name-field').fill('Snow')
})

test.skip('Using Various Locator Method', async ({ page }) => {
	await page.goto('https://gitlab.com/');

	// Клик по ссылке "Sign in"
	await page.click('a:has-text("Sign in")');

	// Функция обхода капчи
	async function trySolveCloudflareCaptcha(page) {
		for (let i = 0; i < 15; i++) {
			await page.waitForTimeout(1000);

			for (const frame of page.frames()) {
				if (frame.url().startsWith('https://challenges.cloudflare.com')) {
					const frameElement = await frame.frameElement();
					const box = await frameElement.boundingBox();

					if (!box) continue;

					const clickX = box.x + box.width / 9;
					const clickY = box.y + box.height / 2;

					await page.mouse.click(clickX, clickY);
					return true; // Клик по капче выполнен
				}
			}
		}

		return false; // Капча не найдена
	}

	// ВЫЗОВ ФУНКЦИИ
	const result = await trySolveCloudflareCaptcha(page);

	if (result) {
		console.log('✅ Капча пройдена!');
	} else {
		console.log('❌ Капча не найдена или не пройдена');
	}
});

// Other examples
test.skip('Locator Methods', async ({page})=>{
	//locator
	const submitButton = await page.locator('[role="input"]')
	await submitButton.fill('value')
	
	//getByText
	const learnMoreLink = await page.getByText('a:has-text("Learn More")');

	// //getByTitle
	const title = await page.getByTitle('[title="mr"]')
})