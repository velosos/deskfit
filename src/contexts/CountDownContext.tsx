import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengesContext } from "./ChallengeContext";


interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountDownProviderProps {
    children:ReactNode;
}

let countdownTime: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}:CountDownProviderProps){

    const {startNewChallenge, level} = useContext(challengesContext)
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDown (){
        setIsActive(true);

    }
    function resetCountDown (){
        clearTimeout(countdownTime);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);

    }
    useEffect(() => {
        if(isActive && time > 0 ) {
            countdownTime = setTimeout(()=>{
                setTime(time -1);
            }, 1000)
        } else if(isActive && time ===0 ){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}