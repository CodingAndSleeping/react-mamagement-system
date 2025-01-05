import { useEffect, useState } from 'react'

import { getData } from '../../api/data'
function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const data = await getData()
      console.log(data)
    }

    fetchData()
  }, [])

  return <div>home</div>
}

export default Home
