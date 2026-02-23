import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin, Users, Calendar } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  const galleryImages = [
    {
      src: "/images/rlwpJIGu8yna.jpg",
      alt: "Горы Дагестана",
      title: "Величественные горы",
    },
    {
      src: "/images/u47nHxT50xy5.jpg",
      alt: "Туры горный дагестан",
      title: "Горные маршруты",
    },
    {
      src: "/images/u13L1XkE3LNk.jpg",
      alt: "Дагестан в мае",
      title: "Природа Дагестана",
    },
    {
      src: "/images/Qt6PT1bPWOFD.jpg",
      alt: "Дербент",
      title: "Древний Дербент",
    },
    {
      src: "/images/Eso2enZx00PG.jpg",
      alt: "Достопримечательности Дербента",
      title: "Исторические памятники",
    },
    {
      src: "/images/jNTRSqFVhay2.jpg",
      alt: "Дербент за день",
      title: "Экскурсионные маршруты",
    },
    {
      src: "/images/oElAQXm6NqSQ.jpg",
      alt: "Сулакский каньон",
      title: "Сулакский каньон",
    },
    {
      src: "/images/g6sHXgmsAQ80.jpg",
      alt: "Сулакский каньон в Дагестане",
      title: "Природные чудеса",
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Лучшие маршруты",
      description: "Исследуйте самые красивые места Дагестана с опытными гидами",
    },
    {
      icon: Users,
      title: "Групповые туры",
      description: "Путешествуйте с друзьями и получайте скидки за компанию",
    },
    {
      icon: Calendar,
      title: "Гибкие даты",
      description: "Выбирайте удобные вам даты для путешествия",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Добро пожаловать в Дагестан
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Самые лучшие туры по Дагестану
                </h1>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Откройте для себя величественные горы, древние города и уникальные природные чудеса. Каждый тур включает встречу в аэропорту, проживание, питание и сопровождение опытного гида.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/tours">
                  <a>
                    <Button size="lg" className="gap-2">
                      Смотреть туры <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </Link>
                <Link href="/questionnaire">
                  <a>
                    <Button size="lg" variant="outline">
                      Пройти опросник
                    </Button>
                  </a>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 md:h-full rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/images/u13L1XkE3LNk.jpg"
                alt="Дагестан"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы предлагаем комплексные туристические услуги с максимальным комфортом и безопасностью
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={idx}
                  className="p-6 hover:shadow-lg transition-shadow border border-border/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Галерея Дагестана
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Посмотрите на красоту природы, которая вас ждёт
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative h-64 md:h-72 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы к приключению?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Пройдите наш интерактивный опросник и найдите идеальный тур для себя
          </p>
          <Link href="/questionnaire">
            <a>
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                Начать опросник <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container text-center text-muted-foreground text-sm">
          <p>© 2026 DAG Tourism. Все права защищены.</p>
          <p className="mt-2">
            Лучшие туры по Дагестану с опытными гидами и полным сервисом
          </p>
        </div>
      </footer>
    </div>
  );
}
