export const Money = ({amount, currency}) => {
    const formatted = parseFloat(amount).toLocaleString('pt-BR', {style: 'currency', currency: currency});
    return (
        <span>{formatted}</span>
    )
}