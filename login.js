const btn_login = document.querySelector("#btn-login");

const user_login = {
    email: "matheus@gmail.com",
    password: 12345,
};

btn_login.addEventListener("click" , validateLogin);

function validateLogin() {
    const input_email = document.querySelector("#input-email").value.toLowerCase();
    const input_password = document.querySelector("#input-password").value;

    const email_is_valid = validateEmail(input_email);
    const password_is_valid = validatePassword(input_password);
    
    if(email_is_valid && password_is_valid) {
        showAlert({type:'success', message:'E-mail e Senha Válidos!'});
        localStorage.setItem("AuthToken", true)
        setTimeout(() => window.open("./index.html", "_self"), 2000);
    } else {
        showAlert({type:'warning', message:'E-mail e/ou Senha inválido(s)'});
    }
};

function validateEmail(email) {
    const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex_email.test(email) && user_login.email == email;
};

function validatePassword(password) {
    return user_login.password == password;
};

function showAlert({type, message, duration = 1800}) {
    const div_alert = document.querySelector("#alert-login");

    // modifica o alert
    modifyAlert(type, message);

    // troca a classe mostrar o alerta
    div_alert.classList.replace("bottom", "top");
    
    // reverte a troca da classe para não mostrar o alerta
    setTimeout(() => {
        div_alert.classList.replace("top", "bottom");
    }, duration);
};

function modifyAlert(type, message) {
    // pega a div do alerta
    const div_alert = document.querySelector("#alert-login");

    // pega a div que contem a mensagem do alerta
    const div_msg = document.querySelector("#alert-login div");

    // pega o icone svg do alerta
    const use_svg = document.querySelector("svg > use");

    if(type == 'success') {
        div_alert.classList.replace("alert-warning", `alert-${type}`);
        use_svg.setAttribute("xlink:href", "#check-circle-fill");
        div_msg.textContent = message;
    } else {
        div_alert.classList.replace("alert-success", `alert-${type}`);
        use_svg.setAttribute("xlink:href", "#exclamation-triangle-fill");
        div_msg.textContent = message;
    };
}