const formulario = document.querySelector("form");

const idTorneio = document.querySelector(".id");

function deletarTorneio() {
    fetch(`http://localhost:8080/sptj/tournaments/${idTorneio.value}`, {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "DELETE",
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        mensagemSucesso(res); 
    })
    .catch(error => {
        mensagemErro(error);
    });
}

function mensagemSucesso() {
    const mensagem = document.querySelector(".mensagem");
    mensagem.innerHTML="Torneio Deletado com Sucesso!";
    mensagem.style.color = "green"; 
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function mensagemErro() {
    const mensagem = document.querySelector(".mensagem");
    mensagem.innerHTML="Erro ao Deletar o Torneio!";
    mensagem.style.color = "red";
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function limparInputs() {
    idTorneio.value = "";
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    deletarTorneio();
    limparInputs();

})
