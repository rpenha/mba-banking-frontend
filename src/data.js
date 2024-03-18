const DATA = [
    {
        email: "teste@teste.com.br",
        password: "123123",
        fullname: "Lucas da Silva Moreira",
        type: "Conta Corrente",
        number: "543321539419",
        balance: 1000,
        transactions: [
            {
                title: "Depósito", 
                amount: 2000,
                type: "deposit", 
                date: "18 de Março, 2024"
            }, 
            {
                title: "Saque", 
                amount: 1000, 
                type: "debit",
                date: "17 de Março, 2024"
            }
        ]
    }
];

export default DATA;
