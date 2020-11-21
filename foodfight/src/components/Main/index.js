import React, {useState} from 'react';
import styles from './main.module.scss';


export default function Main(){
    const [showLetsGoBtn, setShowLetsGoBtn] = useState(true);    
    const [showSearch, setSearch] = useState(false);
    
    return(
        <div className={styles.root}>
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