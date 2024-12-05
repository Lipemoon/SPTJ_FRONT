const formulario = document.querySelector("form");

function cadastrarTorneio() {
const inputName = document.getElementById("name");
const inputgender = document.getElementById("gender");
const inputgameOrigin = document.getElementById("gameOrigin");
const inputFormat = document.getElementById("format");
//const inputFoto = document.getElementById("foto");

console.log(inputName.value);
console.log(inputgender.value);
console.log(inputgameOrigin.value);
console.log(inputFormat.value);
    fetch("http://localhost:8080/sptj/tournaments", {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
            name: inputName.value,
            gameOrigin: inputgameOrigin.value,
            gender: inputgender.value,
            format: inputFormat.value
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
    mensagem.innerHTML="Torneio Cadastrado com Sucesso!";
    mensagem.style.color = "green"; 
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function mensagemErro() {
    const mensagem = document.querySelector(".mensagem");
    mensagem.innerHTML="Erro ao Cadastrar o Torneio!";
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
    inputFormat.value = "";
    //inputFoto.value = "";
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    cadastrarTorneio();
    limparInputs();

})