import {useState, useEffect} from "react";

export default function useCurrentLocation(){
  const [currentPos, setCurrentPos] = useState({});
  navigator.geolocation.getCurrentPosition((position)=>{
    setCurrentPos({
      latitude : position.coords.latitude,
      longitude : position.coords.longitude,
    });
  })
  return ({currentPos});  
}