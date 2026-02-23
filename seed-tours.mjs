import mysql from "mysql2/promise";

const tours = [
  {
    name: "Джип-тур - Все включено",
    description: "Встреча из аэропорта, размещение, море/солнце/пляж, поездка в высокогорье, гид, питание, провожание в аэропорт",
    duration: "5 дней",
    nights: 4,
    price: 75000,
    category: "jeep-tour",
    highlights: JSON.stringify([
      "Встреча из аэропорта",
      "Размещение в гостевом доме (эконом/комфорт/люкс)",
      "Море и пляж по желанию",
      "Поездка в высокогорье",
      "Видовые места гор Дагестана",
      "Сопровождение опытного гида",
      "Завтрак, обед, ужин",
      "Провожание в аэропорт"
    ]),
    included: JSON.stringify([
      "Встреча и провожание в аэропорту",
      "Проживание в гостевом доме",
      "Все питание (завтрак, обед, ужин)",
      "Услуги профессионального гида",
      "Безопасный маршрут движения",
      "Доступ к лучшим смотровым площадкам"
    ]),
    imageUrl: "/images/u47nHxT50xy5.jpg"
  },
  {
    name: "Оздоровительный тур - Все включено",
    description: "Встреча из аэропорта, размещение, море/пляж, экскурсия в Дербент, термальные источники, синяя/черная/белая грязь, ресторан на реке Сулак, смотровая гора, Сулакский каньон, Сарыкум",
    duration: "5 дней",
    nights: 4,
    price: 85000,
    category: "wellness",
    highlights: JSON.stringify([
      "Встреча из аэропорта",
      "Размещение в гостевом доме",
      "Море и пляж по желанию",
      "Экскурсия в древний город Дербент",
      "Термальные источники (серная, минеральная, йодированная, бромная)",
      "Лечебные грязи (синяя, черная, белая)",
      "Ресторанный дворик на реке Сулак",
      "Смотровая гора и Сулакский каньон",
      "Сарыкум песчаный бархан"
    ]),
    included: JSON.stringify([
      "Встреча и провожание в аэропорту",
      "Проживание в гостевом доме",
      "Все питание",
      "Услуги профессионального гида",
      "Посещение термальных источников",
      "Лечебные процедуры с грязями",
      "Экскурсия по историческим местам"
    ]),
    imageUrl: "/images/oElAQXm6NqSQ.jpg"
  },
  {
    name: "Комбинированный тур - Джип + Оздоровительный",
    description: "Комбинация джип-тура и оздоровительного тура с полным спектром услуг: горы, термальные источники, исторические места, питание и проживание",
    duration: "10 дней",
    nights: 9,
    price: 150000,
    category: "combined",
    highlights: JSON.stringify([
      "Встреча из аэропорта",
      "Размещение в гостевом доме",
      "Поездка в высокогорье",
      "Море и пляж",
      "Экскурсия в Дербент",
      "Термальные источники",
      "Лечебные грязи",
      "Сулакский каньон",
      "Сарыкум бархан",
      "Полный пакет услуг"
    ]),
    included: JSON.stringify([
      "Встреча и провожание в аэропорту",
      "Проживание в гостевом доме (9 ночей)",
      "Все питание (завтрак, обед, ужин)",
      "Услуги профессионального гида",
      "Посещение всех достопримечательностей",
      "Термальные источники и лечебные грязи",
      "Безопасный маршрут движения",
      "Скидка 10% для повторных клиентов"
    ]),
    imageUrl: "/images/u13L1XkE3LNk.jpg"
  }
];

async function seedTours() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "dag_tourism",
  });

  try {
    for (const tour of tours) {
      await connection.execute(
        `INSERT INTO tours (name, description, duration, nights, price, category, highlights, included, imageUrl) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          tour.name,
          tour.description,
          tour.duration,
          tour.nights,
          tour.price,
          tour.category,
          tour.highlights,
          tour.included,
          tour.imageUrl
        ]
      );
      console.log(`✓ Added tour: ${tour.name}`);
    }
    console.log("✓ All tours added successfully!");
  } catch (error) {
    console.error("Error seeding tours:", error);
  } finally {
    await connection.end();
  }
}

seedTours();
