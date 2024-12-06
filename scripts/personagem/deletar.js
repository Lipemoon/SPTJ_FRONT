const formulario = document.querySelector("form");

const idPersonagem = document.querySelector(".id");

async function deletarPersonagem() {
    const response = await fetch(`http://localhost:8080/sptj/characters/${idPersonagem.value}`, {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "DELETE",
    })
    if(response.status != 204){
        const exception = await response.json();
        mensagemErro(exception.error);
    } else {
        mensagemSucesso();
    }
}

function mensagemSucesso() {
    const mensagem = document.querySelector(".mensagem");
    mensagem.innerHTML="Personagem Deletado com Sucesso!";
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
    idPersonagem.value = "";
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    deletarPersonagem();
    limparInputs();
})
