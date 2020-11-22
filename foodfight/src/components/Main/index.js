import React, {useState, useEffect} from 'react';
import styles from './main.module.scss';
import axios from "axios";
import Button from "../Button"

export default function Main({currentPos}){
    const [showLetsGoBtn, setShowLetsGoBtn] = useState(true);    
    const [showSearch, setSearch] = useState(false);
    
    const [data, setData] = useState([]);

    useEffect(()=>{
      if(currentPos){
        axios
        .get(`http://localhost:5000/api/nearbyBusinesses/${currentPos.latitude}/${currentPos.longitude}`)
        .then((response) => {
          setData(response.data.result);
          console.log(response.data)
        })
      }
    },[currentPos]) 
    return(
        <div className={styles.root}>
          {data ? 
              (
              <div className={styles.restaurantList}>
                {
                  data.map((restaurant)=> {
                    return(
                      <div style={{marginBottom: "10px"}}>
                      <Button
                        name={restaurant.name.substring(0, 20)}
                        closingTime={"9pm"}
                        
                      ></Button>
                      </div>
                    )
                })
                }
              </div>
              )
            : null} 
            <div className={styles.titleContainer}>
                <p className={styles.title}>food fight!</p>
                <p className={styles.subtext}>decide where to eat</p>
            </div>
            
            {
            showLetsGoBtn ? (
                <button 
                    onClick={()=> {
							setShowLetsGoBtn(false) 
							setSearch(true)  
						  }} 
                    className={styles.btn}>
                    let's go
                    </button>
					 ) : null  
            }
            {		 
            showSearch ? (
					<input
					className={styles.search} 
					placeholder='enter a restaurant or food place'
					>
					</input>
				) : null
			}
        </div>
    );
}