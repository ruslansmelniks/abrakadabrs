import { Card, CardContent } from "@/components/ui/card"
import { Shield, UserCheck, CreditCard, Headphones } from "lucide-react"

const trustFeatures = [
  {
    icon: Shield,
    title: "Background Checked",
    description: "All providers undergo thorough background verification for your peace of mind.",
    color: "text-blue-primary",
    bgColor: "bg-blue-primary/10",
  },
  {
    icon: UserCheck,
    title: "ID Verified",
    description: "Every provider's identity is verified through official documentation.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Your payments are protected with Stripe's industry-leading security.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our support team is always here to help with any questions or concerns.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-light-gray to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-6">
            Your Safety is Our Priority
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto leading-relaxed">
            Every provider on Abrakadabra.lv is carefully vetted to ensure you and your family are in safe hands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <Card
              key={index}
              className="shadow-soft hover:shadow-soft-md transition-all duration-200 rounded-xl border-0 hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{feature.title}</h3>
                <p className="text-text-gray leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-blue-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
            Platform Protection Guarantee
          </h3>
          <p className="text-lg text-text-gray mb-6 max-w-2xl mx-auto">
            Every booking is covered by our €1M liability insurance policy, giving you complete peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-primary mb-2">50K+</p>
              <p className="text-text-gray">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-primary mb-2">98%</p>
              <p className="text-text-gray">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-primary mb-2">€1M</p>
              <p className="text-text-gray">Insurance Coverage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}