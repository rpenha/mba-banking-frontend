import {NavLink} from "react-router-dom";
import styles from "./LinkButton.module.css";

export class Variations {
    static Primary = "Primary"
    static Danger = "Danger"
    static Success = "Success"
}

export const LinkButton = ({children, to, variation = Variations.Primary}) => {
    let variationStyle
    switch (variation) {
        case "Success":
            variationStyle = styles.Success;
            break;
        case "Danger":
            variationStyle = styles.Danger;
            break;
        case "Primary":
        default:
            variationStyle = styles.Primary;
            break;
    }
    return (
        <NavLink className={[styles.LinkButton, variationStyle].join(" ").trim()} to={to}>
            {children}
        </NavLink>
    );
}