
# ⚔️ Batalha RPG

Jogo de batalha por turnos desenvolvido com **HTML, CSS e JavaScript**. O jogador pode criar um personagem, escolher uma classe e enfrentar inimigos aleatórios em uma arena com animações, barras de vida, habilidades especiais e histórico de combate.

## 🎮 Demonstração

> Adicione aqui o link do projeto publicado no GitHub Pages.
>
> Exemplo: `https://seu-usuario.github.io/batalha-rpg/`

## 📸 Captura de tela




<img width="1263" height="832" alt="tela_do_jogo" src="https://github.com/user-attachments/assets/282c0608-08ae-465d-9ef2-eb78a5a26450" />


## ✨ Funcionalidades

- Criação de personagem com nome personalizado
- Escolha entre três classes: Guerreiro, Mago e Arqueiro
- Atributos diferentes de vida, ataque e defesa para cada classe
- Seleção aleatória de inimigos
- Sistema de combate por turnos
- Ataque normal
- Habilidade especial exclusiva para cada classe
- Uso de poções para recuperar vida
- Barras de vida com mudança de cor
- Animações de ataque, dano, cura e derrota
- Números flutuantes de dano e recuperação
- Histórico completo da batalha
- Botão para iniciar uma nova batalha
- Layout responsivo para computador, tablet e celular
- Aviso quando uma imagem não é encontrada

## 🧙 Classes disponíveis

| Classe | Vida | Ataque | Defesa | Habilidade especial |
|---|---:|---:|---:|---|
| Guerreiro | 130 | 20 | 12 | Golpe Devastador |
| Mago | 85 | 28 | 6 | Explosão Arcana |
| Arqueiro | 105 | 23 | 8 | Chuva de Flechas |

## 👾 Inimigos

O jogo seleciona aleatoriamente um dos seguintes inimigos:

- Goblin Sombrio
- Orc Guerreiro
- Esqueleto Amaldiçoado
- Dragão Guerreiro

Cada inimigo possui valores próprios de vida, ataque e defesa.

## 🕹️ Como jogar

1. Digite o nome do personagem.
2. Escolha uma classe.
3. Clique em **Criar personagem**.
4. Use os botões de combate:
   - **Ataque normal:** causa dano ao inimigo.
   - **Habilidade especial:** causa dano maior e pode ser usada uma vez por batalha.
   - **Usar poção:** recupera até 30 pontos de vida. Cada personagem começa com três poções.
   - **Nova batalha:** recupera o personagem e gera outro inimigo.
5. Reduza a vida do inimigo a zero para vencer.

Cada ação do jogador consome um turno. Depois da ação, o inimigo pode contra-atacar.

## 🛠️ Tecnologias utilizadas

- **HTML5:** estrutura da página
- **CSS3:** layout, responsividade e animações
- **JavaScript:** regras do jogo, DOM, eventos e combate por turnos
- **Git e GitHub:** versionamento e publicação do projeto

## 📁 Estrutura de pastas

```text
gerenciador-rpg/
├── imagens/
│   ├── personagens/
│   │   ├── guerreiro.png
│   │   ├── mago.png
│   │   └── arqueiro.png
│   ├── inimigos/
│   │   ├── goblin.png
│   │   ├── orc.png
│   │   ├── esqueleto.png
│   │   └── dragao.png
│   └── cenario/
│       └── floresta.jpg
├── index.html
├── estilo.css
├── script.js
└── README.md
```

## 🚀 Como executar o projeto

### Opção 1: abrir diretamente

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto.
3. Clique duas vezes no arquivo `index.html`.

### Opção 2: usar o Live Server

1. Abra o projeto no Visual Studio Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.

## 💻 Como clonar o repositório

```bash
git clone (https://github.com/Laryssa9821/Gerenciador_RPG)
```

Depois, entre na pasta:

```bash
cd Gerenciador_RPG
```

## 🌐 Publicação no GitHub Pages

1. Envie os arquivos para um repositório no GitHub.
2. Abra **Settings** no repositório.
3. Acesse **Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/root`.
6. Clique em **Save**.
7. Aguarde a geração do endereço público do projeto.

## 🧠 Conceitos de JavaScript praticados

- Variáveis com `const` e `let`
- Objetos e arrays
- Funções
- Estruturas condicionais
- Eventos com `addEventListener()`
- Manipulação do DOM
- Funções assíncronas com `async` e `await`
- Promessas com `Promise`
- Números aleatórios com `Math.random()`
- Criação dinâmica de elementos
- Adição e remoção de classes CSS
- Controle de estado da batalha

## 🔮 Melhorias futuras

- Adicionar níveis e experiência
- Permitir vários combates consecutivos
- Criar sistema de moedas e loja
- Adicionar novos personagens e inimigos
- Salvar o progresso com `localStorage`
- Adicionar efeitos sonoros e música
- Criar golpes críticos e esquiva
- Adicionar seleção de dificuldade
- Exibir tela final de vitória ou derrota
- Adicionar acessibilidade para redução de movimentos

## 🖼️ Créditos das imagens

```text
imagens de personagens, inimigos e cenário são https://www.spritefusion.com/pixel-art-generator
```


## 👩‍💻 Autora

**Laryssa Cristine Andrade Almeida**

Projeto desenvolvido para praticar programação web com HTML, CSS e JavaScript.


