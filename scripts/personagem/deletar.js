const formulario = document.querySelector("form");

const idPersonagem = document.querySelector(".id");

function deletarPersonagem() {
    fetch(`http://localhost:8080/sptj/characters/${idPersonagem.value}`, {
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
    mensagem.innerHTML="Personagem Deletado com Sucesso!";
    mensagem.style.color = "green"; 
    setTimeout(function() {
        mensagem.innerHTML = "";
        mensagem.style.color = "";
    }, 5000);
}

function mensagemErro() {
    const mensagem = document.querySelector(".mensagem");
    mensagem.innerHTML="Erro ao Deletar o Personagem!";
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
