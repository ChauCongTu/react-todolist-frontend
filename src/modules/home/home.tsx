import { da } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'
import { getTour } from './services/getTournament'


type Props = {}

const Home = (props: Props) => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    getTour()
      .then((data: any) => console.log(data))
      .catch((e) => console.log('Lỗi: ' + getTour))
  }, [])
  return (
    <div>

    </div>
  )
}

export default Home