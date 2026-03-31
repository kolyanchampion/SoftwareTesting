# Лабораторна робота №9: Тестування кошика в SauceDemo (Playwright + POM)

---

## Зміст
1. [Мета роботи](#1-мета-роботи)
2. [Середовище та інструменти](#2-середовище-та-інструменти)
3. [Клонування проєкту](#3-клонування-проєкту)
4. [Встановлення залежностей](#4-встановлення-залежностей)
5. [Структура проєкту](#5-структура-проєкту)
6. [Розширення POM](#6-розширення-pom)
7. [Опис тестів](#7-опис-тестів)
8. [Запуск тестів](#8-запуск-тестів)
9. [Результати тестів](#9-результати-тестів)
10. [Висновки](#10-висновки)

---

## 1. Мета роботи

Продовжити існуючий Playwright-проєкт і написати набір E2E автотестів для функціоналу **кошика (Cart)** на сайті **SauceDemo** з використанням:
- Page Object Model (POM)
- storageState для логіну (логін 1 раз, без повторів у кожному тесті)
- стабільні селектори (data-test)

**Сайт для тестування:** https://www.saucedemo.com

---

## 2. Середовище та інструменти

| Інструмент    | Призначення |
|---------------|------------|
| Windows 11    | Операційна система |
| Node.js v24.14.0 | Середовище виконання JavaScript |
| npm 11.9.0    | Менеджер пакетів |
| IntelliJ IDEA | IDE для розробки |
| Playwright ^1.58.2 | Фреймворк для UI тестування |
| TypeScript    | Типізований JavaScript |
| Git 2.52.0    | Система контролю версій |

---

## 3. Клонування проєкту

Проєкт базується на існуючому репозиторії:

```bash
git clone https://github.com/this4you/playwright-saucedemo.git
cd playwright-saucedemo
```

---

## 4. Встановлення залежностей

```bash
npm ci
```

**Результат:**
```
added 5 packages, and audited 6 packages in 1s
found 0 vulnerabilities
```

---

## 5. Структура проєкту

```
playwright-saucedemo-main/
├── src/
│   ├── fixtures/
│   │   └── baseTest.ts          — фікстури (loginPage, inventoryPage, cartPage)
│   └── pages/
│       ├── BasePage.ts          — базовий Page Object
│       ├── LoginPage.ts         — сторінка логіну
│       ├── InventoryPage.ts     — сторінка каталогу (розширена)
│       ├── CartPage.ts          — сторінка кошика (НОВИЙ)
│       └── components/
│           └── Header.ts        — компонент шапки (розширений)
├── tests/
│   ├── setup/
│   │   └── auth.setup.ts        — збереження storageState
│   ├── auth/                    — тести логіну
│   ├── inventory/               — тести каталогу
│   ├── cart/
│   │   └── cart.spec.ts         — тести кошика (НОВИЙ)
│   └── network/                 — тести мережі
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## 6. Розширення POM

### 6.1 CartPage.ts (НОВИЙ)

**Файл:** `src/pages/CartPage.ts`

```typescript
import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    override readonly url: string = "/cart.html";

    readonly container: Locator;
    readonly title: Locator;
    readonly items: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.container = page.locator('[data-test="cart-contents-container"]');
        this.title = page.locator('[data-test="title"]');
        this.items = page.locator('[data-test="inventory-item"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    itemByName(name: string): Locator {
        return this.items
            .filter({ has: this.page.locator('[data-test="inventory-item-name"]', { hasText: name }) })
            .first();
    }

    async expectOpened(): Promise<void> {
        await expect(this.page).toHaveURL(/.*\/cart\.html$/);
        await expect(this.container).toBeVisible();
        await expect(this.title).toHaveText("Your Cart");
    }

    async expectItemVisible(name: string): Promise<void> {
        await expect(this.itemByName(name)).toBeVisible();
    }

    async expectItemCount(count: number): Promise<void> {
        await expect(this.items).toHaveCount(count);
    }

    async removeItem(name: string): Promise<void> {
        const item = this.itemByName(name);
        await item.locator('[data-test^="remove-"]').click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
```

### 6.2 Оновлений Header.ts

Додано методи: `openCart()`, `expectCartBadge(count)`, `expectCartBadgeVisible()`, `expectCartBadgeHidden()`

```typescript
async openCart(): Promise<void> {
    await this.cartLink.click();
}

async expectCartBadge(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
}
```

### 6.3 Оновлений InventoryPage.ts

Додано методи: `addItem(name)`, `removeItem(name)`, `expectCartBadge(count)`, `expectCartBadgeHidden()`, `openCart()`

```typescript
async addItem(name: string): Promise<void> {
    const item = this.itemByName(name);
    const addButton = item.locator('[data-test^="add-to-cart-"]');
    await addButton.click();
}

async removeItem(name: string): Promise<void> {
    const item = this.itemByName(name);
    const removeButton = item.locator('[data-test^="remove-"]');
    await removeButton.click();
}
```

### 6.4 Оновлений baseTest.ts (fixtures)

Додано фікстуру `cartPage`:

```typescript
cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
},
```

---

## 7. Опис тестів

### Тест 1: Add one item → badge = 1 → item in cart

```typescript
test("add one item → badge = 1 → item in cart", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItem("Sauce Labs Backpack");
    await inventoryPage.expectCartBadge(1);

    await inventoryPage.openCart();
    await cartPage.expectOpened();
    await cartPage.expectItemVisible("Sauce Labs Backpack");
    await cartPage.expectItemCount(1);
});
```

**Що тестує:** Додавання одного товару, перевірка бейджа, перевірка наявності у кошику.

### Тест 2: Add two items → badge = 2 → both in cart

```typescript
test("add two items → badge = 2 → both in cart", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItem("Sauce Labs Backpack");
    await inventoryPage.addItem("Sauce Labs Bike Light");
    await inventoryPage.expectCartBadge(2);

    await inventoryPage.openCart();
    await cartPage.expectOpened();
    await cartPage.expectItemVisible("Sauce Labs Backpack");
    await cartPage.expectItemVisible("Sauce Labs Bike Light");
    await cartPage.expectItemCount(2);
});
```

**Що тестує:** Додавання двох товарів, перевірка бейджа = 2, обидва у кошику.

### Тест 3: Remove item from Inventory → badge updates

```typescript
test("remove item from Inventory → badge updates", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItem("Sauce Labs Backpack");
    await inventoryPage.addItem("Sauce Labs Bike Light");
    await inventoryPage.expectCartBadge(2);

    await inventoryPage.removeItem("Sauce Labs Backpack");
    await inventoryPage.expectCartBadge(1);

    await inventoryPage.openCart();
    await cartPage.expectItemCount(1);
    await cartPage.expectItemVisible("Sauce Labs Bike Light");
});
```

**Що тестує:** Видалення товару на сторінці каталогу, оновлення бейджа.

### Тест 4: Remove item from Cart → badge updates

```typescript
test("remove item from Cart → badge updates", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItem("Sauce Labs Backpack");
    await inventoryPage.addItem("Sauce Labs Bike Light");
    await inventoryPage.expectCartBadge(2);

    await inventoryPage.openCart();
    await cartPage.expectOpened();
    await cartPage.removeItem("Sauce Labs Backpack");
    await cartPage.expectItemCount(1);
    await cartPage.expectItemVisible("Sauce Labs Bike Light");
});
```

**Що тестує:** Видалення товару безпосередньо у кошику, оновлення бейджа.

### Тест 5: Continue Shopping returns to Inventory

```typescript
test("continue Shopping returns to Inventory", async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addItem("Sauce Labs Backpack");
    await inventoryPage.openCart();
    await cartPage.expectOpened();

    await cartPage.continueShopping();
    await inventoryPage.expectOpened();
    await inventoryPage.expectCartBadge(1);
});
```

**Що тестує:** Натискання "Continue Shopping" повертає на каталог, бейдж зберігається.

### Тест 6 (⭐): Button changes from Add to cart to Remove

```typescript
test("button changes from Add to cart to Remove after adding", async ({ inventoryPage }) => {
    const item = inventoryPage.itemByName("Sauce Labs Backpack");
    const addButton = item.locator('[data-test^="add-to-cart-"]');
    await addButton.click();

    const removeButton = item.locator('[data-test^="remove-"]');
    await removeButton.isVisible();
});
```

**Що тестує:** Після додавання товару кнопка змінюється з "Add to cart" на "Remove".

### Тест 7 (⭐): Badge disappears after removing last item

```typescript
test("badge disappears after removing last item from cart", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItem("Sauce Labs Backpack");
    await inventoryPage.expectCartBadge(1);

    await inventoryPage.openCart();
    await cartPage.removeItem("Sauce Labs Backpack");
    await inventoryPage.expectCartBadgeHidden();
});
```

**Що тестує:** Після видалення останнього товару бейдж зникає.

---

## 8. Запуск тестів

### 8.1 Команда запуску

```bash
npx playwright test
```

### 8.2 Оновлення snapshot-ів

```bash
npx playwright test -u
```

### 8.3 HTML-звіт

```bash
npx playwright show-report
```

---

## 9. Результати тестів

```
Running 16 tests using 8 workers

  16 passed (8.8s)
```

Всі 16 тестів пройшли успішно, включаючи:
- 7 нових тестів кошика
- 9 існуючих тестів (auth, inventory, network)

---

## 10. Висновки

У ході лабораторної роботи було:

1. **Клоновано** базовий проєкт з GitHub
2. **Створено** `CartPage.ts` — Page Object для кошика
3. **Розширено** `Header.ts` — додано `openCart()`, `expectCartBadge()`
4. **Розширено** `InventoryPage.ts` — додано `addItem()`, `removeItem()`, `expectCartBadge()`
5. **Оновлено** `baseTest.ts` — додано фікстуру `cartPage`
6. **Написано 7 автотестів** для кошика:
   - Додавання 1 товару
   - Додавання 2 товарів
   - Видалення з каталогу
   - Видалення з кошика
   - Continue Shopping
   - Зміна кнопки Add → Remove (⭐)
   - Зникнення бейджа (⭐)
7. **Всі тести пройшли** — 16 passed

Використано підходи:
- **POM** — логіка у Page Objects, тести чисті
- **storageState** — логін один раз через setup
- **data-test** — стабільні селектори
- **test.describe** з тегом `@cart`
