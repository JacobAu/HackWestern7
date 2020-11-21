import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import Main from "./components/Main";
import styles from "./App.module.scss";
import useTextInput from  "./hooks/useTextInput";
import Button from "./components/Button"
import useCurrentLocation from "./hooks/useCurrentLocation";

function App() {

  const [resturantList, setResturantList] = useState([]);
  const [selectedResturants, setSelectedResturants] = useState([]);
  const {currentPos} = useCurrentLocation();
  useEffect(()=>{
    axios
    .get("http://localhost:5000/api")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error)=>{console.log("broken")})
  },[])
  const searchQuery = useTextInput("");
  return (
    <div className={styles.root}> 
      <div>
        <Button 
          name={"Chef Papas"}
          closingTime={"9pm"}
          distance={"1km"}
          clicked={true}
        />
        <Button 
          name={"Gol's"}
          closingTime={"9pm"}
          distance={"1km"}
          clicked={true}
        />
        <input type="text" value={searchQuery.value} onChange={searchQuery.onChange}/>
        {currentPos ? 
          (
            <div>
              <p> latitude {currentPos.latitude}</p>
              <p>longitude {currentPos.longitude}</p>
            </div>
          )
          : null}
      </div>
      <Main />
    </div>
  );
}

export default App;
