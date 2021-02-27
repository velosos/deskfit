import { useState, useEffect, useContext } from 'react'
import { challengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/Countdown.module.css'
import { Button } from './Button';


export const Countdown = () => {
    
    const { 
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountDown, 
        resetCountDown 
    } = useContext(CountdownContext)

    let isDisabled = false;
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); // um split retorna um array com as posicoes
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split(''); // o padStart inicia da esquerda e atribui o 0 caso não tenha 2 casas decimais


    return (
        <div>
        <div className={styles.countdownContainer}> 
        <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
            <span>{secondsLeft}</span>
            <span>{secondsRight}</span>
        </div>
        </div>

        {hasFinished ? (
            <Button
            title="Ciclo Encerrado"
            disabled= {!isDisabled}
            />

        ) : (
            <> 
        { isActive ? (  
         <Button
            isActive={isActive}
            title="abandonar ciclo"
            start={resetCountDown}
            />
        ):(
        <Button
            title="Inicie um ciclo"
            start={startCountDown}
            />
            )}   
          </>
        )}    
         </div> 
    )
}
