"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Shield, Heart } from "lucide-react"
import Image from "next/image"

const featuredProviders = [
  {
    id: 1,
    name: "Anna Bērziņa",
    service: "Babysitter",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 12,
    location: "Centrs, Rīga",
    distance: "1.2 km away",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    responseTime: "~1 hour",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Māris Kalniņš",
    service: "Handyman",
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 25,
    location: "Āgenskalns, Rīga",
    distance: "2.5 km away",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    responseTime: "~2 hours",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Līga Ozola",
    service: "House Cleaner",
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 15,
    location: "Purvciems, Rīga",
    distance: "3.1 km away",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    responseTime: "~30 minutes",
    isFavorite: false,
  },
  {
    id: 4,
    name: "Jānis Liepa",
    service: "Dog Walker",
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 10,
    location: "Mežaparks, Rīga",
    distance: "4.8 km away",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    responseTime: "~1 hour",
    isFavorite: true,
  },
]

export default function FeaturedProvidersSection() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-6">Meet Our Top Providers</h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto leading-relaxed">
            Discover highly-rated professionals in your area who are ready to help with your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProviders.map((provider) => (
            <Card
              key={provider.id}
              className="shadow-soft hover:shadow-soft-md transition-all duration-200 rounded-xl border-0 overflow-hidden group hover:-translate-y-1 active:scale-98 relative"
            >
              <CardContent className="p-6">
                <div className="absolute top-4 right-4">
                  <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors duration-200">
                    <Heart
                      className={`w-4 h-4 ${provider.isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`}
                    />
                  </button>
                </div>
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-4">
                    <Image
                      src={provider.image || "/placeholder.svg"}
                      alt={provider.name}
                      width={80}
                      height={80}
                      className="rounded-full mx-auto object-cover"
                    />
                    {provider.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-primary rounded-full flex items-center justify-center">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-1">{provider.name}</h3>
                  <p className="text-text-gray text-sm mb-3">{provider.service}</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {renderStars(provider.rating)}
                    <span className="text-sm text-text-gray ml-1">
                      {provider.rating} ({provider.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-text-gray mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {provider.location} • {provider.distance}
                  </div>
                  <div className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-4 inline-block">
                    Responds in {provider.responseTime}
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-charcoal mb-1">€{provider.hourlyRate}/hr</div>
                  <p className="text-xs text-text-gray">{provider.responseTime}</p>
                </div>
                <Button className="w-full bg-blue-primary hover:bg-blue-primary-hover text-white rounded-lg transition-all duration-200 shadow-soft hover:shadow-soft-md">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
