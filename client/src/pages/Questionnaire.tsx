import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";

export default function Questionnaire() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    groupSize: "1",
    budget: "",
    preferredDates: "",
    tourType: "",
    preferences: {} as Record<string, boolean>,
    specialRequests: "",
  });

  const submitMutation = trpc.applications.submit.useMutation();

  const tourTypes = [
    {
      id: "jeep-tour",
      label: "Джип-тур (горы, адреналин)",
      description: "Поездка в высокогорье с видовыми местами",
    },
    {
      id: "wellness",
      label: "Оздоровительный тур",
      description: "Термальные источники и лечебные грязи",
    },
    {
      id: "combined",
      label: "Комбинированный тур",
      description: "Джип-тур + оздоровительный",
    },
  ];

  const preferences = [
    { id: "sea", label: "Море и пляж" },
    { id: "mountains", label: "Горные маршруты" },
    { id: "history", label: "Исторические места" },
    { id: "thermal", label: "Термальные источники" },
    { id: "food", label: "Кулинарные впечатления" },
    { id: "photography", label: "Фотографирование" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePreferenceChange = (prefId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [prefId]: checked,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    try {
      await submitMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        groupSize: parseInt(formData.groupSize),
        budget: formData.budget,
        preferredDates: formData.preferredDates,
        preferences: JSON.stringify(formData.preferences),
        specialRequests: formData.specialRequests,
        tourName: tourTypes.find((t) => t.id === formData.tourType)?.label || "Не выбран",
        telegramSent: 0,
      });
      toast.success("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        groupSize: "1",
        budget: "",
        preferredDates: "",
        tourType: "",
        preferences: {},
        specialRequests: "",
      });
    } catch (error) {
      toast.error("Ошибка при отправке заявки. Попробуйте позже.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="py-12 md:py-16 bg-card/50 border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Найди свой идеальный тур
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Ответьте на несколько вопросов и мы подберём для вас лучший тур по Дагестану
          </p>
        </div>
      </section>

      {/* Questionnaire */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 mx-1 rounded-full transition-colors ${
                    s <= step ? "bg-accent" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Шаг {step} из 4
            </p>
          </div>

          <Card className="p-8 border border-border/50">
            {/* Step 1: Tour Type */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Какой тип тура вас интересует?
                  </h2>
                  <p className="text-muted-foreground">Выберите направление путешествия</p>
                </div>

                <RadioGroup
                  value={formData.tourType}
                  onValueChange={(value) => handleInputChange("tourType", value)}
                >
                  {tourTypes.map((tour) => (
                    <div
                      key={tour.id}
                      className="flex items-start space-x-3 p-4 border border-border/50 rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                    >
                      <RadioGroupItem value={tour.id} id={tour.id} className="mt-1" />
                      <Label htmlFor={tour.id} className="flex-1 cursor-pointer">
                        <p className="font-semibold text-foreground">{tour.label}</p>
                        <p className="text-sm text-muted-foreground">{tour.description}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Ваши предпочтения
                  </h2>
                  <p className="text-muted-foreground">
                    Выберите интересующие вас виды активности
                  </p>
                </div>

                <div className="space-y-3">
                  {preferences.map((pref) => (
                    <div
                      key={pref.id}
                      className="flex items-center space-x-3 p-3 border border-border/50 rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        id={pref.id}
                        checked={formData.preferences[pref.id] || false}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange(pref.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={pref.id} className="flex-1 cursor-pointer font-medium text-foreground">
                        {pref.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Детали путешествия
                  </h2>
                  <p className="text-muted-foreground">Расскажите нам о ваших планах</p>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="groupSize" className="text-foreground font-medium">
                        Количество человек *
                      </Label>
                      <Input
                        id="groupSize"
                        type="number"
                        min="1"
                        value={formData.groupSize}
                        onChange={(e) => handleInputChange("groupSize", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget" className="text-foreground font-medium">
                        Бюджет на человека
                      </Label>
                      <Input
                        id="budget"
                        placeholder="Например: 50000-100000 ₽"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferredDates" className="text-foreground font-medium">
                      Предпочитаемые даты
                    </Label>
                    <Input
                      id="preferredDates"
                      placeholder="Например: май-июнь 2026"
                      value={formData.preferredDates}
                      onChange={(e) => handleInputChange("preferredDates", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Info */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Ваши контактные данные
                  </h2>
                  <p className="text-muted-foreground">Как мы сможем с вами связаться?</p>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-foreground font-medium">
                        Имя *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-foreground font-medium">
                        Фамилия *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
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
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground font-medium">
                      Телефон *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests" className="text-foreground font-medium">
                      Особые пожелания
                    </Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Расскажите о ваших пожеланиях и требованиях"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-border/50">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Назад
                </Button>
              )}
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !formData.tourType) ||
                    (step === 3 && !formData.groupSize)
                  }
                  className="flex-1"
                >
                  Далее
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="flex-1"
                >
                  {submitMutation.isPending ? "Отправка..." : "Отправить заявку"}
                </Button>
              )}
            </div>
          </Card>
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
