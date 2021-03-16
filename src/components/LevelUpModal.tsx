import { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/LevelUpModal.module.css'


export const LevelUpModal = () => {
    const { level, closeLevelModal } = useContext(challengesContext);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{ level }</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um proximo level</p>
                <button type="button" onClick={closeLevelModal}>
                    <img src="/icons/close.svg" alt="fechar"/>
                </button>
            </div>     
        </div>
    )
}
