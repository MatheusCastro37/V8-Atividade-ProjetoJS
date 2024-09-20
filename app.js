const tbody = document.querySelector("tbody");
const btn_filter = document.querySelector("#btn-filter");
const btn_clear_filter = document.querySelector("#btn-clear-filter");

const data_client = [
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

function showClients(clients = []) {
    tbody.innerHTML = '';

    clients.forEach(client => {

        let client_billing = client.billing.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

        /* mapeamento de tipo de estilos */
        const clientTypeMapping = {
            Recorrente: 'primary',
            Avulso: 'warning',
            Anual: 'info'
        };

        tbody.innerHTML += `
            <tr>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>
                    <span class="badge text-bg-${clientTypeMapping[client.category]}">${client.category}</span>
                </td>
                <td>R$ ${client_billing}</td>
                <td>
                    <button class="btn btn-primary">Editar</button>
                    <button class="btn btn-danger">Excluir</button>
                </td>
            </tr>
        `
    })

};
showClients(data_client);

btn_filter.addEventListener('click', filterClients);

function filterClients() {

    const input_name_or_email = document.querySelector("#input-search").value.toLowerCase();
    const input_category = document.querySelector("#select-category").value.toLowerCase();
    const input_range_values = document.querySelector("#select-values").value;

    const filtered_clients = data_client.filter(client => {

        const name_lowercase = client.name.toLowerCase();
        const email_lowercase = client.email.toLowerCase();
        const category_lowercase = client.category.toLowerCase();

        /* mapeamento de tipo de estilos */
        const clientBillingMapping = {
            '2000': () => client.billing <= 2000,
            '3000_5000': () => client.billing >= 3000 && client.billing <= 5000,
            '10000': () => client.billing >= 10000
        };

        const name = input_name_or_email == name_lowercase;
        const email = input_name_or_email == email_lowercase;
        const category = input_category == category_lowercase;
        let billing = clientBillingMapping[input_range_values];

        input_range_values != '#' ? billing = billing() : null;

        if ((input_name_or_email != '' || input_name_or_email != '') && input_category != '#' && input_range_values != '#') {
            return (name || email) && category && billing;

        } else if ((input_name_or_email != '' || input_name_or_email != '') && input_category != '#') {
            return (name || email) && category;

        } else if ((input_name_or_email != '' || input_name_or_email != '') && input_range_values != '#') {
            return (name || email) && billing;

        } else if (input_category != '#' && input_range_values != '#') {
            return category && billing;

        } else if ((input_name_or_email != '')) {
            return (name || email);

        } else if (input_category != '#') {
            return category;

        } else if (input_range_values != '#') {
            return billing;

        } else {
            return data_client;
        }

    })

    showClients(filtered_clients)
}

btn_clear_filter.addEventListener('click', clearFilter);

function clearFilter() {
    const input_name_or_email = document.querySelector("#input-search");
    const input_category = document.querySelector("#select-category");
    const input_range_values = document.querySelector("#select-values");

    const clear_alert = document.querySelector("#clear-alert");

    input_name_or_email.value = '';
    input_category.value = '#';
    input_range_values.value = '#';
    clear_alert.textContent = 'Filtro Limpo!'

    setTimeout(() => clear_alert.textContent = '', 1500)

    showClients(data_client)
}