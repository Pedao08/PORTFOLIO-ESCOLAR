const mascoteBtn = document.getElementById("mascote-btn");
const mascoteBalao = document.getElementById("mascote-balao");

const mensagens = {
    home: [
        "Olá! Seja bem-vindo ao Aranhaverso do Pedro.",
        "Um grande poder traz um grande portfólio! 🕷",
        "Clique nos menus para explorar as áreas do multiverso."
    ],
    project: [
        "Este é o meu Projeto de Vida, meu fio da teia para o futuro.",
        "Com grandes planos, vêm grandes responsabilidades.",
        "Veja onde quero chegar quando soltar minha teia."
    ],
    ppe: [
        "Meu Plano Pessoal de Estudos é meu traje de herói.",
        "Estudo organizado: meu sentinela contra o caos.",
        "Veja como divido meu tempo nessa semana de escalada."
    ],
    senai: [
        "Bem-vindo ao ano 2099 do código!",
        "Cada projeto aqui é meu salto entre prédios.",
        "Passe pelos cards e veja meu traje tecnológico."
    ],
    contato: [
        "Quer me chamar? Já escolhi meu ponto de encontro.",
        "Meus contatos estão te esperando, parceiro.",
        "Vai sem medo: as linhas abertas são seguras."
    ]
};

function mostrarMensagem(texto, tempo = 4000) {
    mascoteBalao.textContent = texto;
    mascoteBalao.classList.add("show");

    clearTimeout(window.tempoMascote);

    window.tempoMascote = setTimeout(() => {
        mascoteBalao.classList.remove("show");
    }, tempo);
}

function identificarPagina() {
    const pagina = window.location.pathname.toLowerCase();

    if (pagina.includes("project")) return "project";
    if (pagina.includes("ppe")) return "ppe";
    if (pagina.includes("senai")) return "senai";
    if (pagina.includes("contact")) return "contato";
    return "home";
}

window.addEventListener("load", () => {
    const paginaAtual = identificarPagina();
    const lista = mensagens[paginaAtual];
    const msgInicial = lista[Math.floor(Math.random() * lista.length)];
    mostrarMensagem(msgInicial, 5000);
});

mascoteBtn.addEventListener("click", () => {
    const paginaAtual = identificarPagina();
    const lista = mensagens[paginaAtual];
    const msg = lista[Math.floor(Math.random() * lista.length)];
    mostrarMensagem(msg, 4500);
});

let tempoScroll = null;
window.addEventListener("scroll", () => {
    clearTimeout(tempoScroll);

    tempoScroll = setTimeout(() => {
        const scrollY = window.scrollY;

        if (scrollY > 400) {
            mostrarMensagem("Você já avançou bastante, continue explorando!");
        } else if (scrollY > 100) {
            mostrarMensagem("Tem bastante coisa boa mais abaixo.");
        }
    }, 150);
});