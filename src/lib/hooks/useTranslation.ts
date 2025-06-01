'use client'

import { useContext } from 'react'
import { LanguageContext } from '@/components/providers/language-provider'
import { translations, type Translation } from '@/i18n/translations'

export function useTranslation() {
  const { language } = useContext(LanguageContext)
  const t = translations[language]

  return {
    t,
    language,
  }
} 