const saudacaoUsuario = document.getElementById("saudacaoUsuario");
const btnVoltarLogin = document.getElementById("btnVoltarLogin");

// Recuperar os dados do usuário que fez login
const usuarioSalvo = localStorage.getItem("usuarioPortfolio");


// Verificar se existe um usuário logado
if (!usuarioSalvo) {

    // Se não existir, voltar para o login
    window.location.href = "index.html";

} else {

    try {

        // Transformar os dados salvos em objeto
        const usuario = JSON.parse(usuarioSalvo);

        // Mostrar o nome do usuário
        if (usuario.nome) {

            saudacaoUsuario.textContent =
                `Olá, ${usuario.nome}!`;

        } else {

            saudacaoUsuario.textContent =
                "Olá!";

        }

    } catch (erro) {

        console.error(
            "Erro ao ler os dados do usuário:",
            erro
        );

        // Remover dados inválidos
        localStorage.removeItem(
            "usuarioPortfolio"
        );

        // Voltar para o login
        window.location.href = "index.html";
    }
}


// ==========================================
// BOTÃO SAIR
// ==========================================

btnVoltarLogin.addEventListener(
    "click",
    function () {

        // Remover usuário salvo
        localStorage.removeItem(
            "usuarioPortfolio"
        );

        // Voltar para a tela de login
        window.location.href =
            "index.html";
    }
);