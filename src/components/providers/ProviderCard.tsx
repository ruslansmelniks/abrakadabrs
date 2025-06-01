import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Database } from "@/types/supabase"
import { useTranslation } from "@/lib/hooks/useTranslation"

type Provider = Database['public']['Tables']['providers']['Row'] & {
  users: Database['public']['Tables']['users']['Row']
}

interface ProviderCardProps {
  provider: Provider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const { t } = useTranslation()
  
  return (
    <Link href={`/booking/${provider.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={provider.profile_photo_url || '/placeholder-avatar.png'}
              alt={provider.users.name}
              fill
              className="rounded-full object-cover"
            />
            {provider.verification_status === 'verified' && (
              <Badge className="absolute -bottom-1 -right-1" variant="default">
                ✓
              </Badge>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{provider.users.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{provider.rating?.toFixed(1) || '0.0'}</span>
              <span>({provider.total_reviews} {t('provider.reviews')})</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">€{provider.hourly_rate}</p>
            <p className="text-sm text-muted-foreground">{t('provider.perHour')}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {provider.bio}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{provider.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Available now</span>
            </div>
          </div>
          <div className="flex gap-1 mt-3">
            {provider.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {t(`home.categories.${category}`)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 