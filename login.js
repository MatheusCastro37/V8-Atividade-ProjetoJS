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
        return alert("E-mail e Senha válidos!")
    } else {
        alert("E-mail e/ou Senha inválido(s)!")
    }
};