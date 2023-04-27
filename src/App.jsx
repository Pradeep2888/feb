import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Card from './Card';

function App() {
  const [data,setData]=useState()
  const [file, setFile] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', file.data)
    const response = await fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
    getData()
  }

  const handleFileChange = (e) => {
    const f = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setFile(f)
  }


  const getData=()=>{
    axios.get("http://localhost:8080/")
    .then((res)=>{
      setData(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  
 
  useEffect(()=>{
    getData()
  },[])
  

  return (
    <>
      <div className='App'>
      <h1>Upload to server</h1>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' accept='.pdf' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}

      <hr></hr>

      <div>
        {
          data?.map((item)=><Card name={item.file_name} url={item.file_url} />)
        }
      </div>

    </div>
    </>
  )
}

export default App
