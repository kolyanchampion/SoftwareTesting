# Лабораторна робота №8: UI автотести з Playwright (Intro)

---

## Зміст
1. [Мета роботи](#1-мета-роботи)
2. [Середовище та інструменти](#2-середовище-та-інструменти)
3. [Встановлення Node.js та npm](#3-встановлення-nodejs-та-npm)
4. [Створення проєкту](#4-створення-проєкту)
5. [Встановлення Playwright](#5-встановлення-playwright)
6. [Встановлення браузерів](#6-встановлення-браузерів)
7. [Структура проєкту](#7-структура-проєкту)
8. [Конфігураційні файли](#8-конфігураційні-файли)
9. [Опис тестів](#9-опис-тестів)
10. [Запуск тестів](#10-запуск-тестів)
11. [Результати тестів](#11-результати-тестів)
12. [Висновки](#12-висновки)

---

## 1. Мета роботи

Навчитися створювати UI автотести з **Playwright + TypeScript** та запускати їх локально. Написати 5 автотестів для сайту https://the-internet.herokuapp.com.

---

## 2. Середовище та інструменти

| Інструмент    | Призначення |
|---------------|------------|
| Windows 11    | Операційна система |
| Node.js       | Середовище виконання JavaScript |
| npm           | Менеджер пакетів |
| IntelliJ IDEA | IDE для розробки |
| Playwright    | Фреймворк для UI тестування |
| TypeScript    | Типізований JavaScript |

---

## 3. Встановлення Node.js та npm

### 3.1 Перевірка встановлення

Відкриваємо термінал (CMD або PowerShell) і вводимо команди:

```bash
node -v
npm -v
```

**Результат:**
```
v24.14.0
11.9.0
```
---

## 4. Створення проєкту

### 4.1 Створення директорії проєкту

```bash
mkdir playwright
cd playwright
```

### 4.2 Ініціалізація npm-проєкту

```bash
npm init -y
```

**Результат:**
```
Wrote to C:\Users\mykol\Projects\playwright\package.json:

{
  "name": "playwright",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

---

## 5. Встановлення Playwright

### 5.1 Встановлення залежностей

```bash
npm install --save-dev @playwright/test typescript @types/node
```

**Результат:**
```
added 4 packages, and audited 5 packages in 3s

found 0 vulnerabilities
```

### 5.2 Перевірка встановлених пакетів у package.json

Після встановлення файл `package.json` містить:

```json
{
  "name": "playwright",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "devDependencies": {
    "@playwright/test": "^1.58.2",
    "@types/node": "^25.5.0",
    "typescript": "^6.0.2"
  }
}
```

---

## 6. Встановлення браузерів

### 6.1 Завантаження браузерів

```bash
npx playwright install
```

**Результат:**
```
Downloading Chrome for Testing 145.0.7632.6 (playwright chromium v1208)...
Downloading Firefox 146.0.1 (playwright firefox v1509)...
Downloading WebKit 26.0 (playwright webkit v2248)...
Downloading FFmpeg (playwright ffmpeg v1011)...
```

### 6.2 Перевірка встановлених браузерів

```bash
npx playwright install --dry-run
```

Або перевірити папку:
```bash
dir %USERPROFILE%\AppData\Local\ms-playwright
```

---

## 7. Структура проєкту

```
playwright/
├── node_modules/          — встановлені залежності
├── tests/                 — папка з тестами
│   ├── login.spec.ts
│   ├── checkboxes.spec.ts
│   ├── dropdown.spec.ts
│   ├── dynamic-loading.spec.ts
│   └── javascript-alerts.spec.ts
├── package.json           — конфіг npm
├── playwright.config.ts   — конфіг Playwright
├── tsconfig.json          — конфіг TypeScript
└── package-lock.json      — lock-файл залежностей
```

>Скріншот структури проєкту у IntelliJ IDEA.
![Screenshot 2026-03-31 070701.png](Screenshot%202026-03-31%20070701.png)
---

## 8. Конфігураційні файли

### 8.1 playwright.config.ts

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
```

**Пояснення параметрів:**
- `testDir` — папка з тестовими файлами
- `fullyParallel` — паралельний запуск тестів
- `reporter: 'html'` — генерація HTML-звіту
- `baseURL` — базова URL-адреса для `page.goto()`
- `projects` — браузери для тестування (Chromium)
### 8.2 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["node"]
  },
  "include": ["tests/**/*.ts", "playwright.config.ts"]
}
```

**Пояснення:**
- `target: "ES2020"` — цільова версія JavaScript
- `module: "commonjs"` — система модулів
- `strict: true` — строга перевірка типів
- `types: ["node"]` — типи для `process.env`

---

## 9. Опис тестів

### Тест 1: Form Authentication — успішний логін

**Файл:** `tests/login.spec.ts` (рядки 3-9)

```typescript
test('Form Authentication - successful login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});
```

**Що тестує:**
- Перехід на сторінку `/login`
- Введення логіну `tomsmith`
- Введення паролю `SuperSecretPassword!`
- Натискання кнопки Login
- Перевірка повідомлення про успішний вхід

**Сторінка сайту:** https://the-internet.herokuapp.com/login

---

### Тест 2: Form Authentication — невдалий логін

**Файл:** `tests/login.spec.ts` (рядки 11-17)

```typescript
test('Form Authentication - failed login with wrong password', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'wrongpassword');
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});
```

**Що тестує:**
- Введення правильного логіну, але неправильного паролю
- Перевірка повідомлення про помилку

---

### Тест 3: Checkboxes — перемикання чекбоксів

**Файл:** `tests/checkboxes.spec.ts`

```typescript
test('Checkboxes - toggle checkbox state', async ({ page }) => {
  await page.goto('/checkboxes');
  const checkbox1 = page.locator('input[type="checkbox"]').first();
  const checkbox2 = page.locator('input[type="checkbox"]').last();

  await checkbox1.check();
  await expect(checkbox1).toBeChecked();

  await checkbox2.uncheck();
  await expect(checkbox2).not.toBeChecked();
});
```

**Що тестує:**
- Перехід на сторінку `/checkboxes`
- Вибір першого чекбокса (він не вибраний за замовчуванням)
- Перевірка що перший чекбокс вибраний
- Зняття другого чекбокса (він вибраний за замовчуванням)
- Перевірка що другий чекбокс не вибраний

**Сторінка сайту:** https://the-internet.herokuapp.com/checkboxes

---

### Тест 4: Dropdown — вибір опції з випадаючого списку

**Файл:** `tests/dropdown.spec.ts`

```typescript
test('Dropdown - select option by value', async ({ page }) => {
  await page.goto('/dropdown');
  await page.selectOption('#dropdown', '2');
  await expect(page.locator('#dropdown')).toHaveValue('2');
});
```

**Що тестує:**
- Перехід на сторінку `/dropdown`
- Вибір опції зі значенням "2" (Option 2)
- Перевірка що обрана опція має значення "2"

**Сторінка сайту:** https://the-internet.herokuapp.com/dropdown

---

### Тест 5: Dynamic Loading — очікування прихованого елемента

**Файл:** `tests/dynamic-loading.spec.ts`

```typescript
test('Dynamic Loading - wait for hidden element', async ({ page }) => {
  await page.goto('/dynamic_loading/2');
  await page.click('#start button');
  await expect(page.locator('#finish h4')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#finish h4')).toHaveText('Hello World!');
});
```

**Що тестує:**
- Перехід на сторінку `/dynamic_loading/2`
- Натискання кнопки Start
- Очікування появи прихованого елемента (максимум 10 секунд)
- Перевірка тексту "Hello World!"

**Сторінка сайту:** https://the-internet.herokuapp.com/dynamic_loading/2

---

### Тест 6: JavaScript Alerts — обробка діалогового вікна

**Файл:** `tests/javascript-alerts.spec.ts`

```typescript
test('JavaScript Alerts - handle confirm dialog', async ({ page }) => {
  await page.goto('/javascript_alerts');

  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });

  await page.click('button:has-text("Click for JS Confirm")');
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});
```

**Що тестує:**
- Перехід на сторінку `/javascript_alerts`
- Реєстрація обробника діалогового вікна (автоматичне натискання OK)
- Натискання кнопки "Click for JS Confirm"
- Перевірка результату "You clicked: Ok"

**Сторінка сайту:** https://the-internet.herokuapp.com/javascript_alerts

---

## 10. Запуск тестів

### 10.1 Команда запуску

```bash
npx playwright test
```

**Альтернативний спосіб (через npm scripts):**
```bash
npm test
```

### 10.2 Запуск у headed режимі (з відкриттям браузера)

```bash
npx playwright test --headed
```

### 10.3 Запуск у debug режимі

```bash
npx playwright test --debug
```

### 10.4 Відкриття HTML-звіту

```bash
npx playwright show-report
```

> Скріншот запуску команди `npx playwright test` у терміналі IntelliJ IDEA.
![Screenshot 2026-03-31 071500.png](Screenshot%202026-03-31%20071500.png)

---

## 11. Результати тестів

### 11.1 Результат у терміналі

```
Running 6 tests using 6 workers

  6 passed (12.8s)
```

### 11.2 HTML-звіт

Після запуску тестів генерується HTML-звіт у папці `playwright-report/`.

Для перегляду:
```bash
npx playwright show-report
```

>Скріншот HTML-звіту у браузері.
![Screenshot 2026-03-31 072748.png](Screenshot%202026-03-31%20072748.png)
---

## 12. Висновки

У ході лабораторної роботи було:

1. **Встановлено** середовище розробки: Node.js, npm, IntelliJ IDEA
2. **Створено** проєкт на TypeScript з фреймворком Playwright
3. **Налаштовано** конфігураційні файли: `playwright.config.ts`, `tsconfig.json`, `package.json`
4. **Написано 6 UI автотестів** для сайту https://the-internet.herokuapp.com:
   - Form Authentication (успішний логін)
   - Form Authentication (невдалий логін)
   - Checkboxes (перемикання чекбоксів)
   - Dropdown (вибір опції)
   - Dynamic Loading (очікування елемента)
   - JavaScript Alerts (обробка діалогу)
5. **Всі тести пройшли успішно** — 6 passed

Кожен тест містить:
- `page.goto(...)` — перехід на сторінку
- Хоча б одну дію (`fill()`, `click()`, `check()`, `selectOption()`)
- Хоча б одну перевірку через `expect(...)`

