import React, { useState, useEffect } from "react";
import styles from "./main.module.scss";
import axios from "axios";
import Button from "../Button";
import RaceScreen from "../RaceScreen";
import car from "../../images/carIcon.png";
  

export default function Main({ currentPos }) {
  const [showView, setShowView] = useState("start");
  const [scaleDown, setScaleDown] = useState(false);
  const [restaurantSubmitted, setResturantSubmitted] = useState(false);
  const [selectedRestaurants, setselectedRestaurants] = useState([]);
  const [data, setData] = useState([]);

  function handleSelect(id, name, distance, price, rating, reviewCount, isClosed) {
    distance /= 10;
    distance = Math.round(distance);
    distance /= 100;
    let newPrice = price ? price.length: 0;

    if (selectedRestaurants.map((x) => x.id).includes(id)) {
      let updatedResturants = [];
      for (let i = 0; i < selectedRestaurants.length; i++) {
        if (!(selectedRestaurants[i].id === id)) {
          updatedResturants.push(selectedRestaurants[i]);
        }
      }
      setselectedRestaurants(updatedResturants);
    } else {
      if (selectedRestaurants.length === 5) {
        return;
      }
      let newItem = {
        id: id,
        name: name,
        distance: distance,
        price: newPrice,
        rating: rating,
        reviewCount : reviewCount,
        isClosed: isClosed,
      };
      setselectedRestaurants([newItem, ...selectedRestaurants]);
    }
  }

  function handleRestaurantSubmit() {
    // go to next page when 2 or more restaurants selected
    if(!(selectedRestaurants.length <2)){
      setResturantSubmitted(true);
    }
  }

   // if you have any more flags, add here pls
   function handleReset(){
    setShowView("start");
    setScaleDown(false);
    setResturantSubmitted(false);
    setselectedRestaurants([]);
  }

  useEffect(() => {
    console.log(selectedRestaurants);
  }, [selectedRestaurants]);
  useEffect(() => {
    if (currentPos) {
      axios
        .get(
          `http://localhost:5000/api/nearbyBusinesses/${currentPos.latitude}/${currentPos.longitude}`
        )
        .then((response) => {
          setData(response.data.result);
          console.log(response.data);
        });
    }
  }, [currentPos]);
  return (
    <div className={styles.root}>
      
      {
        !scaleDown ? (<div className={styles.titleContainer}>
          <img src={car} className={styles.titleIcon}></img>
          <p className={styles.title}>r<span style={{color:'black'}}>ac</span>e for a taste!</p>
          <div className={styles.infinite}></div>
          <p className={styles.subtext}>Race to decide where to eat.</p>
      </div>) :
        <div className={styles.titleContainer} style={{
          transitionDuration: '0.5s',
          transform:'scale(0.8)'
          }}>
            <img src={car} className={styles.titleIcon}></img>
            <p className={styles.title}>r<span style={{color:'black'}}>ac</span>e for a taste!</p>
            <div className={styles.infinite}></div>
            <p className={styles.subtext}>Race to decide where to eat.</p>
        </div>
      }



      {showView === "start" ? (
        <div style={{margin:"0px 0px", height: "40vh", display:"block"}}>
          <button
            onClick={() => {
              setShowView("game");
              setScaleDown(true);
            }}
            className={styles.btn}
          >
            let's go!
          </button>
          <button
            className={styles.btn}
            onClick={()=>{
              setShowView("instructions")
              setScaleDown(true);
            }}
          > 
            how it works
          </button> 
        </div>
      ) : null}
      {
        showView === "instructions" ? (
          <div>
            <p className={styles.instructionTitle}>How it works:</p>
            <div className={styles.instructionPanel}>
            <div style={{marginBottom:"0.5re"}}>
              Choosing what to eat can be so <em><strong>boring</strong></em> and <em><strong>mundane</strong></em>. 
              This ordeal has led to the breaking of friendships,
              the starvation of many, and the loss of potential business
              for a plethora of local eateries.  
            </div>
            <div>
              With <span style={{color: "#1F3879", fontWeight:"bold"}}> race for a taste </span>, get an instant restaurant choice 
              based on credible Yelp criteria and real-time data!
            </div>
            </div>
            <button className={styles.goBack} onClick={()=> {
              setShowView("start")
              setScaleDown(false);
              }}>
              Go Back
            </button>
          </div>
        ) :null 
      }
      {data && showView === 'game' && !restaurantSubmitted ? (
        <div style={{transform:'translateY(-30px)'}}>
          <div className={styles.restaurantList}  >
            <p style={{fontSize:"20px", margin: "5px 0"}}>
              Restaurants Near You 
            </p>
            {data.map((restaurant) => {
              return (
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    name={restaurant.name}
                    onClick={() =>
                      handleSelect(
                        restaurant.id,
                        restaurant.name,
                        restaurant.distance,
                        restaurant.price,
                        restaurant.rating,
                        restaurant.review_count,
                        restaurant.is_closed
                      )
                    }
                    isClosed={restaurant.is_closed}
                    selected={selectedRestaurants
                      .map((x) => x.id)
                      .includes(restaurant.id)}
                    distance={Math.round(restaurant.distance/10)/100}
                  ></Button>
                </div>
              );
            })}
          </div>
          <div className={styles.submitButton} onClick={handleRestaurantSubmit}>
            Begin Race!
          </div>
        </div>
      ) : null}
      {
        restaurantSubmitted ? (
          <div>
            <RaceScreen 
              selectedRestaurants={selectedRestaurants}
              reset={handleReset}
            />
          </div>
        ) :null
      }
    </div>
  );
}
