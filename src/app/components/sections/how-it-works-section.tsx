import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CalendarCheck2, Smile, Wand2 } from "lucide-react"

const steps = [
  {
    title: "1. Search & Book",
    description:
      "Easily find and book verified local service providers. Filter by service, location, and availability.",
    icon: Search,
    color: "blue-primary",
  },
  {
    title: "2. Meet & Confirm",
    description: "Connect with your chosen provider. Discuss your needs and confirm the details.",
    icon: CalendarCheck2,
    color: "mint-accent",
  },
  {
    title: "3. Relax & Enjoy",
    description: "Your trusted provider takes care of everything. Enjoy peace of mind and a helping hand!",
    icon: Smile,
    color: "green-accent",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-4">Getting Help is Easy</h2>
          <p className="text-2xl text-text-gray flex items-center justify-center gap-3">
            It's like magic <Wand2 className="w-8 h-8 text-blue-primary inline-block" /> Abrakadabra!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="text-center shadow-soft rounded-xl border-0 bg-light-gray hover:shadow-soft-md transition-all duration-200 py-8"
            >
              <CardHeader className="items-center pb-6">
                <div className={`mb-6 w-20 h-20 rounded-full bg-${step.color}/10 flex items-center justify-center`}>
                  <step.icon className={`w-10 h-10 text-${step.color}`} />
                </div>
                <CardTitle className={`text-2xl font-bold text-charcoal`}>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-gray leading-relaxed text-lg">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
