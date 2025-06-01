import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface ServiceItem {
  name: string
  duration: string
  price: number
  unit: string
  description?: string
}

interface AddonItem {
  name: string
  price: number
  unit: string
}

interface PricingTableProps {
  services: ServiceItem[]
  additionalServices?: AddonItem[]
}

const PricingTable: React.FC<PricingTableProps> = ({ services, additionalServices }) => {
  return (
    <Card className="shadow-soft rounded-xl border-0 mt-4">
      <CardHeader>
        <CardTitle>Services & Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Service</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.name}>
                <TableCell className="font-medium text-charcoal">
                  {service.name}
                  {service.duration === "Package" && (
                    <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                      Package
                    </Badge>
                  )}
                  {service.description && <p className="text-xs text-text-gray mt-1">{service.description}</p>}
                </TableCell>
                <TableCell className="text-text-gray">{service.duration}</TableCell>
                <TableCell className="text-right font-semibold text-charcoal">
                  €{service.price}/{service.unit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {additionalServices && additionalServices.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-charcoal mb-3">Additional Services</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalServices.map((addon) => (
                  <TableRow key={addon.name}>
                    <TableCell className="font-medium text-charcoal">{addon.name}</TableCell>
                    <TableCell className="text-right font-semibold text-charcoal">
                      €{addon.price} ({addon.unit})
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PricingTable
