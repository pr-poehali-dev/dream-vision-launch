import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Выезжаете ли вы на замер?",
    answer:
      "Да, мастер приезжает на объект, замеряет площадь, проверяет состояние основания и влажность. По итогам замера называем точную стоимость и сроки работ — без сюрпризов в процессе.",
  },
  {
    question: "Сколько времени занимает укладка?",
    answer:
      "Ламинат в комнате 20 м² мы укладываем за 1 день. Штучный паркет с подготовкой основания и финишным лаком занимает от 5 до 10 дней в зависимости от площади и рисунка укладки.",
  },
  {
    question: "Можно ли восстановить старый паркет, не меняя его?",
    answer:
      "В большинстве случаев — да. Мы перешлифовываем пол, убираем царапины и потёртости, шпатлюем щели и наносим новый лак или масло. Старый паркет преображается и выглядит как новый.",
  },
  {
    question: "Вы работаете со своим материалом или с моим?",
    answer:
      "Как вам удобнее. Можем уложить покрытие, которое вы купили сами, либо подобрать и привезти проверенные материалы под ваш бюджет и задачу.",
  },
  {
    question: "Даёте ли вы гарантию на работу?",
    answer:
      "Да, мы даём гарантию на все виды работ. Нас всего двое, и мы дорожим репутацией — если что-то пойдёт не так, приедем и исправим.",
  },
  {
    question: "Как заказать работы?",
    answer:
      "Позвоните или напишите нам — обсудим вашу задачу, договоримся о бесплатном замере и подберём удобное время для начала работ.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}