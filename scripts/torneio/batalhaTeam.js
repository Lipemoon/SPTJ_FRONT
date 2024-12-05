const battleTeam = JSON.parse(localStorage.getItem("battleTeam"));
const idTorneio = localStorage.getItem("idTorneio");

if (battleTeam) {
    const playersLeftContainer = document.querySelector(".players-left");
    const playersRightContainer = document.querySelector(".players-right");

    // Exibe os jogadores do time 1
    const team1Id = Object.keys(battleTeam.team1)[0]; // Obtém o ID do time 1
    const team1Players = battleTeam.team1[team1Id];

    team1Players.forEach(player => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("card");
        playerCard.innerHTML = `
            <p>ID: ${player.id}</p>
            <p>Nome: ${player.name}</p>
            <p>Gênero: ${player.gender}</p>
            <p>Jogo: ${player.gameOrigin}</p>
        `;
        playersLeftContainer.appendChild(playerCard);
    });

    // Exibe os jogadores do time 2
    const team2Id = Object.keys(battleTeam.team2)[0]; // Obtém o ID do time 2
    const team2Players = battleTeam.team2[team2Id];

    team2Players.forEach(player => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("card");
        playerCard.innerHTML = `
            <p>ID: ${player.id}</p>
            <p>Nome: ${player.name}</p>
            <p>Gênero: ${player.gender}</p>
            <p>Jogo: ${player.gameOrigin}</p>
        `;
        playersRightContainer.appendChild(playerCard);
    });
} else {
    alert("Nenhuma batalha foi iniciada. Por favor, volte e inicie uma batalha.");
    window.location.href = "../iniciarBatalhaTeam.html";
}

// Botão para escolher vencedor
document.getElementById("choose-winner-btn").addEventListener("click", () => {
    const winnerId = prompt("Digite o ID Time vencedor:");

    if (winnerId) {
        // Chama a API para registrar o vencedor
        fetch(`http://localhost:8080/sptj/tournaments/teams/${idTorneio}/chooseWinner/${winnerId}`, {
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
            window.location.href = "../iniciarBatalhaTeam.html";
        })
        .catch(error => {
            alert(`Erro ao registrar o vencedor: ${error.message}`);
        });
    } else {
        alert("Você deve inserir um ID válido.");
    }
});