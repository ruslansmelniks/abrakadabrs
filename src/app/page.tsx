import HeroSection from "@/app/components/sections/hero-section"
import ServiceCategoryCards from "@/app/components/sections/service-category-cards"
import HowItWorksSection from "@/app/components/sections/how-it-works-section"
import TrustSection from "@/app/components/sections/trust-section"
import FeaturedProvidersSection from "@/app/components/sections/featured-providers-section"
import Navbar from "@/app/components/layout/navbar"
import Footer from "@/app/components/layout/footer"
import MobileBottomNav from "@/app/components/ui/mobile-bottom-nav"
import SparkleCursor from "@/app/components/ui/sparkle-cursor"

export default function HomePage() {
  return (
    <>
      <SparkleCursor />
      <Navbar />
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <ServiceCategoryCards />
        <HowItWorksSection />
        <TrustSection />
        <FeaturedProvidersSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  )
}