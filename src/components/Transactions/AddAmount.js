import {Money} from "../Money/Money";

export const AddAmount = ({value, increment, currency, onIncrement}) => {
    return (
        <a href="#" onClick={(e) => {
            e.preventDefault();
            if (onIncrement) {
                onIncrement(value + increment);
            }
        }}>
            +<Money amount={increment} currency={currency}/>
        </a>
    )
}