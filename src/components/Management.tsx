import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Management: React.FC = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'Management',
      userManagement: 'User Management',
      configuration: 'Configuration',
      maxCacheSize: 'Maximum Cache Size',
      autoCacheSearch: 'Auto Cache Long-Running Searches',
      dbMoveToS3: 'Time to Move DB to S3 Storage',
      defaultTimeRange: 'Default Time Range',
      // Add more translations as needed
    },
    vn: {
      title: 'Quản lý',
      userManagement: 'Quản lý người dùng',
      configuration: 'Cấu hình',
      maxCacheSize: 'Kích thước bộ nhớ đệm tối đa',
      autoCacheSearch: 'Tự động lưu trữ tìm kiếm chạy lâu',
      dbMoveToS3: 'Thời gian chuyển DB sang S3',
      defaultTimeRange: 'Phạm vi thời gian mặc định',
      // Add more translations as needed
    },
  }

  const t = translations[language]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.title}</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{t.userManagement}</h3>
        {/* Add user management content here */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{t.configuration}</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.maxCacheSize}</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <span className="ml-2">{t.autoCacheSearch}</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.dbMoveToS3}</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.defaultTimeRange}</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="3 months" />
          </div>
          {/* Add more configuration options as needed */}
        </form>
      </div>
    </div>
  )
}

export default Management