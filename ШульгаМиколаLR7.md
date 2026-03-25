# ЛАБОРАТОРНА РОБОТА 7

---

**Виконав:** Шульга Микола

**Група:** 491

**2026 р.**

---

# АНОТАЦІЯ

Лабораторна робота присвячена вивченню основ автоматизованого тестування веб-застосунків без написання програмного коду. Практична частина виконана з використанням Docker та Katalon Recorder.

---

# 1. МЕТА РОБОТИ

- Зрозуміти основи автоматизованого тестування
- Побачити життєвий цикл автотесту
- Ознайомитися з інструментом Katalon Recorder

---

# 2. ТЕОРЕТИЧНІ ЗАСАДИ

## 2.1 Автоматизоване тестування

Автоматизоване тестування - це використання спеціальних інструментів для виконання тестів без ручного втручання.

## 2.2 Katalon Recorder

Katalon Recorder - це безкоштовне розширення Chrome для запису та відтворення тестів.

## 2.3 Docker

Docker - інструмент для контейнеризації застосунків.

---

# 3. ПРАКТИЧНА ЧАСТИНА

## 3.1 Частина A: Запуск тестового середовища

### Крок 1: Запуск контейнера

<img width="1775" height="148" alt="image_2026-03-25_00-17-20" src="https://github.com/user-attachments/assets/d57695fe-a30e-4059-acd4-d24da061c536" />


```bash
docker run -d --rm -p 7080:5000 gprestes/the-internet:v2.6.5
```

### Крок 2: Перевірка

Відкрити у браузері: http://localhost:7080

<img width="2880" height="1800" alt="image_2026-03-25_00-21-49" src="https://github.com/user-attachments/assets/76634e48-0057-4bbf-a3f4-b0b04edb7ec1" />


---

## 3.2 Частина B: Katalon Recorder

### Встановлення

1. Відкрити Chrome Web Store
2. Знайти Katalon Recorder
3. Встановити
4. Відкрити через меню розширень

### Створення Test Suite

Створено Test Suite з назвою: SmokeSuite
<img width="1904" height="1658" alt="image_2026-03-25_00-40-42" src="https://github.com/user-attachments/assets/61921d22-109b-4772-a883-31580d3d72a7" />

---

## 3.3 Тест 1: Успішний логін (Positive test)

### Сценарій:

1. Відкрити сторінку Form Authentication
2. Ввести username: tomsmith
3. Ввести password: SuperSecretPassword!
4. Натиснути кнопку Login

<img width="2880" height="1800" alt="image_2026-03-25_00-22-29" src="https://github.com/user-attachments/assets/8a71687e-c7a4-40fb-9b53-9ee8632cc468" />


### Assertions:

- На сторінці присутнє повідомлення: "You logged into a secure area!"
- Присутня кнопка: Logout
- Користувач у secure area

### Скріншот 2: Тест 1 - Успішний логін

<img width="2880" height="1800" alt="image_2026-03-25_00-23-09" src="https://github.com/user-attachments/assets/a02dfad8-f377-4d5b-ba4b-002422a05794" />

*Рис. 2 - Результат проходження Тесту 1 (PASSED)*

---

## 3.4 Тест 2: Невдалий логін (Negative test)

### Сценарій:

1. Відкрити сторінку логіну
2. Ввести username: tomsmith
3. Ввести password: WrongPassword
4. Натиснути кнопку Login

### Assertions:

- З'являється повідомлення про помилку
- Secure area недоступна
- Кнопка Logout відсутня

### Скріншот 3: Тест 2 - Невдалий логін

<img width="2880" height="1736" alt="image_2026-03-25_01-22-16" src="https://github.com/user-attachments/assets/c6ca764e-cc72-461c-b613-00d07ba41bdc" />


*Рис. 3 - Результат проходження Тесту 2 (PASSED)*

---

## 3.5 Тест 3: Add/Remove Elements

### Сценарій:

1. Відкрити сторінку Add/Remove Elements
2. Натиснути Add Element 3 рази
3. Перевірити присутність 3 кнопок Delete
4. Видалити один елемент (натиснути Delete)
5. Перевірити присутність 2 кнопок Delete

### Assertions:

- Кількість кнопок Delete після додавання = 3
- Кількість кнопок Delete після видалення = 2

### Скріншот 4: Тест 3 - Add/Remove Elements

<img width="2880" height="1800" alt="image_2026-03-25_00-23-27" src="https://github.com/user-attachments/assets/2f377201-a8cc-4836-ae85-1beb5c4a546d" />
<img width="2880" height="1800" alt="image_2026-03-25_00-25-57" src="https://github.com/user-attachments/assets/0c2fe5c3-fa5e-4bb9-b617-945fbc448f1e" />
<img width="2880" height="1800" alt="image_2026-03-25_00-26-06" src="https://github.com/user-attachments/assets/f728b31b-f097-417d-9053-8eb73c03359d" />

*Рис. 4 - скріншоти проходження Тесту 3 (PASSED)*

# 6. ВИСНОВКИ

У результаті виконання лабораторної роботи було вивчено основи автоматизованого тестування веб-застосунків без написання коду.

Досягнуто таких результатів:

1. Піднято тестовий веб-застосунок за допомогою Docker
2. Встановлено та налаштовано Katalon Recorder
3. Створено Test Suite "SmokeSuite"
4. Виконано три тестові сценарії:
   - Тест успішного логіну (positive)
   - Тест невдалого логіну (negative)
   - Тест додавання та видалення елементів
5. Усі тести пройшли успішно

Katalon Recorder виявився зручним інструментом для швидкого створення автоматизованих тестів без необхідності програмування.
