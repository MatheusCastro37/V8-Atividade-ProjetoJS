const tbody = document.querySelector("tbody");

const dataClient = [
    {
        name: "Mark",
        email: "Mark@teste.com",
        category: "Recorrente",
        billing: 2000,
    },
    {
        name: "Otto",
        email: "Otto@teste.com",
        category: "Avulso",
        billing: 4000,
    },
    {
        name: "Keven",
        email: "Keven@teste.com",
        category: "Anual",
        billing: 122000,
    },
    {
        name: "Matheus",
        email: "Matheus@teste.com",
        category: "Anual",
        billing: 50000,
    },
    {
        name: "Henrique",
        email: "Henrique@teste.com",
        category: "Recorrente",
        billing: 80000,
    }
];

dataClient.forEach(client => {
    let clientBilling = client.billing.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    let styleClientCategory;

    switch (client.category) {
        case "Recorrente":
            styleClientCategory = "primary";
            break;

        case "Avulso":
            styleClientCategory = "warning";
            break;

        case "Anual":
            styleClientCategory = "info";
            break;
        default:
            return;
    }

    tbody.innerHTML += `
        <tr>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>
                <span class="badge text-bg-${styleClientCategory}">${client.category}</span>
            </td>
            <td>R$ ${clientBilling}</td>
            <td>
                <button class="btn btn-primary">Editar</button>
                <button class="btn btn-danger">Excluir</button>
            </td>
        </tr>
    `
})