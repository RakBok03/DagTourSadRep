import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submitMutation = trpc.feedback.submit.useMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    try {
      await submitMutation.mutateAsync(formData);
      toast.success("Спасибо! Ваше сообщение отправлено. Мы ответим вам в ближайшее время.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Ошибка при отправке сообщения. Попробуйте позже.");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      content: "+7 (985) 245-96-96",
      description: "Доступны с 9:00 до 21:00 по московскому времени",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@dagtourism.ru",
      description: "Ответим в течение 24 часов",
    },
    {
      icon: MapPin,
      title: "Адрес",
      content: "Махачкала, Дагестан",
      description: "Офис расположен в центре города",
    },
    {
      icon: Clock,
      title: "Режим работы",
      content: "Пн-Пт: 9:00-18:00",
      description: "Выходные: Сб-Вс",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="py-12 md:py-16 bg-card/50 border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Свяжитесь с нами
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Есть вопросы? Мы готовы помочь вам спланировать идеальное путешествие
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <Card key={idx} className="p-6 border border-border/50">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {info.title}
                  </h3>
                  <p className="text-accent font-semibold text-sm mb-2">
                    {info.content}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {info.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Отправьте нам сообщение
              </h2>
              <Card className="p-8 border border-border/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="space-y-6"
                >
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Ваше имя *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-2"
                      placeholder="Иван Петров"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-2"
                      placeholder="ivan@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground font-medium">
                      Телефон
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-2"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-foreground font-medium">
                      Тема сообщения *
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="mt-2"
                      placeholder="Вопрос о турах"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Сообщение *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="mt-2"
                      placeholder="Расскажите нам о ваших вопросах или пожеланиях"
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full"
                  >
                    {submitMutation.isPending ? "Отправка..." : "Отправить сообщение"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Часто задаваемые вопросы
              </h2>
              <div className="space-y-6">
                <Card className="p-6 border border-border/50">
                  <h3 className="font-bold text-foreground mb-2">
                    Как забронировать тур?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Пройдите интерактивный опросник на нашем сайте, выберите подходящий тур и оставьте контактные данные. Мы свяжемся с вами в течение 24 часов.
                  </p>
                </Card>

                <Card className="p-6 border border-border/50">
                  <h3 className="font-bold text-foreground mb-2">
                    Какие документы нужны?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Для граждан РФ достаточно паспорта. Иностранцы должны иметь действующий паспорт и визу (если требуется).
                  </p>
                </Card>

                <Card className="p-6 border border-border/50">
                  <h3 className="font-bold text-foreground mb-2">
                    Есть ли скидки для групп?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Да! Чем больше человек в группе, тем больше скидка. Скидки начинаются от 10% для групп от 5 человек.
                  </p>
                </Card>

                <Card className="p-6 border border-border/50">
                  <h3 className="font-bold text-foreground mb-2">
                    Можно ли вернуть деньги?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Да, при отмене за 30 дней до начала тура возвращается 100% стоимости. При отмене за 14 дней - 50%.
                  </p>
                </Card>
              </div>
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
