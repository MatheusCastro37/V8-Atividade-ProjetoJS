if(!localStorage.getItem("AuthToken")){
    window.open("./login.html", "_self");
}

const div_card_body = document.querySelector('#table-clients');
const node = document.createElement("table");
const btn_filter = document.querySelector("#btn-filter");
const btn_clear_filter = document.querySelector("#btn-clear-filter");

let users;
async function apiRequest() {
    try {
        const api_url = 'https://mocki.io/v1/d1e3eb2f-ec55-435e-afc0-2f4fac05f733';
        const request = await fetch(api_url);
        const data = await request.json();
        users = data.users;
        showClients(users);
    } catch (error) {
        div_card_body.firstElementChild.insertAdjacentHTML('afterend', `
            <div class="alert alert-primary d-flex align-items-center justify-content-center icon-link mb-0" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>    
            </svg>
            <div>
                Falha ao buscar as informações!
            </div>
            </div>    
        `);
    }
}

apiRequest();

function showClients(clients = []) {
    div_card_body.appendChild(node);
    const table = document.querySelector("#table-clients > table");
    table.classList.add('table')
    table.innerHTML = `
        <thead>
            <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Tipo de cliente</th>
            <th scope="col">Faturamento</th>
            <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody></tbody>
    `
    const tbody = document.querySelector("tbody");
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

btn_filter.addEventListener('click', filterClients);

function filterClients() {

    const input_name_or_email = document.querySelector("#input-search").value.toLowerCase();
    const input_category = document.querySelector("#select-category").value.toLowerCase();
    const input_range_values = document.querySelector("#select-values").value;

    const filtered_clients = users.filter(client => {

        const name_lowercase = client.name.toLowerCase();
        const email_lowercase = client.email.toLowerCase();
        const category_lowercase = client.category.toLowerCase();

        /* mapeamento de faturamento */
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
            return users;
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

    showClients(users)
}