import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface SearchHistory {
  id: number
  table_names: string
  start_timestamp: string
  query_duration: number
  status: string
  total_matched_records: number
  filter_conditions: string
  description: string
  query_creator_name: string
  created_date: string
}

const Search: React.FC = () => {
  const { language } = useLanguage()
  const [showNewSearch, setShowNewSearch] = useState(false)
  const [selectedSearchType, setSelectedSearchType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const translations = {
    en: {
      title: 'Search History',
      newSearch: 'Create New Search',
      searchType: 'Search Type',
      filters: 'Filters',
      id: 'ID',
      tableNames: 'Table Names',
      startTimestamp: 'Start Timestamp',
      queryDuration: 'Query Duration (ms)',
      status: 'Status',
      totalMatchedRecords: 'Total Matched Records',
      filterConditions: 'Filter Conditions',
      description: 'Description',
      queryCreatorName: 'Query Creator Name',
      createdDate: 'Created Date',
      previous: 'Previous',
      next: 'Next',
    },
    vn: {
      title: 'Lịch sử tìm kiếm',
      newSearch: 'Tạo tìm kiếm mới',
      searchType: 'Loại tìm kiếm',
      filters: 'Bộ lọc',
      id: 'ID',
      tableNames: 'Tên bảng',
      startTimestamp: 'Thời gian bắt đầu',
      queryDuration: 'Thời gian truy vấn (ms)',
      status: 'Trạng thái',
      totalMatchedRecords: 'Tổng số bản ghi phù hợp',
      filterConditions: 'Điều kiện lọc',
      description: 'Mô tả',
      queryCreatorName: 'Người tạo truy vấn',
      createdDate: 'Ngày tạo',
      previous: 'Trước',
      next: 'Tiếp',
    },
  }

  const t = translations[language]

  // Mock search history data
  const mockSearchHistory: SearchHistory[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    table_names: `Table ${i + 1}`,
    start_timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    query_duration: Math.floor(Math.random() * 1000),
    status: Math.random() > 0.5 ? 'Completed' : 'Failed',
    total_matched_records: Math.floor(Math.random() * 10000),
    filter_conditions: `Filter ${i + 1}`,
    description: `Description ${i + 1}`,
    query_creator_name: `User ${i + 1}`,
    created_date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }))

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = mockSearchHistory.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setShowNewSearch(true)}
        >
          {t.newSearch}
        </button>
      </div>

      {showNewSearch && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.newSearch}</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{t.searchType}</label>
            <select 
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              onChange={(e) => setSelectedSearchType(e.target.value)}
              value={selectedSearchType}
            >
              <option value="">Select a search type</option>
              {/* Add search type options here */}
            </select>
          </div>

          {selectedSearchType && (
            <div>
              <h4 className="text-md font-medium mb-2">{t.filters}</h4>
              {/* Add filter inputs here based on the selected search type */}
            </div>
          )}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.id}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.tableNames}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.startTimestamp}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.queryDuration}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.totalMatchedRecords}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.filterConditions}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.description}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.queryCreatorName}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.createdDate}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.table_names}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.start_timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.query_duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total_matched_records}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.filter_conditions}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.query_creator_name}</td>
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
          Page {currentPage} of {Math.ceil(mockSearchHistory.length / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(mockSearchHistory.length / itemsPerPage)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}

export default Search