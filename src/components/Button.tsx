import styles from '../styles/components/Button.module.css'

interface ButtonProps {
    title: string;
    start?: () => void;
    disabled?:boolean;
    isActive?:boolean;
  }

export const Button = (props:ButtonProps) => {
    return (
        <div>
            <button 
                disabled={props.disabled}
                type="button" 
                className={ props.isActive ? 
                    `${styles.countdownButton} ${styles.countdownButtonActive}` 
                  : `${styles.countdownButton}`} 
                onClick={props.start}>
                {props.title}
            </button>
            
        </div>
    )
}
