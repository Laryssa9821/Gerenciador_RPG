// ========================================
// ELEMENTOS DO HTML
// ========================================

const formulario =
    document.getElementById("formPersonagem");

const campoNome =
    document.getElementById("nomePersonagem");

const campoClasse =
    document.getElementById("classePersonagem");

const mensagem =
    document.getElementById("mensagem");

const imagemPersonagem =
    document.getElementById("imagemPersonagem");

const imagemInimigo =
    document.getElementById("imagemInimigo");

const avisoPersonagem =
    document.getElementById("avisoPersonagem");

const avisoInimigo =
    document.getElementById("avisoInimigo");

const nomeJogador =
    document.getElementById("nomeJogador");

const classeJogador =
    document.getElementById("classeJogador");

const textoVidaJogador =
    document.getElementById("textoVidaJogador");

const barraVidaJogador =
    document.getElementById("barraVidaJogador");

const ataqueJogador =
    document.getElementById("ataqueJogador");

const defesaJogador =
    document.getElementById("defesaJogador");

const pocoesJogador =
    document.getElementById("pocoesJogador");

const nomeInimigo =
    document.getElementById("nomeInimigo");

const textoVidaInimigo =
    document.getElementById("textoVidaInimigo");

const barraVidaInimigo =
    document.getElementById("barraVidaInimigo");

const ataqueInimigo =
    document.getElementById("ataqueInimigo");

const defesaInimigo =
    document.getElementById("defesaInimigo");

const botaoAtacar =
    document.getElementById("botaoAtacar");

const botaoEspecial =
    document.getElementById("botaoEspecial");

const botaoPocao =
    document.getElementById("botaoPocao");

const botaoReiniciar =
    document.getElementById("botaoReiniciar");

const historicoBatalha =
    document.getElementById("historicoBatalha");

const camadaEfeitos =
    document.getElementById("camadaEfeitos");


// ========================================
// ESTADO DO JOGO
// ========================================

let personagem = null;
let inimigo = null;

let batalhaTerminou = false;
let turnoEmAndamento = false;


// ========================================
// DADOS DAS CLASSES
// ========================================

const classesDisponiveis = {
    Guerreiro: {
        vidaMaxima: 130,
        ataque: 20,
        defesa: 12,

        imagem:
            "imagens/personagens/guerreiro.png",

        nomeHabilidade:
            "Golpe Devastador",

        multiplicadorEspecial: 1.8
    },

    Mago: {
        vidaMaxima: 85,
        ataque: 28,
        defesa: 6,

        imagem:
            "imagens/personagens/mago.png",

        nomeHabilidade:
            "Explosão Arcana",

        multiplicadorEspecial: 2.1
    },

    Arqueiro: {
        vidaMaxima: 105,
        ataque: 23,
        defesa: 8,

        imagem:
            "imagens/personagens/arqueiro.png",

        nomeHabilidade:
            "Chuva de Flechas",

        multiplicadorEspecial: 1.9
    }
};


// ========================================
// INIMIGOS
// ========================================

const inimigosDisponiveis = [
    {
        nome: "Goblin Sombrio",

        imagem:
            "imagens/inimigos/goblin.png",

        vidaMaxima: 90,
        ataque: 15,
        defesa: 4
    },

    {
        nome: "Orc Guerreiro",

        imagem:
            "imagens/inimigos/orc.png",

        vidaMaxima: 115,
        ataque: 18,
        defesa: 7
    },

    {
        nome: "Esqueleto Amaldiçoado",

        imagem:
            "imagens/inimigos/esqueleto.png",

        vidaMaxima: 100,
        ataque: 17,
        defesa: 5
    },

    {
        nome: "Dragão Guerreiro",

        imagem:
            "imagens/inimigos/dragão.png",

        vidaMaxima: 145,
        ataque: 22,
        defesa: 9
    }
];


// ========================================
// CRIAÇÃO DO PERSONAGEM
// ========================================

