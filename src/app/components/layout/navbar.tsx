"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const languages = [
  { code: "EN", name: "English" },
  { code: "LV", name: "Latviešu" },
  { code: "RU", name: "Русский" },
]

export default function Navbar() {
  const [currentLang, setCurrentLang] = useState(languages[0])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 ${
        scrolled ? "shadow-soft-md" : "border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-charcoal">
              Abrakadabra<span className="text-blue-primary">.lv</span>
            </span>
            <Sparkles className="w-6 h-6 text-blue-primary animate-pulse" />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-text-gray">
          <Link href="/browse" className="hover:text-blue-primary transition-colors duration-200">
            Browse Services
          </Link>
          <Link href="/become-a-provider" className="hover:text-blue-primary transition-colors duration-200">
            Become a Provider
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 text-sm text-text-gray">
            {languages.map((lang, index) => (
              <span key={lang.code}>
                <button
                  onClick={() => setCurrentLang(lang)}
                  className={`hover:text-blue-primary transition-colors duration-200 ${
                    currentLang.code === lang.code ? "text-blue-primary font-medium" : ""
                  }`}
                >
                  {lang.code}
                </button>
                {index < languages.length - 1 && <span className="text-gray-300 mx-1">|</span>}
              </span>
            ))}
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <Link href="/login" className="text-text-gray hover:text-blue-primary transition-colors duration-200">
            Log In
          </Link>
          <Button className="bg-blue-primary text-white hover:bg-blue-primary-hover transition-all duration-200 rounded-lg px-6 py-3 shadow-soft hover:shadow-soft-md">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Menu className="h-6 w-6 text-charcoal" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] bg-white p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-100">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <span className="text-xl font-bold text-charcoal">
                      Abrakadabra<span className="text-blue-primary">.lv</span>
                    </span>
                    <Sparkles className="w-5 h-5 text-blue-primary" />
                  </Link>
                </div>
                <nav className="flex-1 p-6">
                  <div className="space-y-1">
                    {[
                      { href: "/browse", label: "Browse Services" },
                      { href: "/become-a-provider", label: "Become a Provider" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-4 px-3 text-lg font-medium hover:text-blue-primary hover:bg-blue-primary/5 rounded-lg transition-all duration-200 active:scale-98"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="p-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-center gap-3 text-sm text-text-gray">
                    {languages.map((lang, index) => (
                      <span key={lang.code}>
                        <button
                          onClick={() => {
                            setCurrentLang(lang)
                            setMobileMenuOpen(false)
                          }}
                          className={`py-2 px-3 rounded-lg hover:text-blue-primary transition-colors duration-200 active:scale-95 ${
                            currentLang.code === lang.code ? "text-blue-primary font-medium bg-blue-primary/10" : ""
                          }`}
                        >
                          {lang.code}
                        </button>
                        {index < languages.length - 1 && <span className="text-gray-300 mx-1">|</span>}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/login"
                    className="block text-center py-3 text-text-gray hover:text-blue-primary transition-colors duration-200 active:scale-98"
                  >
                    Log In
                  </Link>
                  <Button className="bg-blue-primary text-white hover:bg-blue-primary-hover transition-all duration-200 rounded-xl px-6 py-4 shadow-soft hover:shadow-soft-md w-full text-lg active:scale-98">
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
