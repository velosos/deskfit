import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { GetServerSideProps } from 'next'
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountDownContext";
import { ChallengesProvider } from "../contexts/ChallengeContext";

interface homeProps{
      level: number;
      currentExperience: number;
      challengesCompleted:number;
}

export default function Home(props:homeProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      >
    <div className={styles.container}>
      <Head>
        <title>Início | Deskfit</title>
      </Head> 
     <ExperienceBar/>

    <CountdownProvider> 
     <section>
       <div>
         <Profile/>
         <CompletedChallenges/>
         <Countdown/>
       </div>
       <div>
         <ChallengeBox/>
       </div>
     </section>
     </CountdownProvider>
    </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;
  return{
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted:Number(challengesCompleted)
    }
  }

}