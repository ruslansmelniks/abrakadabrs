"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Baby, Cat, Dog, Sparkles, Wrench } from "lucide-react"

const serviceOptions = [
  { value: "babysitters", label: "Babysitters", icon: Baby },
  { value: "pet-sitters", label: "Pet Sitters", icon: Cat },
  { value: "dog-walkers", label: "Dog Walkers", icon: Dog },
  { value: "cleaners", label: "Cleaners", icon: Sparkles },
  { value: "handymen", label: "Handymen", icon: Wrench },
]

const popularServices = [
  {
    name: "Babysitting",
    color: "border-pink-accent text-pink-accent hover:bg-pink-accent hover:text-white",
  },
  {
    name: "House Cleaning",
    color: "border-mint-accent text-mint-accent hover:bg-mint-accent hover:text-white",
  },
  {
    name: "Dog Walking",
    color: "border-green-accent text-green-accent hover:bg-green-accent hover:text-white",
  },
  {
    name: "Handyman",
    color: "border-orange-accent text-orange-accent hover:bg-orange-accent hover:text-white",
  },
]

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-5rem)] min-h-[600px] md:min-h-[700px] flex items-center justify-center text-white overflow-hidden">
      {/* Ensure the Image component is a direct child or correctly positioned */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="Happy family using home services"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority // Added priority to hint Next.js to load this image eagerly
        />
      </div>
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      {/* Increased overlay slightly for better contrast if needed */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold !leading-tight mb-6">
          Find trusted help for your home and family{" "}
          <span className="inline-flex items-center">
            <Sparkles className="w-12 h-12 ml-3 text-yellow-300 animate-pulse" />
          </span>
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl">like magic!</span>
        </h1>
        <p className="mt-6 mb-12 text-xl md:text-2xl text-white/90 font-medium">
          Atrodi uzticamu palīdzību mājai un ģimenei
        </p>

        <div className="max-w-5xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="w-full md:w-2/5">
              <label className="block text-sm font-medium text-text-gray mb-2">Service Type</label>
              <Select defaultValue="babysitters">
                <SelectTrigger className="w-full h-16 text-text-gray rounded-xl border-gray-200 text-lg">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-soft-lg rounded-lg">
                  {serviceOptions.map((service) => (
                    <SelectItem key={service.value} value={service.value} className="flex items-center gap-2">
                      <service.icon className="w-4 h-4" />
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-2/5 relative">
              <label className="block text-sm font-medium text-text-gray mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your location (e.g., Riga)"
                  className="w-full h-16 pl-12 text-text-gray rounded-xl border-gray-200 text-lg"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full md:w-auto h-16 bg-blue-primary hover:bg-blue-primary-hover text-white rounded-xl px-10 flex items-center gap-3 transition-all duration-200 shadow-soft hover:shadow-soft-md text-lg font-semibold active:scale-98"
            >
              <Search className="h-6 w-6" /> Search
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <span className="text-white/80 text-lg font-medium mr-4">Popular:</span>
          {popularServices.map((service) => (
            <Button
              key={service.name}
              variant="outline"
              className={`rounded-lg border-2 bg-white/10 backdrop-blur-sm text-white hover:scale-105 transition-all duration-200 px-6 py-2 ${service.color}`}
            >
              {service.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
