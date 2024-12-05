const formulario = document.querySelector("form");

const idTorneio = document.querySelector(".id");

function iniciarBatalhaTorneioTeam() {
    fetch(`http://localhost:8080/sptj/tournaments/teams/${idTorneio.value}/startMatch`, {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao iniciar a batalha.");
        }
        return res.json();
    })
    .then(data => {
        // Salva os dados no Local Storage para acesso na próxima página
        localStorage.setItem("battleTeam", JSON.stringify(data));
        localStorage.setItem("idTorneio", idTorneio);
        window.location.href = '../batalhaTeam.html';
    })
    .catch(error => {
        const mensagem = document.querySelector(".mensagem");
        mensagem.style.color = "red";
        mensagem.textContent = error.message;
        setTimeout(() => mensagem.textContent = "", 5000);
    });
}

function limparInputs() {
    idTorneio.value = "";
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    iniciarBatalhaTorneioTeam();
    limparInputs();

})