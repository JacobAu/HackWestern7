import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import styles from "./App.module.scss";

function App() {
  const [resturantList, setResturantList] = useState([]);
  const [selectedResturants, setSelectedResturants] = useState([]);
  const [currentPos, setCurrentPos] = useState({});
  
  useEffect(()=>{
     navigator.geolocation.getCurrentPosition((position)=>{
      setCurrentPos({
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,
      });
    })
  },[]);

  return (
    <div className={styles.root}>
      {
        currentPos ? (
          <Main 
            currentPos={currentPos}
          />
        ) : null
      }
      
    </div>
  );
}

export default App;
