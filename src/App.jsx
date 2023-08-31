import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'


function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refectch,setRefetch] = useState(false);

  const removeTour = (id) =>{
    const newTours = data.filter((tour)=> tour.id !== id);
    setData(newTours);
  }

  
  useEffect(()=>{
    async function fetchData(){
    try{
      const resp = await fetch(url);
      const data = await resp.json();
      setData(data);
    }catch(err){
      setLoading(false);
      console.log(err)};
    setLoading(false);
  }
    fetchData();
  },[refectch])

  if(loading)
  return <main>
    <Loading />
  </main>

  if(data.length === 0)
  {
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button className='btn' onClick={()=>{setRefetch(!refectch)}}>explore</button>
      </div>
    </main>
  }
  return <main>
    <Tours tours={data} removeTour = {removeTour}/>
  </main>
}

export default App
