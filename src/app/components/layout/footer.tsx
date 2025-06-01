import HeroSection from "@/components/sections/hero-section"
import ServiceCategoryCards from "@/components/sections/service-category-cards"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import TrustSection from "@/components/sections/trust-section"
import FeaturedProvidersSection from "@/components/sections/featured-providers-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCategoryCards />
      <HowItWorksSection />
      <TrustSection />
      <FeaturedProvidersSection />
    </>
  )
}
