"use strict";

const USUARIO_ADMIN = "Marco";
const SENHA_ADMIN = "Maxtel@2026";


const formulario =
    document.querySelector("#formLogin");

const usuario =
    document.querySelector("#usuario");

const senha =
    document.querySelector("#senha");

const mensagem =
    document.querySelector("#mensagemLogin");


formulario.addEventListener("submit", (event) => {

    event.preventDefault();


    const usuarioDigitado =
        usuario.value.trim();

    const senhaDigitada =
        senha.value;


    if (
        usuarioDigitado === USUARIO_ADMIN &&
        senhaDigitada === SENHA_ADMIN
    ) {

        sessionStorage.setItem(
            "maxtel_admin",
            "autenticado"
        );


        window.location.href =
            "mensagens.html";

        return;
    }


    mensagem.textContent =
        "Usuário ou senha incorretos.";

    mensagem.className =
        "mensagem-login erro";


    senha.value = "";

    senha.focus();

});