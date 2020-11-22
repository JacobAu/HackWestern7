import react, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import FinishLine from "../FinishLine"
import Restaurant from "../Restaurant";
import car1 from "../../images/Group 73.png"
import car2 from "../../images/Group 74.png"
import car3 from "../../images/Group 75.png"
import car4 from "../../images/Group 76.png"
import car5 from "../../images/Group 77.png"

export default function RaceScreen({selectedRestaurants, reset}){
  const [winner, setWinner] = useState("");
  const [rankings, setRankings] = useState([]);
    const carPNGLinks = [car1, car2, car3, car4, car5] 
    const [showWinner, setShowWinner] = useState(false);
    const animationDurations = [5000, 6000, 7000, 8000];

    let points = {};
    for(let i=0; i < selectedRestaurants.length; i++){
        let key = selectedRestaurants[i].name;
        points[key] = 0;
    }


    function compareDistance(selectedRestaurants){
        let distance = {};

        for(let i=0; i < selectedRestaurants.length; i++){
            let key = selectedRestaurants[i].name;
            distance[key] = selectedRestaurants[i].distance;
        }

        // Create items array
        let temp = Object.keys(distance).map(function(key) {
        return [key, distance[key]];
        });

        // Sort the array based on the second element
        temp.sort(function(first, second) {
        return first[1] - second[1]  ;
        });

        // Create a new array with only the first 5 items
        let sorted = temp.slice(0,5)
        console.log(sorted)
        sorted = calcPoints(sorted);
        console.log(sorted);
        totalPoints(sorted);
    }

    function comparePrice(selectedRestaurants){
        let price = {};

        for(let i=0; i < selectedRestaurants.length; i++){
            let key = selectedRestaurants[i].name;
            price[key] = selectedRestaurants[i].price;
        }

        // Create items array
        let temp = Object.keys(price).map(function(key) {
        return [key, price[key]];
        });

        // Sort the array based on the second element
        temp.sort(function(first, second) {
        return first[1] - second[1];
        });

        // Create a new array with only the first 5 items
        let sorted = temp.slice(0,5)
        sorted = calcPoints(sorted);
        console.log(sorted);
        totalPoints(sorted);
    }

    function compareRatings(selectedRestaurants){
        let ratings = {};

        for(let i=0; i < selectedRestaurants.length; i++){
            let key = selectedRestaurants[i].name;
            ratings[key] = selectedRestaurants[i].rating;
        }

        // Create items array
        let temp = Object.keys(ratings).map(function(key) {
        return [key, ratings[key]];
        });

        // Sort the array based on the second element
        temp.sort(function(first, second) {
        return second[1] - first[1];
        });

        // Create a new array with only the first 5 items
        let sorted = temp.slice(0,5)
        sorted = calcPoints(sorted);
        console.log(sorted);
        totalPoints(sorted);
    }

    function compareReviewCount(selectedRestaurants){
        let count = {};

        for(let i=0; i < selectedRestaurants.length; i++){
            let key = selectedRestaurants[i].name;
            count[key] = selectedRestaurants[i].reviewCount;
        }

        // Create items array
        let temp = Object.keys(count).map(function(key) {
        return [key, count[key]];
        });

        // Sort the array based on the second element
        temp.sort(function(first, second) {
        return second[1] - first[1];
        });

        // Create a new array with only the first 5 items
        let sorted = temp.slice(0,5)
        sorted = calcPoints(sorted);
        console.log(sorted);
        totalPoints(sorted);
    }

    function isOpen(selectedRestaurants){
        let open = {};

        for(let i=0; i < selectedRestaurants.length; i++){
            let key = selectedRestaurants[i].name;
            if(selectedRestaurants[i].isClosed === false){
                open[key] = 1;
            }else{
                open[key] = 0;
            }
        }

        // Create items array
        let temp = Object.keys(open).map(function(key) {
        return [key, open[key]];
        });

        // Sort the array based on the second element
        temp.sort(function(first, second) {
        return second[1] - first[1];
        });

        // Create a new array with only the first 5 items
        let sorted = temp.slice(0,5)
        sorted = isOpenPoints(sorted);
        console.log(sorted);
        totalPoints(sorted);
    }

    function calcPoints(sorted){
        let num = 5;
        let d = {};
        for(let i =0; i < sorted.length; i++){
            let arr = sorted[i];
            let key = arr[0];
            d[key] = num;
            num--;
        }
        return d;
    }

    function isOpenPoints(sorted){
        let d = {};
        for(let i =0; i < sorted.length; i++){
            let arr = sorted[i];
            let key = arr[0];
            d[key] = arr[1];
        }
        return d;
    }

    function totalPoints(sorted){
        for(var key in points){
            points[key] += sorted[key];
        }
        
    }

    function determineWinner(){
        let max = 0;
        let maxKey; 
        for(var names in points){
            maxKey = (max < points[names]) ? names : maxKey;
            max = (max < points[names]) ? points[names] : max;
            
        }
        return maxKey
    }
    
    function sort(points){
        let temp = Object.keys(points).map(function(key) {
            return [key, points[key]];
            });
    
            // Sort the array based on the second element
            temp.sort(function(first, second) {
            return second[1] -first[1];
            });
    
            // Create a new array with only the first 5 items
            let sorted = temp.slice(0,5)
            
            let d = {};
            for(let i =0; i < sorted.length; i++){
                let arr = sorted[i];
                let key = arr[0];
                d[key] = arr[1];
            }
            return d;
    }

    useEffect(()=>{
        compareDistance(selectedRestaurants);
        comparePrice(selectedRestaurants);     
        compareRatings(selectedRestaurants);    
        compareReviewCount(selectedRestaurants);         
        isOpen(selectedRestaurants);  
        let rankings = sort(points);
        console.log(rankings);
        console.log(Object.keys(rankings));
        setRankings(Object.keys(rankings));
        setWinner(determineWinner());
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWinner(true);
        }, animationDurations[selectedRestaurants.length -2]);
        return () => clearTimeout(timer);
      }, []);
  return(
    <div className={styles.root}>
      <FinishLine />
      {
          rankings.map((x, index) =>{
              return(
                    <Restaurant 
                        name={x.length > 16 ? x.substring(0,16).concat("..."): x}
                        ranking={index}
                        iconLink={carPNGLinks[index]}
                        styles={{width: '30px'}}
                        winnerAnnounced={showWinner}
                    /> 
              )
          })
      }
      {
          showWinner ? (
            <div>
                <div className={styles.win}>
                    {winner} has won!
                </div>
                <div onClick={reset} className={styles.reset}>
                    Compare Again
                </div>
            </div>
          ) :null
      }
    </div>
  );
}
