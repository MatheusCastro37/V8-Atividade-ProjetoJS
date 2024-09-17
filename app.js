const tbody = document.querySelector("tbody");
const btn_filter = document.querySelector("#btn-filter")

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

        if(client.name == '') return false;
        if(client.email == '') return false;
        if(client.billing == 0) return false;
        
        let client_billing = client.billing.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
        let style_client_category;
    
        switch (client.category) {
            case "Recorrente":
                style_client_category = "primary";
                break;
    
            case "Avulso":
                style_client_category = "warning";
                break;
    
            case "Anual":
                style_client_category = "info";
                break;
            default:
                return;
        }

        tbody.innerHTML += `
            <tr>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>
                    <span class="badge text-bg-${style_client_category}">${client.category}</span>
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

btn_filter.addEventListener('click', filterClients);

function filterClients() {

    const input_name_or_email = document.querySelector("#input-search").value;
    const input_category = document.querySelector("#select-category").value;
    const input_range_values = document.querySelector("#select-values").value;

    const filtered_clients = data_client.filter(client => {

        const name_lowercase = client.name.toLowerCase();
        const email_lowercase = client.email.toLowerCase();
        const category_lowercase = client.category.toLowerCase();

        if (input_name_or_email == name_lowercase || input_name_or_email == email_lowercase) {
            return true;
        };

        if (input_category == category_lowercase) {
            return true;
        };

        if (input_range_values == "2000" && client.billing <= 2000 ||
            input_range_values == "3000_5000" && client.billing >= 3000 && client.billing <= 5000 ||
            input_range_values == "10000" && client.billing > 10000) {
            return true;
        }

    })

    // showClients(filtered_clients)
    filtered_clients.length == 0 ? showClients(data_client) : showClients(filtered_clients);
}

showClients(data_client)