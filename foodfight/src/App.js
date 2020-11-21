import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import Main from "./components/Main";
import styles from "./App.module.scss";

function App() {

  const [data, setData] = useState("broken");
  useEffect(()=>{
    console.log("hello?");
  })
  return (
    <div className={styles.root}> 
      <Main />
    </div>
  );
}

export default App;
