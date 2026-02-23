import { Card } from "@/components/ui/card";
import { Award, Users, MapPin, Heart } from "lucide-react";
import Header from "@/components/Header";

export default function About() {
  const team = [
    {
      name: "Рамазан",
      role: "Основатель и главный гид",
      description: "Более 15 лет опыта в туризме по Дагестану. Знает каждый уголок гор.",
    },
    {
      name: "Амина",
      role: "Координатор туров",
      description: "Помогает организовать идеальное путешествие для каждого гостя.",
    },
    {
      name: "Магомед",
      role: "Гид по горам",
      description: "Профессиональный альпинист и опытный гид высокогорных маршрутов.",
    },
    {
      name: "Зарема",
      role: "Гид по истории",
      description: "Специалист по истории Дагестана и древних городов.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Забота о гостях",
      description: "Каждый турист для нас - важный гость, которому мы хотим дать незабываемые впечатления",
    },
    {
      icon: MapPin,
      title: "Знание местности",
      description: "Мы знаем Дагестан как свои пять пальцев и покажем вам самые красивые места",
    },
    {
      icon: Award,
      title: "Качество сервиса",
      description: "Высокие стандарты безопасности, комфорта и профессионализма во всём",
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Мы создаём дружеское сообщество путешественников, которые любят Дагестан",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="py-12 md:py-16 bg-card/50 border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            О компании DAG Tourism
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Мы создаём незабываемые впечатления от путешествий по Дагестану
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Наша история
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                DAG Tourism была основана с простой идеей - показать миру красоту Дагестана. Наш основатель Рамазан, уроженец Дагестана, всегда мечтал о том, чтобы как можно больше людей узнали о величественных горах, древних городах и гостеприимстве нашего народа.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Начав с небольших групповых туров, мы выросли в профессиональную компанию, которая ежегодно принимает сотни туристов из разных стран. Каждый тур - это результат многолетнего опыта, тщательного планирования и любви к своей земле.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Сегодня мы гордимся тем, что помогли тысячам людей открыть для себя Дагестан, создали рабочие места для местных гидов и внесли вклад в развитие туризма в регионе.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Наши ценности
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Эти принципы лежат в основе всего, что мы делаем
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card key={idx} className="p-6 border border-border/50">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Наша команда
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Опытные профессионалы, которые любят своё дело
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <Card key={idx} className="overflow-hidden border border-border/50">
                <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <div className="text-5xl">👤</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <p className="text-lg opacity-90">Довольных туристов</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <p className="text-lg opacity-90">Уникальных маршрутов</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <p className="text-lg opacity-90">Лет опыта</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
              <p className="text-lg opacity-90">Профессиональных гидов</p>
            </div>
          </div>
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
