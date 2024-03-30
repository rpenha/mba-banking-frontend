import styles from "./Headings.module.css";

export const RegularTitle = ({children}) => (
    <span className={styles.Regular}>{children}</span>
);