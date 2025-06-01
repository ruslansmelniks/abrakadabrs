"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

export default function SparkleCursor() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let sparkleId = 0

    const handleMouseMove = (e: MouseEvent) => {
      // Only show on desktop
      if (window.innerWidth < 768) return

      setIsVisible(true)

      // Add new sparkle at cursor position
      const newSparkle = {
        id: sparkleId++,
        x: e.clientX,
        y: e.clientY,
      }

      setSparkles((prev) => [...prev, newSparkle])

      // Remove old sparkles
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
      }, 1000)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-[9999] animate-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400 animate-ping" />
        </div>
      ))}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scale(0);
            opacity: 0;
          }
        }
        .animate-sparkle {
          animation: sparkle 1s ease-out forwards;
        }
      `}</style>
    </>
  )
}