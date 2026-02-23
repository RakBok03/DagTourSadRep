import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, DollarSign, MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";

export default function Tours() {
  const { data: tours, isLoading } = trpc.tours.list.useQuery();

  const categoryLabels: Record<string, string> = {
    "jeep-tour": "Джип-тур",
    wellness: "Оздоровительный тур",
    combined: "Комбинированный тур",
  };

  const categoryColors: Record<string, string> = {
    "jeep-tour": "bg-blue-100 text-blue-800",
    wellness: "bg-green-100 text-green-800",
    combined: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="py-12 md:py-16 bg-card/50 border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Наши туры
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Выберите идеальный тур по Дагестану. Все туры включают встречу в аэропорту, проживание, питание и сопровождение опытного гида.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Загрузка туров...</p>
              </div>
            </div>
          ) : tours && tours.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow border border-border/50 flex flex-col"
                >
                  {/* Tour Image */}
                  {tour.imageUrl && (
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={tour.imageUrl}
                        alt={tour.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Tour Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <Badge className={categoryColors[tour.category] || "bg-gray-100 text-gray-800"}>
                        {categoryLabels[tour.category] || tour.category}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {tour.name}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {tour.description}
                    </p>

                    {/* Tour Details */}
                    <div className="space-y-3 mb-6 py-4 border-t border-b border-border/50">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-foreground font-medium">{tour.duration}</span>
                        {tour.nights && (
                          <span className="text-muted-foreground">({tour.nights} ночей)</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-foreground font-bold text-lg">
                          {tour.price.toLocaleString()} ₽
                        </span>
                      </div>
                    </div>

                    {/* What's Included */}
                    {tour.included && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-foreground mb-2">
                          Включено:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {JSON.parse(tour.included).slice(0, 3).map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-accent mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Button */}
                    <Link href="/questionnaire">
                      <a>
                        <Button className="w-full gap-2">
                          Выбрать тур <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Туры загружаются. Пожалуйста, попробуйте позже.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container text-center text-muted-foreground text-sm">
          <p>© 2026 DAG Tourism. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
