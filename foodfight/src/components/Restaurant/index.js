import React from 'react';
import styles from './styles.module.scss';

export default function Restaurant({name, ranking, iconLink }){
  
  return (
    <div className={styles.root}>
      <img src={iconLink} alt={"restaurantIcon"}/>
      <p clasName={styles.text}>
        {name}
      </p>
    </div> 
  );
}