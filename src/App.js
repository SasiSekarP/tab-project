import './App.css';
import {useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { FaAngleDoubleRight } from "react-icons/fa";

const apiUrl = 'https://course-api.com/react-tabs-project';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const fetchFn = async () => {
    const jsonResponse = await fetch(apiUrl);
    const response = await jsonResponse.json();
    setIsLoading(false);
    setData(response);
  }

  useEffect(() => { fetchFn() }, [])

  if (isLoading) {
    return (
      <div className='errorMessage'></div>
    )
  }

  if (!isLoading) {
    return (
      <div className='appScreen'>
        <h1 className='experienceHead'>Experience</h1>
        <div className='row1'>
          {data.map((singleData,index) => {
            return <button onClick={() => {
              setValue(index)
            }} className={`headBtn ${value === index && 'active'}`} type='button' key={uuidv4()}>{singleData.company}</button>
          })}
        </div>
        <div className='row2'>
          <h3>{data[value].title}</h3>
          <h4 className='companyTag'>{data[value].company}</h4>
        </div>
        <ul className='list'>
          {data[value].duties.map((singleDuty) => {
            return (
              <li key={uuidv4()} className='list-item'>
                <FaAngleDoubleRight className='icon' /><div> {singleDuty}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default App;
