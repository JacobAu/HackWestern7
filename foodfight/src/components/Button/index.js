import React from 'react';
import styles from './styles.module.scss';


export default function Button({name, isClosed, distance, selected, onClick}){
  
  
  return(
    <div 
      className={`${styles.root} ${selected ? styles.selected: ""}`}
      onClick={onClick}
    >
      <p style={{float:"left", marginLeft: "30px"}}>
        {name.length > 20 ? name.substring(0,20).concat("...") : name}
      </p>
      <p style={{fontSize: "16px", float:"right", marginRight:"30px"}}>{isClosed ? "Closed" : 'Open'} | {distance}km</p>
    </div>
  )
}