import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { createClient } from '@supabase/supabase-js'
import { Search as SearchIcon } from 'lucide-react'
import CreateSearch from './CreateSearch'

interface SearchResult {
  id: string
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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showNewSearch, setShowNewSearch] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const itemsPerPage = 10

  const supabase = createClient('https://wsaewpnrvbdlmawpoctr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzYWV3cG5ydmJkbG1hd3BvY3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODMwODQsImV4cCI6MjA0Mzk1OTA4NH0.FJodJVz2pwqWYsg7PAdsHXtfuUyoMYCl7vbryGzbHv0')

  const translations = {
    en: {
      title: 'Search History',
      newSearch: 'New Search',
      searchPlaceholder: 'Search in history...',
      id: 'ID',
      tableNames: 'Table Names',
      startTimestamp: 'Start Time',
      queryDuration: 'Duration (ms)',
      status: 'Status',
      totalMatchedRecords: 'Matched Records',
      filterConditions: 'Filter Conditions',
      description: 'Description',
      queryCreatorName: 'Creator',
      createdDate: 'Created Date',
      previous: 'Previous',
      next: 'Next',
    },
    vn: {
      title: 'Lịch sử tìm kiếm',
      newSearch: 'Tìm kiếm mới',
      searchPlaceholder: 'Tìm kiếm trong lịch sử...',
      id: 'ID',
      tableNames: 'Tên bảng',
      startTimestamp: 'Thời gian bắt đầu',
      queryDuration: 'Thời gian (ms)',
      status: 'Trạng thái',
      totalMatchedRecords: 'Số bản ghi phù hợp',
      filterConditions: 'Điều kiện lọc',
      description: 'Mô tả',
      queryCreatorName: 'Người tạo',
      createdDate: 'Ngày tạo',
      previous: 'Trước',
      next: 'Tiếp',
    },
  }

  const t = translations[language]

  useEffect(() => {
    fetchSearchHistory()
  }, [currentPage, textSearch])

  const fetchSearchHistory = async () => {
    let query = supabase
      .from('querylog')
      .select('*')
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
      .order('created_date', { ascending: false })

    if (textSearch) {
      query = query.or(`description.ilike.%${textSearch}%,filter_conditions.ilike.%${textSearch}%,query_creator_name.ilike.%${textSearch}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching search history:', error)
    } else {
      setSearchResults(data || [])
    }
  }

  const handleNewSearch = () => {
    setShowNewSearch(true)
  }

  const handleCloseNewSearch = () => {
    setShowNewSearch(false)
  }

  const handleSearchSubmit = (searchData: any) => {
    console.log('Search submitted:', searchData)
    // Here you would typically send the search data to your backend
    // and then refresh the search history
    setShowNewSearch(false)
    fetchSearchHistory()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <button
          onClick={handleNewSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {t.newSearch}
        </button>
      </div>

      <div className="flex items-center bg-white shadow rounded-lg overflow-hidden px-2 py-1">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          className="flex-grow outline-none text-gray-600 focus:text-blue-600 px-2 py-1"
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
        />
        <SearchIcon className="text-gray-500 mr-2" size={20} />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
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
            {searchResults.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.table_names}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(result.start_timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.query_duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.total_matched_records}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.filter_conditions}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.query_creator_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(result.created_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          {t.previous}
        </button>
        <span className="text-gray-700">
          Page {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          {t.next}
        </button>
      </div>

      {showNewSearch && (
        <CreateSearch
          onClose={handleCloseNewSearch}
          onSubmit={handleSearchSubmit}
        />
      )}
    </div>
  )
}

export default Search