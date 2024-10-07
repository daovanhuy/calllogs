import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Dashboard: React.FC = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'Dashboard',
      componentStatus: 'Component Status',
      resourceUsage: 'Resource Usage',
      importRecords: 'Import Records',
      searchStats: 'Search Statistics',
      cacheTable: 'Cache Table',
      last24h: 'Last 24h',
      lastWeek: 'Last Week',
      total: 'Total',
      successDone: 'Success/Done',
      userCancel: 'User Cancel',
    },
    vn: {
      title: 'Bảng điều khiển',
      componentStatus: 'Trạng thái thành phần',
      resourceUsage: 'Sử dụng tài nguyên',
      importRecords: 'Bản ghi nhập',
      searchStats: 'Thống kê tìm kiếm',
      cacheTable: 'Bảng bộ nhớ đệm',
      last24h: '24 giờ qua',
      lastWeek: 'Tuần trước',
      total: 'Tổng cộng',
      successDone: 'Thành công/Hoàn thành',
      userCancel: 'Người dùng hủy',
    },
  }

  const t = translations[language]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.componentStatus}</h3>
          {/* Add component status content */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.resourceUsage}</h3>
          {/* Add resource usage content */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.importRecords}</h3>
          <ul>
            <li>{t.last24h}: 100</li>
            <li>{t.lastWeek}: 750</li>
            <li>{t.total}: 10,000</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.searchStats}</h3>
          <ul>
            <li>{t.successDone}:</li>
            <li className="ml-4">{t.last24h}: 500</li>
            <li className="ml-4">{t.lastWeek}: 3,500</li>
            <li className="ml-4">{t.total}: 50,000</li>
            <li>{t.userCancel}:</li>
            <li className="ml-4">{t.last24h}: 50</li>
            <li className="ml-4">{t.lastWeek}: 350</li>
            <li className="ml-4">{t.total}: 5,000</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.cacheTable}</h3>
          {/* Add cache table content */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard