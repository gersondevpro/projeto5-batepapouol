let mensagens = [];

let meuUsuario = prompt("Qual seu nome condenado?!");

entrouNaMalditaSala();

function entrouNaMalditaSala() {

    const entrarNaSala = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name:meuUsuario});

    entrarNaSala.then(trazerMensagens);
    entrarNaSala.catch(nomeConflito);

}

function nomeConflito(param) {

    meuUsuario;

}

function trazerMensagens() {
    
    const buscarMensagens = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`);

    buscarMensagens.then( response => {mensagens = response.data;
        renderizarMensagens();
    } );

}

function renderizarMensagens() {
    console.log(mensagens);
    const blocoDeMensagens = document.querySelector(".blocoDeMensagens");

    blocoDeMensagens.innerHTML = "";

    for(let i = 0; i < mensagens.length; i++) {

        if(mensagens[i].type === "status") {
        blocoDeMensagens.innerHTML += `
        <div class="div-mensagens entrouNaSala">
            <li class="corpo">
            <span class="opacity">(${mensagens[i].time})</span>
            <span class="bold">${mensagens[i].from}</span>
            <span>${mensagens[i].text}</span>
            </li>
        </div>
        `;
        } else if (mensagens[i].type === "message"){
        blocoDeMensagens.innerHTML += `
        <div class="div-mensagens">
            <li class="corpo">
            <span class="opacity">(${mensagens[i].time})</span>
            <span class="bold">${mensagens[i].from} para</span>
            <span class="bold">${mensagens[i].to}:</span>
            <span>${mensagens[i].text}</span>
            </li>
        </div>
        `;
        } else {
            if(mensagem[i].to === meuUsuario) {
        blocoDeMensagens.innerHTML += `
        <div class="div-mensagens reservada">
            <li class="corpo">
            <span class="opacity tam">(${mensagens[i].time})</span>
            <span class="bold tam">${mensagens[i].from} para</span>
            <span class="bold tam">${mensagens[i].to}:</span>
            <span class="tam">${mensagens[i].text}</span>
            </li>
        </div>
        `;
            }   

        }
    }
}

setInterval(trazerMensagens, 3000);

// const elementoQueQueroQueApareca = document.querySelector('li');
// elementoQueQueroQueApareca.scrollIntoView();

let corpoTexto ="";

function enviarMensagem() {
    
    let corpoTexto = document.querySelector("input").value;

    const enviarMensagens = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, {
        from: meuUsuario,
        to: "Todos",
        text: corpoTexto,
        type: "message"
    });
    enviarMensagens.then(enviarMinhasMensagens);
    enviarMensagens.catch(usuarioForaDaSala);
    
}

function usuarioForaDaSala() {
    
    window.location.reload();

}

function enviarMinhasMensagens() {

    const blocoDeMensagens = document.querySelector(".blocoDeMensagens");

    blocoDeMensagens.innerHTML += `
    <div class="div-mensagens">
        <li class="corpo">
        ${meuUsuario} ${corpoTexto}
        </li>
    </div>
    `;
    corpoTexto = document.querySelector("input").value = "";

}

function manterConexao() {
   
    const atualizarConexao = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, {name:meuUsuario});

    atualizarConexao.then();
    
}

setInterval(manterConexao, 5000);

