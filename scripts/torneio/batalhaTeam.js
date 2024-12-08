let idTorneio;

async function iniciarBatalhaTorneioTeam() {
    idTorneio = prompt("Digite o ID do Torneio:");
    if (!idTorneio) {
        mensagemErro("ID do Torneio é obrigatório.");
    }
    const res = await fetch(`http://localhost:8080/sptj/tournaments/teams/${idTorneio}/startMatch`, {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
    })
    if (res.status != 200) {
        const exception = await res.json();
        mensagemErro(exception.error);
    } else if (res.statusTournament === "Tournament Finalized") {
        window.location.href = "verVencedoresTorneio.html";
    } else {
        const batalha = await res.json();
        const playersLeft = document.querySelector(".cards-left");

        const idTeam1 = Object.keys(batalha.team1)[0];
        const team1Div = document.createElement('div');
        team1Div.textContent= `Id Team: ${idTeam1}`;
        playersLeft.appendChild(team1Div);

        const playersTeam1 = batalha.team1[idTeam1];
            
        playersTeam1.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add("card");

            const infoImg = document.createElement('img');
            infoImg.src = 'https://via.placeholder.com/400x600';

            const infoId = document.createElement('div');
            infoId.textContent = `Id: ${player.id}`;

            const infoName = document.createElement('div');
            infoName.textContent = `Nome: ${player.name}`;

            const infoGender = document.createElement('div');
            infoGender.textContent = `Gênero: ${player.gender}`;

            const infoGame = document.createElement('div');
            infoGame.textContent = `Jogo de Origem: ${player.gameOrigin}`;

            playerCard.appendChild(infoImg);
            playerCard.appendChild(infoId);
            playerCard.appendChild(infoName);
            playerCard.appendChild(infoGender);
            playerCard.appendChild(infoGame);

            playersLeft.appendChild(playerCard);
        })
        
        const playersRight = document.querySelector(".cards-right");
        const idTeam2 = Object.keys(batalha.team2)[0];
        const team2Div = document.createElement('div');
        team2Div.textContent= `Id Team: ${idTeam2}`;
        playersRight.appendChild(team2Div);

        const playersTeam2 = batalha.team2[idTeam2];
            
        playersTeam2.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add("card");

            const infoImg = document.createElement('img');
            infoImg.src = 'https://via.placeholder.com/400x600';

            const infoId = document.createElement('div');
            infoId.textContent = `Id: ${player.id}`;

            const infoName = document.createElement('div');
            infoName.textContent = `Nome: ${player.name}`;

            const infoGender = document.createElement('div');
            infoGender.textContent = `Gênero: ${player.gender}`;

            const infoGame = document.createElement('div');
            infoGame.textContent = `Jogo de Origem: ${player.gameOrigin}`;

            playerCard.appendChild(infoImg);
            playerCard.appendChild(infoId);
            playerCard.appendChild(infoName);
            playerCard.appendChild(infoGender);
            playerCard.appendChild(infoGame);

            playersRight.appendChild(playerCard);
        })
    }
}

function mensagemErro(error) {
    alert(error);
    window.location.href = "index.html";
}

document.getElementById("choose-winner-btn").addEventListener("click", async () => {
    const winnerTeamId = prompt("Digite o ID Time vencedor:");
    if (!winnerTeamId) {
        alert("O ID do Time vencedor é obrigatório.");
    }
    if (winnerTeamId) {
        const res = await fetch(`http://localhost:8080/sptj/tournaments/teams/${idTorneio}/chooseWinner/${winnerTeamId}`, {
            mode: 'cors',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
        })
        if (res.status != 200) {
            const exception = await res.json();
            mensagemErro(exception.error);
        } else {
            const result = await res.json();
            alert(`${result.message}`);
            window.location.href = "index.html";
        }
    }
});

document.addEventListener("DOMContentLoaded", iniciarBatalhaTorneioTeam);