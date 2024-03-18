export function formatNumber(number) 
{
    return ` ${number.toLocaleString('pt-br', {maximumFractionDigits: 2})}`;
}

export function findAccount(number) {
    const users = JSON.parse(localStorage.getItem('users'));

    for(const user of users) {
        if(user.number === number) {
            return user;
        }
    }

    return false;
}