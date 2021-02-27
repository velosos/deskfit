import React, { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css'

export const Profile = () => {
    const {level} =  useContext(challengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/velosos.png" alt="TVN"/>
            <div>
                <strong>Thiago Veloso</strong>
                <p> 
                <img src="icons/level.svg" alt="Level"/>
                    Level {level} 
                    
                </p>
            </div>
        </div>
    )
}
