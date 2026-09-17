const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

const mensagem = document.getElementById("mensagem");


form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    mensagem.textContent = "";


    // ==========================================
    // VALIDAÇÕES
    // ==========================================

    if (!email || !senha) {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";

        return;
    }


    if (!email.includes("@") || !email.includes(".")) {

        mensagem.textContent = "Digite um e-mail válido.";
        mensagem.style.color = "red";

        return;
    }


    if (senha.length < 6) {

        mensagem.textContent =
            "A senha deve ter pelo menos 6 caracteres.";

        mensagem.style.color = "red";

        return;
    }


    // ==========================================
    // CONSULTAR BANCO DE DADOS
    // ==========================================

    try {

        mensagem.textContent = "Verificando login...";
        mensagem.style.color = "#555";


        const resposta = await fetch(
            "http://localhost:3000/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            }
        );


        const dados = await resposta.json();


        // ==========================================
        // LOGIN CORRETO
        // ==========================================

        if (resposta.ok && dados.success) {

            mensagem.textContent =
                "Login realizado com sucesso!";

            mensagem.style.color = "green";


            localStorage.setItem(
                "usuarioPortfolio",
                JSON.stringify(dados.user)
            );


            setTimeout(function() {

                window.location.href = "home.html";

            }, 1000);


            return;
        }


        // ==========================================
        // LOGIN INCORRETO
        // ==========================================

        mensagem.textContent =
            "E-mail ou senha inválidos.";

        mensagem.style.color = "red";


    } catch (erro) {

        console.error("Erro:", erro);

        mensagem.textContent =
            "Não foi possível conectar ao servidor.";

        mensagem.style.color = "red";

    }

});