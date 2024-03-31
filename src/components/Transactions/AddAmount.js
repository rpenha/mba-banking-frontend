import {Money} from "../Money/Money";

export const AddAmount = ({value, increment, currency, onIncrement}) => {
    return (
        <a href="#" onClick={(e) => {
            e.preventDefault();
            if (onIncrement) {
                const newValue = isNaN(value) ? increment : increment + value;
                onIncrement(newValue);
            }
        }}>
            +<Money amount={increment} currency={currency}/>
        </a>
    )
}