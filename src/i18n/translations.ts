export const translations = {
  en: {
    common: {
      search: "Search",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      dashboard: "Dashboard",
      profile: "Profile",
      bookings: "Bookings",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      back: "Back"
    },
    home: {
      title: "Find trusted local help in Riga",
      subtitle: "Book verified professionals for your home and family",
      searchPlaceholder: "What service do you need?",
      categories: {
        babysitter: "Babysitters",
        dog_walker: "Dog Walkers",
        pet_sitter: "Pet Sitters",
        cleaner: "Cleaners",
        handyman: "Handymen"
      },
      howItWorks: {
        title: "How it works",
        step1: {
          title: "Search",
          description: "Find the perfect professional for your needs"
        },
        step2: {
          title: "Book",
          description: "Schedule and pay securely online"
        },
        step3: {
          title: "Relax",
          description: "Get the help you need from verified professionals"
        }
      }
    },
    auth: {
      loginTitle: "Welcome back",
      signupTitle: "Create an account",
      email: "Email",
      password: "Password",
      name: "Full Name",
      phone: "Phone Number",
      userType: "I want to",
      customerType: "Find services",
      providerType: "Offer services",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?"
    },
    booking: {
      selectDate: "Select Date",
      selectTime: "Select Time",
      addNotes: "Add Notes (optional)",
      duration: "Duration",
      price: "Price",
      total: "Total",
      bookNow: "Book Now",
      confirmBooking: "Confirm Booking",
      bookingConfirmed: "Booking Confirmed!",
      paymentRequired: "Payment Required"
    },
    provider: {
      aboutMe: "About Me",
      services: "Services",
      availability: "Availability",
      reviews: "Reviews",
      hourlyRate: "Hourly Rate",
      perHour: "/hour",
      verified: "Verified",
      notVerified: "Not Verified",
      memberSince: "Member since",
      responseTime: "Usually responds within",
      languages: "Languages",
      workPhotos: "Work Photos"
    }
  },
  lv: {
    common: {
      search: "Meklēt",
      login: "Pieslēgties",
      signup: "Reģistrēties",
      logout: "Iziet",
      dashboard: "Vadības panelis",
      profile: "Profils",
      bookings: "Rezervācijas",
      cancel: "Atcelt",
      confirm: "Apstiprināt",
      save: "Saglabāt",
      back: "Atpakaļ"
    },
    home: {
      title: "Atrodi uzticamu vietējo palīdzību Rīgā",
      subtitle: "Rezervē verificētus profesionāļus mājai un ģimenei",
      searchPlaceholder: "Kāds pakalpojums jums nepieciešams?",
      categories: {
        babysitter: "Aukles",
        dog_walker: "Suņu pastaigu vadītāji",
        pet_sitter: "Mājdzīvnieku pieskatītāji",
        cleaner: "Apkopēji",
        handyman: "Meistari"
      }
    }
  },
  ru: {
    common: {
      search: "Поиск",
      login: "Войти",
      signup: "Регистрация",
      logout: "Выйти",
      dashboard: "Панель управления",
      profile: "Профиль",
      bookings: "Бронирования",
      cancel: "Отменить",
      confirm: "Подтвердить",
      save: "Сохранить",
      back: "Назад"
    },
    home: {
      title: "Найдите надёжную местную помощь в Риге",
      subtitle: "Бронируйте проверенных специалистов для дома и семьи",
      searchPlaceholder: "Какая услуга вам нужна?",
      categories: {
        babysitter: "Няни",
        dog_walker: "Выгульщики собак",
        pet_sitter: "Присмотр за питомцами",
        cleaner: "Уборщики",
        handyman: "Мастера"
      }
    }
  }
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en 