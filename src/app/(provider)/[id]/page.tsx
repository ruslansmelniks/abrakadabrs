"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Clock, MessageSquare, CalendarDays, ShieldCheck, CheckCircle, Award } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import new sub-components
import StatsBar from "@/components/provider-profile/stats-bar"
import GallerySection from "@/components/provider-profile/gallery-section"
import PricingTable from "@/components/provider-profile/pricing-table"
import TrustIndicators from "@/components/provider-profile/trust-indicators"

// Enhanced Mock data
const mockProvider = {
  id: "1",
  name: "Anna Bērziņa",
  title: "Experienced & Caring Babysitter",
  location: "Centrs, Rīga",
  profilePhoto: "/placeholder.svg?height=200&width=200",
  rating: 4.9,
  reviewCount: 127,
  responseTime: "~1 hour",
  memberSince: "Joined Jan 2023",
  bio: "Hi, I'm Anna! I have over 5 years of experience caring for children of all ages. I'm CPR certified, love pets, and believe in creating a fun, safe, and engaging environment for your little ones. I enjoy reading, arts & crafts, and outdoor play. Looking forward to meeting your family!",
  stats: {
    totalBookings: 250,
    yearsExperience: 5,
    avgResponseTime: "1 hour",
    repeatClientRate: 75, // percentage
  },
  services: [
    {
      name: "Evening Babysitting",
      duration: "Per Hour",
      price: 12,
      unit: "hr",
      description: "Care for children aged 6 months to 10 years.",
    },
    {
      name: "Weekend Care",
      duration: "Per Hour",
      price: 15,
      unit: "hr",
      description: "Available for longer weekend bookings.",
    },
    {
      name: "After School Pickup",
      duration: "Per Hour",
      price: 10,
      unit: "hr",
      description: "Pickup from school and care until parents return.",
    },
    {
      name: "Full Day Care (8 hours)",
      duration: "Package",
      price: 80,
      unit: "day",
      description: "Discounted rate for full-day care.",
    },
  ],
  additionalServices: [
    { name: "Light meal preparation", price: 5, unit: "add-on" },
    { name: "Homework help", price: 7, unit: "add-on" },
  ],
  photos: [
    // For gallery - more relevant for cleaners/handymen, but can be used for babysitter's play area etc.
    { id: "p1", url: "/placeholder.svg?height=300&width=400", caption: "Our Play Area Setup" },
    { id: "p2", url: "/placeholder.svg?height=300&width=400", caption: "Arts & Crafts Time" },
    { id: "p3", url: "/placeholder.svg?height=300&width=400", caption: "Outdoor Fun" },
    { id: "p4", url: "/placeholder.svg?height=300&width=400", caption: "Story Time" },
  ],
  reviews: [
    {
      id: "r1",
      customerName: "Laura K.",
      customerPhoto: "/placeholder.svg?height=40&width=40",
      date: "May 15, 2025",
      rating: 5,
      text: "Anna was fantastic with our two kids! She was punctual, communicative, and the kids loved her. Highly recommend!",
    },
    {
      id: "r2",
      customerName: "Jānis P.",
      customerPhoto: "/placeholder.svg?height=40&width=40",
      date: "Apr 28, 2025",
      rating: 5,
      text: "Very reliable and trustworthy. Our son asks when Anna is coming back!",
    },
  ],
  trustData: {
    verificationBadges: [
      { icon: ShieldCheck, label: "Verified ID", description: "Identity confirmed via official ID document." },
      {
        icon: CheckCircle,
        label: "Background Check Passed",
        date: "Mar 2025",
        description: "National criminal background check completed.",
      },
      { icon: Award, label: "CPR Certified", description: "Certified in Cardiopulmonary Resuscitation." },
    ],
    insuranceCoverage: "Covered by Abrakadabra.lv's €1M liability insurance.",
    licenses: [{ name: "First Aid Certification", authority: "Red Cross Latvia", date: "Expires Dec 2025" }],
  },
}

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-5 h-5 ${i < Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ))

