import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Clock, Repeat, Users } from "lucide-react"

interface StatItemProps {
  icon: React.ElementType
  value: string | number
  label: string
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center text-center p-3">
    <Icon className="w-8 h-8 text-blue-primary mb-2" />
    <p className="text-xl font-bold text-charcoal">{value}</p>
    <p className="text-xs text-text-gray">{label}</p>
  </div>
)

interface StatsBarProps {
  stats: {
    totalBookings: number
    yearsExperience: number
    avgResponseTime: string
    repeatClientRate: number
  }
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <Card className="shadow-soft rounded-xl border-0">
      <CardContent className="p-4 md:p-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-0 divide-x-0 sm:divide-x divide-gray-200">
          <StatItem icon={Users} value={stats.totalBookings + "+"} label="Bookings Completed" />
          <StatItem icon={Briefcase} value={stats.yearsExperience + "+"} label="Years Experience" />
          <StatItem icon={Clock} value={stats.avgResponseTime} label="Avg. Response Time" />
          <StatItem icon={Repeat} value={stats.repeatClientRate + "%"} label="Repeat Client Rate" />
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsBar
