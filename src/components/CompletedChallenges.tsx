import { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompletedChallenges.module.css'
export const CompletedChallenges = () => {
    const {challengesCompleted} = useContext(challengesContext);
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}
