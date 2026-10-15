"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.querySelector("#formContato");

    if (!formulario) {
        return;
    }

    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const mensagem = document.querySelector("#mensagem");
    const status = document.querySelector("#statusFormulario");

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        const nomeValor = nome.value.trim();
        const emailValor = email.value.trim();
        const mensagemValor = mensagem.value.trim();

        if (!nomeValor || !emailValor || !mensagemValor) {

            mostrarStatus(
                "Preencha todos os campos.",
                "erro"
            );

            return;
        }

        if (!validarEmail(emailValor)) {

            mostrarStatus(
                "Digite um e-mail válido.",
                "erro"
            );

            email.focus();

            return;
        }

        const novaMensagem = {

            id: crypto.randomUUID(),

            nome: nomeValor,

            email: emailValor,

            mensagem: mensagemValor,

            data: new Date().toISOString()
        };

        const mensagens = obterMensagens();

        mensagens.push(novaMensagem);

        salvarMensagens(mensagens);

        mostrarStatus(
            "Mensagem enviada com sucesso!",
            "sucesso"
        );

        formulario.reset();

    });


    function obterMensagens() {

        const dados = localStorage.getItem("maxtel_mensagens");

        if (!dados) {
            return [];
        }

        try {

            const mensagens = JSON.parse(dados);

            return Array.isArray(mensagens)
                ? mensagens
                : [];

        } catch (erro) {

            console.error(
                "Erro ao recuperar mensagens:",
                erro
            );

            return [];
        }
    }


    function salvarMensagens(mensagens) {

        localStorage.setItem(
            "maxtel_mensagens",
            JSON.stringify(mensagens)
        );
    }


    function validarEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    }


    function mostrarStatus(texto, tipo) {

        status.textContent = texto;

        status.className =
            `status-formulario ${tipo}`;

        setTimeout(() => {

            status.textContent = "";

            status.className =
                "status-formulario";

        }, 5000);
    }

});