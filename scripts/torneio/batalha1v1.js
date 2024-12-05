const battleData = JSON.parse(localStorage.getItem("battleData"));

const idTorneio = localStorage.getItem("idTorneio");

if (battleData) {
    // Atualiza os dados do jogador 1
    document.querySelector(".id-left").textContent = `ID: ${battleData.player1.id}`;
    document.querySelector(".name-left").textContent = `Nome: ${battleData.player1.name}`;
    document.querySelector(".gender-left").textContent = `Gênero: ${battleData.player1.gender}`;
    document.querySelector(".game-left").textContent = `Jogo: ${battleData.player1.gameOrigin}`;

    // Atualiza os dados do jogador 2
    document.querySelector(".id-right").textContent = `ID: ${battleData.player2.id}`;
    document.querySelector(".name-right").textContent = `Nome: ${battleData.player2.name}`;
    document.querySelector(".gender-right").textContent = `Gênero: ${battleData.player2.gender}`;
    document.querySelector(".game-right").textContent = `Jogo: ${battleData.player2.gameOrigin}`;
} else {
    alert("Nenhuma batalha foi iniciada. Por favor, volte e inicie uma batalha.");
    window.location.href = "../iniciarBatalha1v1.html";
}

document.getElementById("choose-winner-btn").addEventListener("click", () => {
    const winnerId = prompt("Digite o ID do vencedor:");

    if (winnerId) {
        // Chama a API para registrar o vencedor
        fetch(`http://localhost:8080/sptj/tournaments/1v1/${idTorneio}/chooseWinner/${winnerId}`, {
            mode: 'cors',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao declarar o vencedor.");
            }
            return res.json();
        })
        .then(data => {
            alert(`Vencedor registrado com sucesso! Nome: ${data.winner.name}`);
            window.location.href = "../iniciarBatalha1v1.html";
        })
        .catch(error => {
            alert(`Erro ao registrar o vencedor: ${error.message}`);
        });
    } else {
        alert("Você deve inserir um ID válido.");
    }
});
