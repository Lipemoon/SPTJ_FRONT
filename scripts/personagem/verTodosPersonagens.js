const tabela = document.querySelector(".gallery");

function verTodosPersonagens() {
    fetch("http://localhost:8080/sptj/characters", {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
    })
    .then(response => response.json()) 
    .then(personagens => {
        personagens.forEach(personagem => {

            const personagemDiv = document.createElement('div');
            personagemDiv.classList.add('item');

            const infoId = document.createElement('div');
            infoId.classList.add('info');
            infoId.textContent = `Id: ${personagem.id}`;

            const infoName = document.createElement('div');
            infoName.classList.add('info');
            infoName.textContent = `Nome: ${personagem.name}`;

            const infoGender = document.createElement('div');
            infoGender.classList.add('info');
            infoGender.textContent = `Gênero: ${personagem.gender}`;

            const infoGame = document.createElement('div');
            infoGame.classList.add('info');
            infoGame.textContent = `Jogo de Origem: ${personagem.gameOrigin}`;

            personagemDiv.appendChild(infoId);
            personagemDiv.appendChild(infoName);
            personagemDiv.appendChild(infoGender);
            personagemDiv.appendChild(infoGame);

            tabela.appendChild(personagemDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar personagens:', error);
    });
}

verTodosPersonagens();