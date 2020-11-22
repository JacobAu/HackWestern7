import React, {useState, useEffect} from 'react';
import styles from './main.module.scss';
import axios from "axios";
import Button from "../Button"

export default function Main({currentPos}){
    const [showLetsGoBtn, setShowLetsGoBtn] = useState(true);    
    
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
            <div className={styles.titleContainer}>
                <p className={styles.title}>f<span style={{color:'black'}}>oo</span>d fight!</p>
                <p className={styles.subtext}>Race to decide where to eat.</p>
            </div>
            
            {
            showLetsGoBtn ? (
                <button 
                    onClick={()=> {
							setShowLetsGoBtn(false) 
						  }} 
                    className={styles.btn}>
                    let's go
                    </button>
					 ) : null  
            }

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
        </div>
    );
}