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
    
    email_is_valid && password_is_valid ? showAlert('success') : showAlert('failed');
};

function validateEmail(email) {
    const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex_email.test(email) && user_login.email == email;
};

function validatePassword(password) {
    return user_login.password == password;
};

function showAlert(alert_type) {
    const div_alert = document.querySelector("#alert-login");
    const div_msg = document.querySelector("#alert-login div");
    const use_svg = document.querySelector("svg > use");

    div_alert.classList.replace("bottom", "top");

    setTimeout(() => {
        div_alert.classList.replace("top", "bottom");
    }, 1800);

    if(alert_type == 'success') {
        div_alert.classList.replace("alert-warning", "alert-success");
        use_svg.setAttribute("xlink:href", "#check-circle-fill");
        div_msg.textContent = 'E-mail e Senha Válidos!';
    } else {
        div_alert.classList.replace("alert-success", "alert-warning");
        use_svg.setAttribute("xlink:href", "#exclamation-triangle-fill");
        div_msg.textContent = 'E-mail e/ou Senha inválido(s)';
    };
};