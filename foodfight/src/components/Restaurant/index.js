import React from 'react';
import styles from './styles.module.scss';

export default function Restaurant({ name, ranking, iconLink, winnerAnnounced }) {
  const word = "styles.car";
  
  return (
    <div className={styles.root}>
      <p style={{opacity: winnerAnnounced ? 0 : 1}} className={styles.text}>
        {name}
      </p>
      <img 
        className={
          ranking === 0 ? styles.car1 : 
          ranking === 1 ? styles.car2 : 
          ranking === 2 ? styles.car3 : 
          ranking === 3 ? styles.car4 : 
          ranking === 4 ? styles.car5 : ""} 
        src={iconLink} 
        alt={"restaurantIcon"}
      />
    </div>
  );
}