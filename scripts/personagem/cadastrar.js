const formulario = document.querySelector("form");

const inputName = document.querySelector(".name");
const inputgender = document.querySelector(".gender");
const inputgameOrigin = document.querySelector(".gameOrigin");
//const inputFoto = document.querySelector(".foto");

async function cadastrarPersonagem() {
    const res = await fetch("http://localhost:8080/sptj/characters", {
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
    if(res.status != 201){
        const exception = await res.json();
        mensagemErro(exception.error);
    } else {
        mensagemSucesso();
    }
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
    //inputFoto.value = "";
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    cadastrarPersonagem();
    limparInputs();

})

document.querySelector(".foto").addEventListener("change", function (event) {
    const file = event.target.files[0]; // Obtém o arquivo selecionado

    if (file) {
        // Verifica se o arquivo é uma imagem
        if (file.type.startsWith("image/")) {
            const reader = new FileReader(); // Cria um FileReader para ler o arquivo

            reader.onload = function (e) {
                // Define o src do elemento img com os dados da imagem
                const preview = document.getElementById("image-preview");
                preview.src = e.target.result;
                preview.style.display = "block"; // Mostra o elemento img
            };

            reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
        }
    }
});