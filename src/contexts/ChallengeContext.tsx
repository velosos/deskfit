import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelModal: () => void;
}

interface challengesProviderProps {
    children:ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted:number;
}
      

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...props 
    }:challengesProviderProps){
    
    const [level, setLevel] = useState(props.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(props.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted]= useState(props.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    const [isLevelModelOpen, setIsLevelModelOpen] = useState(false)

    useEffect(() =>{
        Notification.requestPermission()
    },[])

    useEffect(() =>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    },[level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelModelOpen(true);
    }

    function closeLevelModal() {
        setIsLevelModelOpen(false);
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
                completeChallenge,
                closeLevelModal
                 }}>
            {children}
            { isLevelModelOpen && <LevelUpModal/> }
        </challengesContext.Provider>

    )
    
}