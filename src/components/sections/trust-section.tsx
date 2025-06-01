'use client'

import { useTranslation } from '@/lib/hooks/useTranslation'

export default function TrustSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Trust Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Verified Providers</h3>
            <p>All our service providers are thoroughly vetted and verified</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
            <p>Your payments are protected with industry-standard security</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
            <p>Our customer support team is always here to help you</p>
          </div>
        </div>
      </div>
    </section>
  )
} 