formulario.addEventListener(
    "submit",
    function (evento) {
        evento.preventDefault();

        const nome = campoNome.value.trim();
        const classe = campoClasse.value;

        if (nome === "" || classe === "") {
            mostrarMensagem(
                "Digite o nome e escolha uma classe.",
                "erro"
            );

            return;
        }

        const dadosDaClasse =
            classesDisponiveis[classe];

        personagem = {
            nome: nome,
            classe: classe,

            imagem:
                dadosDaClasse.imagem,

            vidaMaxima:
                dadosDaClasse.vidaMaxima,

            vidaAtual:
                dadosDaClasse.vidaMaxima,

            ataque:
                dadosDaClasse.ataque,

            defesa:
                dadosDaClasse.defesa,

            nomeHabilidade:
                dadosDaClasse.nomeHabilidade,

            multiplicadorEspecial:
                dadosDaClasse.multiplicadorEspecial,

            pocoes: 3,
            especialDisponivel: true
        };

        gerarInimigo();

        batalhaTerminou = false;
        turnoEmAndamento = false;

        removerAnimacoesDeDerrota();
        limparHistorico();

        atualizarTela();

        adicionarAoHistorico(
            `${personagem.nome}, da classe ` +
            `${personagem.classe}, entrou na arena.`,
            "evento-jogador"
        );

        adicionarAoHistorico(
            `${inimigo.nome} apareceu para a batalha.`,
            "evento-inimigo"
        );

        mostrarMensagem(
            "Personagem criado com sucesso!",
            "sucesso"
        );
    }
);


// ========================================
// GERAR INIMIGO
// ========================================

function gerarInimigo() {
    const indice = Math.floor(
        Math.random() *
        inimigosDisponiveis.length
    );

    const escolhido =
        inimigosDisponiveis[indice];

    inimigo = {
        nome: escolhido.nome,
        imagem: escolhido.imagem,

        vidaMaxima:
            escolhido.vidaMaxima,

        vidaAtual:
            escolhido.vidaMaxima,

        ataque:
            escolhido.ataque,

        defesa:
            escolhido.defesa
    };
}


// ========================================
// ATUALIZAÇÃO DA TELA
// ========================================

function atualizarTela() {
    atualizarPersonagem();
    atualizarInimigo();
    atualizarBotoes();
}


function atualizarPersonagem() {
    if (!personagem) {
        imagemPersonagem.hidden = true;
        avisoPersonagem.hidden = false;

        nomeJogador.textContent = "Herói";
        classeJogador.textContent =
            "Escolha uma classe";

        textoVidaJogador.textContent = "0 / 0";

        atualizarBarraDeVida(
            barraVidaJogador,
            0,
            1
        );

        ataqueJogador.textContent = "0";
        defesaJogador.textContent = "0";
        pocoesJogador.textContent = "0";

        return;
    }

    imagemPersonagem.src =
        personagem.imagem;

    imagemPersonagem.alt =
        `Imagem de ${personagem.nome}`;

    imagemPersonagem.hidden = false;
    avisoPersonagem.hidden = true;

    nomeJogador.textContent =
        personagem.nome;

    classeJogador.textContent =
        personagem.classe;

    textoVidaJogador.textContent =
        `${personagem.vidaAtual} / ` +
        `${personagem.vidaMaxima}`;

    ataqueJogador.textContent =
        personagem.ataque;

    defesaJogador.textContent =
        personagem.defesa;

    pocoesJogador.textContent =
        personagem.pocoes;

    atualizarBarraDeVida(
        barraVidaJogador,
        personagem.vidaAtual,
        personagem.vidaMaxima
    );
}


function atualizarInimigo() {
    if (!inimigo) {
        imagemInimigo.hidden = true;
        avisoInimigo.hidden = false;

        nomeInimigo.textContent =
            "Criatura";

        textoVidaInimigo.textContent =
            "0 / 0";

        atualizarBarraDeVida(
            barraVidaInimigo,
            0,
            1
        );

        ataqueInimigo.textContent = "0";
        defesaInimigo.textContent = "0";

        return;
    }

    imagemInimigo.src =
        inimigo.imagem;

    imagemInimigo.alt =
        `Imagem de ${inimigo.nome}`;

    imagemInimigo.hidden = false;
    avisoInimigo.hidden = true;

    nomeInimigo.textContent =
        inimigo.nome;

    textoVidaInimigo.textContent =
        `${inimigo.vidaAtual} / ` +
        `${inimigo.vidaMaxima}`;

    ataqueInimigo.textContent =
        inimigo.ataque;

    defesaInimigo.textContent =
        inimigo.defesa;

    atualizarBarraDeVida(
        barraVidaInimigo,
        inimigo.vidaAtual,
        inimigo.vidaMaxima
    );
}


function atualizarBarraDeVida(
    elemento,
    vidaAtual,
    vidaMaxima
) {
    let porcentagem =
        (vidaAtual / vidaMaxima) * 100;

    porcentagem = Math.max(
        0,
        Math.min(100, porcentagem)
    );

    elemento.style.width =
        `${porcentagem}%`;

    elemento.classList.remove(
        "vida-media",
        "vida-baixa"
    );

    if (porcentagem <= 30) {
        elemento.classList.add(
            "vida-baixa"
        );
    } else if (porcentagem <= 60) {
        elemento.classList.add(
            "vida-media"
        );
    }
}


// ========================================
// ATAQUE NORMAL
// ========================================

botaoAtacar.addEventListener(
    "click",
    async function () {
        if (!podeRealizarAcao()) {
            return;
        }

        turnoEmAndamento = true;
        atualizarBotoes();

        const dano = calcularDano(
            personagem.ataque,
            inimigo.defesa
        );

        await executarAnimacao(
            imagemPersonagem,
            "animacao-ataque-jogador",
            480
        );

        inimigo.vidaAtual -= dano;
        limitarVidas();

        executarAnimacao(
            imagemInimigo,
            "animacao-dano",
            450
        );

        criarNumeroFlutuante(
            `-${dano}`,
            "inimigo",
            "dano"
        );

        adicionarAoHistorico(
            `${personagem.nome} atacou ` +
            `${inimigo.nome} e causou ` +
            `${dano} pontos de dano.`,
            "evento-jogador"
        );

        atualizarTela();

        if (verificarFimDaBatalha()) {
            turnoEmAndamento = false;
            atualizarBotoes();
            return;
        }

        await aguardar(350);
        await executarTurnoDoInimigo();

        turnoEmAndamento = false;
        atualizarBotoes();
    }
);


// ========================================
// HABILIDADE ESPECIAL
// ========================================

botaoEspecial.addEventListener(
    "click",
    async function () {
        if (!podeRealizarAcao()) {
            return;
        }

        if (!personagem.especialDisponivel) {
            mostrarMensagem(
                "A habilidade especial já foi utilizada.",
                "erro"
            );

            return;
        }

        turnoEmAndamento = true;

        personagem.especialDisponivel = false;

        atualizarBotoes();

        const ataqueEspecial = Math.round(
            personagem.ataque *
            personagem.multiplicadorEspecial
        );

        const dano = calcularDano(
            ataqueEspecial,
            inimigo.defesa
        );

        await executarAnimacao(
            imagemPersonagem,
            "animacao-especial",
            700
        );

        inimigo.vidaAtual -= dano;
        limitarVidas();

        executarAnimacao(
            imagemInimigo,
            "animacao-dano",
            450
        );

        criarNumeroFlutuante(
            `-${dano}`,
            "inimigo",
            "especial"
        );

        adicionarAoHistorico(
            `${personagem.nome} usou ` +
            `${personagem.nomeHabilidade} ` +
            `e causou ${dano} pontos de dano.`,
            "evento-especial"
        );

        atualizarTela();

        if (verificarFimDaBatalha()) {
            turnoEmAndamento = false;
            atualizarBotoes();
            return;
        }

        await aguardar(350);
        await executarTurnoDoInimigo();

        turnoEmAndamento = false;
        atualizarBotoes();
    }
);


// ========================================
// USAR POÇÃO
// ========================================

botaoPocao.addEventListener(
    "click",
    async function () {
        if (!podeRealizarAcao()) {
            return;
        }

        if (personagem.pocoes <= 0) {
            mostrarMensagem(
                "Você não possui mais poções.",
                "erro"
            );

            return;
        }

        if (
            personagem.vidaAtual ===
            personagem.vidaMaxima
        ) {
            mostrarMensagem(
                "A vida do personagem já está completa.",
                "erro"
            );

            return;
        }

        turnoEmAndamento = true;
        atualizarBotoes();

        const vidaAnterior =
            personagem.vidaAtual;

        personagem.vidaAtual += 30;

        if (
            personagem.vidaAtual >
            personagem.vidaMaxima
        ) {
            personagem.vidaAtual =
                personagem.vidaMaxima;
        }

        personagem.pocoes -= 1;

        const vidaRecuperada =
            personagem.vidaAtual -
            vidaAnterior;

        executarAnimacao(
            imagemPersonagem,
            "animacao-cura",
            900
        );

        criarNumeroFlutuante(
            `+${vidaRecuperada}`,
            "jogador",
            "cura"
        );

        adicionarAoHistorico(
            `${personagem.nome} usou uma poção ` +
            `e recuperou ${vidaRecuperada} ` +
            `pontos de vida.`,
            "evento-pocao"
        );

        atualizarTela();

        await aguardar(900);
        await executarTurnoDoInimigo();

        turnoEmAndamento = false;
        atualizarBotoes();
    }
);


