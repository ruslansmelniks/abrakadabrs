import { useContext } from 'react'
import { LanguageContext } from '@/components/providers/language-provider'
import { translations, Language } from '@/i18n/translations'

export function useTranslation() {
  const { language } = useContext(LanguageContext)
  
  function t(path: string): string {
    const keys = path.split('.')
    let value: any = translations[language as Language]
    
    for (const key of keys) {
      value = value?.[key]
    }
    
    return value || path
  }
  
  return { t, language }
} 