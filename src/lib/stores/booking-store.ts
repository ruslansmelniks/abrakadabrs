import { create } from 'zustand'
import { Database } from '@/types/supabase'

type Provider = Database['public']['Tables']['providers']['Row']

interface BookingState {
  provider: Provider | null
  date: Date | null
  startTime: string | null
  endTime: string | null
  duration: number
  notes: string
  setProvider: (provider: Provider) => void
  setDateTime: (date: Date, startTime: string, endTime: string) => void
  setNotes: (notes: string) => void
  calculatePrice: () => number
  reset: () => void
}

export const useBookingStore = create<BookingState>((set, get) => ({
  provider: null,
  date: null,
  startTime: null,
  endTime: null,
  duration: 1,
  notes: '',
  
  setProvider: (provider) => set({ provider }),
  
  setDateTime: (date, startTime, endTime) => {
    const start = new Date(`2000-01-01 ${startTime}`)
    const end = new Date(`2000-01-01 ${endTime}`)
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    set({ date, startTime, endTime, duration })
  },
  
  setNotes: (notes) => set({ notes }),
  
  calculatePrice: () => {
    const state = get()
    if (!state.provider) return 0
    return state.provider.hourly_rate * state.duration
  },
  
  reset: () => set({
    provider: null,
    date: null,
    startTime: null,
    endTime: null,
    duration: 1,
    notes: ''
  })
})) 