// ========================================
// TURNO DO INIMIGO
// ========================================

async function executarTurnoDoInimigo() {
    if (batalhaTerminou) {
        return;
    }

    const dano = calcularDano(
        inimigo.ataque,
        personagem.defesa
    );

    await executarAnimacao(
        imagemInimigo,
        "animacao-ataque-inimigo",
        480
    );

    personagem.vidaAtual -= dano;
    limitarVidas();

    executarAnimacao(
        imagemPersonagem,
        "animacao-dano",
        450
    );

    criarNumeroFlutuante(
        `-${dano}`,
        "jogador",
        "dano"
    );

    adicionarAoHistorico(
        `${inimigo.nome} contra-atacou ` +
        `e causou ${dano} pontos de dano ` +
        `em ${personagem.nome}.`,
        "evento-inimigo"
    );

    atualizarTela();
    verificarFimDaBatalha();

    await aguardar(450);
}


// ========================================
// CÁLCULO DO DANO
// ========================================

function calcularDano(ataque, defesa) {
    const variacaoAleatoria =
        Math.floor(Math.random() * 7);

    let dano =
        ataque +
        variacaoAleatoria -
        defesa;

    if (dano < 1) {
        dano = 1;
    }

    return dano;
}


function limitarVidas() {
    personagem.vidaAtual = Math.max(
        0,
        Math.min(
            personagem.vidaAtual,
            personagem.vidaMaxima
        )
    );

    inimigo.vidaAtual = Math.max(
        0,
        Math.min(
            inimigo.vidaAtual,
            inimigo.vidaMaxima
        )
    );
}


// ========================================
// FIM DA BATALHA
// ========================================

function verificarFimDaBatalha() {
    if (inimigo.vidaAtual <= 0) {
        batalhaTerminou = true;

        executarAnimacaoPermanente(
            imagemInimigo,
            "animacao-derrota-inimigo"
        );

        adicionarAoHistorico(
            `${personagem.nome} venceu a batalha ` +
            `contra ${inimigo.nome}!`,
            "evento-vitoria"
        );

        mostrarMensagem(
            "Você venceu a batalha!",
            "sucesso"
        );

        atualizarBotoes();

        return true;
    }

    if (personagem.vidaAtual <= 0) {
        batalhaTerminou = true;

        executarAnimacaoPermanente(
            imagemPersonagem,
            "animacao-derrota-jogador"
        );

        adicionarAoHistorico(
            `${personagem.nome} foi derrotado ` +
            `por ${inimigo.nome}.`,
            "evento-derrota"
        );

        mostrarMensagem(
            "Seu personagem foi derrotado.",
            "erro"
        );

        atualizarBotoes();

        return true;
    }

    return false;
}


// ========================================
// REINICIAR BATALHA
// ========================================

botaoReiniciar.addEventListener(
    "click",
    function () {
        if (!personagem) {
            mostrarMensagem(
                "Crie um personagem primeiro.",
                "erro"
            );

            return;
        }

        personagem.vidaAtual =
            personagem.vidaMaxima;

        personagem.pocoes = 3;

        personagem.especialDisponivel =
            true;

        gerarInimigo();

        batalhaTerminou = false;
        turnoEmAndamento = false;

        removerAnimacoesDeDerrota();
        limparHistorico();

        atualizarTela();

        adicionarAoHistorico(
            `${personagem.nome} recuperou a vida ` +
            `e iniciou uma nova batalha.`,
            "evento-jogador"
        );

        adicionarAoHistorico(
            `${inimigo.nome} apareceu na arena.`,
            "evento-inimigo"
        );

        mostrarMensagem(
            "Nova batalha iniciada!",
            "sucesso"
        );
    }
);


// ========================================
// CONTROLE DOS BOTÕES
// ========================================

function atualizarBotoes() {
    const semPersonagem =
        personagem === null ||
        inimigo === null;

    const desativarAcoes =
        semPersonagem ||
        batalhaTerminou ||
        turnoEmAndamento;

    botaoAtacar.disabled =
        desativarAcoes;

    botaoPocao.disabled =
        desativarAcoes;

    botaoEspecial.disabled =
        desativarAcoes ||
        !personagem?.especialDisponivel;

    botaoReiniciar.disabled =
        personagem === null ||
        turnoEmAndamento;

    if (personagem) {
        botaoEspecial.textContent =
            personagem.especialDisponivel
                ? personagem.nomeHabilidade
                : "Especial utilizado";

        botaoPocao.textContent =
            `Usar poção (${personagem.pocoes})`;
    } else {
        botaoEspecial.textContent =
            "Habilidade especial";

        botaoPocao.textContent =
            "Usar poção";
    }
}


