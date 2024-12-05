const formulario = document.querySelector("form");

const inputName = document.querySelector(".name");
const inputgender = document.querySelector(".gender");
const inputgameOrigin = document.querySelector(".gameOrigin");
const inputFoto = document.querySelector(".foto");

function cadastrarPersonagem() {
    fetch("http://localhost:8080/sptj/characters", {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
            name: inputName.value,
            gender: inputgender.value,
            gameOrigin: inputgameOrigin.value,
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
    mensagem.innerHTML="Personagem Cadastrado com Sucesso!";
    mensagem.style.color = "green"; 
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function mensagemErro() {
    const mensagem = document.querySelector(".mensagem");
    mensagem.innerHTML="Erro ao Cadastrar o Personagem!";
    mensagem.style.color = "red";
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function limparInputs() {
    inputName.value = "";
    inputgender.value = "";
    inputgameOrigin.value = "";
    inputFoto.value = "";
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    cadastrarPersonagem();
    limparInputs();

})