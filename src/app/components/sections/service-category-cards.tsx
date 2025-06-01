import { Card, CardContent } from "@/components/ui/card"
import { Baby, Cat, Dog, Sparkles as CleaningIcon, Wrench } from "lucide-react"
import Link from "next/link"

const serviceCategories = [
  {
    id: "babysitters",
    name: "Babysitters",
    description: "Experienced caregivers for your little ones",
    icon: Baby,
    color: "bg-pink-accent",
    hoverColor: "hover:bg-pink-accent/10",
    borderColor: "border-pink-accent/20",
    textColor: "text-pink-accent",
    bgGradient: "bg-gradient-to-br from-pink-50 to-pink-100",
    providers: "250+ providers",
  },
  {
    id: "pet-sitters",
    name: "Pet Sitters",
    description: "Loving care for your furry friends",
    icon: Cat,
    color: "bg-green-accent",
    hoverColor: "hover:bg-green-accent/10",
    borderColor: "border-green-accent/20",
    textColor: "text-green-accent",
    bgGradient: "bg-gradient-to-br from-green-50 to-green-100",
    providers: "180+ providers",
  },
  {
    id: "dog-walkers",
    name: "Dog Walkers",
    description: "Keep your dogs active and happy",
    icon: Dog,
    color: "bg-green-accent",
    hoverColor: "hover:bg-green-accent/10",
    borderColor: "border-green-accent/20",
    textColor: "text-green-accent",
    bgGradient: "bg-gradient-to-br from-green-50 to-green-100",
    providers: "120+ providers",
  },
  {
    id: "cleaners",
    name: "House Cleaners",
    description: "Professional cleaning for spotless homes",
    icon: CleaningIcon,
    color: "bg-mint-accent",
    hoverColor: "hover:bg-mint-accent/10",
    borderColor: "border-mint-accent/20",
    textColor: "text-mint-accent",
    bgGradient: "bg-gradient-to-br from-mint-50 to-mint-100",
    providers: "300+ providers",
  },
  {
    id: "handymen",
    name: "Handymen",
    description: "Skilled professionals for home repairs",
    icon: Wrench,
    color: "bg-orange-accent",
    hoverColor: "hover:bg-orange-accent/10",
    borderColor: "border-orange-accent/20",
    textColor: "text-orange-accent",
    bgGradient: "bg-gradient-to-br from-orange-50 to-orange-100",
    providers: "200+ providers",
  },
]

export default function ServiceCategoryCards() {
  return (
    <section className="py-20 md:py-28 bg-light-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-6">What Do You Need Help With?</h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto leading-relaxed">
            Choose from our trusted service providers and let the magic happen
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {serviceCategories.map((category) => (
            <Link href={`/browse?category=${category.id}`} key={category.id}>
              <Card
                className={`h-full shadow-soft hover:shadow-soft-lg transition-all duration-300 rounded-xl border-2 ${category.borderColor} ${category.hoverColor} cursor-pointer group hover:-translate-y-1 active:scale-98 overflow-hidden`}
              >
                <div className={`${category.bgGradient} p-1 absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
                <CardContent className="relative p-8 text-center">
                  <div
                    className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{category.name}</h3>
                  <p className="text-text-gray text-sm mb-4 leading-relaxed">{category.description}</p>
                  <p className={`text-xs font-semibold ${category.textColor}`}>{category.providers}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}