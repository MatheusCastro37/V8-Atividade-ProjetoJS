const btn_login = document.querySelector("#btn-login");

const user_login = {
    email: "matheus@gmail.com",
    password: 12345,
};

btn_login.addEventListener("click" , validateLogin);

function validateLogin() {
    const input_email = document.querySelector("#input-email").value.toLowerCase();
    const input_password = Number(document.querySelector("#input-password").value);

    if(input_email === user_login.email && input_password === user_login.password) {
        showAlert('success');
        // return alert("E-mail e Senha válidos!")
    } else {
        showAlert('failed');
        // alert("E-mail e/ou Senha inválido(s)!")
    }
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