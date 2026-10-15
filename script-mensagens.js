"use strict";

const administrador =
    sessionStorage.getItem("maxtel_admin");


if (administrador !== "autenticado") {

    window.location.href =
        "admin.html";

}
document.addEventListener("DOMContentLoaded", () => {

    const listaMensagens =
        document.querySelector("#listaMensagens");

    const contador =
        document.querySelector("#contadorMensagens");

    const busca =
        document.querySelector("#buscarMensagem");

    const botaoLimpar =
        document.querySelector("#limparMensagens");


    let mensagens = obterMensagens();


    renderizarMensagens();


    busca.addEventListener("input", () => {

        renderizarMensagens(
            busca.value.trim().toLowerCase()
        );

    });


    botaoLimpar.addEventListener("click", () => {

        if (mensagens.length === 0) {
            return;
        }

        const confirmar = confirm(
            "Tem certeza que deseja apagar todas as mensagens?"
        );

        if (!confirmar) {
            return;
        }

        localStorage.removeItem(
            "maxtel_mensagens"
        );

        mensagens = [];

        renderizarMensagens();

    });


    function obterMensagens() {

        const dados =
            localStorage.getItem("maxtel_mensagens");

        if (!dados) {
            return [];
        }

        try {

            const resultado =
                JSON.parse(dados);

            return Array.isArray(resultado)
                ? resultado
                : [];

        } catch (erro) {

            console.error(
                "Erro ao carregar mensagens:",
                erro
            );

            return [];

        }
    }


    function salvarMensagens() {

        localStorage.setItem(
            "maxtel_mensagens",
            JSON.stringify(mensagens)
        );

    }


    function renderizarMensagens(filtro = "") {

        listaMensagens.innerHTML = "";


        const mensagensFiltradas =
            mensagens.filter((item) => {

                const texto = `
                    ${item.nome}
                    ${item.email}
                    ${item.mensagem}
                `.toLowerCase();

                return texto.includes(filtro);

            });


        atualizarContador(
            mensagensFiltradas.length
        );


        if (mensagensFiltradas.length === 0) {

            mostrarEstadoVazio(filtro);

            return;
        }


        mensagensFiltradas.forEach((item) => {

            const card =
                criarMensagemCard(item);

            listaMensagens.appendChild(card);

        });

    }


    function criarMensagemCard(item) {

        const article =
            document.createElement("article");

        article.className =
            "mensagem-card";


        const cabecalho =
            document.createElement("div");

        cabecalho.className =
            "mensagem-cabecalho";


        const nome =
            document.createElement("p");

        nome.className =
            "mensagem-nome";

        nome.textContent =
            item.nome;


        const data =
            document.createElement("p");

        data.className =
            "mensagem-data";

        data.textContent =
            formatarData(item.data);


        cabecalho.append(
            nome,
            data
        );


        const email =
            document.createElement("p");

        email.className =
            "mensagem-email";

        email.textContent =
            item.email;


        const texto =
            document.createElement("p");

        texto.className =
            "mensagem-texto";

        texto.textContent =
            item.mensagem;


        const botao =
            document.createElement("button");

        botao.type =
            "button";

        botao.className =
            "botao-excluir";

        botao.textContent =
            "Excluir";


        botao.addEventListener("click", () => {

            excluirMensagem(item.id);

        });


        article.append(
            cabecalho,
            email,
            texto,
            botao
        );


        return article;

    }


    function excluirMensagem(id) {

        const confirmar = confirm(
            "Deseja excluir esta mensagem?"
        );

        if (!confirmar) {
            return;
        }


        mensagens =
            mensagens.filter(
                (item) => item.id !== id
            );


        salvarMensagens();

        renderizarMensagens(
            busca.value.trim().toLowerCase()
        );

    }


    function formatarData(data) {

        if (!data) {
            return "";
        }


        const dataObj =
            new Date(data);


        return dataObj.toLocaleString(
            "pt-BR",
            {
                dateStyle: "short",
                timeStyle: "short"
            }
        );

    }


    function atualizarContador(total) {

        contador.textContent =
            total === 1
                ? "1 mensagem"
                : `${total} mensagens`;

    }


    function mostrarEstadoVazio(filtro) {

        const estado =
            document.createElement("div");

        estado.className =
            "estado-vazio";


        const titulo =
            document.createElement("p");

        titulo.className =
            "estado-titulo";


        const descricao =
            document.createElement("p");

        descricao.className =
            "estado-descricao";


        if (filtro) {

            titulo.textContent =
                "Nenhuma mensagem encontrada.";

            descricao.textContent =
                "Tente buscar por outro nome, e-mail ou palavra.";

        } else {

            titulo.textContent =
                "Nenhuma mensagem recebida.";

            descricao.textContent =
                "As mensagens enviadas pelo formulário aparecerão aqui.";

        }


        estado.append(
            titulo,
            descricao
        );


        listaMensagens.appendChild(
            estado
        );

    }

});
const botaoSair =
    document.querySelector("#sairAdmin");


botaoSair.addEventListener("click", () => {

    sessionStorage.removeItem(
        "maxtel_admin"
    );


    window.location.href =
        "admin.html";

});