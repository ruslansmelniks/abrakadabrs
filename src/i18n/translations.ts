export type Language = 'en' | 'lv'

export type Translation = {
  common: {
    loading: string
    error: string
    success: string
    save: string
    cancel: string
    delete: string
    edit: string
  }
  auth: {
    login: string
    signup: string
    logout: string
    email: string
    password: string
    forgotPassword: string
    resetPassword: string
  }
  booking: {
    create: string
    edit: string
    delete: string
    status: {
      pending: string
      confirmed: string
      cancelled: string
      completed: string
    }
  }
  provider: {
    profile: string
    services: string
    availability: string
    earnings: string
  }
  customer: {
    dashboard: string
    bookings: string
    browse: string
    profile: string
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
    },
    auth: {
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
    },
    booking: {
      create: 'Create Booking',
      edit: 'Edit Booking',
      delete: 'Delete Booking',
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled',
        completed: 'Completed',
      },
    },
    provider: {
      profile: 'Provider Profile',
      services: 'Services',
      availability: 'Availability',
      earnings: 'Earnings',
    },
    customer: {
      dashboard: 'Dashboard',
      bookings: 'My Bookings',
      browse: 'Browse Services',
      profile: 'My Profile',
    },
  },
  lv: {
    common: {
      loading: 'Ielādē...',
      error: 'Kļūda',
      success: 'Veiksmīgi',
      save: 'Saglabāt',
      cancel: 'Atcelt',
      delete: 'Dzēst',
      edit: 'Rediģēt',
    },
    auth: {
      login: 'Pieslēgties',
      signup: 'Reģistrēties',
      logout: 'Iziet',
      email: 'E-pasts',
      password: 'Parole',
      forgotPassword: 'Aizmirsi paroli?',
      resetPassword: 'Atiestatīt paroli',
    },
    booking: {
      create: 'Izveidot rezervāciju',
      edit: 'Rediģēt rezervāciju',
      delete: 'Dzēst rezervāciju',
      status: {
        pending: 'Gaida apstiprinājumu',
        confirmed: 'Apstiprināts',
        cancelled: 'Atcelts',
        completed: 'Pabeigts',
      },
    },
    provider: {
      profile: 'Pakalpojumu sniedzēja profils',
      services: 'Pakalpojumi',
      availability: 'Pieejamība',
      earnings: 'Ienākumi',
    },
    customer: {
      dashboard: 'Vadības panelis',
      bookings: 'Manas rezervācijas',
      browse: 'Pārlūkot pakalpojumus',
      profile: 'Mans profils',
    },
  },
}

export type TranslationKey = keyof typeof translations.en 