import styles from "./Section.module.css";

export const Section = ({children}) => (
    <section className={styles.Section}>{children}</section>
)