import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json'

interface Challenge {
    description:string;
    amount:number;
    type: 'body' | 'eye';
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
}

interface challengesProviderProps {
    children:ReactNode;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}:challengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(30);
    const [challengesCompleted, setChallengesCompleted]= useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() =>{
        Notification.requestPermission()
    },[])

    function levelUp() {
        setLevel(level + 1);
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }       

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }


    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]; 
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp`
            })
        }
    }

    return(
        <challengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted,
                levelUp, 
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
                 }}>
            {children}
        </challengesContext.Provider>

    )
    
}