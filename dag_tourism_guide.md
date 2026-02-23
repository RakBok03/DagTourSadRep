# 📚 Полное руководство по проекту DAG Tourism

## Содержание

1. [Обзор проекта](#обзор-проекта)
2. [Структура папок и файлов](#структура-папок-и-файлов)
3. [Фронтенд (React + TypeScript)](#фронтенд-react--typescript)
4. [Бэкенд (Node.js + Express + tRPC)](#бэкенд-nodejs--express--trpc)
5. [База данных (MySQL + Drizzle ORM)](#база-данных-mysql--drizzle-orm)
6. [Как редактировать контент](#как-редактировать-контент)
7. [Как добавлять фото](#как-добавлять-фото)
8. [Визуальные компоненты и стили](#визуальные-компоненты-и-стили)
9. [Функциональность Telegram](#функциональность-telegram)
10. [Как запустить и развернуть](#как-запустить-и-развернуть)

---

## Обзор проекта

**DAG Tourism** — это полнофункциональный туристический сайт для туров по Дагестану. Проект состоит из трёх основных частей:

- **Фронтенд**: React 19 + TypeScript + Tailwind CSS 4 — красивый, отзывчивый интерфейс
- **Бэкенд**: Node.js + Express + tRPC — безопасный API для обработки заявок
- **База данных**: MySQL + Drizzle ORM — хранение туров, заявок и отзывов

**Основной функционал:**
- Каталог туров с фото и описаниями
- Интерактивный опросник для выбора тура
- Автоматическая отправка заявок в Telegram группу
- Страница с отзывами туристов
- Информация о компании и контакты

---

## Структура папок и файлов

```
dag_tourism/
├── client/                          # Фронтенд (React)
│   ├── public/
│   │   ├── images/                 # Фото для сайта (сюда добавляете новые фото)
│   │   │   ├── rlwpJIGu8yna.jpg
│   │   │   ├── u47nHxT50xy5.jpg
│   │   │   └── ... (ещё 6 фото)
│   │   └── __manus__/              # Служебные файлы (не трогать)
│   ├── src/
│   │   ├── App.tsx                 # Главный файл с маршрутизацией
│   │   ├── main.tsx                # Точка входа React приложения
│   │   ├── index.css               # Глобальные стили и цвета
│   │   ├── pages/                  # Страницы сайта
│   │   │   ├── Home.tsx            # Главная страница
│   │   │   ├── Tours.tsx           # Каталог туров
│   │   │   ├── Questionnaire.tsx   # Форма опросника
│   │   │   ├── About.tsx           # О компании
│   │   │   ├── Contacts.tsx        # Контакты
│   │   │   └── NotFound.tsx        # Страница 404
│   │   ├── components/
│   │   │   ├── Header.tsx          # Навигация и шапка сайта
│   │   │   ├── ui/                 # Готовые компоненты (кнопки, карточки и т.д.)
│   │   │   └── ... (другие компоненты)
│   │   ├── contexts/               # React контексты (тема, аутентификация)
│   │   ├── hooks/                  # Пользовательские хуки
│   │   ├── lib/                    # Утилиты и конфигурация
│   │   │   └── trpc.ts             # Клиент для API запросов
│   │   └── const.ts                # Константы
│   └── index.html                  # HTML шаблон
│
├── server/                          # Бэкенд (Node.js)
│   ├── routers.ts                  # API маршруты (tRPC процедуры)
│   ├── db.ts                       # Функции для работы с БД
│   ├── telegram.ts                 # Интеграция с Telegram Bot API
│   ├── storage.ts                  # Работа с S3 хранилищем
│   ├── _core/                      # Внутренняя логика (не трогать)
│   │   ├── index.ts                # Запуск сервера
│   │   ├── trpc.ts                 # Конфигурация tRPC
│   │   ├── context.ts              # Контекст для API
│   │   └── ... (другие файлы)
│   └── *.test.ts                   # Тесты
│
├── drizzle/                         # Конфигурация БД
│   ├── schema.ts                   # Структура таблиц БД
│   ├── migrations/                 # История изменений БД
│   └── relations.ts                # Связи между таблицами
│
├── shared/                          # Общие типы и константы
│   ├── types.ts                    # TypeScript типы
│   └── const.ts                    # Константы
│
├── package.json                     # Зависимости проекта
├── vite.config.ts                  # Конфигурация Vite (сборка)
├── tsconfig.json                   # Конфигурация TypeScript
├── drizzle.config.ts               # Конфигурация БД
└── todo.md                         # Список задач
```

---

## Фронтенд (React + TypeScript)

### Как работает навигация (App.tsx)

Файл `client/src/App.tsx` — это главный файл приложения. Он определяет все страницы сайта:

```typescript
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />           {/* Главная страница */}
      <Route path="/tours" component={Tours} />     {/* Каталог туров */}
      <Route path="/questionnaire" component={Questionnaire} />  {/* Форма */}
      <Route path="/about" component={About} />     {/* О компании */}
      <Route path="/contacts" component={Contacts} /> {/* Контакты */}
      <Route component={NotFound} />                {/* 404 ошибка */}
    </Switch>
  );
}
```

**Как добавить новую страницу:**

1. Создайте файл `client/src/pages/NewPage.tsx`:
```typescript
import Header from "@/components/Header";

export default function NewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-16">
        <div className="container">
          <h1>Заголовок новой страницы</h1>
          {/* Ваш контент здесь */}
        </div>
      </section>
    </div>
  );
}
```

2. Добавьте маршрут в `App.tsx`:
```typescript
import NewPage from "./pages/NewPage";

<Route path="/new-page" component={NewPage} />
```

3. Добавьте ссылку в навигацию (`Header.tsx`)

---

### Главная страница (Home.tsx)

**Что находится на главной странице:**

1. **Шапка сайта** — навигация и логотип
2. **Hero секция** — большой заголовок с картинкой
3. **Галерея фото** — 8 фото Дагестана
4. **Преимущества** — 3 карточки с иконками
5. **CTA кнопки** — "Смотреть туры" и "Пройти опросник"

**Как изменить текст на главной странице:**

Откройте `client/src/pages/Home.tsx` и найдите нужный текст:

```typescript
// Заголовок
<h1 className="text-4xl md:text-5xl font-bold">
  Самые лучшие туры по Дагестану  {/* Измените этот текст */}
</h1>

// Описание
<p className="text-lg text-muted-foreground">
  Откройте для себя величественные горы...  {/* Измените этот текст */}
</p>
```

**Как изменить фото в галерее:**

В файле `Home.tsx` найдите массив `galleryImages`:

```typescript
const galleryImages = [
  {
    src: "/images/rlwpJIGu8yna.jpg",  {/* Путь к фото */}
    alt: "Горы Дагестана",             {/* Описание для поиска */}
    title: "Величественные горы",      {/* Название фото */}
  },
  // ... остальные фото
];
```

Чтобы заменить фото:
1. Добавьте новое фото в папку `client/public/images/`
2. Измените `src` на новое имя файла
3. Обновите `alt` и `title`

---

### Страница туров (Tours.tsx)

**Как работает:**

1. При загрузке страницы выполняется запрос к API: `trpc.tours.list.useQuery()`
2. Сервер возвращает список туров из БД
3. Туры отображаются в виде карточек в сетке

**Как изменить информацию о турах:**

Туры хранятся в БД, а не в коде. Чтобы изменить тур:

**Способ 1: Через Management UI (если на Manus)**
1. Откройте Management UI → Database
2. Найдите таблицу `tours`
3. Отредактируйте нужный тур

**Способ 2: Через SQL команду**
1. Откройте терминал в папке проекта
2. Выполните команду для изменения тура:
```bash
# Пример: изменить цену тура с ID 1
sqlite3 local.db "UPDATE tours SET price = 50000 WHERE id = 1;"
```

**Как добавить новый тур:**

Откройте `server/db.ts` и найдите функцию `getAllTours()`. Туры загружаются из БД. Чтобы добавить новый тур, используйте SQL:

```sql
INSERT INTO tours (name, description, duration, nights, price, category, highlights, included, imageUrl)
VALUES (
  'Новый тур',
  'Описание тура',
  '3 дня',
  2,
  35000,
  'jeep-tour',
  '["Горы", "Водопады"]',
  '["Питание", "Проживание"]',
  '/images/new-photo.jpg'
);
```

---

### Форма опросника (Questionnaire.tsx)

**Как работает:**

1. Форма состоит из 4 шагов (step 1-4)
2. Пользователь заполняет данные
3. При отправке данные отправляются на сервер: `trpc.applications.submit.useMutation()`
4. Сервер сохраняет данные в БД и отправляет в Telegram

**Как добавить новый вопрос:**

Найдите массив `tourTypes` или `preferences`:

```typescript
const tourTypes = [
  {
    id: "jeep-tour",
    label: "Джип-тур (горы, адреналин)",
    description: "Поездка в высокогорье",
  },
  // Добавьте новый тип тура:
  {
    id: "cultural",
    label: "Культурный тур",
    description: "Исторические и культурные достопримечательности",
  },
];
```

**Как изменить текст кнопок и заголовков:**

```typescript
// Заголовок шага 1
<h2 className="text-2xl font-bold">
  Выберите тип тура  {/* Измените этот текст */}
</h2>

// Текст кнопки
<Button onClick={() => setStep(2)}>
  Далее  {/* Измените этот текст */}
</Button>
```

---

## Бэкенд (Node.js + Express + tRPC)

### Как работает API (routers.ts)

Файл `server/routers.ts` определяет все API функции (процедуры):

```typescript
export const appRouter = router({
  tours: router({
    list: publicProcedure.query(async () => {
      // Получить список всех туров
      return getAllTours();
    }),
  }),
  
  applications: router({
    submit: publicProcedure.mutation(async ({ input }) => {
      // Сохранить заявку в БД
      // Отправить в Telegram
    }),
  }),
});
```

**Что такое `publicProcedure` и `protectedProcedure`?**

- `publicProcedure` — доступна всем (без аутентификации)
- `protectedProcedure` — только для авторизованных пользователей

**Как добавить новую API функцию:**

1. Добавьте функцию в `server/db.ts`:
```typescript
export async function getToursWithRating() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tours).where(gt(tours.rating, 4));
}
```

2. Добавьте процедуру в `server/routers.ts`:
```typescript
tours: router({
  list: publicProcedure.query(async () => {
    return getAllTours();
  }),
  
  // Новая функция
  topRated: publicProcedure.query(async () => {
    return getToursWithRating();
  }),
}),
```

3. Используйте на фронтенде:
```typescript
const { data: topTours } = trpc.tours.topRated.useQuery();
```

---

### Telegram интеграция (telegram.ts)

**Как работает:**

1. Когда пользователь отправляет заявку, сервер вызывает функцию `sendToTelegram()`
2. Функция форматирует данные в красивое сообщение
3. Отправляет сообщение в Telegram группу через Bot API

**Как настроить Telegram:**

1. **Создайте Telegram бота:**
   - Откройте Telegram и напишите @BotFather
   - Выполните `/newbot` и следуйте инструкциям
   - Скопируйте токен бота (выглядит как `123456789:ABCDefGHIjklmnoPQRstuvWXYZ`)

2. **Создайте Telegram группу:**
   - Создайте новую группу в Telegram
   - Добавьте вашего бота в группу
   - Получите ID группы (выглядит как `-123456789`)

3. **Установите переменные окружения:**
   - Откройте файл `.env.local`
   - Добавьте:
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCDefGHIjklmnoPQRstuvWXYZ
   TELEGRAM_CHAT_ID=-123456789
   ```

4. **Перезагрузите сервер:**
   ```bash
   pnpm dev
   ```

**Как изменить формат сообщения в Telegram:**

Откройте `server/telegram.ts` и найдите функцию `formatApplicationMessage()`:

```typescript
function formatApplicationMessage(data: TelegramMessage): string {
  const lines = [
    `<b>${data.title}</b>`,                    // Заголовок
    "",
    `<b>Тур:</b> ${data.tourName}`,           // Название тура
    `<b>Имя:</b> ${data.firstName} ${data.lastName}`,  // Имя
    // Добавьте новые строки:
    `<b>Компания:</b> ${data.company || "Не указана"}`,
  ];
  return lines.join("\n");
}
```

---

## База данных (MySQL + Drizzle ORM)

### Структура таблиц (schema.ts)

**Таблица `tours` — туры:**

| Поле | Тип | Описание |
|------|-----|---------|
| id | int | Уникальный ID тура |
| name | varchar | Название тура |
| description | text | Подробное описание |
| duration | varchar | Длительность (например, "5 дней") |
| nights | int | Количество ночей |
| price | int | Цена в рублях |
| category | varchar | Категория (jeep-tour, wellness, combined) |
| highlights | text | JSON массив с достопримечательностями |
| included | text | JSON массив с включениями |
| imageUrl | varchar | URL фото тура |

**Таблица `userApplications` — заявки на туры:**

| Поле | Тип | Описание |
|------|-----|---------|
| id | int | Уникальный ID заявки |
| tourId | int | ID выбранного тура |
| firstName | varchar | Имя туриста |
| lastName | varchar | Фамилия туриста |
| email | varchar | Email |
| phone | varchar | Телефон |
| groupSize | int | Количество человек |
| budget | varchar | Бюджет |
| preferredDates | varchar | Предпочитаемые даты |
| preferences | text | JSON с предпочтениями |
| specialRequests | text | Особые пожелания |
| telegramSent | int | Отправлено ли в Telegram (0 или 1) |

**Таблица `feedback` — сообщения обратной связи:**

| Поле | Тип | Описание |
|------|-----|---------|
| id | int | Уникальный ID |
| name | varchar | Имя отправителя |
| email | varchar | Email |
| phone | varchar | Телефон |
| subject | varchar | Тема сообщения |
| message | text | Текст сообщения |

### Как добавить новую таблицу:

1. Откройте `drizzle/schema.ts`
2. Добавьте новую таблицу:
```typescript
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  tourId: int("tourId").references(() => tours.id),
  author: varchar("author", { length: 100 }).notNull(),
  rating: int("rating").notNull(), // 1-5 звёзд
  text: text("text").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
```

3. Выполните миграцию:
```bash
pnpm db:push
```

4. Добавьте функции в `server/db.ts`:
```typescript
export async function createReview(data: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(reviews).values(data);
}

export async function getReviewsByTourId(tourId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(eq(reviews.tourId, tourId));
}
```

---

## Как редактировать контент

### Изменение текста на странице

**Пример: изменить заголовок на главной странице**

1. Откройте `client/src/pages/Home.tsx`
2. Найдите текст:
```typescript
<h1 className="text-4xl md:text-5xl font-bold">
  Самые лучшие туры по Дагестану
</h1>
```
3. Измените текст:
```typescript
<h1 className="text-4xl md:text-5xl font-bold">
  Откройте Дагестан вместе с нами
</h1>
```
4. Сохраните файл — сайт обновится автоматически

### Изменение цветов

Все цвета определены в `client/src/index.css`:

```css
:root {
  --primary: oklch(0.45 0.2 250);        /* Основной цвет (синий) */
  --accent: oklch(0.5 0.22 250);         /* Цвет акцентов */
  --background: oklch(0.98 0.001 0);     /* Фон */
  --foreground: oklch(0.25 0.03 65);     /* Текст */
}
```

**Как изменить основной цвет:**

1. Откройте `client/src/index.css`
2. Найдите `--primary: oklch(...)`
3. Измените значение (используйте OKLCH формат)

**Примеры цветов:**
- Синий: `oklch(0.45 0.2 250)`
- Зелёный: `oklch(0.5 0.2 150)`
- Красный: `oklch(0.5 0.2 30)`
- Жёлтый: `oklch(0.6 0.2 70)`

### Изменение текста в навигации

Откройте `client/src/components/Header.tsx` и найдите ссылки:

```typescript
<Link href="/tours">
  <a>Туры</a>  {/* Измените этот текст */}
</Link>
```

---

## Как добавлять фото

### Добавление фото в галерею (главная страница)

1. **Подготовьте фото:**
   - Размер: минимум 800x600 пикселей
   - Формат: JPG или PNG
   - Размер файла: не более 1 МБ

2. **Добавьте фото в проект:**
   - Скопируйте фото в папку `client/public/images/`
   - Запомните имя файла (например, `my-photo.jpg`)

3. **Добавьте в галерею (Home.tsx):**

Найдите массив `galleryImages`:
```typescript
const galleryImages = [
  // ... существующие фото
  {
    src: "/images/my-photo.jpg",      // Путь к новому фото
    alt: "Описание для поиска",       // Важно для SEO
    title: "Название фото",           // Будет показано при наведении
  },
];
```

### Добавление фото к туру

1. **Добавьте фото в папку:**
   - Скопируйте фото в `client/public/images/`
   - Запомните имя файла

2. **Обновите информацию о туре в БД:**

Используйте SQL команду:
```sql
UPDATE tours 
SET imageUrl = '/images/new-tour-photo.jpg' 
WHERE id = 1;
```

Или через Management UI:
1. Откройте Management UI → Database
2. Найдите таблицу `tours`
3. Отредактируйте поле `imageUrl`

### Оптимизация фото

**Почему нужно оптимизировать:**
- Большие фото замедляют загрузку сайта
- Пользователи с медленным интернетом видят пустые места

**Как оптимизировать:**

1. **Уменьшите размер фото:**
   - Используйте онлайн сервис: https://tinypng.com
   - Или команду в терминале:
   ```bash
   # На Windows (если установлен ImageMagick)
   magick convert input.jpg -resize 1200x800 output.jpg
   ```

2. **Выберите правильный формат:**
   - JPG для фотографий (меньше размер)
   - PNG для изображений с прозрачностью

---

## Визуальные компоненты и стили

### Готовые компоненты (shadcn/ui)

Проект использует готовые компоненты из shadcn/ui. Все они находятся в `client/src/components/ui/`:

| Компонент | Файл | Использование |
|-----------|------|---------------|
| Button | button.tsx | Кнопки |
| Card | card.tsx | Карточки |
| Input | input.tsx | Поля ввода |
| Textarea | textarea.tsx | Большие текстовые поля |
| Badge | badge.tsx | Метки и теги |
| Dialog | dialog.tsx | Модальные окна |
| Tabs | tabs.tsx | Вкладки |
| Select | select.tsx | Выпадающие списки |

**Как использовать компоненты:**

```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MyPage() {
  return (
    <Card className="p-6">
      <h2>Заголовок</h2>
      <Button>Нажми меня</Button>
    </Card>
  );
}
```

### Tailwind CSS классы

Проект использует Tailwind CSS для стилизации. Основные классы:

**Размеры текста:**
- `text-sm` — маленький текст
- `text-base` — обычный текст
- `text-lg` — большой текст
- `text-xl` — очень большой текст
- `text-2xl` — заголовок 2
- `text-4xl` — заголовок 1

**Отступы:**
- `p-4` — padding (внутренний отступ) 1rem
- `m-4` — margin (внешний отступ) 1rem
- `py-8` — padding сверху и снизу
- `px-6` — padding слева и справа

**Цвета:**
- `text-foreground` — основной цвет текста
- `bg-background` — фон страницы
- `bg-card` — фон карточки
- `text-muted-foreground` — серый текст
- `bg-accent` — цвет акцента

**Макет:**
- `flex` — flexbox контейнер
- `grid` — grid контейнер
- `md:grid-cols-2` — 2 колонки на средних экранах
- `lg:grid-cols-3` — 3 колонки на больших экранах

**Пример:**
```typescript
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* На мобильных: 1 колонка */}
  {/* На планшетах (md): 2 колонки */}
  {/* На ПК (lg): 3 колонки */}
</div>
```

### Адаптивный дизайн (мобильные телефоны)

Сайт автоматически адаптируется под разные размеры экранов:

- `sm:` — маленькие экраны (640px)
- `md:` — средние экраны (768px)
- `lg:` — большие экраны (1024px)
- `xl:` — очень большие экраны (1280px)

**Пример:**
```typescript
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  {/* На мобильных: 24px */}
  {/* На планшетах: 36px */}
  {/* На ПК: 48px */}
</h1>
```

---

## Функциональность Telegram

### Как работает отправка заявок в Telegram

**Процесс:**

1. Пользователь заполняет форму опросника
2. Нажимает кнопку "Отправить"
3. Фронтенд отправляет данные на сервер: `trpc.applications.submit.useMutation()`
4. Сервер сохраняет заявку в БД
5. Сервер форматирует красивое сообщение
6. Отправляет сообщение в Telegram группу через Bot API
7. Пользователю показывается сообщение об успехе

**Код на фронтенде (Questionnaire.tsx):**
```typescript
const submitMutation = trpc.applications.submit.useMutation();

const handleSubmit = async () => {
  await submitMutation.mutateAsync({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    // ... остальные данные
  });
  toast.success("Спасибо! Ваша заявка отправлена.");
};
```

**Код на сервере (routers.ts):**
```typescript
applications: router({
  submit: publicProcedure.mutation(async ({ input }) => {
    // 1. Сохранить в БД
    const result = await createUserApplication(input);
    
    // 2. Отправить в Telegram
    const sent = await sendToTelegram({
      title: "📝 Новая заявка на тур",
      tourName: input.tourName,
      firstName: input.firstName,
      // ... остальные данные
    });
    
    return { success: true };
  }),
}),
```

### Как получить ID Telegram группы

1. **Добавьте бота в группу:**
   - Откройте Telegram
   - Создайте новую группу
   - Добавьте вашего бота (@YourBotName)

2. **Получите ID группы:**
   - Отправьте сообщение в группу
   - Откройте браузер и перейдите по ссылке:
   ```
   https://api.telegram.org/bot{YOUR_BOT_TOKEN}/getUpdates
   ```
   - Найдите `"chat":{"id":-123456789}`
   - Это и есть ID группы (начинается с минуса)

3. **Установите переменную окружения:**
   - Откройте `.env.local`
   - Добавьте: `TELEGRAM_CHAT_ID=-123456789`

### Как отправить тестовое сообщение

1. Откройте PowerShell в папке проекта
2. Выполните команду:
```bash
curl -X POST "https://api.telegram.org/bot{YOUR_BOT_TOKEN}/sendMessage" \
  -d "chat_id={YOUR_CHAT_ID}" \
  -d "text=Тестовое сообщение"
```

Замените `{YOUR_BOT_TOKEN}` и `{YOUR_CHAT_ID}` на реальные значения.

---

## Как запустить и развернуть

### Локальный запуск (на своём компьютере)

**Требования:**
- Node.js 18+ (скачайте с https://nodejs.org)
- pnpm (установите командой `npm install -g pnpm`)

**Шаги:**

1. **Распакуйте архив:**
```bash
tar -xzf dag_tourism_final.tar.gz
cd dag_tourism
```

2. **Установите зависимости:**
```bash
pnpm install
```

3. **Запустите проект:**
```bash
pnpm dev
```

4. **Откройте в браузере:**
```
http://localhost:3000
```

### Развертывание на Railway

Railway — это облачная платформа для развертывания приложений.

**Шаги:**

1. **Создайте аккаунт на Railway:**
   - Перейдите на https://railway.app
   - Зарегистрируйтесь через GitHub

2. **Создайте новый проект:**
   - Нажмите "New Project"
   - Выберите "Deploy from GitHub"
   - Выберите ваш репозиторий

3. **Настройте переменные окружения:**
   - Откройте Settings → Variables
   - Добавьте:
   ```
   DATABASE_URL=mysql://...
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...
   NODE_ENV=production
   ```

4. **Развертите:**
   - Railway автоматически развернёт приложение
   - Ваш сайт будет доступен по URL вида: `https://dag-tourism.up.railway.app`

### Развертывание на Manus

1. **Создайте checkpoint:**
```bash
pnpm build
```

2. **Нажмите "Publish" в Management UI**

3. **Ваш сайт будет доступен по URL вида:** `https://dag-tourism.manus.space`

---

## Полезные команды

```bash
# Запустить проект в режиме разработки
pnpm dev

# Собрать проект для продакшена
pnpm build

# Запустить тесты
pnpm test

# Проверить TypeScript ошибки
pnpm check

# Форматировать код
pnpm format

# Обновить БД (после изменения schema.ts)
pnpm db:push

# Просмотреть БД в браузере
pnpm db:studio
```

---

## Часто задаваемые вопросы

**Q: Как изменить название сайта?**
A: Откройте `client/index.html` и измените `<title>`:
```html
<title>DAG Tourism - Туры по Дагестану</title>
```

**Q: Как добавить новый язык (например, английский)?**
A: Это требует больше работы. Нужно:
1. Создать файл с переводами
2. Добавить переключатель языка
3. Обновить все компоненты

**Q: Как добавить платежи (Stripe)?**
A: Используйте команду:
```bash
pnpm webdev-add-feature stripe
```

**Q: Как сделать резервную копию БД?**
A: Используйте Management UI → Database → Export

**Q: Как добавить аутентификацию (логин)?**
A: Сайт уже поддерживает Manus OAuth. Используйте:
```typescript
const { user } = useAuth();
if (!user) {
  return <LoginButton />;
}
```

---

## Заключение

Теперь вы знаете структуру всего проекта! Основные файлы для редактирования:

- **Текст на странице:** `client/src/pages/*.tsx`
- **Фото:** `client/public/images/`
- **Туры в БД:** Management UI → Database
- **Цвета:** `client/src/index.css`
- **API функции:** `server/routers.ts`
- **Telegram:** `server/telegram.ts`

Удачи в разработке! 🚀
