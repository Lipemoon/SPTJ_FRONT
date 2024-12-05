const formulario = document.querySelector("form");

const idTorneio = document.querySelector(".id");
const updateName = document.querySelector(".name");
const updategender = document.querySelector(".gender");
const updategameOrigin = document.querySelector(".gameOrigin");
const updateFormat = document.querySelector(".format");
const updateFoto = document.querySelector(".foto");

function atualizarTorneio() {
    fetch(`http://localhost:8080/sptj/tournaments/${idTorneio.value}`, {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "PUT",
        body: JSON.stringify({
            name: updateName.value,
            gender: updategender.value,
            gameOrigin: updategameOrigin.value,
            format: updateFormat.value
        })
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
    mensagem.innerHTML="Torneio Atualizado com Sucesso!";
    mensagem.style.color = "green"; 
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function mensagemErro() {
    const mensagem = document.querySelector(".mensagem");
    mensagem.innerHTML="Erro ao Atualizar o Torneio!";
    mensagem.style.color = "red";
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function limparInputs() {
    idTorneio.value = "";
    updateName.value = "";
    updategender.value = "";
    updategameOrigin.value = "";
    updateFormat.value = "";
    updateFoto.value = "";
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    atualizarTorneio();
    limparInputs();

})