export default function ProviderProfilePage() {
  const params = useParams()
  const providerId = params.id as string
  const provider = mockProvider

  if (!provider) return <div>Loading provider...</div>

  return (
    <div className="bg-light-gray min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Header Section */}
            <Card className="shadow-soft rounded-xl border-0">
              <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <Image
                  src={provider.profilePhoto || "/placeholder.svg"}
                  alt={provider.name}
                  width={150}
                  height={150}
                  className="rounded-full sm:rounded-lg object-cover flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40"
                />
                <div className="flex-grow text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-charcoal mb-1">{provider.name}</h1>
                  <p className="text-blue-primary font-medium mb-2">{provider.title}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                    {renderStars(provider.rating)}
                    <span className="text-sm text-text-gray ml-1">({provider.reviewCount} reviews)</span>
                  </div>
                  <p className="text-sm text-text-gray mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {provider.location}
                  </p>
                  <p className="text-xs text-text-gray mb-1">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    Responds in {provider.responseTime}
                  </p>
                  <p className="text-xs text-text-gray mb-3">{provider.memberSince}</p>
                  <div className="flex gap-3 justify-center sm:justify-start">
                    <Button className="bg-blue-primary hover:bg-blue-primary-hover text-white rounded-lg active:scale-98">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="rounded-lg active:scale-98">
                      View Availability
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Bar */}
            <StatsBar stats={provider.stats} />

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-gray-200 rounded-lg p-1">
                <TabsTrigger value="about" className="rounded-md">
                  About
                </TabsTrigger>
                <TabsTrigger value="services" className="rounded-md">
                  Services
                </TabsTrigger>
                <TabsTrigger value="gallery" className="rounded-md">
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-md">
                  Reviews ({provider.reviewCount})
                </TabsTrigger>
                <TabsTrigger value="trust" className="rounded-md">
                  Trust & Safety
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card className="shadow-soft rounded-xl border-0 mt-4">
                  <CardHeader>
                    <CardTitle>About {provider.name.split(" ")[0]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-gray leading-relaxed whitespace-pre-line">{provider.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services">
                <PricingTable services={provider.services} additionalServices={provider.additionalServices} />
              </TabsContent>

              <TabsContent value="gallery">
                <GallerySection photos={provider.photos} providerName={provider.name} />
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="shadow-soft rounded-xl border-0 mt-4">
                  <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {provider.reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="flex gap-4">
                        <Image
                          src={review.customerPhoto || "/placeholder.svg"}
                          alt={review.customerName}
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10 object-cover"
                        />
                        <div>
                          <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-charcoal">{review.customerName}</h5>
                            <p className="text-xs text-text-gray">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-0.5 my-1">{renderStars(review.rating)}</div>
                          <p className="text-sm text-text-gray leading-relaxed">{review.text}</p>
                        </div>
                      </div>
                    ))}
                    {provider.reviews.length > 5 && (
                      <Button variant="outline" className="w-full rounded-lg active:scale-98">
                        Load More Reviews
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trust">
                <TrustIndicators trustData={provider.trustData} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sticky Booking Card (Desktop) */}
          <div className="lg:w-1/3">
            <Card className="shadow-soft rounded-xl border-0 sticky top-28">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Book {provider.name.split(" ")[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-primary">
                    €{provider.services[0]?.price || "N/A"}
                    <span className="text-base font-normal text-text-gray">
                      /{provider.services[0]?.unit || "service"}
                    </span>
                  </p>
                  <p className="text-xs text-text-gray">Starting rate</p>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-text-gray">
                  <CalendarDays className="w-12 h-12 text-gray-400 mr-2" /> Availability Calendar Placeholder
                </div>
                <Button
                  size="lg"
                  className="w-full bg-blue-primary hover:bg-blue-primary-hover text-white rounded-lg text-lg py-3 active:scale-98"
                >
                  Request to Book
                </Button>
                <p className="text-xs text-text-gray text-center">You won't be charged yet</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
