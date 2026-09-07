import { useEffect, useState } from 'react'

const STORAGE_KEY = 'conversionLog'

function readStoredLogs() {
  try {
    const storedLogs = localStorage.getItem(STORAGE_KEY)
    return storedLogs ? JSON.parse(storedLogs) : []
  } catch {
    return []
  }
}

export default function useConversionLog() {
  const [conversionLogs, setConversionLogs] = useState(readStoredLogs)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversionLogs))
  }, [conversionLogs])

  function addConversionLog(log) {
    setConversionLogs((previousLogs) => [
      {
        ...log,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
      ...previousLogs,
    ])
  }

  function removeConversionLog(id) {
    setConversionLogs((previousLogs) => previousLogs.filter((log) => log.id !== id))
  }

  function clearConversionLogs() {
    setConversionLogs([])
  }

  return {
    conversionLogs,
    addConversionLog,
    removeConversionLog,
    clearConversionLogs,
  }
}
