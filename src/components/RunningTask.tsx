import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface RunningTask {
  id: string
  status: string
  log_message: string
  type_of_task: string
  task_creator_name: string
  input: string
  create_date: string
}

const RunningTask: React.FC = () => {
  const { language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const translations = {
    en: {
      title: 'Running Tasks',
      id: 'ID',
      status: 'Status',
      logMessage: 'Log Message',
      typeOfTask: 'Type of Task',
      taskCreatorName: 'Task Creator',
      input: 'Input',
      createDate: 'Create Date',
      previous: 'Previous',
      next: 'Next',
    },
    vn: {
      title: 'Tác vụ đang chạy',
      id: 'ID',
      status: 'Trạng thái',
      logMessage: 'Thông báo nhật ký',
      typeOfTask: 'Loại tác vụ',
      taskCreatorName: 'Người tạo tác vụ',
      input: 'Đầu vào',
      createDate: 'Ngày tạo',
      previous: 'Trước',
      next: 'Tiếp',
    },
  }

  const t = translations[language]

  // Mock running tasks data
  const mockRunningTasks: RunningTask[] = Array.from({ length: 50 }, (_, i) => ({
    id: `task-${i + 1}`,
    status: Math.random() > 0.5 ? 'Running' : 'Completed',
    log_message: `Log message for task ${i + 1}`,
    type_of_task: `Task Type ${i % 5 + 1}`,
    task_creator_name: `User ${i % 10 + 1}`,
    input: `Input data for task ${i + 1}`,
    create_date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }))

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = mockRunningTasks.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.title}</h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.id}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.logMessage}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.typeOfTask}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.taskCreatorName}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.input}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.createDate}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.log_message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type_of_task}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.task_creator_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.input}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.create_date).toLocaleString()}</td>
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
          Page {currentPage} of {Math.ceil(mockRunningTasks.length / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(mockRunningTasks.length / itemsPerPage)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}

export default RunningTask