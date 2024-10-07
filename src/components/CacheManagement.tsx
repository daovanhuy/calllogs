import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Trash2 } from 'lucide-react'

interface CacheEntry {
  cache_name: string
  original_table_name: string
  json_filter: string
  sql_conditional: string
  create_date: string
  total_rows: number
  max_date_time: string
  min_date_time: string
}

const CacheManagement: React.FC = () => {
  const { language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const translations = {
    en: {
      title: 'Cache Management',
      cacheName: 'Cache Name',
      originalTableName: 'Original Table Name',
      jsonFilter: 'JSON Filter',
      sqlConditional: 'SQL Conditional',
      createDate: 'Create Date',
      totalRows: 'Total Rows',
      maxDateTime: 'Max Date Time',
      minDateTime: 'Min Date Time',
      actions: 'Actions',
      remove: 'Remove',
      previous: 'Previous',
      next: 'Next',
    },
    vn: {
      title: 'Quản lý bộ nhớ đệm',
      cacheName: 'Tên bộ nhớ đệm',
      originalTableName: 'Tên bảng gốc',
      jsonFilter: 'Bộ lọc JSON',
      sqlConditional: 'Điều kiện SQL',
      createDate: 'Ngày tạo',
      totalRows: 'Tổng số hàng',
      maxDateTime: 'Thời gian tối đa',
      minDateTime: 'Thời gian tối thiểu',
      actions: 'Hành động',
      remove: 'Xóa',
      previous: 'Trước',
      next: 'Tiếp',
    },
  }

  const t = translations[language]

  // Mock cache data
  const mockCacheData: CacheEntry[] = Array.from({ length: 50 }, (_, i) => ({
    cache_name: `Cache ${i + 1}`,
    original_table_name: `Table ${i + 1}`,
    json_filter: `{"filter": "condition ${i + 1}"}`,
    sql_conditional: `WHERE column = ${i + 1}`,
    create_date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    total_rows: Math.floor(Math.random() * 10000),
    max_date_time: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    min_date_time: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }))

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = mockCacheData.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleRemoveCache = (cacheName: string) => {
    // Here you would typically call an API to remove the cache
    console.log(`Removing cache: ${cacheName}`)
    // After successful removal, you would update the state to reflect the change
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.title}</h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.cacheName}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.originalTableName}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.jsonFilter}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.sqlConditional}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.createDate}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.totalRows}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.maxDateTime}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.minDateTime}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.cache_name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.cache_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.original_table_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.json_filter}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sql_conditional}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.create_date).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total_rows}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.max_date_time).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.min_date_time).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleRemoveCache(item.cache_name)}
                    className="text-red-600 hover:text-red-900"
                    title={t.remove}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          {t.previous}
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {Math.ceil(mockCacheData.length / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(mockCacheData.length / itemsPerPage)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}

export default CacheManagement