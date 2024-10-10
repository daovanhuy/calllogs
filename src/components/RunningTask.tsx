import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { createClient } from '@supabase/supabase-js'

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
  const [runningTasks, setRunningTasks] = useState<RunningTask[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 10

  const supabase = createClient('https://wsaewpnrvbdlmawpoctr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzYWV3cG5ydmJkbG1hd3BvY3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODMwODQsImV4cCI6MjA0Mzk1OTA4NH0.FJodJVz2pwqWYsg7PAdsHXtfuUyoMYCl7vbryGzbHv0')

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

  useEffect(() => {
    fetchRunningTasks()
  }, [currentPage])

  const fetchRunningTasks = async () => {
    const { data, error, count } = await supabase
      .from('task_manager_data')
      .select('*', { count: 'exact' })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
      .order('create_date', { ascending: false })

    if (error) {
      console.error('Error fetching running tasks:', error)
    } else {
      setRunningTasks(data || [])
      setTotalCount(count || 0)
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.logMessage}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.typeOfTask}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.taskCreatorName}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.input}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.createDate}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {runningTasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.log_message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.type_of_task}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.task_creator_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.input}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(task.create_date).toLocaleString()}</td>
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
          Page {currentPage} of {Math.ceil(totalCount / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalCount / itemsPerPage)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}

export default RunningTask