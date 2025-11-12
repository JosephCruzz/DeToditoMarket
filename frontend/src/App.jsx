import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/productos`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  return (
    <div>
      <h1>Datos desde backend Node</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App