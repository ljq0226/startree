import { useTranslations } from 'next-intl'

export default function useI18n(namespace?: string) {
  return useTranslations(namespace)
}
