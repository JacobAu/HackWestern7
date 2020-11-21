import React from 'react';
import styles from './styles.module.scss';


export default function Button({name, closingTime, distance, clicked, runFunction}){
  
  
  return(
    <div className={`${styles.root} ${clicked ? styles.selected: ""}`}>
      <p style={{float:"left", marginLeft: "30px"}}>{name}</p>
      <p style={{fontSize: "16px", float:"right", marginRight:"30px"}}>closes {closingTime} | {distance}</p>
    </div>
  )
}