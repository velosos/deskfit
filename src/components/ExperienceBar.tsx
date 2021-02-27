import React, { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

export const ExperienceBar = () => {
    const { currentExperience, experienceToNextLevel } = useContext(challengesContext);
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
    return (
        <div>
            <header className={styles.experienceBar}>
                <span> 0 px</span>
                <div>
                    <div style={{ width: `${percentToNextLevel}%`}}/>
                    <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>
                        {currentExperience} xp
                    </span>
                </div>
                <span>{experienceToNextLevel} xp</span>
            </header>
            
        </div>
    )
}
