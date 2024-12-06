const formulario = document.querySelector("form");

const idTorneio = document.querySelector(".id");

async function iniciarTorneio() {
    const res = await fetch(`http://localhost:8080/sptj/tournaments/${idTorneio.value}/start`, {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
    })
    if (res.status != 200) {
        const exception = await res.json();
        mensagemErro(exception.error);
    } else {
        mensagemSucesso();
    }
}

function limparInputs() {
    idTorneio.value = "";
}

function mensagemSucesso() {
    const mensagem = document.querySelector(".mensagem");
    mensagem.style.color = "green";
    mensagem.innerHTML = `Torneio Foi Iniciado`;
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function mensagemErro(error) {
    const mensagem = document.querySelector(".mensagem");
    mensagem.style.color = "red";
    mensagem.innerHTML=error;
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