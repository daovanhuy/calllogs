import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import searchConfig from '../config/searchConfig.json'
import locations from '../config/locations.json'

interface CreateSearchProps {
  onClose: () => void
  onSubmit: (searchData: any) => void
}

const CreateSearch: React.FC<CreateSearchProps> = ({ onClose, onSubmit }) => {
  const { language } = useLanguage()
  const [selectedSearchType, setSelectedSearchType] = useState('')
  const [searchInputs, setSearchInputs] = useState<Record<string, string>>({})
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [selectedTables, setSelectedTables] = useState<string[]>([])
  const [showTableSelection, setShowTableSelection] = useState(false)

  const translations = {
    en: {
      title: 'Create New Search',
      searchType: 'Search Type',
      tables: 'Tables',
      selectAllTables: 'Select All Tables',
      submit: 'Submit',
      cancel: 'Cancel',
      city: 'City',
      district: 'District',
      ward: 'Ward',
      showTableSelection: 'Select Specific Tables',
      hideTableSelection: 'Hide Table Selection',
      allTablesSelected: 'All Tables Selected',
      someTablesSelected: '{count} Tables Selected',
    },
    vn: {
      title: 'Tạo tìm kiếm mới',
      searchType: 'Loại tìm kiếm',
      tables: 'Bảng dữ liệu',
      selectAllTables: 'Chọn tất cả bảng',
      submit: 'Gửi',
      cancel: 'Hủy',
      city: 'Thành phố',
      district: 'Quận/Huyện',
      ward: 'Phường/Xã',
      showTableSelection: 'Chọn bảng cụ thể',
      hideTableSelection: 'Ẩn lựa chọn bảng',
      allTablesSelected: 'Đã chọn tất cả bảng',
      someTablesSelected: 'Đã chọn {count} bảng',
    },
  }

  const t = translations[language]

  // Mock list of tables - replace this with actual table names from your database
  const allTables = ['Users', 'Transactions', 'Products', 'Orders', 'Customers']

  useEffect(() => {
    // Initialize with all tables selected
    setSelectedTables(allTables)
  }, [])

  const handleInputChange = (id: string, value: string) => {
    setSearchInputs(prev => ({ ...prev, [id]: value }))
  }

  const handleTableSelection = (table: string) => {
    setSelectedTables(prev => 
      prev.includes(table) 
        ? prev.filter(t => t !== table)
        : [...prev, table]
    )
  }

  const handleSelectAllTables = () => {
    setSelectedTables(selectedTables.length === allTables.length ? [] : [...allTables])
  }

  const handleSubmit = () => {
    const searchData = {
      type: selectedSearchType,
      tables: selectedTables,
      inputs: searchInputs,
      location: {
        city: selectedCity,
        district: selectedDistrict,
        ward: selectedWard,
      },
    }
    onSubmit(searchData)
  }

  const renderInput = (input: any) => {
    switch (input.type) {
      case 'phone':
        return (
          <input
            type="tel"
            id={input.id}
            value={searchInputs[input.id] || ''}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            pattern={input.pattern}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        )
      case 'dateRange':
        return (
          <div className="flex space-x-2">
            <input
              type="date"
              id={`${input.id}-start`}
              value={searchInputs[`${input.id}-start`] || ''}
              onChange={(e) => handleInputChange(`${input.id}-start`, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <input
              type="date"
              id={`${input.id}-end`}
              value={searchInputs[`${input.id}-end`] || ''}
              onChange={(e) => handleInputChange(`${input.id}-end`, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        )
      case 'text':
      default:
        return (
          <input
            type="text"
            id={input.id}
            value={searchInputs[input.id] || ''}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        )
    }
  }

  const getTableSelectionText = () => {
    if (selectedTables.length === allTables.length) {
      return t.allTablesSelected
    }
    return t.someTablesSelected.replace('{count}', selectedTables.length.toString())
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="searchType" className="block text-sm font-medium text-gray-700">{t.searchType}</label>
          <select
            id="searchType"
            value={selectedSearchType}
            onChange={(e) => setSelectedSearchType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">Select a search type</option>
            {searchConfig.searchTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setShowTableSelection(!showTableSelection)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
          >
            <span>{showTableSelection ? t.hideTableSelection : t.showTableSelection}</span>
            {showTableSelection ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {!showTableSelection && (
            <p className="mt-2 text-sm text-gray-600">{getTableSelectionText()}</p>
          )}
          {showTableSelection && (
            <div className="mt-2 space-y-2">
              <button
                onClick={handleSelectAllTables}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {t.selectAllTables}
              </button>
              {allTables.map(table => (
                <div key={table} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`table-${table}`}
                    checked={selectedTables.includes(table)}
                    onChange={() => handleTableSelection(table)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`table-${table}`} className="ml-2 block text-sm text-gray-900">
                    {table}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedSearchType && searchConfig.searchTypes.find(type => type.id === selectedSearchType)?.inputs.map((input) => (
          <div key={input.id} className="mb-4">
            <label htmlFor={input.id} className="block text-sm font-medium text-gray-700">{input.label}</label>
            {renderInput(input)}
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">{t.city}</label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value)
              setSelectedDistrict('')
              setSelectedWard('')
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a city</option>
            {Object.keys(locations).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {selectedCity && (
          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">{t.district}</label>
            <select
              id="district"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value)
                setSelectedWard('')
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a district</option>
              {Object.keys(locations[selectedCity]).map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        )}

        {selectedDistrict && (
          <div className="mb-4">
            <label htmlFor="ward" className="block text-sm font-medium text-gray-700">{t.ward}</label>
            <select
              id="ward"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a ward</option>
              {locations[selectedCity][selectedDistrict].map((ward) => (
                <option key={ward} value={ward}>{ward}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t.submit}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateSearch