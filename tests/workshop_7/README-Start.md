# Проект автоматизации тестирования с использованием Playwright и Page Object Model (POM)

Этот проект демонстрирует применение паттерна **Page Object Model (POM)** для автоматизации тестирования веб-приложений с использованием библиотеки **Playwright**. Процесс обучения включал в себя создание структуры тестов, взаимодействие с веб-страницей, и интеграцию с **Continuous Integration (CI)**.

## Содержание

1. [Обзор проекта](#Обзор-проекта)
2. [Тестирование с Playwright и POM](#Тестирование-с-Playwright-и-POM)
3. [Интеграция с CI](#Интеграция-с-CI)
4. [Структура проекта](#Структура-проекта)
5. [Тесты и сценарии](#Тесты-и-сценарии)
6. [Запуск тестов](#Запуск-тестов)
7. [Заключение](#Заключение)

## Обзор проекта

Этот проект был создан для обучения и демонстрации использования **Playwright** в сочетании с **Page Object Model (POM)** для создания тестов для веб-приложений. В процессе разработки были реализованы несколько страниц с методами взаимодействия с элементами страницы (кнопки, поля ввода, чекбоксы), а также написаны тесты с использованием данных из внешнего файла.

Основная цель — создать чистую и поддерживаемую архитектуру тестов, применяя принципы POM для упрощения изменений в тестах при изменении UI веб-страницы.

## Тестирование с Playwright и POM

**Playwright** — это библиотека для автоматизации тестов для браузеров, которая поддерживает все современные браузеры, включая Chromium, Firefox и WebKit. Мы использовали Playwright для создания тестов, а также для автоматизации действий, таких как заполнение форм, клики на элементы, проверка состояния элементов на странице и т.д.

**Page Object Model (POM)** — это паттерн проектирования, который используется для разделения логики тестов и логики взаимодействия с веб-страницей. Это позволяет улучшить поддержку тестов, так как изменения в UI веб-страницы будут затрагивать только код страниц, а не все тесты.

### Пример реализации POM:

1. **AbstractPage.ts** — базовый класс для страниц, который инкапсулирует общий функционал для всех страниц.

2. **Button.ts, Input.ts** — классы для работы с элементами страницы, например, кнопками и полями ввода.

3. **Page.ts** — основной класс для взаимодействия с элементами страницы, который использует другие классы (например, для работы с кнопками, полями ввода и чекбоксами).

Пример:

```ts
export class Button {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickButton(selector: string): Promise<void> {
    await this.page.click(selector);
  }
}
```

## Интеграция с CI

В проекте была реализована интеграция с **GitHub Actions** для автоматического запуска тестов при каждом пуше в ветку `main` или `master`.

### Файл конфигурации CI: `.github/workflows/main.yml`

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test --project chromium --grep '@githubAction'
```

### Основные шаги:
1. **Checkout** — загрузка репозитория.
2. **Setup Node.js** — установка Node.js.
3. **Установка зависимостей** — установка всех необходимых пакетов через `npm ci`.
4. **Установка браузеров Playwright** — установка необходимых браузеров для тестирования.
5. **Запуск тестов** — запуск тестов с использованием Playwright.

Этот процесс позволяет запускать тесты автоматически при каждом изменении в репозитории.

## Структура проекта

Проект состоит из следующих папок и файлов:

```
.
├── .github/
│   └── workflows/
│       └── main.yml
├── tests/
│   ├── PageObjectModel/
│   │   ├── index.html
│   │   ├── testData.json
│   │   ├── workshop_7.spec.ts
│   │   ├── workshop_7_DDD.spec.ts
│   │   ├── page/
│   │   │   ├── AbstractPage.ts
│   │   │   ├── Button.ts
│   │   │   ├── Input.ts
│   │   │   └── Page.ts
│   │   └── workshop_8.spec.ts
├── package.json
└── README.md
```

## Тесты и сценарии

В проекте реализованы следующие тестовые сценарии:

1. **Test 1 - Positive test POM** — тестирование формы с правильными данными.
2. **Test 2 - Negative test POM** — тестирование формы с ошибочными данными.
3. **Automating Form Submissions @githubAction** — автоматизация отправки данных через форму.
4. **Handling Form @githubAction** — проверка работы с формой, включая выбор чекбоксов и отправку данных.

### Пример теста:

```ts
test.only('Automating Form Submissions @githubAction', async({page}) => {
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
```

## Запуск тестов

Чтобы запустить тесты локально или в CI, выполните следующие шаги:

1. Установите зависимости:

```bash
npm install
```

2. Запустите тесты:

```bash
npx playwright test
```

3. Для CI/CD настройте **GitHub Actions** с помощью `.github/workflows/main.yml`.

## Заключение

В этом проекте мы научились интегрировать **Playwright** с **CI**, используя **GitHub Actions**, а также применили **Page Object Model** для упрощения структуры тестов. Это помогает создавать устойчивые и поддерживаемые автоматизированные тесты для веб-приложений. Процесс интеграции с CI позволяет автоматизировать выполнение тестов при каждом изменении в коде, что значительно ускоряет процесс разработки и повышения качества ПО.