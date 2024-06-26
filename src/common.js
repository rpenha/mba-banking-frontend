export const getCurrencySymbol = (locale, currency) => {
    return (0).toLocaleString(
        locale,
        {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    ).replace(/\d/g, '').trim()
}