function podeRealizarAcao() {
    if (!personagem || !inimigo) {
        mostrarMensagem(
            "Crie um personagem antes de combater.",
            "erro"
        );

        return false;
    }

    if (turnoEmAndamento) {
        return false;
    }

    if (batalhaTerminou) {
        mostrarMensagem(
            "A batalha terminou. Inicie uma nova batalha.",
            "erro"
        );

        return false;
    }

    return true;
}


// ========================================
// ANIMAÇÕES
// ========================================

function executarAnimacao(
    elemento,
    classe,
    duracao
) {
    return new Promise(function (resolver) {
        if (!elemento) {
            resolver();
            return;
        }

        elemento.classList.remove(classe);

        void elemento.offsetWidth;

        elemento.classList.add(classe);

        setTimeout(function () {
            elemento.classList.remove(classe);
            resolver();
        }, duracao);
    });
}


function executarAnimacaoPermanente(
    elemento,
    classe
) {
    if (!elemento) {
        return;
    }

    elemento.classList.remove(classe);

    void elemento.offsetWidth;

    elemento.classList.add(classe);
}


function removerAnimacoesDeDerrota() {
    imagemPersonagem.classList.remove(
        "animacao-derrota-jogador"
    );

    imagemInimigo.classList.remove(
        "animacao-derrota-inimigo"
    );
}


function criarNumeroFlutuante(
    texto,
    alvo,
    tipo
) {
    const numero =
        document.createElement("span");

    numero.textContent = texto;

    numero.classList.add(
        "numero-flutuante"
    );

    if (alvo === "jogador") {
        numero.classList.add(
            "numero-jogador"
        );
    } else {
        numero.classList.add(
            "numero-inimigo"
        );
    }

    if (tipo === "cura") {
        numero.classList.add(
            "numero-cura"
        );
    } else if (tipo === "especial") {
        numero.classList.add(
            "numero-especial"
        );
    } else {
        numero.classList.add(
            "numero-dano"
        );
    }

    camadaEfeitos.appendChild(numero);

    setTimeout(function () {
        numero.remove();
    }, 1200);
}


function aguardar(tempo) {
    return new Promise(function (resolver) {
        setTimeout(resolver, tempo);
    });
}


// ========================================
// HISTÓRICO
// ========================================

function limparHistorico() {
    historicoBatalha.textContent = "";
}


function adicionarAoHistorico(
    texto,
    classe
) {
    const registro =
        document.createElement("p");

    registro.textContent = texto;
    registro.classList.add(classe);

    historicoBatalha.appendChild(
        registro
    );

    historicoBatalha.scrollTop =
        historicoBatalha.scrollHeight;
}


// ========================================
// MENSAGENS
// ========================================

let temporizadorMensagem = null;


function mostrarMensagem(texto, tipo) {
    clearTimeout(temporizadorMensagem);

    mensagem.textContent = texto;

    mensagem.classList.remove(
        "mensagem-sucesso",
        "mensagem-erro"
    );

    if (tipo === "sucesso") {
        mensagem.classList.add(
            "mensagem-sucesso"
        );
    } else {
        mensagem.classList.add(
            "mensagem-erro"
        );
    }

    temporizadorMensagem = setTimeout(
        function () {
            mensagem.textContent = "";

            mensagem.classList.remove(
                "mensagem-sucesso",
                "mensagem-erro"
            );
        },
        3000
    );
}


// ========================================
// TRATAMENTO DE IMAGEM AUSENTE
// ========================================

imagemPersonagem.addEventListener(
    "error",
    function () {
        imagemPersonagem.hidden = true;
        avisoPersonagem.hidden = false;

        avisoPersonagem.textContent =
            "Imagem do personagem não encontrada. " +
            "Confira a pasta imagens/personagens.";
    }
);


imagemInimigo.addEventListener(
    "error",
    function () {
        imagemInimigo.hidden = true;
        avisoInimigo.hidden = false;

        avisoInimigo.textContent =
            "Imagem do inimigo não encontrada. " +
            "Confira a pasta imagens/inimigos.";
    }
);


// ========================================
// INICIALIZAÇÃO
// ========================================

atualizarTela();