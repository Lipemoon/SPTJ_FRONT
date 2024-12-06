const formulario = document.querySelector("form");

const inputName = document.getElementById("name");
const inputgender = document.getElementById("gender");
const inputgameOrigin = document.getElementById("gameOrigin");
const inputFormat = document.getElementById("format");
//const inputFoto = document.getElementById("foto");

async function cadastrarTorneio() {
    const res = await fetch("http://localhost:8080/sptj/tournaments", {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
            name: inputName.value,
            gameOrigin: inputgameOrigin.value,
            categoryByGenre: inputgender.value,
            format: inputFormat.value
        })
    })
    if(res.status != 201){
        const exception = await res.json();
        mensagemErro(exception.error);
    } else {
        mensagemSucesso();
    }
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

function mensagemErro(error) {
    const mensagem = document.querySelector(".mensagem");
    mensagem.innerHTML=error;
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