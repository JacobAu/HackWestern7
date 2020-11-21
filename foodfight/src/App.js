import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios'; 

function App() {

  const [data, setData] = useState("broken");
  useEffect(()=>{
    console.log("hello?");
    axios
      .get("http://localhost:5000/api")
      .then((response) => {
        let data  = response.data; 
        setData(data);
        console.log(data); 
      })
      .catch((error)=> {})
      .finally(() => {console.log("done")});
  })
  return (
    <div> {data ? data.message : "what"} </div>
  );
}

export default App;
