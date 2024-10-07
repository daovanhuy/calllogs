import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageSwitch: React.FC = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 font-medium py-1 px-2 rounded"
    >
      <span className="mr-2">{language === 'en' ? '🇺🇸' : '🇻🇳'}</span>
      {language === 'en' ? 'EN' : 'VN'}
    </button>
  )
}

export default LanguageSwitch