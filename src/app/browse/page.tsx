"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MapPin,
  ShieldCheck,
  Heart,
  Search,
  Clock,
  Award,
  CheckCircle,
  SlidersHorizontal,
  Baby,
  Cat,
  Dog,
  SparkleIcon as ServiceSparklesIcon,
  Wrench,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MobileFilterBar from "@/components/ui/mobile-filter-bar"
import { ProviderCardSkeleton } from "@/components/ui/loading-skeleton"

const initialProviders = [
  {
    id: "1",
    name: "Anna Bērziņa",
    service: "Babysitter",
    serviceColor: "pink-accent",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 12,
    location: "Centrs, Rīga",
    distance: "1.2 km away",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    backgroundChecked: true,
    insured: false,
    responseTime: "~1 hour",
    isFavorite: false,
    tags: ["CPR Certified", "Non-smoker", "Pet-friendly"],
  },
  {
    id: "2",
    name: "Māris Kalniņš",
    service: "Handyman",
    serviceColor: "orange-accent",
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 25,
    location: "Āgenskalns, Rīga",
    distance: "2.3 km away",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    backgroundChecked: true,
    insured: true,
    responseTime: "~2 hours",
    isFavorite: true,
    tags: ["Licensed", "Insured", "10+ years exp"],
  },
  {
    id: "3",
    name: "Līga Ozola",
    service: "House Cleaner",
    serviceColor: "mint-accent",
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 15,
    location: "Purvciems, Rīga",
    distance: "3.1 km away",
    image: "/placeholder.svg?height=120&width=120",
    verified: true,
    backgroundChecked: false,
    insured: true,
    responseTime: "~30 minutes",
    isFavorite: false,
    tags: ["Eco-friendly", "Deep Cleaning", "Own Supplies"],
  },
]

const serviceFilterOptions = [
  { id: "babysitters", label: "Babysitters", icon: Baby, color: "text-pink-accent" },
  { id: "pet-sitters", label: "Pet Sitters", icon: Cat, color: "text-green-accent" },
  { id: "dog-walkers", label: "Dog Walkers", icon: Dog, color: "text-green-accent" },
  { id: "cleaners", label: "Cleaners", icon: ServiceSparklesIcon, color: "text-mint-accent" },
  { id: "handymen", label: "Handymen", icon: Wrench, color: "text-orange-accent" },
]

const TrustBadge = ({ icon: IconComponent, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-1 text-xs text-green-600">
    <IconComponent className="w-3.5 h-3.5" />
    <span>{label}</span>
  </div>
)

export default function BrowsePage() {
  const [showMap, setShowMap] = useState(false)
  const [loading, setLoading] = useState(false)
  const [providers, setProviders] = useState(initialProviders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggleFavorite = (providerId: string) => {
    setProviders((prevProviders) =>
      prevProviders.map((p) => (p.id === providerId ? { ...p, isFavorite: !p.isFavorite } : p)),
    )
  }

  const handleServiceSelection = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  // In a real app, filtering would happen based on state changes (searchTerm, selectedServices, etc.)
  // const filteredProviders = providers.filter(provider => ...);

  return (
    <div className="min-h-screen bg-light-gray">
      <MobileFilterBar
        onFilterClick={() => console.log("Open filters modal/drawer")}
        onMapClick={() => setShowMap(!showMap)}
        showMap={showMap}
      />

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-80 lg:w-96 flex-shrink-0">
            <Card className="shadow-soft rounded-xl border-0 sticky top-28">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-charcoal">
                  <SlidersHorizontal className="w-5 h-5" />
                  Search & Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="search-sidebar" className="text-sm font-medium text-text-gray">
                    Keyword Search
                  </Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search-sidebar"
                      placeholder="Name, service, keyword..."
                      className="h-11 pl-10 rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-text-gray block mb-2">Service Type</Label>
                  <div className="space-y-2">
                    {serviceFilterOptions.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`filter-${service.id}`}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => handleServiceSelection(service.id)}
                        />
                        <Label
                          htmlFor={`filter-${service.id}`}
                          className="flex items-center gap-2 text-sm font-normal text-text-gray cursor-pointer"
                        >
                          <service.icon className={`w-4 h-4 ${service.color}`} />
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="price-min" className="text-sm font-medium text-text-gray">
                    Price Range (€/hr)
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input id="price-min" type="number" placeholder="Min" className="h-11 rounded-lg" />
                    <Input id="price-max" type="number" placeholder="Max" className="h-11 rounded-lg" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="distance-filter" className="text-sm font-medium text-text-gray">
                    Distance
                  </Label>
                  <Select>
                    <SelectTrigger id="distance-filter" className="h-11 rounded-lg mt-1">
                      <SelectValue placeholder="Any distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Within 1 km</SelectItem>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="any">Any distance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-blue-primary hover:bg-blue-primary-hover text-white rounded-lg h-11 active:scale-98">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Provider List */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-charcoal">
                {loading ? "Searching..." : `${providers.length} providers found`}
              </h1>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48 rounded-lg h-11">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ProviderCardSkeleton key={i} horizontal />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {providers.map((provider) => (
                  <Card
                    key={provider.id}
                    className="w-full bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-lg overflow-hidden group border-l-4 border-transparent hover:border-blue-primary"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Image
                          src={provider.image || "/placeholder.svg"}
                          alt={provider.name}
                          width={120}
                          height={120}
                          className="object-cover h-full w-32 md:w-40"
                        />
                      </div>
                      <div className="flex-grow p-4 md:p-6 flex flex-col md:flex-row justify-between">
                        <div className="flex-grow mb-4 md:mb-0 md:pr-6">
                          <div className="flex items-center justify-between mb-1">
                            <h2 className="font-semibold text-lg text-charcoal">{provider.name}</h2>
                            <Badge
                              className={`bg-${provider.serviceColor}/20 text-${provider.serviceColor} text-xs hidden md:inline-flex`}
                            >
                              {provider.service}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(provider.rating)}
                            <span className="text-xs text-text-gray ml-1">({provider.reviewCount} reviews)</span>
                          </div>
                          <p className="text-sm text-text-gray mb-1">
                            <MapPin className="w-3.5 h-3.5 inline mr-1" />
                            {provider.location} • {provider.distance}
                          </p>
                          <p className="text-xs text-text-gray mb-3">
                            <Clock className="w-3.5 h-3.5 inline mr-1" />
                            Usually responds in {provider.responseTime}
                          </p>
                          <div className="flex items-center gap-3">
                            {provider.verified && <TrustBadge icon={ShieldCheck} label="Verified" />}
                            {provider.backgroundChecked && <TrustBadge icon={CheckCircle} label="Background Check" />}
                            {provider.insured && <TrustBadge icon={Award} label="Insured" />}
                          </div>
                        </div>
                        <div className="flex-shrink-0 md:w-40 md:text-right flex flex-col justify-between items-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(provider.id)
                            }}
                            className="p-2 rounded-full hover:bg-red-500/10 transition-colors self-start md:self-end mb-2 md:mb-0"
                          >
                            <Heart
                              className={`w-5 h-5 ${provider.isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`}
                            />
                          </button>
                          <div>
                            <p className="text-xl font-bold text-charcoal mb-2">€{provider.hourlyRate}/hr</p>
                            <Link href={`/provider/${provider.id}`} passHref>
                              <Button className="w-full bg-blue-primary hover:bg-blue-primary-hover text-white rounded-lg active:scale-98">
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
