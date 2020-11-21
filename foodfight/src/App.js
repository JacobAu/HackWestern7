import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import Restaurant from "./components/Restaurant";
import styles from "./App.module.scss";

function App() {

  const [data, setData] = useState("broken");
  useEffect(()=>{
    console.log("hello?");
  })
  return (
    <div className={styles.root}> 
      <Restaurant /> 
    </div>
  );
}

export default App;
