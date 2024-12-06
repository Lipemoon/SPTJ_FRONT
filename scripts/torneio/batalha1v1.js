let idTorneio;

async function iniciarBatalhaTorneio() {
    idTorneio = prompt("Digite o ID do Torneio:");
    if (!idTorneio) {
        mensagemErro("ID do Torneio é obrigatório.");
    }
    const res = await fetch(`http://localhost:8080/sptj/tournaments/1v1/${idTorneio}/startMatch`, {
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
            method: "POST",
        });

        if (res.status != 200) {
            const exception = await res.json();
            mensagemErro(exception.error);
        } else {
            const batalha = await res.json();
            document.querySelector(".id-left").textContent = `ID: ${batalha.player1.id}`;
            document.querySelector(".name-left").textContent = `Nome: ${batalha.player1.name}`;
            document.querySelector(".gender-left").textContent = `Gênero: ${batalha.player1.gender}`;
            document.querySelector(".game-left").textContent = `Jogo: ${batalha.player1.gameOrigin}`;

            document.querySelector(".id-right").textContent = `ID: ${batalha.player2.id}`;
            document.querySelector(".name-right").textContent = `Nome: ${batalha.player2.name}`;
            document.querySelector(".gender-right").textContent = `Gênero: ${batalha.player2.gender}`;
            document.querySelector(".game-right").textContent = `Jogo: ${batalha.player2.gameOrigin}`;
        }
}

function mensagemErro(error) {
    alert(error);
    window.location.href = "index.html";
}

document.getElementById("choose-winner-btn").addEventListener("click", async () => {
    const winnerId = prompt("Digite o ID do vencedor:");
    if (!winnerId) {
        alert("O ID do vencedor é obrigatório.");
    }
    const res = await fetch(`http://localhost:8080/sptj/tournaments/1v1/${idTorneio}/chooseWinner/${winnerId}`, {
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    if (res.status != 200) {
        const exception = await res.json();
        mensagemErro(exception.error);
    } else {
        const result = await res.json();
        alert(`${result.message}`);
        window.location.href = "index.html";
    }
});

document.addEventListener("DOMContentLoaded", iniciarBatalhaTorneio);