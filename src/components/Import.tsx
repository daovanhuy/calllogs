import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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

  // Mock import history data
  const mockImportHistory: ImportHistory[] = Array.from({ length: 50 }, (_, i) => ({
    id: `import-${i + 1}`,
    path: `/path/to/import/file-${i + 1}.csv`,
    log_message: `Import log message ${i + 1}`,
    status: Math.random() > 0.5 ? 'Completed' : 'Failed',
    file_type: 'CSV',
    max_date_time: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    min_date_time: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    table_name: `Table_${i % 5 + 1}`,
    import_creater_name: `User ${i % 10 + 1}`,
    created_date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }))

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = mockImportHistory.slice(indexOfFirstItem, indexOfLastItem)

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
            {currentItems.map((item) => (
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
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          {t.previous}
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {Math.ceil(mockImportHistory.length / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(mockImportHistory.length / itemsPerPage)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}

export default Import