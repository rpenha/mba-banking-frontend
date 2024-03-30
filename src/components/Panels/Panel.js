import styles from "./Panel.module.css";

export const Panel = ({children}) => (
    <div className={styles.Panel}>
        {children}
    </div>
)

export const InnerPanel = ({children}) =>(
    <div className={styles.InnerPanel}>
        {children}
    </div>
)