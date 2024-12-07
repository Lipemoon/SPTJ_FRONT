const tabela = document.querySelector(".gallery");

function verTodosTorneios() {
    fetch("http://localhost:8080/sptj/tournaments", {
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
    })
    .then(res => res.json()) 
    .then(torneios => {
        torneios.forEach(torneio => {
            
            const torneioDiv = document.createElement('div');
            torneioDiv.classList.add('item');

            const infoImg = document.createElement('img');
            infoImg.classList.add('info');
            infoImg.src = 'https://via.placeholder.com/400x600';

            const infoId = document.createElement('div');
            infoId.classList.add('info');
            infoId.textContent = `Id: ${torneio.id}`;
            
            const infoName = document.createElement('div');
            infoName.classList.add('info');
            infoName.textContent = `Nome: ${torneio.name}`;

            const infoGender = document.createElement('div');
            infoGender.classList.add('info');
            infoGender.textContent = `Categoria de Gênero: ${torneio.categoryByGenre}`;

            const infoGame = document.createElement('div');
            infoGame.classList.add('info');
            infoGame.textContent = `Jogo de Origem: ${torneio.gameOrigin}`;

            const infoFormat = document.createElement('div');
            infoFormat.classList.add('info');
            infoFormat.textContent = `Formato: ${torneio.format}`;

            const infoStatus = document.createElement('div');
            infoStatus.classList.add('info');
            infoStatus.textContent = `Status: ${torneio.status}`;
            
            /*
            const maisInformação = document.createElement('button');
            maisInformação.classList.add('info');
            maisInformação.textContent = "Mais Informações";
            */

            torneioDiv.appendChild(infoImg);
            torneioDiv.appendChild(infoId);
            torneioDiv.appendChild(infoName);
            torneioDiv.appendChild(infoGender);
            torneioDiv.appendChild(infoGame);
            torneioDiv.appendChild(infoFormat);
            torneioDiv.appendChild(infoStatus);
            //torneioDiv.appendChild(maisInformação);

            tabela.appendChild(torneioDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar personagens:', error);
    });
}

verTodosTorneios();
