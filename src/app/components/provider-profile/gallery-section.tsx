"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Maximize, X } from "lucide-react"

interface Photo {
  id: string
  url: string
  caption?: string
  beforeUrl?: string // For before/after
}

interface GallerySectionProps {
  photos: Photo[]
  providerName: string
}

const GallerySection: React.FC<GallerySectionProps> = ({ photos, providerName }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null)
  const [showAfter, setShowAfter] = useState(true) // For before/after toggle

  if (!photos || photos.length === 0) {
    return null // Or a placeholder message
  }

  const openLightbox = (photo: Photo) => {
    setCurrentPhoto(photo)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setCurrentPhoto(null)
  }

  return (
    <>
      <Card className="shadow-soft rounded-xl border-0 mt-4">
        <CardHeader>
          <CardTitle>Photo Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group relative cursor-pointer"
                onClick={() => openLightbox(photo)}
              >
                <Image
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.caption || `${providerName}'s work sample`}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <Maximize className="w-8 h-8 text-white" />
                </div>
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-xs truncate">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
          {photos.some((p) => p.beforeUrl) && (
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={() => setShowAfter(!showAfter)} className="rounded-lg">
                Toggle Before/After (Placeholder)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {lightboxOpen && currentPhoto && (
        <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative bg-white p-4 rounded-lg shadow-xl max-w-3xl max-h-[90vh]">
            <button
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-charcoal" />
            </button>
            <Image
              src={(showAfter ? currentPhoto.url : currentPhoto.beforeUrl) || currentPhoto.url || "/placeholder.svg"}
              alt={currentPhoto.caption || "Enlarged view"}
              width={800}
              height={600}
              objectFit="contain"
              className="max-h-[calc(90vh-80px)] rounded"
            />
            {currentPhoto.caption && <p className="mt-2 text-center text-sm text-text-gray">{currentPhoto.caption}</p>}
          </div>
        </div>
      )}
    </>
  )
}

export default GallerySection
