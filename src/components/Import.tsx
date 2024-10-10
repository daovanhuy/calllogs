import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { createClient } from '@supabase/supabase-js'

interface ImportHistory {
  id: string
  path: string
  log_message: string
  status: string
  file_type: string
  max_date_time: string
  min_date_time: string
  table_name: string
  import_creater_name: string
  created_date: string
}

const Import: React.FC = () => {
  const { language } = useLanguage()
  const [importHistory, setImportHistory] = useState<ImportHistory[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const supabase = createClient('https://wsaewpnrvbdlmawpoctr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzYWV3cG5ydmJkbG1hd3BvY3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODMwODQsImV4cCI6MjA0Mzk1OTA4NH0.FJodJVz2pwqWYsg7PAdsHXtfuUyoMYCl7vbryGzbHv0')

  const translations = {
    en: {
      title: 'Import History',
      id: 'ID',
      path: 'Path',
      logMessage: 'Log Message',
      status: 'Status',
      fileType: 'File Type',
      maxDateTime: 'Max Date Time',
      minDateTime: 'Min Date Time',
      tableName: 'Table Name',
      importCreatorName: 'Import Creator',
      createdDate: 'Created Date',
      previous: 'Previous',
      next: 'Next',
    },
    vn: {
      title: 'Lịch sử nhập',
      id: 'ID',
      path: 'Đường dẫn',
      logMessage: 'Thông báo nhật ký',
      status: 'Trạng thái',
      fileType: 'Loại tệp',
      maxDateTime: 'Thời gian tối đa',
      minDateTime: 'Thời gian tối thiểu',
      tableName: 'Tên bảng',
      importCreatorName: 'Người tạo nhập',
      createdDate: 'Ngày tạo',
      previous: 'Trước',
      next: 'Tiếp',
    },
  }

  const t = translations[language]

  useEffect(() => {
    fetchImportHistory()
  }, [currentPage])

  const fetchImportHistory = async () => {
    const { data, error } = await supabase
      .from('import_history')
      .select('*')
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
      .order('created_date', { ascending: false })

    if (error) {
      console.error('Error fetching import history:', error)
    } else {
      setImportHistory(data || [])
    }
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.title}</h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.id}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.path}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.logMessage}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.fileType}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.maxDateTime}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.minDateTime}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.tableName}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.importCreatorName}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.createdDate}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {importHistory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.path}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.log_message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.file_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.max_date_time).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.min_date_time).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.table_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.import_creater_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.created_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          {t.previous}
        </button>
        <span className="text-gray-700">
          Page {currentPage}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}

export default Import