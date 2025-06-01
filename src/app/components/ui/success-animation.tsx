"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

interface SuccessAnimationProps {
  show: boolean
  onComplete?: () => void
}

export function SuccessAnimation({ show, onComplete }: SuccessAnimationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-full p-4 shadow-soft-lg animate-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white animate-in zoom-in duration-500 delay-200" />
        </div>
      </div>
      {/* Subtle confetti effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-primary rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1000}ms`,
              animationDuration: `${1000 + Math.random() * 1000}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
