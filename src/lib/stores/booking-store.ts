'use client'

import { create } from 'zustand'

export type Provider = {
  id: string
  name: string
  email: string
  phone: string
  hourlyRate: number
  createdAt: Date
  updatedAt: Date
}

export type Booking = {
  id: string
  providerId: string
  customerId: string
  serviceId: string
  date: Date
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: Date
  updatedAt: Date
}

interface BookingState {
  provider: Provider | null
  date: Date | null
  startTime: string | null
  endTime: string | null
  duration: number
  notes: string
  bookings: Booking[]
  setProvider: (provider: Provider) => void
  setDateTime: (date: Date, startTime: string, endTime: string) => void
  setNotes: (notes: string) => void
  calculatePrice: () => number
  reset: () => void
  setBookings: (bookings: Booking[]) => void
  addBooking: (booking: Booking) => void
  updateBooking: (id: string, booking: Partial<Booking>) => void
  removeBooking: (id: string) => void
}

const initialState: Omit<BookingState, 'setProvider' | 'setDateTime' | 'setNotes' | 'calculatePrice' | 'reset' | 'setBookings' | 'addBooking' | 'updateBooking' | 'removeBooking'> = {
  provider: null,
  date: null,
  startTime: null,
  endTime: null,
  duration: 1,
  notes: '',
  bookings: [],
}

export const useBookingStore = create<BookingState>()((set, get) => ({
  ...initialState,
  
  setProvider: (provider) => set({ provider }),
  
  setDateTime: (date, startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}`)
    const end = new Date(`1970-01-01T${endTime}`)
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    
    set({ date, startTime, endTime, duration })
  },
  
  setNotes: (notes) => set({ notes }),
  
  calculatePrice: () => {
    const { provider, duration } = get()
    if (!provider) return 0
    return provider.hourlyRate * duration
  },
  
  reset: () => set(initialState),
  
  setBookings: (bookings) => set({ bookings }),
  
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  
  updateBooking: (id, booking) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...booking } : b)),
    })),
  
  removeBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),
})) 