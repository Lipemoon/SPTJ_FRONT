const formulario = document.querySelector("form");
const idTorneio = document.querySelector(".id");

function iniciarTorneio() {
    fetch(`http://localhost:8080/sptj/tournaments/${idTorneio.value}/start`, {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao iniciar o Torneio.");
        }
        return res.json();
    })
    .then(res => {
        mensagemSucesso(res); 
    })
    .catch(error => {
        mensagemErro(error);
    });
}

function limparInputs() {
    idTorneio.value = "";
}

function mensagemSucesso(res) {
    const mensagem = document.querySelector(".mensagem");
    mensagem.style.color = "green";
    mensagem.innerHTML = `
        <p>${res.message}</p>
        <p>Id: ${res.id}</p>
        <p>Nome: ${res.name}</p>
        <p>Jogo: ${res.gameName}</p>
        <p>Status: ${res.status}</p>
        <p>Formato: ${res.format}</p>
`;
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function mensagemErro(error) {
    const mensagem = document.querySelector(".mensagem");
    mensagem.style.color = "red";
    mensagem.innerHTML = `<p>Ocorreu um erro: ${error.message}</p>`;
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    iniciarTorneio();
    limparInputs();
});