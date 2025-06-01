import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

interface BadgeItem {
  icon: React.ElementType
  label: string
  description: string
  date?: string
}

interface LicenseItem {
  name: string
  authority: string
  date?: string
}

interface TrustIndicatorsProps {
  trustData: {
    verificationBadges: BadgeItem[]
    insuranceCoverage: string
    licenses?: LicenseItem[]
  }
}

const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ trustData }) => {
  return (
    <Card className="shadow-soft rounded-xl border-0 mt-4">
      <CardHeader>
        <CardTitle>Trust & Safety</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-md font-semibold text-charcoal mb-3">Verifications</h4>
          <ul className="space-y-3">
            {trustData.verificationBadges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <badge.icon className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-700">
                    {badge.label}
                    {badge.date && <span className="text-xs text-green-600/80 ml-1">({badge.date})</span>}
                  </p>
                  <p className="text-xs text-green-600/90">{badge.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold text-charcoal mb-2">Insurance</h4>
          <p className="text-sm text-text-gray p-3 bg-blue-50 rounded-lg border border-blue-200">
            {trustData.insuranceCoverage}
          </p>
        </div>

        {trustData.licenses && trustData.licenses.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-charcoal mb-3">Licenses & Certifications</h4>
            <ul className="space-y-2">
              {trustData.licenses.map((license) => (
                <li key={license.name} className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-medium text-charcoal">{license.name}</p>
                  <p className="text-xs text-text-gray">Authority: {license.authority}</p>
                  {license.date && <p className="text-xs text-text-gray">Date/Expires: {license.date}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TrustIndicators
